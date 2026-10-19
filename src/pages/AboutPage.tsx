import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  ShieldCheck,
  Target,
  Eye,
  FileText,
  Compass,
  Building2,
  Users,
  CheckCircle2,
  ChevronRight,
  Award,
  Scale,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useData();
  const [activeSection, setActiveSection] = useState<string>('who-we-are');

  const aboutSections = [
    { id: 'who-we-are', title: '01. Who We Are' },
    { id: 'background', title: '02. Background' },
    { id: 'vision', title: '03. Vision' },
    { id: 'mission', title: '04. Mission' },
    { id: 'mandate', title: '05. Mandate' },
    { id: 'objectives', title: '06. Objectives' },
    { id: 'guiding-principles', title: '07. Guiding Principles' },
    { id: 'our-priorities', title: '08. Our Priorities' },
    { id: 'political-focus', title: '09. Political Focus' },
    { id: 'operating-guidelines', title: '10. Operating Guidelines' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Title Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
            Sitemap Section 02
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
            About JIPA
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Jonglei Independent Political Alliance — Emerging Independent Movement
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-[11px] sm:text-xs font-bold text-[#444444] bg-[#f0f0f0] px-3 py-1.5 rounded-lg border border-[#dddddd]">
            Status: Emerging Unregistered Movement
          </span>
        </div>
      </div>

      {/* Mobile Horizontal Section Selector */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-2 scroll-smooth">
          {aboutSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                activeSection === sec.id
                  ? 'bg-[#FFD700] text-[#0a0a0a] shadow-xs'
                  : 'bg-white text-[#444444] border border-[#dddddd] active:bg-[#f0f0f0]'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Desktop Sidebar on left, rich content on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Desktop Sidebar (Hidden on mobile) */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="bg-white rounded-xl border border-[#dddddd] p-2 shadow-xs sticky top-24 space-y-1">
            <div className="p-3 bg-[#FFFDE7] rounded-lg mb-2 border border-[#FFF176]/50">
              <p className="text-xs font-bold text-[#332200]">
                Guiding Principles & Operating Guidelines
              </p>
              <p className="text-[11px] text-[#664400] mt-0.5">
                JIPA operates under community principles, not a partisan party constitution.
              </p>
            </div>

            {aboutSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                  activeSection === sec.id
                    ? 'bg-[#FFD700] text-[#0a0a0a] shadow-xs'
                    : 'text-[#444444] hover:bg-[#f0f0f0] hover:text-[#111111]'
                }`}
              >
                <span>{sec.title}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 ${
                    activeSection === sec.id ? 'text-[#0a0a0a]' : 'text-[#999999]'
                  }`}
                />
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-8 bg-white rounded-2xl border border-[#dddddd] p-4 sm:p-10 shadow-xs space-y-6 sm:space-y-8">
          {/* 01. Who We Are */}
          {activeSection === 'who-we-are' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">01. Who We Are</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                The <strong>Jonglei Independent Political Alliance (JIPA)</strong> is an independent grassroots political movement bringing together independent candidates, voters, traditional leaders, youth, women, and diaspora supporters from all nine counties of Jonglei State, South Sudan.
              </p>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                JIPA was formed to overcome decades of cyclic communal conflicts, political marginalization, patronage, and neglected public services. We are an open civic platform committed to clean governance, accountability, and the genuine representation of everyday citizens.
              </p>
              <div className="bg-[#f5f5f5] p-4 sm:p-5 rounded-xl border border-[#dddddd]/80 space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-[#111111]">Core Nature of JIPA:</h3>
                <ul className="text-xs text-[#666666] space-y-1.5 list-disc list-inside">
                  <li>An independent movement, NOT a registered political party with partisan party bosses.</li>
                  <li>Rooted equally in all nine counties of Jonglei State.</li>
                  <li>Operated under consensus-driven <em>Guiding Principles</em> and <em>Operating Guidelines</em>.</li>
                  <li>Dedicated to elevating vetted, credible independent candidates into state and national office.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 02. Background */}
          {activeSection === 'background' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">02. Background</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                Jonglei State is the historic epicenter of South Sudan's liberation struggle and the largest geographic state in the country. Despite its immense human talent, vast livestock reserves, fertile agricultural soils, and rich White Nile waterways, Jonglei has suffered devastating cycles of inter-communal cattle raiding, retaliatory killings, child abductions, and severe seasonal flooding.
              </p>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                Traditional partisan political parties have consistently centralized power in Juba, divided communities along ethnic fault lines, and treated local populations merely as voting numbers during contested elections. In response, community elders, professionals, youth associations, and women’s unions across Bor, Twic East, Duk, Akobo, Nyirol, Uror, Ayod, Pigi, and Fangak joined hands to establish JIPA as an independent vehicle for community-first democracy.
              </p>
            </div>
          )}

          {/* 03. Vision */}
          {activeSection === 'vision' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">03. Vision</h2>
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-[#E6C200]/10 to-yellow-500/5 border-l-4 border-[#E6C200] rounded-r-xl">
                <p className="text-sm sm:text-lg font-bold text-[#111111] italic leading-relaxed">
                  "A peaceful, prosperous, and united Jonglei State where power resides in the hands of the people, where every child is safe from abduction, where every community lives in dignity, and where public resources directly build schools, hospitals, flood defenses, and roads."
                </p>
              </div>
            </div>
          )}

          {/* 04. Mission */}
          {activeSection === 'mission' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">04. Mission</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                To organize, support, and elect principled independent candidates committed to the collective welfare of Jonglei State; to dismantle divisive partisan politics; to institutionalize inter-communal peace and reconciliation; and to hold all tiers of government strictly accountable to the citizens they serve.
              </p>
            </div>
          )}

          {/* 05. Mandate */}
          {activeSection === 'mandate' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">05. Mandate</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                The mandate of the Jonglei Independent Political Alliance is derived directly from our grassroots General Assembly and our 180-member Political Action Committee (PAC):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#444444] pt-2">
                <div className="p-3 bg-[#f5f5f5] rounded-lg border border-[#dddddd]">
                  <strong>Electoral Representation:</strong> Vet, endorse, and campaign for credible independent candidates for Governor, Parliament, and County offices.
                </div>
                <div className="p-3 bg-[#f5f5f5] rounded-lg border border-[#dddddd]">
                  <strong>Civic Protection:</strong> Monitor human rights, track child abductions, and document violations against civilians across all Payams.
                </div>
                <div className="p-3 bg-[#f5f5f5] rounded-lg border border-[#dddddd]">
                  <strong>Peacebuilding:</strong> Mediate communal dialogues and establish binding agreements to end cattle raiding.
                </div>
                <div className="p-3 bg-[#f5f5f5] rounded-lg border border-[#dddddd]">
                  <strong>Development Advocacy:</strong> Demand state and national budget allocations for dikes, hospitals, and trunk roads.
                </div>
              </div>
            </div>
          )}

          {/* 06. Objectives */}
          {activeSection === 'objectives' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">06. Objectives</h2>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#444444]">
                {[
                  'Unite the people of Bor, Twic East, Duk, Akobo, Nyirol, Uror, Ayod, Pigi, and Fangak into a common political alliance.',
                  'Achieve unconditional recovery and reunification of every abducted child in Jonglei and neighboring areas.',
                  'Establish permanent peace corridors and joint monitoring councils between Dinka Bor, Lou Nuer, Gawaar Nuer, and neighboring communities.',
                  'Promote honest, competent, and incorruptible independent leadership in local and national elections.',
                  'Construct durable anti-flood infrastructure to secure food sovereignty, livestock safety, and permanent settlements.',
                  'Advance equal participation of youth and women in every political action committee and candidate ticket.',
                ].map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 07. Guiding Principles */}
          {activeSection === 'guiding-principles' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">07. Guiding Principles</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                As an emerging movement, our code of conduct rests upon six foundational Guiding Principles:
              </p>
              <div className="space-y-2.5 sm:space-y-3 pt-1">
                {[
                  {
                    title: '1. Power to the People',
                    desc: 'Sovereignty belongs to the citizens. Leaders are servants entrusted with authority, not masters or commanders.',
                  },
                  {
                    title: '2. Complete Political Independence',
                    desc: 'JIPA accepts no partisan directives from external political hierarchies or armed party factions.',
                  },
                  {
                    title: '3. Equitable County Parity',
                    desc: 'All nine counties possess equal standing, equal voice, and equal representation in PAC assemblies and policy decisions.',
                  },
                  {
                    title: '4. Absolute Sanctity of Human Life',
                    desc: 'Cattle raiding, child abductions, and retaliatory violence are crimes against our collective survival.',
                  },
                  {
                    title: '5. Transparency & Zero Corruption',
                    desc: 'All financial contributions, expenditures, and candidate vet records are audited and open to assembly scrutiny.',
                  },
                  {
                    title: '6. Inclusivity for Youth and Women',
                    desc: 'Mandatory 35% representation of women and youth leaders in all executive and candidate slates.',
                  },
                ].map((p, idx) => (
                  <div key={idx} className="p-3 sm:p-3.5 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
                    <h4 className="font-bold text-xs sm:text-sm text-[#111111] text-[#664400]">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#666666] mt-0.5">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 08. Our Priorities */}
          {activeSection === 'our-priorities' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">08. Our Priorities</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                JIPA prioritizes peace, infrastructure, public health, education, and flood control across 20 distinct community programs.
              </p>
              <div className="p-4 bg-[#FFFDE7] rounded-xl border border-[#FFF176] text-xs text-[#332200] space-y-2">
                <p className="font-bold">
                  Top Priority: Child Recovery & Permanent Inter-Communal Ceasefire
                </p>
                <p>
                  View the full legislative and community roadmap covering all 20 priority sectors on our dedicated priorities page.
                </p>
                <button
                  onClick={() => navigateTo('priorities')}
                  className="font-bold text-[#0a0a0a] bg-[#FFD700] px-3.5 py-2 rounded-xl hover:bg-[#FFE44D] active:scale-95"
                >
                  View All 20 Priorities →
                </button>
              </div>
            </div>
          )}

          {/* 09. Political Focus */}
          {activeSection === 'political-focus' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">09. Political Focus</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                Our political focus is squarely centered on county-level empowerment and sovereign independent candidates:
              </p>
              <ul className="text-xs sm:text-sm text-[#444444] space-y-2 list-disc list-inside">
                <li>Endorsement of unified independent gubernatorial tickets for Jonglei State.</li>
                <li>Grassroots legislative slates for National and State Legislative Assemblies representing all 9 counties.</li>
                <li>Direct civic oversight of county revenue collections, border custom tariffs, and oil revenue shares.</li>
                <li>Decentralization of executive authority directly to Payams and Bomas.</li>
              </ul>
            </div>
          )}

          {/* 10. Operating Guidelines */}
          {activeSection === 'operating-guidelines' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-3">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C200]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#111111]">10. Operating Guidelines</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                In strict adherence to our status as an emerging, unregistered political movement, JIPA utilizes <strong>Operating Guidelines</strong> rather than a partisan constitution.
              </p>
              <div className="space-y-2 text-xs text-[#666666]">
                <div className="p-3 bg-[#f5f5f5] rounded-lg border border-[#dddddd]">
                  <strong>Consensus Decision-Making:</strong> Resolutions in the PAC and County Committees require two-thirds consensus of present delegates.
                </div>
                <div className="p-3 bg-[#f5f5f5] rounded-lg border border-[#dddddd]">
                  <strong>Financial Protocol:</strong> Zero cash transactions above 50,000 SSP without three authorized signatures (Coordinator, Treasurer, and PAC Secretary).
                </div>
                <div className="p-3 bg-[#f5f5f5] rounded-lg border border-[#dddddd]">
                  <strong>Candidate Code:</strong> All endorsed candidates must publicly sign and deposit the JIPA Candidate Integrity Pledge with their respective county PAC assembly.
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
