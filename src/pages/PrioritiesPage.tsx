import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Flame,
  ShieldCheck,
  Building2,
  Users,
  Search,
  CheckCircle2,
  Filter,
  ArrowRight,
} from 'lucide-react';

export const PrioritiesPage: React.FC = () => {
  const { priorities, navigateTo } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedPriority, setExpandedPriority] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All 20 Priorities' },
    { id: 'Peace & Security', label: 'Peace & Security' },
    { id: 'Infrastructure & Transport', label: 'Infrastructure & Transport' },
    { id: 'Social Services', label: 'Healthcare & Schools' },
    { id: 'Economic Development', label: 'Agriculture & Economy' },
    { id: 'Environment & Governance', label: 'Floods & Governance' },
  ];

  const filtered = priorities.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fullDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.number.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
            Sitemap Section 09
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
            Our 20 Strategic Priorities
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            The community mandate adopted across all nine counties of Jonglei State.
          </p>
        </div>

        <button
          onClick={() => navigateTo('join')}
          className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black px-5 py-2.5 rounded-xl shadow-sm text-xs self-start md:self-auto"
        >
          Support Our Agenda →
        </button>
      </div>

      {/* Top Banner on Child Recovery and Peace */}
      <div className="bg-gradient-to-r from-[#E6C200] via-yellow-500 to-[#CC9900] rounded-2xl p-6 sm:p-8 text-[#0a0a0a] shadow-md">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-black tracking-wider uppercase bg-[#0a0a0a] text-[#FFE44D] px-2.5 py-1 rounded inline-block">
            Priority Non-Negotiable
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            The Immediate Recovery of All Abducted Children
          </h2>
          <p className="text-xs sm:text-sm font-medium text-[#111111] leading-relaxed">
            JIPA holds that no genuine development or political progress can happen in Jonglei State while mothers are separated from stolen children. We commit state resources, traditional arbitration, and judicial enforcement to return every child home.
          </p>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-white rounded-2xl border border-[#dddddd] p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap w-full md:w-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-[#999999] shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-[#f0f0f0] text-[#666666] hover:bg-[#dddddd] active:bg-[#bbbbbb]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#999999] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search priorities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#bbbbbb] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
        </div>
      </div>

      {/* 20 Priorities List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedPriority === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm hover:border-[#FFD700] transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 text-[#CC9900] font-black text-lg flex items-center justify-center shrink-0">
                    {item.number}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#664400] bg-[#FFF9C4] px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      {item.keyCounties && item.keyCounties.length > 0 && (
                        <span className="text-[10px] text-[#888888] font-semibold">
                          Key Counties: {item.keyCounties.join(', ')}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-[#111111]">
                      {item.number}. {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed max-w-4xl">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedPriority(isExpanded ? null : item.id)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#dddddd] text-xs font-bold text-[#444444] hover:bg-[#f5f5f5] transition-colors self-start sm:self-auto shrink-0"
                >
                  {isExpanded ? 'Hide Details' : 'Full Policy Plan'}
                </button>
              </div>

              {/* Expanded Action Plan */}
              {isExpanded && (
                <div className="pt-4 border-t border-[#f0f0f0] space-y-4 animate-in fade-in duration-200">
                  <div className="bg-[#f5f5f5] p-4 rounded-xl border border-[#dddddd]/80 text-xs text-[#444444] space-y-2">
                    <h4 className="font-bold text-[#111111]">Comprehensive Policy Roadmap:</h4>
                    <p className="leading-relaxed">{item.fullDescription}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#111111] mb-2 uppercase tracking-wider">
                      Concrete Legislative & Community Actions:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                      {item.actionPoints.map((pt, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#FFFDE7]/50 rounded-lg border border-[#FFF176]/60 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#CC9900] shrink-0 mt-0.5" />
                          <span className="text-[#222222]">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
