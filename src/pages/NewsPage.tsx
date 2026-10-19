import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { NewsItem } from '../types';
import { ShareButtons } from '../components/ShareButtons';
import {
  FileText,
  Calendar,
  Search,
  Filter,
  ArrowRight,
  ChevronLeft,
  Printer,
  Sparkles,
} from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { news, selectedNewsId, setSelectedNewsId } = useData();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'Latest News', label: '01. Latest News' },
    { id: 'Announcements', label: '02. Announcements' },
    { id: 'Public Statements', label: '03. Public Statements' },
    { id: 'Speeches and Interviews', label: '04. Speeches & Interviews' },
    { id: 'Archive', label: '06. Archive' },
  ];

  const filteredNews = news.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.county && item.county.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeArticle = selectedNewsId ? news.find((n) => n.id === selectedNewsId) : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* If viewing a single article */}
      {activeArticle ? (
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <button
            onClick={() => setSelectedNewsId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#666666] hover:text-[#111111] bg-[#f0f0f0] hover:bg-[#dddddd] px-3 py-1.5 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All News</span>
          </button>

          <article className="bg-white rounded-2xl border border-[#dddddd] p-4 sm:p-10 shadow-xs space-y-5 sm:space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#664400] bg-[#FFF9C4] px-2.5 py-0.5 rounded">
                  {activeArticle.category}
                </span>
                {activeArticle.county && (
                  <span className="font-semibold text-[#666666] bg-[#f0f0f0] px-2.5 py-0.5 rounded">
                    {activeArticle.county}
                  </span>
                )}
                <span className="text-[#999999]">·</span>
                <time className="text-[#888888] font-medium">{activeArticle.date}</time>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#111111] leading-tight">
                {activeArticle.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#f0f0f0]">
                <p className="text-xs text-[#888888]">
                  Published by: <strong className="text-[#222222]">{activeArticle.author}</strong>
                </p>

                <div className="flex items-center gap-4">
                  {/* WhatsApp & Social Share */}
                  <ShareButtons title={activeArticle.title} text={activeArticle.summary} />
                  <button
                    onClick={handlePrint}
                    className="p-1.5 text-[#888888] hover:text-[#111111] rounded hover:bg-[#f0f0f0]"
                    title="Print Statement"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#f0f0f0]">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Excerpt Lead */}
            <div className="p-4 bg-[#FFFDE7]/50 rounded-xl border border-[#FFF176]/60 font-medium text-sm text-[#222222] leading-relaxed italic">
              {activeArticle.summary}
            </div>

            {/* Article Content */}
            <div className="text-sm text-[#444444] leading-relaxed space-y-4 whitespace-pre-line">
              {activeArticle.content}
            </div>

            {/* Article Footer */}
            <div className="pt-6 border-t border-[#dddddd] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[#888888]">
                Official statement of the Jonglei Independent Political Alliance (JIPA).
              </p>
              <ShareButtons title={activeArticle.title} text={activeArticle.summary} />
            </div>
          </article>
        </div>
      ) : (
        /* News List View */
        <>
          {/* Header */}
          <div className="border-b border-[#dddddd] pb-6">
            <span className="text-xs font-black tracking-widest text-[#CC9900] uppercase">
              Sitemap Section 12
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#111111] mt-1">
              News, Announcements & Public Statements
            </h1>
            <p className="text-sm text-[#666666] mt-1">
              Official communiqués, press releases, assembly speeches, and county notices.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white rounded-2xl border border-[#dddddd] p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap w-full md:w-auto pb-1 md:pb-0">
              <Filter className="w-4 h-4 text-[#999999] shrink-0 hidden sm:block" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === cat.id
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#bbbbbb] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
            </div>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedNewsId(item.id)}
                className="bg-white rounded-2xl border border-[#dddddd] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#f0f0f0] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#0a0a0a]/80 backdrop-blur-sm text-[#FFD700] text-[10px] font-black uppercase px-2.5 py-1 rounded">
                      {item.category}
                    </span>
                    {item.county && (
                      <span className="absolute bottom-2 left-2 bg-[#111111]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {item.county}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <time className="text-[11px] font-bold text-[#999999] block">
                      {item.date}
                    </time>
                    <h2 className="font-extrabold text-base text-[#111111] leading-snug group-hover:text-[#CC9900] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#f5f5f5] border-t border-[#f0f0f0] flex items-center justify-between text-xs font-bold text-[#222222] group-hover:text-[#CC9900]">
                  <span>Read Full Statement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
