import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Building2,
  Users,
  MapPin,
  Calendar,
  Vote,
  Flame,
  Search,
  MessageCircle,
  Phone,
} from 'lucide-react';

export const CountiesPage: React.FC = () => {
  const { counties, selectedCountyId, setSelectedCountyId, candidates, meetings, news, navigateTo } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'representatives' | 'payams' | 'bomas' | 'candidates' | 'priorities' | 'meetings' | 'contact' | 'directory'>('overview');
  const [directorySearch, setDirectorySearch] = useState('');

  const currentCounty = counties.find((c) => c.id === selectedCountyId) || counties[0];

  const countyCandidates = candidates.filter(
    (cand) => cand.county.toLowerCase().includes(currentCounty.name.toLowerCase().replace(' county', ''))
  );

  const countyMeetings = meetings.filter(
    (m) =>
      m.county.toLowerCase().includes(currentCounty.name.toLowerCase().replace(' county', '')) ||
      m.county.toLowerCase().includes('all counties') ||
      m.county.toLowerCase().includes('state-wide')
  );

  // All Payams across all 9 counties for Directory
  const allPayamsList = counties.flatMap((c) =>
    c.payams.map((p) => ({
      payamName: p,
      countyName: c.name,
      countyId: c.id,
      headquarters: c.headquarters,
    }))
  );

  const filteredPayams = allPayamsList.filter(
    (p) =>
      p.payamName.toLowerCase().includes(directorySearch.toLowerCase()) ||
      p.countyName.toLowerCase().includes(directorySearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
            Sitemap Section 05
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
            The Nine Counties of Jonglei
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Explore local county representatives, payams, bomas, candidate slates, and priority plans.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('directory')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 self-start md:self-auto ${
            activeTab === 'directory'
              ? 'bg-[#FFD700] text-[#0a0a0a]'
              : 'bg-[#f0f0f0] text-[#444444] hover:bg-[#dddddd] active:bg-[#bbbbbb]'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Payam & Boma Directory</span>
        </button>
      </div>

      {/* 9 County Selector Grid (3x3 on mobile) */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 sm:gap-2">
        {counties.map((county) => {
          const isSelected = county.id === currentCounty.id && activeTab !== 'directory';
          return (
            <button
              key={county.id}
              onClick={() => {
                setSelectedCountyId(county.id);
                if (activeTab === 'directory') setActiveTab('overview');
              }}
              className={`p-2 sm:p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-[#111111] text-white border-[#111111] shadow-md ring-2 ring-[#FFD700]'
                  : 'bg-white text-[#444444] border-[#dddddd] hover:border-[#FFD700] hover:bg-[#f5f5f5] active:scale-95'
              }`}
            >
              <span className="block font-black text-[11px] sm:text-xs leading-tight truncate">
                {county.name.replace(' County', '')}
              </span>
              <span
                className={`text-[9px] sm:text-[10px] block mt-0.5 truncate ${
                  isSelected ? 'text-[#FFD700] font-bold' : 'text-[#999999]'
                }`}
              >
                {county.headquarters}
              </span>
            </button>
          );
        })}
      </div>

      {/* IF DIRECTORY TAB IS ACTIVE */}
      {activeTab === 'directory' ? (
        <div className="bg-white rounded-2xl border border-[#dddddd] p-4 sm:p-8 shadow-xs space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#111111]">
                11. Payam Directory & 12. Boma Directory
              </h2>
              <p className="text-xs text-[#888888]">
                Master administrative directory across all 9 counties of Jonglei State.
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#999999] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search payam or county..."
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#bbbbbb] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredPayams.map((payam, i) => (
              <div
                key={i}
                className="p-3.5 sm:p-4 rounded-xl bg-[#f5f5f5] border border-[#dddddd] hover:border-[#FFD700] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs sm:text-sm text-[#111111]">
                    {payam.payamName} Payam
                  </h3>
                  <span className="text-[10px] font-bold text-[#664400] bg-[#FFF9C4] px-2 py-0.5 rounded">
                    {payam.countyName}
                  </span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">
                  County HQ: {payam.headquarters}
                </p>
                <div className="mt-3 pt-2 border-t border-[#dddddd]/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setSelectedCountyId(payam.countyId);
                      setActiveTab('payams');
                    }}
                    className="text-[#CC9900] hover:underline font-bold text-[11px]"
                  >
                    View County Payams →
                  </button>
                  <button
                    onClick={() => navigateTo('join')}
                    className="text-[#666666] hover:text-[#111111] font-semibold text-[11px]"
                  >
                    Register here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SINGLE COUNTY VIEW */
        <div className="space-y-4 sm:space-y-6">
          {/* County Banner Card */}
          <div className="bg-white rounded-2xl border border-[#dddddd] p-4 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-[#f0f0f0]">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-black text-[#996600] bg-[#FFF9C4] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Jonglei County Desk
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#888888]">
                    Zone: {currentCounty.geographicZone}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#111111]">
                  {currentCounty.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] max-w-3xl leading-relaxed">
                  {currentCounty.description}
                </p>
              </div>

              {/* Quick Info Badge (Stacks smoothly on mobile) */}
              <div className="bg-[#f5f5f5] border border-[#dddddd] p-3 sm:p-4 rounded-xl text-xs space-y-1.5 shrink-0 w-full lg:w-auto min-w-0 lg:min-w-[240px]">
                <p>
                  <strong className="text-[#111111]">Headquarters:</strong>{' '}
                  <span className="text-[#444444]">{currentCounty.headquarters}</span>
                </p>
                <p>
                  <strong className="text-[#111111]">Est. Population:</strong>{' '}
                  <span className="text-[#444444]">{currentCounty.populationEstimate}</span>
                </p>
                <p>
                  <strong className="text-[#111111]">Payams Count:</strong>{' '}
                  <span className="text-[#444444]">{currentCounty.payams.length} Payams</span>
                </p>
                <p>
                  <strong className="text-[#111111]">PAC Quota:</strong>{' '}
                  <span className="text-[#996600] font-bold">20 Delegated Members</span>
                </p>
              </div>
            </div>

            {/* Inner Subtabs: Mobile-optimized horizontal scrollbar with smooth touch scrolling */}
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 pt-3 pb-2 border-b border-[#f0f0f0] scroll-smooth">
              {[
                { id: 'overview', label: 'Overview', icon: Building2 },
                { id: 'representatives', label: 'Representatives', icon: Users },
                { id: 'payams', label: `Payams (${currentCounty.payams.length})`, icon: MapPin },
                { id: 'bomas', label: `Bomas (${currentCounty.sampleBomas.length}+)`, icon: MapPin },
                { id: 'candidates', label: `Candidates (${countyCandidates.length})`, icon: Vote },
                { id: 'priorities', label: 'Priorities', icon: Flame },
                { id: 'meetings', label: `Meetings (${countyMeetings.length})`, icon: Calendar },
                { id: 'contact', label: 'Office & Contact', icon: Phone },
              ].map((sub) => {
                const Icon = sub.icon;
                const isSubActive = activeTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id as any)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isSubActive
                        ? 'bg-[#FFD700] text-[#0a0a0a] shadow-xs'
                        : 'text-[#666666] hover:bg-[#f0f0f0] active:bg-[#dddddd]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Subtab Content Area */}
            <div className="pt-4 sm:pt-6">
              {/* 1. Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#111111]">
                    Key Geographic & Economic Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                    {currentCounty.keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#f5f5f5] rounded-xl border border-[#dddddd] text-xs font-bold text-[#222222]"
                      >
                        ✓ {feat}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[#FFFDE7] rounded-xl border border-[#FFF176] mt-4 text-xs text-[#332200] space-y-2">
                    <p className="font-bold">
                      Assisted Registration in {currentCounty.name}:
                    </p>
                    <p>
                      Citizens without internet connectivity can visit our county desk in {currentCounty.headquarters} or meet with designated Payam coordinators to register for JIPA participation.
                    </p>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="font-bold text-[#0a0a0a] bg-[#FFD700] px-3 py-1.5 rounded-lg hover:bg-[#FFE44D]"
                    >
                      View County Contact Info →
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Representatives */}
              {activeTab === 'representatives' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#111111]">
                    County Representation & PAC Delegations
                  </h3>
                  <p className="text-xs text-[#666666]">
                    In accordance with JIPA Operating Guidelines, {currentCounty.name} is represented by 20 accredited PAC delegates elected by community assemblies.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-1">
                    <div className="p-3.5 sm:p-4 bg-[#f5f5f5] rounded-xl border border-[#dddddd] space-y-1">
                      <p className="text-[10px] uppercase font-bold text-[#999999]">Coordination Desk</p>
                      <h4 className="font-extrabold text-sm text-[#111111]">
                        {currentCounty.coordinatorName}
                      </h4>
                      <p className="text-xs text-[#666666]">{currentCounty.officeLocation}</p>
                      <p className="text-xs font-semibold text-[#996600] pt-1">
                        Phone: {currentCounty.coordinatorPhone}
                      </p>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-[#f5f5f5] rounded-xl border border-[#dddddd] space-y-1">
                      <p className="text-[10px] uppercase font-bold text-[#999999]">Youth & Community Desk</p>
                      <h4 className="font-extrabold text-sm text-[#111111]">
                        County Youth Action League
                      </h4>
                      <p className="text-xs text-[#666666]">Representing cattle camps & schools</p>
                      <p className="text-xs font-semibold text-[#996600] pt-1">
                        Active in all {currentCounty.payams.length} Payams
                      </p>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-[#f5f5f5] rounded-xl border border-[#dddddd] space-y-1">
                      <p className="text-[10px] uppercase font-bold text-[#999999]">Women & Family Desk</p>
                      <h4 className="font-extrabold text-sm text-[#111111]">
                        Women’s Peace & Health Council
                      </h4>
                      <p className="text-xs text-[#666666]">Maternal health & anti-abduction tracing</p>
                      <p className="text-xs font-semibold text-[#996600] pt-1">
                        Direct community outreach
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Payams */}
              {activeTab === 'payams' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#111111]">
                    Recognized Payams in {currentCounty.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                    {currentCounty.payams.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#f5f5f5] rounded-xl border border-[#dddddd] flex items-center justify-between"
                      >
                        <span className="font-bold text-xs text-[#111111]">{p} Payam</span>
                        <span className="text-[10px] text-[#999999] font-semibold">JIPA Desk</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Bomas */}
              {activeTab === 'bomas' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#111111]">
                    Key Bomas & Settlements in {currentCounty.name}
                  </h3>
                  <p className="text-xs text-[#666666]">
                    Representative list of registered bomas where JIPA volunteers and traditional councils coordinate:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                    {currentCounty.sampleBomas.map((b, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#f5f5f5] rounded-xl border border-[#dddddd] text-xs font-medium text-[#222222]"
                      >
                        📍 {b} Boma
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Candidates */}
              {activeTab === 'candidates' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#111111]">
                      Vetted Candidates for {currentCounty.name}
                    </h3>
                    <button
                      onClick={() => navigateTo('candidates')}
                      className="text-xs font-bold text-[#CC9900] hover:underline"
                    >
                      Apply as Candidate →
                    </button>
                  </div>

                  {countyCandidates.length === 0 ? (
                    <div className="p-6 text-center text-xs text-[#888888] bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
                      Applications for {currentCounty.name} legislative seats are currently undergoing PAC integrity vetting.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {countyCandidates.map((cand) => (
                        <div
                          key={cand.id}
                          className="p-3.5 sm:p-4 bg-[#f5f5f5] rounded-xl border border-[#dddddd] flex gap-3 sm:gap-4"
                        >
                          <img
                            src={cand.photoUrl}
                            alt={cand.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 border border-[#bbbbbb]"
                          />
                          <div className="space-y-1 text-xs min-w-0">
                            <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#996600] bg-[#FFF9C4] px-2 py-0.5 rounded truncate inline-block">
                              {cand.office}
                            </span>
                            <h4 className="font-extrabold text-[#111111] text-xs sm:text-sm truncate">
                              {cand.name}
                            </h4>
                            <p className="text-[#666666] line-clamp-2 text-[11px]">{cand.bio}</p>
                            <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              ✓ {cand.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 6. Priorities */}
              {activeTab === 'priorities' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#111111]">
                    Strategic Action Priorities for {currentCounty.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {currentCounty.priorities.map((pri, idx) => (
                      <div
                        key={idx}
                        className="p-3 sm:p-4 bg-[#FFFDE7]/50 rounded-xl border border-[#FFF176]/60 flex items-start gap-2.5 sm:gap-3"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFD700] text-[#0a0a0a] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs font-bold text-[#111111]">{pri}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Meetings */}
              {activeTab === 'meetings' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#111111]">
                    Meetings in or affecting {currentCounty.name}
                  </h3>
                  {countyMeetings.length === 0 ? (
                    <div className="p-6 text-center text-xs text-[#888888] bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
                      No public meetings currently scheduled for this county. Check upcoming state-wide notices.
                    </div>
                  ) : (
                    <div className="divide-y divide-[#f0f0f0] bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
                      {countyMeetings.map((meet) => (
                        <div key={meet.id} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[10px] sm:text-[11px] font-bold text-[#999999]">
                              {meet.date} · {meet.time}
                            </span>
                            <h4 className="font-extrabold text-xs sm:text-sm text-[#111111]">
                              {meet.title}
                            </h4>
                            <p className="text-xs text-[#666666]">{meet.location}</p>
                          </div>
                          <span className="text-xs text-[#996600] font-bold bg-[#FFF9C4] px-2.5 py-1 rounded-lg self-start sm:self-auto">
                            {meet.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 8. Contact */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#111111]">
                    Official County Liaison Office
                  </h3>
                  <div className="p-4 sm:p-6 bg-[#f5f5f5] rounded-xl border border-[#dddddd] max-w-xl space-y-3 text-xs">
                    <div>
                      <span className="text-[#999999] uppercase font-bold text-[10px]">Office Address</span>
                      <p className="font-extrabold text-[#111111] text-xs sm:text-sm">{currentCounty.officeLocation}</p>
                    </div>
                    <div>
                      <span className="text-[#999999] uppercase font-bold text-[10px]">Coordinator</span>
                      <p className="font-extrabold text-[#111111] text-xs sm:text-sm">{currentCounty.coordinatorName}</p>
                    </div>
                    <div>
                      <span className="text-[#999999] uppercase font-bold text-[10px]">Direct Phone & WhatsApp</span>
                      <p className="font-extrabold text-[#111111] text-xs sm:text-sm">{currentCounty.coordinatorPhone}</p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <a
                        href={`https://wa.me/${currentCounty.coordinatorWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello JIPA ${currentCounty.name} Coordinator, I am contacting you regarding local participation.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors text-xs"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp County Desk</span>
                      </a>

                      <button
                        onClick={() => navigateTo('join')}
                        className="bg-[#111111] hover:bg-[#222222] text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-xs text-center"
                      >
                        Register in this County
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
