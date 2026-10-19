import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Flag,
  Users,
  Award,
  Calendar,
  FileText,
  Send,
  CheckCircle2,
  AlertTriangle,
  Megaphone,
  BookOpen,
} from 'lucide-react';

export const PoliticalActionPage: React.FC = () => {
  const { counties, showNotification } = useData();

  // Petitions State
  const [signedPetitions, setSignedPetitions] = useState<{ [id: string]: boolean }>({});
  const [concernForm, setConcernForm] = useState({
    county: 'Bor County',
    payam: '',
    topic: 'Child Abduction & Security',
    concern: '',
    submitterName: '',
  });

  const petitionsList = [
    {
      id: 'pet-1',
      title: 'Petition for Immediate Inter-County Child Tracing Taskforce',
      target: 'Governor of Jonglei State & National Ministry of Humanitarian Affairs',
      signersCount: 4280,
      description: 'Demanding state funding and joint police-community patrols to safely recover stolen children and reunite them with their mothers.',
    },
    {
      id: 'pet-2',
      title: 'Petition for Permanent Dike Reconstruction Machinery in Twic East & Bor',
      target: 'Ministry of Roads and Bridges & State Legislative Assembly',
      signersCount: 3120,
      description: 'Demanding deployment of three heavy amphibious excavators to reinforce critical flood embankments before the seasonal crest.',
    },
    {
      id: 'pet-3',
      title: 'Petition for Immediate Removal of Illegal Transit Roadblocks',
      target: 'National Ministry of Interior & Jonglei State Police Commissioner',
      signersCount: 2850,
      description: 'Demanding the unconditional dismantling of extortion checkpoints between Bor, Yuai, and Akobo that inflate market food prices.',
    },
  ];

  const handleSignPetition = (id: string) => {
    setSignedPetitions((prev) => ({ ...prev, [id]: true }));
    showNotification('Thank you for signing the petition! Your voice strengthens our movement.');
  };

  const handleConcernSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concernForm.concern.trim()) {
      showNotification('Please describe your community concern.');
      return;
    }
    showNotification('Community concern submitted to your local JIPA County Committee.');
    setConcernForm({
      county: 'Bor County',
      payam: '',
      topic: 'Child Abduction & Security',
      concern: '',
      submitterName: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6">
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
          Sitemap Section 08
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
          Political Action & Organizing
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] mt-1">
          Community meetings, traditional elders engagement, civic education, peaceful petitions, and citizen assemblies.
        </p>
      </div>

      {/* Assembly Levels (01 to 06) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#dddddd] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF9C4] text-[#664400] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-[#111111]">
            01. Community & 02. Chiefs Councils
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            Direct dialogue with Paramount Chiefs, Headmen, and spiritual guardians to resolve pastoral boundaries and enforce customary peace treaties.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#dddddd] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#f0f0f0] text-[#111111] flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-[#111111]">
            03. County, 04. Payam & 05. Boma Assemblies
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            Regular grassroots town halls where residents set budget priorities and question prospective independent candidates directly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#dddddd] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF9C4] text-[#664400] flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-[#111111]">
            06. Youth & Women’s Leagues
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            Mobilizing cattle camp youth away from violent rustling towards trade, and empowering women as the moral backbone of community reconciliation.
          </p>
        </div>
      </div>

      {/* 08. Peaceful Demonstrations & Civic Rights */}
      <div className="bg-[#FFFDE7] border border-[#FFF176] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#332200]">
          <Megaphone className="w-5 h-5 text-[#996600]" />
          <h2 className="text-lg font-black">
            07. Public Gatherings & 08. Peaceful Demonstrations Protocol
          </h2>
        </div>
        <p className="text-xs text-[#111111] leading-relaxed max-w-4xl">
          Article 24 and 25 of the Transitional Constitution of South Sudan guarantee the right to peaceful assembly and freedom of expression. JIPA organizes strictly peaceful, unarmed, disciplined civic demonstrations to protest against injustice, neglected flood dikes, or arbitrary arrests.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#222222] pt-1">
          <div className="p-3 bg-white rounded-lg border border-[#FFF176]">
            <strong>Non-Violence:</strong> No sticks, spears, or firearms permitted under any circumstance.
          </div>
          <div className="p-3 bg-white rounded-lg border border-[#FFF176]">
            <strong>Advance Notice:</strong> Official peaceful assembly notification delivered to local county administration.
          </div>
          <div className="p-3 bg-white rounded-lg border border-[#FFF176]">
            <strong>Community Stewards:</strong> Designated JIPA youth marshals in high-visibility armbands to guide crowds.
          </div>
        </div>
      </div>

      {/* 09. Active Community Petitions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#E6C200]" />
            <span>09. Active Citizen Petitions</span>
          </h2>
          <span className="text-xs text-[#888888]">Sign with one click</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {petitionsList.map((pet) => {
            const hasSigned = signedPetitions[pet.id];
            return (
              <div
                key={pet.id}
                className="bg-white rounded-2xl border border-[#dddddd] p-5 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#996600] uppercase bg-[#FFF9C4] px-2 py-0.5 rounded">
                    To: {pet.target}
                  </span>
                  <h3 className="font-extrabold text-sm text-[#111111] leading-snug">
                    {pet.title}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {pet.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#444444]">
                    {pet.signersCount + (hasSigned ? 1 : 0)} signatures
                  </span>

                  <button
                    onClick={() => handleSignPetition(pet.id)}
                    disabled={hasSigned}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      hasSigned
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] shadow-sm'
                    }`}
                  >
                    {hasSigned ? 'Signed ✓' : 'Sign Petition'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column: 10 Political Education + 11 Community Concerns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 10 Political Education Modules */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#dddddd] p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-[#111111] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#E6C200]" />
            <span>10. Political Education Modules</span>
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            Free civic education materials translated into local languages and taught in Bomas to demystify democracy and constitutional rights:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
              <h4 className="font-bold text-[#111111]">Module 1: The Sovereign Voter</h4>
              <p className="text-[#666666] mt-0.5">Why your vote is your property, and why politicians must serve you rather than rule you.</p>
            </div>
            <div className="p-3 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
              <h4 className="font-bold text-[#111111]">Module 2: Customary Peace & Child Protection</h4>
              <p className="text-[#666666] mt-0.5">Harmonizing traditional Nuer and Dinka mediation covenants with human rights law.</p>
            </div>
            <div className="p-3 bg-[#f5f5f5] rounded-xl border border-[#dddddd]">
              <h4 className="font-bold text-[#111111]">Module 3: Public Revenue Tracking</h4>
              <p className="text-[#666666] mt-0.5">How to demand accounting for county market taxes, ferry fees, and oil compensation.</p>
            </div>
          </div>
        </div>

        {/* 11 Community Concerns Submission */}
        <div className="lg:col-span-6 bg-[#f5f5f5] rounded-2xl border border-[#dddddd] p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-black text-[#111111] flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#CC9900]" />
            <span>11. Submit a Community Concern</span>
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            Bring an urgent local challenge in your Payam or Boma directly before your JIPA county representatives.
          </p>

          <form onSubmit={handleConcernSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#444444] mb-1">County *</label>
                <select
                  value={concernForm.county}
                  onChange={(e) => setConcernForm({ ...concernForm, county: e.target.value })}
                  className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                >
                  {counties.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">Payam / Boma</label>
                <input
                  type="text"
                  placeholder="e.g., Lith Payam"
                  value={concernForm.payam}
                  onChange={(e) => setConcernForm({ ...concernForm, payam: e.target.value })}
                  className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">Category *</label>
              <select
                value={concernForm.topic}
                onChange={(e) => setConcernForm({ ...concernForm, topic: e.target.value })}
                className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
              >
                <option value="Child Abduction & Security">Child Abduction & Security</option>
                <option value="Flood Dikes & Drainage">Flood Dikes & Drainage</option>
                <option value="Hospital & Antivenom Shortage">Hospital & Antivenom Shortage</option>
                <option value="Cattle Raiding Threat">Cattle Raiding Threat</option>
                <option value="Roads & River Transport Cutoff">Roads & River Transport Cutoff</option>
                <option value="School Closures">School Closures</option>
                <option value="Other Community Need">Other Community Need</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">Your Concern Details *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe what is happening and what action is requested from JIPA..."
                value={concernForm.concern}
                onChange={(e) => setConcernForm({ ...concernForm, concern: e.target.value })}
                className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">Your Name or Group (Optional)</label>
              <input
                type="text"
                placeholder="Leave blank to remain anonymous"
                value={concernForm.submitterName}
                onChange={(e) => setConcernForm({ ...concernForm, submitterName: e.target.value })}
                className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#111111] hover:bg-[#222222] text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Concern to County Desk</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
