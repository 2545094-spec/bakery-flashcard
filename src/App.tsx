import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookOpen, Check, RotateCcw } from 'lucide-react';
import { FlashcardStage } from './components/FlashcardStage';
import { TermIndex } from './components/TermIndex';
import {
  BAKING_TERMS,
  BakingTerm,
  DEPARTMENT_TABS,
  DepartmentId,
  MasteryStatus,
  SubjectDepartmentId,
} from './data/bakingTerms';

const STORAGE_KEY = 'baking_2nd_year_flashcards_v1';

type StudyFilter = 'all' | 'unknown' | 'unseen';

function loadSavedStatus(): Record<string, MasteryStatus> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const clean: Record<string, MasteryStatus> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (v === 'known' || v === 'unknown' || v === 'unseen') {
        clean[k] = v;
      }
    }
    return clean;
  } catch {
    return {};
  }
}

export function App() {
  const [selectedDept, setSelectedDept] = useState<DepartmentId>('all');
  const [studyFilter, setStudyFilter] = useState<StudyFilter>('all');
  const [statusMap, setStatusMap] = useState<Record<string, MasteryStatus>>(loadSavedStatus);
  const [deckOrder, setDeckOrder] = useState<string[]>(() => BAKING_TERMS.map((t) => t.id));
  const [currentTermId, setCurrentTermId] = useState<string | null>(BAKING_TERMS[0]?.id ?? null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap));
    } catch {
      // Ignore storage quota errors in restricted frames
    }
  }, [statusMap]);

  const termById = useMemo(() => {
    const map = new Map<string, BakingTerm>();
    for (const term of BAKING_TERMS) {
      map.set(term.id, term);
    }
    return map;
  }, []);

  // Terms matching the active Department Tab
  const deptTerms = useMemo(() => {
    return deckOrder
      .map((id) => termById.get(id))
      .filter((term): term is BakingTerm => {
        if (!term) return false;
        return selectedDept === 'all' || term.department === selectedDept;
      });
  }, [deckOrder, selectedDept, termById]);

  // Terms matching both Department Tab and Study Filter (all / unknown / unseen)
  const activeDeck = useMemo(() => {
    return deptTerms.filter((term) => {
      const status = statusMap[term.id] ?? 'unseen';
      if (studyFilter === 'unknown') return status === 'unknown';
      if (studyFilter === 'unseen') return status === 'unseen';
      return true;
    });
  }, [deptTerms, statusMap, studyFilter]);

  // Keep currentTermId synced with activeDeck
  const resolvedCurrentIndex = useMemo(() => {
    if (activeDeck.length === 0) return -1;
    if (currentTermId) {
      const idx = activeDeck.findIndex((t) => t.id === currentTermId);
      if (idx !== -1) return idx;
    }
    return 0;
  }, [activeDeck, currentTermId]);

  const currentTerm =
    resolvedCurrentIndex >= 0 ? activeDeck[resolvedCurrentIndex] : null;

  // Global stats across all 28 terms
  const globalStats = useMemo(() => {
    let known = 0;
    let unknown = 0;
    let unseen = 0;
    for (const term of BAKING_TERMS) {
      const st = statusMap[term.id] ?? 'unseen';
      if (st === 'known') known += 1;
      else if (st === 'unknown') unknown += 1;
      else unseen += 1;
    }
    return {
      total: BAKING_TERMS.length,
      known,
      unknown,
      unseen,
      percent: Math.round((known / BAKING_TERMS.length) * 100),
    };
  }, [statusMap]);

  // Department-specific stats for the active tab
  const deptStats = useMemo(() => {
    let known = 0;
    let unknown = 0;
    let unseen = 0;
    for (const term of deptTerms) {
      const st = statusMap[term.id] ?? 'unseen';
      if (st === 'known') known += 1;
      else if (st === 'unknown') unknown += 1;
      else unseen += 1;
    }
    return { total: deptTerms.length, known, unknown, unseen };
  }, [deptTerms, statusMap]);

  // Per-subject breakdown for sidebar
  const subjectBreakdown = useMemo(() => {
    const subjects = DEPARTMENT_TABS.filter(
      (tab): tab is { id: SubjectDepartmentId; label: string; shortDesc: string } =>
        tab.id !== 'all'
    );
    return subjects.map((sub) => {
      const items = BAKING_TERMS.filter((t) => t.department === sub.id);
      const knownCount = items.filter((t) => statusMap[t.id] === 'known').length;
      const unknownCount = items.filter((t) => statusMap[t.id] === 'unknown').length;
      return {
        ...sub,
        total: items.length,
        knownCount,
        unknownCount,
        percent: Math.round((knownCount / items.length) * 100),
      };
    });
  }, [statusMap]);

  const handleSelectDepartment = (deptId: DepartmentId) => {
    setSelectedDept(deptId);
    setIsFlipped(false);
    setConfirmReset(false);
    const nextFirst = deckOrder
      .map((id) => termById.get(id))
      .find((t) => {
        if (!t) return false;
        const matchDept = deptId === 'all' || t.department === deptId;
        if (!matchDept) return false;
        const st = statusMap[t.id] ?? 'unseen';
        if (studyFilter === 'unknown') return st === 'unknown';
        if (studyFilter === 'unseen') return st === 'unseen';
        return true;
      });
    setCurrentTermId(nextFirst?.id ?? null);
  };

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handlePrev = useCallback(() => {
    if (activeDeck.length <= 1) return;
    const prevIdx =
      resolvedCurrentIndex <= 0 ? activeDeck.length - 1 : resolvedCurrentIndex - 1;
    setCurrentTermId(activeDeck[prevIdx].id);
    setIsFlipped(false);
  }, [activeDeck, resolvedCurrentIndex]);

  const handleNext = useCallback(() => {
    if (activeDeck.length <= 1) return;
    const nextIdx =
      resolvedCurrentIndex >= activeDeck.length - 1 ? 0 : resolvedCurrentIndex + 1;
    setCurrentTermId(activeDeck[nextIdx].id);
    setIsFlipped(false);
  }, [activeDeck, resolvedCurrentIndex]);

  const advanceAfterAssess = useCallback(
    (assessedId: string, nextStatus: MasteryStatus) => {
      // Find the next card in the deck before state removal (when filtered)
      if (activeDeck.length === 0) return;
      const idx = activeDeck.findIndex((t) => t.id === assessedId);
      const remaining = activeDeck.filter((t) => {
        if (t.id !== assessedId) return true;
        if (studyFilter === 'unknown') return nextStatus === 'unknown';
        if (studyFilter === 'unseen') return nextStatus === 'unseen';
        return true;
      });

      if (remaining.length === 0) {
        setCurrentTermId(null);
      } else if (studyFilter !== 'all' && !remaining.some((t) => t.id === assessedId)) {
        const nextItem = remaining[idx % remaining.length];
        setCurrentTermId(nextItem.id);
      } else {
        const nextIdx = (idx + 1) % activeDeck.length;
        setCurrentTermId(activeDeck[nextIdx].id);
      }
      setIsFlipped(false);
    },
    [activeDeck, studyFilter]
  );

  const handleMarkKnown = useCallback(() => {
    if (!currentTerm) return;
    const id = currentTerm.id;
    setStatusMap((prev) => ({ ...prev, [id]: 'known' }));
    advanceAfterAssess(id, 'known');
  }, [advanceAfterAssess, currentTerm]);

  const handleMarkUnknown = useCallback(() => {
    if (!currentTerm) return;
    const id = currentTerm.id;
    setStatusMap((prev) => ({ ...prev, [id]: 'unknown' }));
    advanceAfterAssess(id, 'unknown');
  }, [advanceAfterAssess, currentTerm]);

  const handleShuffle = () => {
    const copy = [...deckOrder];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setDeckOrder(copy);
    setIsFlipped(false);
    const firstMatch = copy
      .map((id) => termById.get(id))
      .find((t) => {
        if (!t) return false;
        const matchDept = selectedDept === 'all' || t.department === selectedDept;
        if (!matchDept) return false;
        const st = statusMap[t.id] ?? 'unseen';
        if (studyFilter === 'unknown') return st === 'unknown';
        if (studyFilter === 'unseen') return st === 'unseen';
        return true;
      });
    setCurrentTermId(firstMatch?.id ?? null);
  };

  const handleResetProgress = () => {
    setStatusMap({});
    setStudyFilter('all');
    setIsFlipped(false);
    setConfirmReset(false);
    setDeckOrder(BAKING_TERMS.map((t) => t.id));
    setCurrentTermId(deptTerms[0]?.id ?? BAKING_TERMS[0]?.id ?? null);
  };

  const handleSelectTermFromIndex = (termId: string) => {
    const target = termById.get(termId);
    if (!target) return;
    if (selectedDept !== 'all' && target.department !== selectedDept) {
      setSelectedDept(target.department);
    }
    setStudyFilter('all');
    setCurrentTermId(termId);
    setIsFlipped(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcuts (ignored while typing in search input)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === '1' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleMarkUnknown();
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleMarkKnown();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleFlip, handleMarkKnown, handleMarkUnknown]);

  const activeTabInfo =
    DEPARTMENT_TABS.find((t) => t.id === selectedDept) ?? DEPARTMENT_TABS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7FA] text-[#111D35]">
      {/* 3-Zone Top Navigation Bar */}
      <header className="bg-white border-b border-[#E2E6EE]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#flashcard-stage"
            className="text-base md:text-lg font-extrabold tracking-tight text-[#13223D] whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-[#EA580C]" />
            <span>제과제빵과 2학년 전공 암기</span>
          </a>

          <nav
            aria-label="주요 섹션 이동"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#52607A]"
          >
            <a
              href="#flashcard-stage"
              className="hover:text-[#13223D] transition-colors whitespace-nowrap shrink-0"
            >
              플래시카드
            </a>
            <a
              href="#department-progress"
              className="hover:text-[#13223D] transition-colors whitespace-nowrap shrink-0"
            >
              학과별 숙달도
            </a>
            <a
              href="#term-index-heading"
              className="hover:text-[#13223D] transition-colors whitespace-nowrap shrink-0"
            >
              용어 색인
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                if (studyFilter === 'unknown') {
                  setStudyFilter('all');
                } else {
                  if (deptStats.unknown === 0 && globalStats.unknown > 0) {
                    setSelectedDept('all');
                  }
                  setStudyFilter('unknown');
                }
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                studyFilter === 'unknown'
                  ? 'bg-[#EA580C] text-white hover:bg-[#C2410C]'
                  : 'bg-[#13223D] text-white hover:bg-[#1E355E]'
              }`}
            >
              {studyFilter === 'unknown'
                ? '전체 카드 보기'
                : `모르는 카드만 다시 보기 (${globalStats.unknown})`}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-8 md:py-10 flex flex-col gap-8">
        {/* Title & Department Tabs Section */}
        <section id="flashcard-stage" className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#EA580C] tracking-wide mb-1.5">
                전공 심화 용어 학습 · 제과제빵과 2학년
              </p>
              <h1 className="text-2xl md:text-[2rem] font-extrabold text-[#111D35] tracking-tight text-balance">
                {activeTabInfo.label} 플래시카드
              </h1>
              <p className="text-sm text-[#52607A] mt-1">{activeTabInfo.shortDesc}</p>
            </div>

            {/* Zero-pill unboxed study metadata */}
            <div className="flex flex-wrap items-center gap-2.5 text-sm text-[#52607A] tabular-nums">
              <span className="font-semibold text-[#13223D]">
                선택 학과 {deptStats.total}문항
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#13223D] font-medium">알아요 {deptStats.known}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#EA580C] font-semibold">
                모르겠어요 {deptStats.unknown}
              </span>
              <span aria-hidden="true">·</span>
              <span>미학습 {deptStats.unseen}</span>
            </div>
          </div>

          {/* 학과 탭 (Department Subject Tabs) */}
          <div
            role="tablist"
            aria-label="제과제빵과 2학년 학과 과목 탭"
            className="flex items-center gap-1.5 p-1.5 bg-[#EAEFF6] rounded-xl overflow-x-auto"
          >
            {DEPARTMENT_TABS.map((tab) => {
              const isSelected = selectedDept === tab.id;
              const count =
                tab.id === 'all'
                  ? BAKING_TERMS.length
                  : BAKING_TERMS.filter((t) => t.department === tab.id).length;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => handleSelectDepartment(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#13223D] text-white shadow-sm'
                      : 'text-[#43526E] hover:text-[#13223D] hover:bg-white/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      isSelected ? 'text-[#FB923C]' : 'text-[#73839E]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2-Zone Learning Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Stage: Interactive 3D Flashcard */}
          <div className="lg:col-span-8">
            <FlashcardStage
              currentTerm={currentTerm}
              currentIndex={resolvedCurrentIndex}
              totalCount={activeDeck.length}
              isFlipped={isFlipped}
              statusMap={statusMap}
              onFlip={handleFlip}
              onMarkKnown={handleMarkKnown}
              onMarkUnknown={handleMarkUnknown}
              onPrev={handlePrev}
              onNext={handleNext}
              onShuffle={handleShuffle}
              onResetFilterToAll={() => {
                setStudyFilter('all');
                setIsFlipped(false);
              }}
              onResetProgress={handleResetProgress}
              reviewOnlyUnknown={studyFilter === 'unknown'}
              unknownCountInDept={deptStats.unknown}
              totalUnknownCount={globalStats.unknown}
              onToggleReviewUnknown={() => {
                if (studyFilter === 'unknown') {
                  setStudyFilter('all');
                } else {
                  if (deptStats.unknown === 0 && globalStats.unknown > 0) {
                    setSelectedDept('all');
                  }
                  setStudyFilter('unknown');
                }
                setIsFlipped(false);
              }}
              onReviewAllDeptsUnknown={() => {
                setSelectedDept('all');
                setStudyFilter('unknown');
                setIsFlipped(false);
              }}
            />
          </div>

          {/* Right Panel: Study Filter & Department Progress */}
          <aside
            id="department-progress"
            className="lg:col-span-4 bg-white border border-[#E2E6EE] rounded-2xl p-6 flex flex-col gap-6"
          >
            {/* Overall Mastery Bar */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-base font-bold text-[#111D35]">전체 학습 달성률</h2>
                <span className="font-mono text-lg font-bold text-[#13223D] tabular-nums">
                  {globalStats.percent}%
                </span>
              </div>
              <div className="h-2.5 w-full bg-[#EAEFF6] rounded-full overflow-hidden flex">
                <div
                  className="bg-[#13223D] h-full transition-all duration-300"
                  style={{
                    width: `${(globalStats.known / globalStats.total) * 100}%`,
                  }}
                />
                <div
                  className="bg-[#EA580C] h-full transition-all duration-300"
                  style={{
                    width: `${(globalStats.unknown / globalStats.total) * 100}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#52607A] mt-2.5 tabular-nums">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#13223D]">
                  <Check className="w-3.5 h-3.5 text-[#13223D]" />
                  알아요 {globalStats.known}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-[#EA580C]">
                  <RotateCcw className="w-3.5 h-3.5 text-[#EA580C]" />
                  모르겠어요 {globalStats.unknown}
                </span>
                <span>미학습 {globalStats.unseen}</span>
              </div>
            </div>

            {/* Study Mode Selector */}
            <div className="pt-5 border-t border-[#EDF0F5]">
              <h3 className="text-sm font-bold text-[#111D35] mb-3">학습 필터</h3>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F1F4F9] rounded-xl">
                {(
                  [
                    { id: 'all', label: '전체' },
                    { id: 'unknown', label: '모르겠어요' },
                    { id: 'unseen', label: '미학습' },
                  ] as const
                ).map((mode) => {
                  const active = studyFilter === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => {
                        setStudyFilter(mode.id);
                        setIsFlipped(false);
                      }}
                      className={`py-2 px-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        active
                          ? 'bg-white text-[#13223D] shadow-sm'
                          : 'text-[#52607A] hover:text-[#13223D]'
                      }`}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subject Mastery Breakdown */}
            <div className="pt-5 border-t border-[#EDF0F5]">
              <h3 className="text-sm font-bold text-[#111D35] mb-3.5">학과 영역별 숙달도</h3>
              <div className="flex flex-col gap-3.5">
                {subjectBreakdown.map((sub) => {
                  const isCurrent = selectedDept === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleSelectDepartment(sub.id)}
                      className={`text-left rounded-xl p-3 border transition-colors ${
                        isCurrent
                          ? 'border-[#13223D] bg-[#F8FAFC]'
                          : 'border-[#EDF0F5] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-[#13223D]">{sub.label}</span>
                        <span className="font-mono text-[#52607A] tabular-nums">
                          {sub.knownCount}/{sub.total} 완료
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EAEFF6] rounded-full overflow-hidden flex">
                        <div
                          className="bg-[#13223D] h-full transition-all duration-300"
                          style={{ width: `${(sub.knownCount / sub.total) * 100}%` }}
                        />
                        <div
                          className="bg-[#EA580C] h-full transition-all duration-300"
                          style={{ width: `${(sub.unknownCount / sub.total) * 100}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Progress */}
            <div className="pt-5 border-t border-[#EDF0F5]">
              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#DCE1EB] text-xs font-semibold text-[#52607A] hover:text-[#13223D] hover:border-[#13223D]/40 transition-colors"
                >
                  학습 기록 초기화
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-[#C2410C] font-medium text-center">
                    모든 알아요·모르겠어요 기록을 지울까요?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setConfirmReset(false)}
                      className="py-2 rounded-lg border border-[#DCE1EB] text-xs font-semibold text-[#52607A] hover:bg-[#F6F7FA]"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={handleResetProgress}
                      className="py-2 rounded-lg bg-[#EA580C] text-white text-xs font-semibold hover:bg-[#C2410C]"
                    >
                      초기화 확인
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Full Term Index */}
        <TermIndex
          terms={deptTerms}
          statusMap={statusMap}
          activeTermId={currentTerm?.id ?? null}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectTerm={handleSelectTermFromIndex}
        />
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-[#E2E6EE] bg-white mt-12">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <span>제과제빵과 2학년 전공 용어 플래시카드</span>
          <span>학습 기록은 현재 브라우저에만 저장됩니다</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
