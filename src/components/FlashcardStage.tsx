import { Check, ChevronLeft, ChevronRight, RotateCcw, Shuffle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BakingTerm, MasteryStatus } from '../data/bakingTerms';

interface FlashcardStageProps {
  currentTerm: BakingTerm | null;
  currentIndex: number;
  totalCount: number;
  isFlipped: boolean;
  statusMap: Record<string, MasteryStatus>;
  onFlip: () => void;
  onMarkKnown: () => void;
  onMarkUnknown: () => void;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onResetFilterToAll: () => void;
  onResetProgress: () => void;
  reviewOnlyUnknown: boolean;
  unknownCountInDept: number;
  totalUnknownCount: number;
  onToggleReviewUnknown: () => void;
  onReviewAllDeptsUnknown: () => void;
}

export function FlashcardStage({
  currentTerm,
  currentIndex,
  totalCount,
  isFlipped,
  statusMap,
  onFlip,
  onMarkKnown,
  onMarkUnknown,
  onPrev,
  onNext,
  onShuffle,
  onResetFilterToAll,
  onResetProgress,
  reviewOnlyUnknown,
  unknownCountInDept,
  totalUnknownCount,
  onToggleReviewUnknown,
  onReviewAllDeptsUnknown,
}: FlashcardStageProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!currentTerm) {
    return (
      <div className="bg-white border border-[#E2E6EE] rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[440px]">
        <div className="w-12 h-12 rounded-xl bg-[#13223D] text-white flex items-center justify-center mb-5">
          <Check className="w-6 h-6" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#111D35] mb-2">
          {reviewOnlyUnknown
            ? totalUnknownCount > 0
              ? '현재 학과에는 모르는 카드가 없습니다'
              : '모르는 카드가 아직 없습니다'
            : '표시할 플래시카드가 없습니다'}
        </h2>
        <p className="text-sm md:text-base text-[#52607A] max-w-md mb-8 leading-relaxed">
          {reviewOnlyUnknown
            ? totalUnknownCount > 0
              ? `다른 학과에 복습이 필요한 카드가 ${totalUnknownCount}개 있습니다. 전체 학과의 모르는 카드를 모아 보거나 전체 카드로 돌아갈 수 있습니다.`
              : '학습 중 "모르겠어요"로 표시한 카드만 이곳에 모아 반복 복습할 수 있습니다.'
            : '다른 학과 탭을 선택하거나 학습 상태를 초기화해 주세요.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {reviewOnlyUnknown && totalUnknownCount > 0 && (
            <button
              type="button"
              onClick={onReviewAllDeptsUnknown}
              className="px-5 py-2.5 rounded-lg bg-[#EA580C] text-white text-sm font-semibold hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0"
            >
              전체 학과 모르는 카드 보기 ({totalUnknownCount})
            </button>
          )}
          {reviewOnlyUnknown && (
            <button
              type="button"
              onClick={onResetFilterToAll}
              className="px-5 py-2.5 rounded-lg bg-[#13223D] text-white text-sm font-semibold hover:bg-[#1C3157] transition-colors whitespace-nowrap shrink-0"
            >
              전체 카드 보기
            </button>
          )}
          <button
            type="button"
            onClick={onResetProgress}
            className="px-5 py-2.5 rounded-lg border border-[#D4DBE7] bg-white text-[#13223D] text-sm font-semibold hover:bg-[#F6F7FA] transition-colors whitespace-nowrap shrink-0"
          >
            학습 기록 초기화
          </button>
        </div>
      </div>
    );
  }

  const currentStatus: MasteryStatus = statusMap[currentTerm.id] ?? 'unseen';

  const statusText =
    currentStatus === 'known'
      ? '알아요 완료'
      : currentStatus === 'unknown'
        ? '모르겠어요 · 복습 필요'
        : '미학습 카드';

  return (
    <div className="flex flex-col gap-5">
      {/* Top Deck Bar */}
      <div className="flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2.5 text-sm text-[#52607A] min-w-0">
          <span className="font-mono font-semibold tabular-nums text-[#13223D]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
          </span>
          <span aria-hidden="true">·</span>
          <span className="truncate font-medium text-[#374663]">{currentTerm.departmentLabel}</span>
          <span aria-hidden="true">·</span>
          <span
            className={`font-medium whitespace-nowrap shrink-0 ${
              currentStatus === 'known'
                ? 'text-[#13223D]'
                : currentStatus === 'unknown'
                  ? 'text-[#EA580C]'
                  : 'text-[#64748B]'
            }`}
          >
            {statusText}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleReviewUnknown}
            disabled={!reviewOnlyUnknown && unknownCountInDept === 0 && totalUnknownCount === 0}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 disabled:opacity-45 disabled:cursor-not-allowed ${
              reviewOnlyUnknown
                ? 'bg-[#EA580C] text-white hover:bg-[#C2410C]'
                : 'border border-[#FDBA74] bg-[#FFF3EC] text-[#C2410C] hover:bg-[#EA580C] hover:text-white hover:border-[#EA580C]'
            }`}
            title="모르겠어요로 표시한 카드만 모아서 다시 학습"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>
              {reviewOnlyUnknown
                ? '전체 카드 다시 보기'
                : `모르는 카드만 다시 보기 (${unknownCountInDept > 0 ? unknownCountInDept : totalUnknownCount})`}
            </span>
          </button>

          <button
            type="button"
            onClick={onShuffle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE1EB] bg-white text-xs font-semibold text-[#13223D] hover:border-[#13223D]/40 hover:bg-[#F6F7FA] transition-colors whitespace-nowrap shrink-0"
            title="현재 학과 카드 순서 섞기"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>카드 섞기</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card Stage */}
      <div className="w-full" style={{ perspective: '950px' }}>
        <motion.div
          key={currentTerm.id}
          role="button"
          tabIndex={0}
          onClick={onFlip}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onFlip();
            }
          }}
          aria-pressed={isFlipped}
          aria-label={`${currentTerm.termKo} 카드 ${isFlipped ? '앞면 보기' : '정답 및 해설 보기'}`}
          initial={false}
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          whileHover={shouldReduceMotion ? undefined : { y: -3 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.01 }
              : {
                  type: 'spring',
                  stiffness: 210,
                  damping: 22,
                  mass: 0.85,
                }
          }
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full min-h-[380px] md:min-h-[410px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2 rounded-2xl select-none"
        >
          {/* Front Face (Clean Warm-White & Navy) */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg) translateZ(1px)',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 bg-white border border-[#DCE1EB] rounded-2xl p-7 md:p-10 flex flex-col justify-between shadow-[0_14px_34px_rgba(19,34,61,0.08)]"
          >
            <div className="flex items-center justify-between gap-4 text-xs text-[#52607A]">
              <div className="flex items-center gap-2 truncate">
                <span className="font-semibold text-[#13223D]">{currentTerm.departmentLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{currentTerm.examFocus}</span>
              </div>
              <span className="font-medium text-[#EA580C] whitespace-nowrap shrink-0">
                앞면 · 용어 확인
              </span>
            </div>

            <div
              className="my-auto py-6 text-center flex flex-col items-center"
              style={{ transform: 'translateZ(24px)' }}
            >
              <p className="text-sm font-medium text-[#64748B] tracking-wide mb-3">
                {currentTerm.pronunciation}
              </p>
              <h2 className="text-3xl md:text-[2.65rem] font-extrabold text-[#111D35] tracking-tight leading-tight mb-3 text-balance">
                {currentTerm.termKo}
              </h2>
              <p className="text-lg md:text-xl font-semibold text-[#EA580C] tracking-tight">
                {currentTerm.termOrigin}
              </p>
            </div>

            <div className="pt-5 border-t border-[#EDF0F5] flex items-center justify-between text-xs text-[#64748B]">
              <span>카드를 클릭하거나 Space 키를 눌러 해설 확인</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#13223D]">
                카드 뒤집기
                <RotateCcw className="w-3.5 h-3.5 text-[#EA580C]" />
              </span>
            </div>
          </div>

          {/* Back Face (Deep Navy Structural Surface & Orange Key Highlights) */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 bg-[#13223D] text-white border border-[#1E3358] rounded-2xl p-7 md:p-10 flex flex-col justify-between shadow-[0_18px_40px_rgba(19,34,61,0.24)]"
          >
            <div className="flex items-center justify-between gap-4 text-xs text-[#B7C4DC]">
              <div className="flex items-center gap-2 truncate">
                <span className="font-semibold text-white">{currentTerm.termKo}</span>
                <span aria-hidden="true">·</span>
                <span>{currentTerm.termOrigin}</span>
              </div>
              <span className="font-medium text-[#FB923C] whitespace-nowrap shrink-0">
                뒷면 · 정의 및 핵심 수치
              </span>
            </div>

            <div
              className="my-auto py-4 flex flex-col gap-5"
              style={{ transform: 'translateZ(24px)' }}
            >
              <div>
                <p className="text-base md:text-lg text-[#F1F5F9] leading-relaxed font-normal">
                  {currentTerm.definition}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                <div className="bg-[#1B2F52] border border-[#2A426E] rounded-xl p-4">
                  <div className="text-xs font-semibold text-[#FB923C] mb-1.5">
                    핵심 기준 · 온도/비율
                  </div>
                  <div className="font-mono text-sm font-medium text-white tabular-nums leading-snug">
                    {currentTerm.keySpec}
                  </div>
                </div>

                <div className="bg-[#1B2F52] border border-[#2A426E] rounded-xl p-4">
                  <div className="text-xs font-semibold text-[#93C5FD] mb-1.5">
                    2학년 실기 · 시험 포인트
                  </div>
                  <div className="text-sm text-[#E2E8F0] leading-snug">
                    {currentTerm.practiceTip}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#243B63] flex items-center justify-between text-xs text-[#9FB0CE]">
              <span>다시 클릭하면 앞면으로 돌아갑니다</span>
              <span className="font-semibold text-[#FB923C]">아래 버튼으로 학습 상태 기록</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Assessment & Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Prev / Flip / Next */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={totalCount <= 1}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#DCE1EB] bg-white text-sm font-semibold text-[#13223D] hover:bg-[#F6F7FA] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
            aria-label="이전 카드"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전</span>
          </button>

          <button
            type="button"
            onClick={onFlip}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#DCE1EB] bg-white text-sm font-semibold text-[#13223D] hover:border-[#13223D]/40 hover:bg-[#F6F7FA] transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-[#EA580C]" />
            <span>{isFlipped ? '앞면 보기' : '뒤집기'}</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={totalCount <= 1}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#DCE1EB] bg-white text-sm font-semibold text-[#13223D] hover:bg-[#F6F7FA] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
            aria-label="다음 카드"
          >
            <span>다음</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Know / Don't Know Self-Assessment */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onMarkUnknown}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2 ${
              currentStatus === 'unknown'
                ? 'bg-[#EA580C] text-white shadow-sm'
                : 'bg-[#FFF3EC] text-[#C2410C] border border-[#FDBA74] hover:bg-[#EA580C] hover:text-white hover:border-[#EA580C]'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>모르겠어요</span>
          </button>

          <button
            type="button"
            onClick={onMarkKnown}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13223D] focus-visible:ring-offset-2 ${
              currentStatus === 'known'
                ? 'bg-[#13223D] text-white shadow-sm'
                : 'bg-[#13223D] text-white hover:bg-[#1E355E]'
            }`}
          >
            <Check className="w-4 h-4 text-[#FB923C]" />
            <span>알아요</span>
          </button>
        </div>
      </div>

      {/* Subtle Keyboard Shortcut Guide */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B] px-1">
        <span>단축키</span>
        <span aria-hidden="true">·</span>
        <span>Space: 카드 뒤집기</span>
        <span aria-hidden="true">·</span>
        <span>1 / ←: 모르겠어요</span>
        <span aria-hidden="true">·</span>
        <span>2 / →: 알아요</span>
      </div>
    </div>
  );
}
