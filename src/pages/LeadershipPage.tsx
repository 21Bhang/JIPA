import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Users,
  ShieldCheck,
  Building2,
  FileCheck2,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';

export const LeadershipPage: React.FC = () => {
  const { navigateTo } = useData();
  const [activeTab, setActiveTab] = useState('general-assembly');

  const leadershipTiers = [
    {
      id: 'general-assembly',
      title: '01. General Assembly',
      desc: 'The supreme consultative body composed of all registered members across the nine counties and the diaspora.',
      icon: Users,
    },
    {
      id: 'pac',
      title: '02. Political Action Committee (PAC)',
      desc: '180 delegate members (20 per county) responsible for strategic direction, resolutions, and candidate vetting.',
      icon: ShieldCheck,
    },
    {
      id: 'pac-executive',
      title: '03. PAC Executive Committee',
      desc: '15 executive officers elected directly from the 180 PAC members to oversee routine coordination.',
      icon: Layers,
    },
    {
      id: 'subcommittees',
      title: '04. Standing Subcommittees',
      desc: '10 specialized functional committees handling security, candidate vetting, finances, legal, and communications.',
      icon: FileCheck2,
    },
    {
      id: 'advisory-board',
      title: '05. Advisory Board',
      desc: '15 senior elder statesmen, spiritual guides, and traditional chiefs providing moral counsel.',
      icon: Users,
    },
    {
      id: 'secretariat',
      title: '06. Secretariat',
      desc: 'The administrative engine managing daily offices, record-keeping, and member communications.',
      icon: Building2,
    },
    {
      id: 'county-reps',
      title: '07. County Representatives',
      desc: '9 County Coordination Committees managing grassroots action in Bor, Twic East, Duk, Akobo, Nyirol, Uror, Ayod, Pigi, and Fangak.',
      icon: Building2,
    },
    {
      id: 'payam-reps',
      title: '08. Payam Representatives',
      desc: 'Local area coordinators across all recognized Payams facilitating civic education and voter mobilization.',
      icon: Building2,
    },
    {
      id: 'boma-reps',
      title: '09. Boma Representatives',
      desc: 'Village and cattle-camp level liaisons ensuring direct community participation at the very grassroots.',
      icon: Users,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Title */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6">
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
          Sitemap Section 03
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
          Leadership Structure
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] mt-1">
          Decentralized, democratic governance representing all nine counties of Jonglei State.
        </p>
      </div>

      {/* Note on Governance */}
      <div className="bg-[#FFFDE7] border border-[#FFF176] p-4 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-[#CC9900] shrink-0 mt-0.5" />
        <div className="text-xs text-[#332200] space-y-1">
          <p className="font-bold">Institutional Discipline & Governance Integrity:</p>
          <p>
            In accordance with JIPA Operating Guidelines, the General Assembly, PAC, Executive Committee, County Committees, Payam Committees, and Boma Committees operate as separate and distinct democratic organs. We do not publish fictitious or unverified officeholders.
          </p>
        </div>
      </div>

      {/* Tiered Grid of Organs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadershipTiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.id}
              className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 text-[#CC9900] flex items-center justify-center font-black">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-base text-[#111111] leading-snug">
                  {tier.title}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#999999] uppercase">
                  Autonomous Organ
                </span>
                {tier.id === 'pac' && (
                  <button
                    onClick={() => navigateTo('pac')}
                    className="text-xs font-bold text-[#CC9900] hover:text-[#996600] flex items-center gap-1"
                  >
                    <span>View PAC Charter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {tier.id === 'county-reps' && (
                  <button
                    onClick={() => navigateTo('counties')}
                    className="text-xs font-bold text-[#CC9900] hover:text-[#996600] flex items-center gap-1"
                  >
                    <span>View County Desks</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Representative Representation Diagram */}
      <div className="bg-[#111111] text-white p-8 rounded-2xl space-y-6">
        <h3 className="text-xl font-black text-white text-center">
          The Bottom-Up Governance Flow
        </h3>
        <p className="text-xs text-[#bbbbbb] text-center max-w-2xl mx-auto">
          Unlike traditional political parties where decisions flow from top elites downward, JIPA policies are generated in Bomas and Payams, ratified by County Assemblies, and executed through the PAC.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs pt-4">
          <div className="p-3 rounded-xl bg-[#222222] border border-[#444444]">
            <span className="text-[#FFD700] font-bold block mb-1">Tier 1</span>
            <span className="font-extrabold text-white">Boma Councils</span>
            <span className="text-[10px] text-[#999999] block mt-1">Village & cattle camps</span>
          </div>
          <div className="p-3 rounded-xl bg-[#222222] border border-[#444444]">
            <span className="text-[#FFD700] font-bold block mb-1">Tier 2</span>
            <span className="font-extrabold text-white">Payam Assemblies</span>
            <span className="text-[10px] text-[#999999] block mt-1">Administrative zones</span>
          </div>
          <div className="p-3 rounded-xl bg-[#222222] border border-[#444444]">
            <span className="text-[#FFD700] font-bold block mb-1">Tier 3</span>
            <span className="font-extrabold text-white">9 County Committees</span>
            <span className="text-[10px] text-[#999999] block mt-1">20 delegates each</span>
          </div>
          <div className="p-3 rounded-xl bg-[#222222] border border-[#FFD700]/50">
            <span className="text-[#FFD700] font-bold block mb-1">Tier 4</span>
            <span className="font-extrabold text-[#FFE44D]">180-Member PAC</span>
            <span className="text-[10px] text-[#bbbbbb] block mt-1">Strategic Plenary</span>
          </div>
          <div className="p-3 rounded-xl bg-[#222222] border border-[#444444]">
            <span className="text-[#FFD700] font-bold block mb-1">Tier 5</span>
            <span className="font-extrabold text-white">PAC Executive (15)</span>
            <span className="text-[10px] text-[#999999] block mt-1">Elected coordinators</span>
          </div>
        </div>
      </div>
    </div>
  );
};
