import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileText,
  Building2,
  ChevronRight,
  Award,
  Vote,
  Sparkles,
} from 'lucide-react';

export const PacPage: React.FC = () => {
  const { counties, meetings, navigateTo } = useData();
  const [activeSection, setActiveSection] = useState('purpose');

  const pacSubcommittees = [
    { name: '1. Peace, Security & Early Warning', chair: 'Lou Nuer / Dinka Joint Desk', desc: 'Monitors cattle corridors, early warning of border skirmishes, and mediation.' },
    { name: '2. Child Recovery & Protection', chair: 'Child Tracing Taskforce', desc: 'Coordinates safe tracing, family reunion, and rehabilitation for abducted children.' },
    { name: '3. Candidate Vetting & Endorsement', chair: 'Integrity Council', desc: 'Conducts character investigations, financial checks, and community consensus reviews.' },
    { name: '4. Legal Affairs, Constitutional & Electoral Law', chair: 'Legal Aid Counsel', desc: 'Oversees ballot litigation, voter registration rights, and compliance.' },
    { name: '5. Women Representation & Empowerment', chair: 'Women League', desc: 'Guarantees 35% female representation and fights gender-based violence.' },
    { name: '6. Youth Mobilization & Civic Action', chair: 'Youth Council', desc: 'Engages cattle camp youth, organizes peaceful civic rallies, and sports peace tourneys.' },
    { name: '7. Flood Defense & Humanitarian Coordination', chair: 'Engineering Liaison', desc: 'Plans dike reinforcement, water channels, and coordinates with UN/NGOs.' },
    { name: '8. Media, Communications & Public Relations', chair: 'Press Secretariat', desc: 'Produces press releases, manages radio broadcasts in local languages, and web portal.' },
    { name: '9. Finance, Audit & Transparent Logistics', chair: 'Audit Board', desc: 'Enforces public expense records, manages campaign resources, and tracks contributions.' },
    { name: '10. Diaspora & External Alliances', chair: 'Diaspora Desk', desc: 'Mobilizes Jonglei professionals in Australia, USA, Canada, Kenya, Uganda, and UK.' },
  ];

  const pacResolutions = [
    {
      num: 'Resolution 2026/04',
      date: '10 October 2026',
      title: 'Mandatory Candidate Integrity Pledge',
      summary: 'All prospective independent candidates seeking JIPA endorsement must sign the enforceable public pledge renouncing corruption, ethnic incitement, and armed violence.',
    },
    {
      num: 'Resolution 2026/03',
      date: '28 September 2026',
      title: 'Equitable 20-Member County Quota Enforcement',
      summary: 'Reaffirms strictly equal representation of 20 members per county in the 180-member PAC, prohibiting any single county from dominating plenary votes.',
    },
    {
      num: 'Resolution 2026/02',
      date: '14 September 2026',
      title: 'Child Recovery Taskforce Funding Priority',
      summary: 'Mandates that 25% of all grassroots mobilized resources be allocated directly to community tracing and reunification centers for abducted children.',
    },
    {
      num: 'Resolution 2026/01',
      date: '02 August 2026',
      title: 'Adoption of Operating Guidelines',
      summary: 'Unanimous adoption of the JIPA Operating Guidelines as the binding operational code of the alliance as an emerging, unregistered political movement.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
            Sitemap Section 04
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
            Political Action Committee (PAC)
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            The 180-member plenary assembly driving independent political action across Jonglei State.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-[#FFF9C4] text-[#111111] font-bold px-3 py-1.5 rounded-lg border border-[#FFE44D]">
            180 PAC Members (20 per county)
          </span>
          <span className="bg-[#f0f0f0] text-[#222222] font-bold px-3 py-1.5 rounded-lg border border-[#dddddd]">
            15 Executive Members · 15 Advisors
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#dddddd] shadow-sm">
          <p className="text-xs font-bold text-[#888888] uppercase">Total Membership</p>
          <p className="text-2xl font-black text-[#111111] mt-1">180 Delegates</p>
          <p className="text-[11px] text-[#CC9900] font-semibold mt-1">Strictly 20 per County</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#dddddd] shadow-sm">
          <p className="text-xs font-bold text-[#888888] uppercase">Executive Committee</p>
          <p className="text-2xl font-black text-[#111111] mt-1">15 Officers</p>
          <p className="text-[11px] text-[#888888] mt-1">Elected from PAC Plenary</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#dddddd] shadow-sm">
          <p className="text-xs font-bold text-[#888888] uppercase">Standing Subcommittees</p>
          <p className="text-2xl font-black text-[#111111] mt-1">10 Subcommittees</p>
          <p className="text-[11px] text-[#888888] mt-1">Operational & Policy Desks</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#dddddd] shadow-sm">
          <p className="text-xs font-bold text-[#888888] uppercase">Advisory Board</p>
          <p className="text-2xl font-black text-[#111111] mt-1">15 Elder Statesmen</p>
          <p className="text-[11px] text-[#888888] mt-1">Spiritual & Traditional Leaders</p>
        </div>
      </div>

      {/* 01. Purpose and Responsibilities */}
      <section className="bg-white rounded-2xl border border-[#dddddd] p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#E6C200]" />
          <span>01. Purpose and Responsibilities</span>
        </h2>
        <p className="text-sm text-[#444444] leading-relaxed">
          The Political Action Committee (PAC) is the representative political engine of JIPA. It carries the collective mandate of voters from all nine counties to evaluate political candidates, coordinate election strategy, protect community rights, and maintain inter-county harmony.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#444444] pt-2">
          <div className="p-3.5 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
            <strong>Candidate Vetting & Endorsement:</strong> Investigates the integrity, competence, and community reputation of candidates seeking JIPA backing.
          </div>
          <div className="p-3.5 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
            <strong>Policy & Manifesto Formation:</strong> Develops community action plans for dikes, roads, hospitals, and child recovery.
          </div>
          <div className="p-3.5 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
            <strong>Electoral Defense & Observer Deployment:</strong> Recruits and trains accredited poll observers to guard against voter intimidation.
          </div>
          <div className="p-3.5 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
            <strong>Resource Mobilization & Transparency:</strong> Oversees community donations and diaspora contributions with zero tolerance for misappropriation.
          </div>
        </div>
      </section>

      {/* 02. PAC Members & 03. County Representatives Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#E6C200]" />
            <span>02. PAC Members & County Delegations (20 per County)</span>
          </h2>
          <span className="text-xs text-[#888888]">Total: 9 Counties × 20 = 180 Members</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {counties.map((county) => (
            <div
              key={county.id}
              className="bg-white rounded-xl border border-[#dddddd] p-4 shadow-sm hover:border-[#FFD700] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-sm text-[#111111]">
                  {county.name} Delegation
                </h3>
                <span className="text-[11px] font-black text-[#CC9900] bg-[#FFFDE7] px-2 py-0.5 rounded border border-[#FFF176]">
                  20 PAC Delegates
                </span>
              </div>
              <p className="text-xs text-[#666666] mb-3">
                Headquarters: {county.headquarters} · {county.payams.length} Payams
              </p>
              <div className="text-[11px] text-[#888888] space-y-1 bg-[#f5f5f5] p-2.5 rounded-lg border border-[#f0f0f0]">
                <p>• 6 Traditional Chiefs & Community Elders</p>
                <p>• 6 Women Representatives & Health Advocates</p>
                <p>• 6 Youth Leaders & Cattle Camp Liaisons</p>
                <p>• 2 Legal & Economic Professionals</p>
              </div>
              <div className="mt-3 text-right">
                <button
                  onClick={() => navigateTo('counties', county.id)}
                  className="text-xs font-bold text-[#CC9900] hover:text-[#996600]"
                >
                  View County Desk →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05. Executive Committee (15) & 07. Advisory Board (15) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-[#111111] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#E6C200]" />
            <span>05. PAC Executive Committee (15 Members)</span>
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            Elected by secret ballot from among the 180 PAC delegates. The Executive Committee manages day-to-day coordination between plenary sessions.
          </p>
          <ul className="text-xs text-[#444444] space-y-2 divide-y divide-[#f0f0f0]">
            <li className="pt-2 flex justify-between">
              <span className="font-bold">PAC Chairperson</span>
              <span className="text-[#888888]">Elected by Plenary</span>
            </li>
            <li className="pt-2 flex justify-between">
              <span className="font-bold">Vice-Chairperson (Administration)</span>
              <span className="text-[#888888]">Elected by Plenary</span>
            </li>
            <li className="pt-2 flex justify-between">
              <span className="font-bold">Vice-Chairperson (Operations & Counties)</span>
              <span className="text-[#888888]">Elected by Plenary</span>
            </li>
            <li className="pt-2 flex justify-between">
              <span className="font-bold">Secretary-General</span>
              <span className="text-[#888888]">Secretariat Lead</span>
            </li>
            <li className="pt-2 flex justify-between">
              <span className="font-bold">Secretary for Finance & Treasury</span>
              <span className="text-[#888888]">Elected by Plenary</span>
            </li>
            <li className="pt-2 flex justify-between">
              <span className="font-bold">Secretary for Candidate Vetting</span>
              <span className="text-[#888888]">Elected by Plenary</span>
            </li>
            <li className="pt-2 flex justify-between">
              <span className="font-bold">Secretary for Information & Media</span>
              <span className="text-[#888888]">Official Spokesperson</span>
            </li>
            <li className="pt-2 flex justify-between">
              <span className="font-bold">Secretary for Women & Family Affairs</span>
              <span className="text-[#888888]">Elected by Plenary</span>
            </li>
            <li className="pt-2 flex justify-between">
              <span className="font-bold">Secretary for Youth Affairs & Peace</span>
              <span className="text-[#888888]">Elected by Plenary</span>
            </li>
            <li className="pt-2 flex justify-between">
              <span className="font-bold">6 Regional Zonal Coordinators</span>
              <span className="text-[#888888]">Northern, Central & Southern Jonglei</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-[#111111] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#E6C200]" />
            <span>07. Advisory Board (15 Advisors)</span>
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            Distinguished elders, former diplomats, legal jurists, and faith leaders appointed to counsel the alliance on constitutional matters and peace accords.
          </p>
          <div className="bg-[#f5f5f5] p-4 rounded-xl border border-[#dddddd]/80 space-y-3 text-xs text-[#444444]">
            <p>
              <strong>Moral Authority:</strong> The Advisory Board reviews potential candidate impasses, monitors compliance with the Guiding Principles, and leads high-level peace missions between rival cattle camp communities.
            </p>
            <p>
              <strong>Representation:</strong> Advisors are drawn equally from traditional elder councils across all regional communities of Jonglei State.
            </p>
          </div>
        </div>
      </section>

      {/* 06. Standing Subcommittees (10) */}
      <section className="bg-white rounded-2xl border border-[#dddddd] p-6 sm:p-8 shadow-sm space-y-5">
        <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#E6C200]" />
          <span>06. The 10 Standing Subcommittees</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pacSubcommittees.map((sub, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#f5f5f5] border border-[#dddddd] hover:border-[#FFD700] transition-colors"
            >
              <h3 className="font-extrabold text-sm text-[#111111] mb-1">
                {sub.name}
              </h3>
              <p className="text-[11px] font-bold text-[#996600] mb-1">
                Desk: {sub.chair}
              </p>
              <p className="text-xs text-[#666666] leading-relaxed">
                {sub.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 09. Decisions and Resolutions */}
      <section className="bg-white rounded-2xl border border-[#dddddd] p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#E6C200]" />
            <span>09. PAC Decisions and Certified Resolutions</span>
          </h2>
          <span className="text-xs text-[#888888]">Official Register</span>
        </div>

        <div className="space-y-3">
          {pacResolutions.map((res) => (
            <div
              key={res.num}
              className="p-4 rounded-xl bg-[#FFFDE7]/40 border border-[#FFF176]/60 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#664400] bg-[#FFF176]/80 px-2 py-0.5 rounded">
                    {res.num}
                  </span>
                  <span className="text-xs text-[#888888]">{res.date}</span>
                </div>
                <h3 className="font-bold text-sm text-[#111111] mt-1">
                  {res.title}
                </h3>
                <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                  {res.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
