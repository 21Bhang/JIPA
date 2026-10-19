import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Users,
  CheckCircle2,
  Globe,
  HeartHandshake,
  Phone,
  MessageCircle,
  Building2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const JoinPage: React.FC = () => {
  const { counties, addRegistration, showNotification, navigateTo, siteSettings } = useData();

  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('bor');
  const [payam, setPayam] = useState('');
  const [boma, setBoma] = useState('');
  const [isDiaspora, setIsDiaspora] = useState(false);
  const [diasporaCountry, setDiasporaCountry] = useState('Australia');
  const [interests, setInterests] = useState<string[]>(['Voter Awareness']);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const countyObj = counties.find((c) => c.id === selectedCounty) || counties[0];

  const handleInterestToggle = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      showNotification('Please enter your name and contact phone number.');
      return;
    }

    addRegistration({
      fullName: fullName.trim(),
      gender,
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      county: countyObj.name,
      payam: payam.trim() || 'General County Resident',
      boma: boma.trim() || '',
      isDiaspora,
      diasporaCountry: isDiaspora ? diasporaCountry : undefined,
      interests,
      notes: notes.trim() || undefined,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6">
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
          Sitemap Section 11
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
          Join the Alliance
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] mt-1">
          Register interest, volunteer for community action, or connect via diaspora chapters. No membership fee or account required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Registration Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#dddddd] p-4 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-[#111111]">
                Welcome to JIPA, {fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] max-w-md mx-auto leading-relaxed">
                Your registration has been forwarded to the {countyObj.name} Coordination Desk. You will be invited to upcoming community assemblies.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-[#f0f0f0] hover:bg-[#dddddd] text-[#222222] font-bold text-xs rounded-xl"
                >
                  Register Another Member
                </button>
                <button
                  onClick={() => navigateTo('counties', countyObj.id)}
                  className="px-5 py-2.5 bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black text-xs rounded-xl"
                >
                  View Your County Page
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="border-b border-[#f0f0f0] pb-4">
                <h3 className="font-extrabold text-[#111111] text-base">
                  01. Register Interest & Member Details
                </h3>
                <p className="text-[#888888] text-xs mt-0.5">
                  Fast registration for all citizens of Jonglei State.
                </p>
              </div>

              {/* Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#444444] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Ajak Chol Manyang"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#444444] mb-1">
                    Phone Number (South Sudan or Int'l) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+211 9..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">
                    WhatsApp Number (If different)
                  </label>
                  <input
                    type="tel"
                    placeholder="+211 9..."
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                  />
                </div>
              </div>

              {/* County, Payam, Boma (02, 03, 04) */}
              <div className="p-4 bg-[#f5f5f5] rounded-xl border border-[#dddddd] space-y-3">
                <span className="font-extrabold text-[#111111] block text-xs">
                  02. County · 03. Payam · 04. Boma Location
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-[#444444] mb-1">County *</label>
                    <select
                      value={selectedCounty}
                      onChange={(e) => {
                        setSelectedCounty(e.target.value);
                        setPayam('');
                      }}
                      className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                    >
                      {counties.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#444444] mb-1">Payam</label>
                    <input
                      type="text"
                      list="payamOptions"
                      placeholder="e.g., Baidit"
                      value={payam}
                      onChange={(e) => setPayam(e.target.value)}
                      className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                    />
                    <datalist id="payamOptions">
                      {countyObj.payams.map((p) => (
                        <option key={p} value={p} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="block font-bold text-[#444444] mb-1">Boma / Village</label>
                    <input
                      type="text"
                      placeholder="e.g., Makol-cuei"
                      value={boma}
                      onChange={(e) => setBoma(e.target.value)}
                      className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 04. Diaspora Participation */}
              <div className="p-4 bg-[#FFFDE7]/50 rounded-xl border border-[#FFF176]/60 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#111111]">
                  <input
                    type="checkbox"
                    checked={isDiaspora}
                    onChange={(e) => setIsDiaspora(e.target.checked)}
                    className="text-[#E6C200] focus:ring-[#FFD700] rounded"
                  />
                  <span>04. I am currently living in the Diaspora</span>
                </label>

                {isDiaspora && (
                  <div>
                    <label className="block font-bold text-[#444444] mb-1">
                      Diaspora Country / Chapter
                    </label>
                    <select
                      value={diasporaCountry}
                      onChange={(e) => setDiasporaCountry(e.target.value)}
                      className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                    >
                      <option value="Australia">Australia (Melbourne / Sydney / Perth)</option>
                      <option value="United States">United States (Iowa / Texas / Nebraska / etc.)</option>
                      <option value="Canada">Canada (Calgary / Edmonton / Toronto)</option>
                      <option value="Kenya">Kenya (Nairobi / Kakuma / Eldoret)</option>
                      <option value="Uganda">Uganda (Kampala / Kiryandongo / Arua)</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Sudan / Egypt">Egypt / Sudan</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>
                )}
              </div>

              {/* 03. Volunteer Registration */}
              <div>
                <label className="block font-bold text-[#222222] mb-2">
                  03. Volunteer & Participation Interests (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Voter Awareness & Mobilization',
                    'Election Observer & Poll Watcher',
                    'Youth Peace & Sports League',
                    'Women Economic & Health League',
                    'Flood Dike Community Labor',
                    'Child Recovery Tracing Team',
                    'Media, Translation & Radio Outreach',
                    'Diaspora Fundraising & Advocacy',
                  ].map((role) => (
                    <label
                      key={role}
                      className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2 transition-colors ${
                        interests.includes(role)
                          ? 'border-[#FFD700] bg-[#FFFDE7] font-bold text-[#111111]'
                          : 'border-[#dddddd] bg-[#f5f5f5] text-[#444444] hover:bg-[#f0f0f0]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={interests.includes(role)}
                        onChange={() => handleInterestToggle(role)}
                        className="text-[#E6C200] focus:ring-[#FFD700] rounded"
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Register Interest Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: 05 Assisted Registration & County Reps (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111111] text-white rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-[#FFD700] font-bold text-xs uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              <span>05. Assisted Registration</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Can't Register Online?
            </h3>
            <p className="text-xs text-[#bbbbbb] leading-relaxed">
              In accordance with Developer Note 04, registration is fully accessible offline. Our County, Payam, and Boma representatives can assist any voter with registration in person.
            </p>

            <div className="pt-2 border-t border-[#222222] space-y-3 text-xs">
              <div>
                <p className="font-bold text-[#FFE44D]">Central WhatsApp Helpdesk:</p>
                <p className="text-white font-mono">{siteSettings.whatsappNumber}</p>
              </div>
              <div>
                <p className="font-bold text-[#FFE44D]">Central Email:</p>
                <p className="text-[#bbbbbb]">{siteSettings.email}</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hello JIPA, I would like assistance registering in my Payam.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Request Assisted Registration via WhatsApp</span>
            </a>
          </div>

          {/* Quick County Contact Finder */}
          <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-3">
            <h4 className="font-extrabold text-sm text-[#111111]">
              Direct County Representatives:
            </h4>
            <div className="divide-y divide-[#f0f0f0] max-h-72 overflow-y-auto text-xs">
              {counties.map((c) => (
                <div key={c.id} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#111111]">{c.name}</span>
                    <span className="text-[#999999] block text-[11px]">{c.coordinatorName}</span>
                  </div>
                  <a
                    href={`tel:${c.coordinatorPhone}`}
                    className="text-[#996600] font-bold hover:underline text-[11px]"
                  >
                    {c.coordinatorPhone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
