import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { DocumentItem } from '../types';
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Eye,
} from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { documents, showNotification } = useData();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Documents' },
    { id: 'Guiding Principles', label: '01. Guiding Principles' },
    { id: 'Operating Guidelines', label: '02. Operating Guidelines' },
    { id: 'PAC Documents', label: '03. PAC Documents' },
    { id: 'Candidate Guidelines', label: '04. Candidate Guidelines' },
    { id: 'Gubernatorial Manifesto', label: '05. Manifesto' },
    { id: 'Election Documents', label: '06. Election Documents' },
    { id: 'Public Statements', label: '07. Public Statements' },
    { id: 'Meeting Records', label: '08. Meeting Records' },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc: DocumentItem) => {
    showNotification(`Downloading "${doc.title}" (${doc.fileSize})...`);
    // Create text file blob to simulate real document download
    const content = `JONGLEI INDEPENDENT POLITICAL ALLIANCE (JIPA)\nPOWER TO THE PEOPLE\n\nDocument: ${doc.title}\nCategory: ${doc.category}\nDate: ${doc.date}\n\nSummary:\n${doc.description}\n\nOfficial Certified Copy - www.jipasouthsudan.org\ninfo@jipasouthsudan.org`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
            Sitemap Section 14
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
            Official Documents
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Download certified copies of Guiding Principles, Operating Guidelines, PAC charters, and manifestos.
          </p>
        </div>

        <span className="text-xs font-bold text-[#444444] bg-[#f0f0f0] px-3 py-1.5 rounded-lg border border-[#dddddd] self-start md:self-auto">
          Public Transparency Archive
        </span>
      </div>

      {/* Filter and Search */}
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
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#bbbbbb] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm hover:border-[#FFD700] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-[#664400] bg-[#FFF9C4] px-2.5 py-0.5 rounded">
                  {doc.category}
                </span>
                <span className="text-xs text-[#999999] font-medium">
                  {doc.date} · {doc.fileSize}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-[#111111] leading-snug">
                {doc.title}
              </h3>

              <p className="text-xs text-[#666666] leading-relaxed">
                {doc.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
              <button
                onClick={() => setPreviewDoc(doc)}
                className="text-xs font-bold text-[#666666] hover:text-[#111111] flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Read Overview</span>
              </button>

              <button
                onClick={() => handleDownload(doc)}
                className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl text-[#111111] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#dddddd]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase text-[#996600]">
                  {previewDoc.category}
                </span>
                <h3 className="font-black text-base leading-tight">
                  {previewDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-[#999999] hover:text-[#222222]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#444444] leading-relaxed">
              {previewDoc.description}
            </p>

            <div className="p-3 bg-[#f5f5f5] rounded-xl text-xs space-y-1 text-[#666666] border border-[#dddddd]">
              <p>Certified by: <strong>JIPA PAC Secretariat</strong></p>
              <p>Publication Date: <strong>{previewDoc.date}</strong></p>
              <p>Standard Format: <strong>PDF / Text (Official Register)</strong></p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 border rounded-lg text-xs font-bold text-[#666666]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="px-5 py-2 bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] text-xs font-black rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
