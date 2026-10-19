import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Vote,
  Calendar,
  FileText,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Scale,
  Send,
} from 'lucide-react';

export const ElectionsPage: React.FC = () => {
  const { counties, showNotification } = useData();

  const [complaintForm, setComplaintForm] = useState({
    county: 'Bor County',
    payam: '',
    incident: '',
    contact: '',
  });

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Electoral complaint logged with JIPA Legal & Observation Desk.');
    setComplaintForm({ county: 'Bor County', payam: '', incident: '', contact: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6">
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
          Sitemap Section 07
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
          Elections & Voter Rights
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] mt-1">
          Everything voters and candidates need to know about South Sudan electoral laws, polling stations, observation, and complaints.
        </p>
      </div>

      {/* Grid of 4 Core Electoral Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#dddddd] shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFF9C4] text-[#664400] flex items-center justify-center font-bold">
            <Vote className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-[#111111]">01. Election Info</h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            Guidance on sovereign voting, ballot secrecy, and independent candidate ballot marks.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#dddddd] shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] text-[#222222] flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-[#111111]">02. Electoral Laws</h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            South Sudan National Elections Act safeguards for independent candidates and civic campaigns.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#dddddd] shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFF9C4] text-[#664400] flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-[#111111]">03. Voter Registration</h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            Eligibility requirements: age 18+, proof of citizenship or traditional chief voucher.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#dddddd] shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] text-[#222222] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-[#111111]">07. Observation</h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            Deployment of non-partisan JIPA poll watchers across all 9 county voting centers.
          </p>
        </div>
      </div>

      {/* 05. Election Dates & Roadmap */}
      <div className="bg-[#111111] text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-xl font-black text-[#FFD700]">
            05. Electoral Calendar & Milestones
          </h2>
          <span className="text-xs text-[#999999]">Official Timeline Tracker</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-[#222222] rounded-xl border border-[#444444] space-y-1">
            <span className="text-[#FFD700] font-bold block">Phase 1: Registration</span>
            <p className="font-extrabold text-white text-sm">Voter Roll Compilation</p>
            <p className="text-[#bbbbbb]">County polling stations compile and verify eligible voter rolls.</p>
          </div>

          <div className="p-4 bg-[#222222] rounded-xl border border-[#444444] space-y-1">
            <span className="text-[#FFD700] font-bold block">Phase 2: Nominations</span>
            <p className="font-extrabold text-white text-sm">Candidate Gazette</p>
            <p className="text-[#bbbbbb]">Independent candidate petitions deposited with Electoral Commission.</p>
          </div>

          <div className="p-4 bg-[#222222] rounded-xl border border-[#444444] space-y-1">
            <span className="text-[#FFD700] font-bold block">Phase 3: Campaigns</span>
            <p className="font-extrabold text-white text-sm">Civic Town Halls</p>
            <p className="text-[#bbbbbb]">Peaceful debate, manifesto distribution, and voter education rallies.</p>
          </div>

          <div className="p-4 bg-[#222222] rounded-xl border border-[#FFD700]/50 space-y-1">
            <span className="text-[#FFD700] font-bold block">Phase 4: Balloting</span>
            <p className="font-extrabold text-[#FFE44D] text-sm">Polling Day & Tally</p>
            <p className="text-[#bbbbbb]">Secret ballot voting monitored by JIPA community observers.</p>
          </div>
        </div>
      </div>

      {/* Two Column: 06 Polling Centers + 08 Electoral Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Polling Center Information (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#dddddd] p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-[#111111] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#E6C200]" />
            <span>06. Polling Centers & Voter Security in the 9 Counties</span>
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            JIPA advocates for the creation of safe, accessible polling centers within walking distance of villages and cattle camps, eliminating treacherous treks through flood waters:
          </p>

          <div className="space-y-2.5 text-xs text-[#444444] pt-2">
            <div className="p-3 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
              <strong className="text-[#111111]">Right to Vote Without Coercion:</strong> No armed commander, chief, or official may tell you which box to mark. Your vote is secret.
            </div>
            <div className="p-3 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
              <strong className="text-[#111111]">Voter ID Requirements:</strong> National ID, passport, refugee registration, or certification by traditional Payam head chief.
            </div>
            <div className="p-3 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
              <strong className="text-[#111111]">Special Assistance:</strong> Elderly, pregnant women, and disabled voters must receive priority queueing at every polling station.
            </div>
          </div>
        </div>

        {/* 08. Electoral Complaints Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#f5f5f5] rounded-2xl border border-[#dddddd] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#111111]">
            <AlertCircle className="w-5 h-5 text-[#CC9900]" />
            <h2 className="text-lg font-black">08. Report Electoral Irregularity</h2>
          </div>
          <p className="text-xs text-[#666666] leading-relaxed">
            Report voter intimidation, ballot tampering, or campaign interference to the JIPA Electoral Legal Desk.
          </p>

          <form onSubmit={handleComplaintSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#444444] mb-1">County *</label>
              <select
                value={complaintForm.county}
                onChange={(e) => setComplaintForm({ ...complaintForm, county: e.target.value })}
                className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
              >
                {counties.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">Payam / Polling Station</label>
              <input
                type="text"
                placeholder="e.g., Baidit Primary Polling Station"
                value={complaintForm.payam}
                onChange={(e) => setComplaintForm({ ...complaintForm, payam: e.target.value })}
                className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">Details of Irregularity *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe what occurred, names of officials involved, time and date..."
                value={complaintForm.incident}
                onChange={(e) => setComplaintForm({ ...complaintForm, incident: e.target.value })}
                className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">Your Phone / Contact (Optional)</label>
              <input
                type="text"
                placeholder="Leave blank to report anonymously"
                value={complaintForm.contact}
                onChange={(e) => setComplaintForm({ ...complaintForm, contact: e.target.value })}
                className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#111111] hover:bg-[#222222] text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Legal Desk</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
