import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Search, X, Building2, Flame, FileText, Calendar, Vote, ArrowRight } from 'lucide-react';
import { NavigationPage } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, counties, priorities, news, meetings, candidates, documents } = useData();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const list: {
      id: string;
      title: string;
      subtitle: string;
      category: string;
      page: NavigationPage;
      extraParam?: string;
      icon: any;
    }[] = [];

    // Counties
    counties.forEach((c) => {
      if (
        c.name.toLowerCase().includes(q) ||
        c.headquarters.toLowerCase().includes(q) ||
        c.payams.some((p) => p.toLowerCase().includes(q)) ||
        c.description.toLowerCase().includes(q)
      ) {
        list.push({
          id: `county-${c.id}`,
          title: c.name,
          subtitle: `HQ: ${c.headquarters} | Payams: ${c.payams.slice(0, 3).join(', ')}...`,
          category: 'County',
          page: 'counties',
          extraParam: c.id,
          icon: Building2,
        });
      }
    });

    // Priorities
    priorities.forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.fullDescription.toLowerCase().includes(q)
      ) {
        list.push({
          id: `priority-${p.id}`,
          title: `${p.number}. ${p.title}`,
          subtitle: p.summary,
          category: 'Priority',
          page: 'priorities',
          icon: Flame,
        });
      }
    });

    // News
    news.forEach((n) => {
      if (
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
      ) {
        list.push({
          id: `news-${n.id}`,
          title: n.title,
          subtitle: `${n.date} · ${n.category}`,
          category: 'News',
          page: 'news',
          extraParam: n.id,
          icon: FileText,
        });
      }
    });

    // Candidates
    candidates.forEach((cand) => {
      if (
        cand.name.toLowerCase().includes(q) ||
        cand.office.toLowerCase().includes(q) ||
        cand.county.toLowerCase().includes(q)
      ) {
        list.push({
          id: `cand-${cand.id}`,
          title: cand.name,
          subtitle: `${cand.office} (${cand.county})`,
          category: 'Candidate',
          page: 'candidates',
          icon: Vote,
        });
      }
    });

    // Meetings
    meetings.forEach((m) => {
      if (
        m.title.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.county.toLowerCase().includes(q)
      ) {
        list.push({
          id: `meet-${m.id}`,
          title: m.title,
          subtitle: `${m.date} · ${m.county}`,
          category: 'Meeting',
          page: 'meetings',
          icon: Calendar,
        });
      }
    });

    // Documents
    documents.forEach((d) => {
      if (d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) {
        list.push({
          id: `doc-${d.id}`,
          title: d.title,
          subtitle: `${d.category} · ${d.date}`,
          category: 'Document',
          page: 'documents',
          icon: FileText,
        });
      }
    });

    return list.slice(0, 15);
  }, [query, counties, priorities, news, meetings, candidates, documents]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-20 px-3 sm:px-4 bg-[#0a0a0a]/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#dddddd] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#dddddd] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#999999] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 9 counties, priorities, candidates, meetings, documents..."
            className="flex-1 text-sm font-medium focus:outline-none text-[#111111] placeholder:text-[#999999]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#999999] hover:text-[#666666] text-xs font-semibold px-2 py-1 bg-[#f0f0f0] rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#999999] hover:text-[#222222] rounded-lg hover:bg-[#f0f0f0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto flex-1 divide-y divide-[#f0f0f0]">
          {!query && (
            <div className="p-8 text-center text-[#999999] text-xs space-y-2">
              <p className="font-semibold text-[#666666]">Quick suggestions:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Child Recovery', 'Bor County', 'Twic East Dike', 'Akobo Border', 'PAC Members', 'Manifesto'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 bg-[#f0f0f0] hover:bg-[#FFF9C4] hover:text-[#332200] rounded-full text-[#666666] transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="p-8 text-center text-[#888888] text-sm">
              No matching records found for "{query}". Try searching by County name, Payam, or priority keyword.
            </div>
          )}

          {results.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  navigateTo(item.page, item.extraParam);
                  setIsSearchOpen(false);
                }}
                className="p-3 hover:bg-[#FFFDE7]/70 rounded-xl cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#f0f0f0] group-hover:bg-[#FFF9C4] rounded-lg text-[#666666] group-hover:text-[#664400] transition-colors shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#111111] group-hover:text-[#332200]">
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f0f0f0] text-[#666666] group-hover:bg-[#FFF176] group-hover:text-[#111111]">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#888888] line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#999999] group-hover:text-[#CC9900] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f5f5f5] border-t border-[#dddddd] text-right text-[11px] text-[#888888]">
          Press ESC to close
        </div>
      </div>
    </div>
  );
};
