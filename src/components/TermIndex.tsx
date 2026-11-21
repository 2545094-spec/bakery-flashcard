import { Check, Circle, RotateCcw, Search } from 'lucide-react';
import { BakingTerm, MasteryStatus } from '../data/bakingTerms';

interface TermIndexProps {
  terms: BakingTerm[];
  statusMap: Record<string, MasteryStatus>;
  activeTermId: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectTerm: (termId: string) => void;
}

export function TermIndex({
  terms,
  statusMap,
  activeTermId,
  searchQuery,
  onSearchChange,
  onSelectTerm,
}: TermIndexProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = terms.filter((t) => {
    if (!normalizedQuery) return true;
    return (
      t.termKo.toLowerCase().includes(normalizedQuery) ||
      t.termOrigin.toLowerCase().includes(normalizedQuery) ||
      t.definition.toLowerCase().includes(normalizedQuery) ||
      t.departmentLabel.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <section aria-labelledby="term-index-heading" className="pt-8 border-t border-[#E2E6EE]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 id="term-index-heading" className="text-xl font-bold text-[#111D35] tracking-tight">
            전공 용어 전체 색인
          </h2>
          <p className="text-sm text-[#52607A] mt-1">
            항목을 선택하면 상단 플래시카드에서 바로 해당 용어를 학습할 수 있습니다.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="용어명, 원어, 설명 검색"
            aria-label="전공 용어 검색"
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#DCE1EB] rounded-xl text-sm text-[#111D35] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#13223D] focus:ring-2 focus:ring-[#13223D]/10 transition-colors"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E2E6EE] rounded-2xl p-8 text-center text-sm text-[#52607A]">
          검색어와 일치하는 전공 용어가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((term) => {
            const status = statusMap[term.id] ?? 'unseen';
            const isActive = term.id === activeTermId;

            return (
              <button
                key={term.id}
                type="button"
                onClick={() => onSelectTerm(term.id)}
                className={`text-left p-5 rounded-xl border transition-colors flex flex-col justify-between gap-3 ${
                  isActive
                    ? 'bg-[#13223D] text-white border-[#13223D]'
                    : 'bg-white text-[#111D35] border-[#E2E6EE] hover:border-[#13223D]/40'
                }`}
              >
                <div>
                  <div
                    className={`flex items-center justify-between gap-2 text-xs mb-2 ${
                      isActive ? 'text-[#B7C4DC]' : 'text-[#64748B]'
                    }`}
                  >
                    <span className="truncate">{term.departmentLabel}</span>
                    <span
                      className={`inline-flex items-center gap-1 font-semibold whitespace-nowrap shrink-0 ${
                        status === 'known'
                          ? isActive
                            ? 'text-[#93C5FD]'
                            : 'text-[#13223D]'
                          : status === 'unknown'
                            ? isActive
                              ? 'text-[#FB923C]'
                              : 'text-[#EA580C]'
                            : isActive
                              ? 'text-[#94A3B8]'
                              : 'text-[#94A3B8]'
                      }`}
                    >
                      {status === 'known' && <Check className="w-3.5 h-3.5" />}
                      {status === 'unknown' && <RotateCcw className="w-3.5 h-3.5" />}
                      {status === 'unseen' && <Circle className="w-3 h-3" />}
                      <span>
                        {status === 'known'
                          ? '알아요'
                          : status === 'unknown'
                            ? '모르겠어요'
                            : '미학습'}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold tracking-tight">{term.termKo}</h3>
                  <p
                    className={`text-xs font-medium mt-0.5 ${
                      isActive ? 'text-[#FB923C]' : 'text-[#EA580C]'
                    }`}
                  >
                    {term.termOrigin}
                  </p>
                </div>

                <p
                  className={`text-xs leading-relaxed line-clamp-2 ${
                    isActive ? 'text-[#DCE4F2]' : 'text-[#52607A]'
                  }`}
                >
                  {term.definition}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
