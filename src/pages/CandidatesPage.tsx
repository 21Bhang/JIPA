import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CandidateItem } from '../types';
import {
  Vote,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Users,
  Search,
  Filter,
  PlusCircle,
  FileText,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

export const CandidatesPage: React.FC = () => {
  const { candidates, counties, addCandidate, showNotification } = useData();

  const [officeFilter, setOfficeFilter] = useState<string>('all');
  const [countyFilter, setCountyFilter] = useState<string>('all');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantOffice, setApplicantOffice] = useState<CandidateItem['office']>('State Parliamentary');
  const [applicantCounty, setApplicantCounty] = useState('Bor County');
  const [applicantPayam, setApplicantPayam] = useState('');
  const [applicantBio, setApplicantBio] = useState('');
  const [applicantCommitments, setApplicantCommitments] = useState('');
  const [pledgeAgreed, setPledgeAgreed] = useState(false);

  const filteredCandidates = candidates.filter((c) => {
    const matchesOffice = officeFilter === 'all' || c.office === officeFilter;
    const matchesCounty = countyFilter === 'all' || c.county === countyFilter;
    return matchesOffice && matchesCounty;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim()) {
      showNotification('Please provide your full legal name.');
      return;
    }
    if (!pledgeAgreed) {
      showNotification('You must accept the JIPA Candidate Integrity Pledge to apply.');
      return;
    }

    addCandidate({
      name: applicantName.trim(),
      office: applicantOffice,
      county: applicantCounty,
      payam: applicantPayam.trim() || undefined,
      bio: applicantBio.trim() || 'Candidate application under PAC vetting review.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      keyCommitments: applicantCommitments
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      status: 'Application Under Review',
    });

    setIsApplyModalOpen(false);
    setApplicantName('');
    setApplicantBio('');
    setApplicantCommitments('');
    setPledgeAgreed(false);
    showNotification('Candidate application submitted to PAC Vetting Committee.');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
            Sitemap Section 06
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
            Independent Candidates
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Vetting, selection, and profiles of independent candidates endorsed across all nine counties.
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black px-4 sm:px-5 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 text-xs transition-all self-stretch sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Apply to Become a Candidate</span>
        </button>
      </div>

      {/* 3 Steps to JIPA Candidate Endorsement */}
      <div className="bg-[#111111] text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-black text-[#FFD700]">
          Candidate Vetting & Selection Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-[#222222] rounded-xl border border-[#444444] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#FFD700] text-[#0a0a0a] font-black flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="font-extrabold text-white text-sm">Eligibility & Application</h3>
            <p className="text-[#bbbbbb] leading-relaxed">
              Open to all independent South Sudanese citizens in Jonglei State who are not beholden to armed party factions or corrupt patronage networks.
            </p>
          </div>

          <div className="p-4 bg-[#222222] rounded-xl border border-[#444444] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#FFD700] text-[#0a0a0a] font-black flex items-center justify-center text-xs">
              2
            </span>
            <h3 className="font-extrabold text-white text-sm">PAC Integrity Vetting</h3>
            <p className="text-[#bbbbbb] leading-relaxed">
              The 10-member Vetting Subcommittee reviews background, community standing, non-involvement in cattle rustling, and financial disclosures.
            </p>
          </div>

          <div className="p-4 bg-[#222222] rounded-xl border border-[#444444] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#FFD700] text-[#0a0a0a] font-black flex items-center justify-center text-xs">
              3
            </span>
            <h3 className="font-extrabold text-white text-sm">Pledge & Endorsement</h3>
            <p className="text-[#bbbbbb] leading-relaxed">
              Candidates publicly sign the JIPA Candidate Code of Conduct & Integrity Pledge and are presented to the 180-member PAC for endorsement.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-[#dddddd] p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-xs overflow-x-auto no-scrollbar scroll-smooth flex-nowrap pb-1 sm:pb-0">
          <span className="font-bold text-[#444444] flex items-center gap-1.5 shrink-0">
            <Filter className="w-4 h-4 text-[#999999]" />
            <span>Office:</span>
          </span>
          {[
            { id: 'all', label: 'All Offices' },
            { id: 'Jonglei Governor', label: 'Governor' },
            { id: 'National Parliamentary', label: 'National MP' },
            { id: 'State Parliamentary', label: 'State MP' },
            { id: 'County Commissioner', label: 'Commissioner' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setOfficeFilter(item.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap shrink-0 ${
                officeFilter === item.id
                  ? 'bg-[#FFD700] text-[#0a0a0a] shadow-xs'
                  : 'bg-[#f0f0f0] text-[#666666] hover:bg-[#dddddd] active:bg-[#bbbbbb]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs shrink-0 self-start sm:self-auto">
          <span className="font-bold text-[#666666]">County:</span>
          <select
            value={countyFilter}
            onChange={(e) => setCountyFilter(e.target.value)}
            className="p-1.5 border border-[#bbbbbb] rounded-lg text-xs bg-white text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#E6C200]"
          >
            <option value="all">All Nine Counties</option>
            {counties.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidate Profiles Grid (Sitemap Item 09) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-2xl border border-[#dddddd] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo & Header */}
              <div className="relative aspect-[16/10] bg-[#f0f0f0] overflow-hidden">
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#0a0a0a]/85 backdrop-blur-sm text-[#FFD700] text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                  {candidate.office}
                </span>
                <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-sm">
                  ✓ {candidate.status}
                </span>
              </div>

              {/* Candidate Info */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-black text-lg text-[#111111]">
                    {candidate.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#996600]">
                    {candidate.county} {candidate.payam ? `· ${candidate.payam} Payam` : ''}
                  </p>
                </div>

                <p className="text-xs text-[#666666] leading-relaxed">
                  {candidate.bio}
                </p>

                {candidate.keyCommitments && candidate.keyCommitments.length > 0 && (
                  <div className="pt-2 border-t border-[#f0f0f0] space-y-1.5">
                    <p className="text-[11px] font-bold text-[#222222] uppercase tracking-wider">
                      Key Commitments:
                    </p>
                    <ul className="text-xs text-[#666666] space-y-1">
                      {candidate.keyCommitments.map((com, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E6C200] shrink-0 mt-0.5" />
                          <span>{com}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-[#f5f5f5] border-t border-[#f0f0f0] flex items-center justify-between text-[11px] text-[#888888]">
              <span>Verified: {candidate.verifiedDate}</span>
              <span className="text-[#996600] font-bold">PAC Certified</span>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Commitments & Code of Conduct (Sitemap item 10 & 11) */}
      <div className="bg-[#FFFDE7]/70 border border-[#FFF176] rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#CC9900]" />
          <span>10. The JIPA Candidate Integrity Pledge</span>
        </h2>
        <p className="text-xs text-[#332200] leading-relaxed max-w-4xl">
          Every candidate carrying the JIPA endorsement signs a binding community pledge deposited with the PAC Secretariat. Any candidate found engaging in hate speech, cattle raid sponsorship, diversion of public funds, or voter manipulation is immediately stripped of endorsement.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-[#222222] pt-2">
          <div className="bg-white p-3 rounded-lg border border-[#FFF176]">
            <strong>1. Service to All:</strong> Impartial service without tribal favoritism.
          </div>
          <div className="bg-white p-3 rounded-lg border border-[#FFF176]">
            <strong>2. Anti-Corruption:</strong> Zero kickbacks, open budget audits.
          </div>
          <div className="bg-white p-3 rounded-lg border border-[#FFF176]">
            <strong>3. Child Protection:</strong> Relentless action against child abductions.
          </div>
          <div className="bg-white p-3 rounded-lg border border-[#FFF176]">
            <strong>4. Peace First:</strong> Rejection of armed militias and revenge violence.
          </div>
        </div>
      </div>

      {/* BECOME A CANDIDATE MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0a0a0a]/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto no-scrollbar p-4 sm:p-6 shadow-2xl text-[#111111]">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#dddddd]">
              <div>
                <h3 className="text-lg font-black text-[#111111]">
                  Apply for JIPA Candidate Endorsement
                </h3>
                <p className="text-xs text-[#888888]">
                  Open to independent candidates across all 9 counties
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-[#999999] hover:text-[#222222] p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#444444] mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Hon. Deng Atem Malual"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#444444] mb-1">
                    Target Office *
                  </label>
                  <select
                    value={applicantOffice}
                    onChange={(e) => setApplicantOffice(e.target.value as any)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg text-xs bg-white"
                  >
                    <option value="Jonglei Governor">Jonglei Governor</option>
                    <option value="National Parliamentary">National Parliamentary (MP)</option>
                    <option value="State Parliamentary">State Parliamentary (MP)</option>
                    <option value="County Commissioner">County Commissioner</option>
                    <option value="Local Council">Local Council / Payam Head</option>
                    <option value="Presidential">Presidential</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">
                    County *
                  </label>
                  <select
                    value={applicantCounty}
                    onChange={(e) => setApplicantCounty(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg text-xs bg-white"
                  >
                    {counties.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">
                  Home Payam / Boma
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kongor Payam"
                  value={applicantPayam}
                  onChange={(e) => setApplicantPayam(e.target.value)}
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">
                  Brief Bio & Background *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Community service record, profession, prior public roles..."
                  value={applicantBio}
                  onChange={(e) => setApplicantBio(e.target.value)}
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">
                  Key Priorities for your Constituency (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Construct local health clinic&#10;Inter-county youth peace pact&#10;Feeder road to river port"
                  value={applicantCommitments}
                  onChange={(e) => setApplicantCommitments(e.target.value)}
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg text-xs"
                />
              </div>

              <div className="p-3 bg-[#FFFDE7] rounded-xl border border-[#FFF176] space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={pledgeAgreed}
                    onChange={(e) => setPledgeAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-[#bbbbbb] text-[#E6C200] focus:ring-[#FFD700]"
                  />
                  <span className="text-[11px] text-[#111111] font-semibold leading-relaxed">
                    I pledge complete independence from partisan party control, agree to the JIPA Guiding Principles, confirm I have never sponsored cattle raids or child abductions, and consent to PAC background vetting.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 border border-[#bbbbbb] rounded-lg font-bold text-[#666666] hover:bg-[#f5f5f5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black rounded-lg shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
