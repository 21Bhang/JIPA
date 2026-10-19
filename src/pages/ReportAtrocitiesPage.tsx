import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ConfidentialReport } from '../types';
import {
  ShieldAlert,
  Lock,
  CheckCircle2,
  EyeOff,
  Copy,
  Check,
} from 'lucide-react';

export const ReportAtrocitiesPage: React.FC = () => {
  const { counties, addConfidentialReport, showNotification } = useData();

  const [incidentType, setIncidentType] = useState<ConfidentialReport['incidentType']>(
    'Attacks on Civilians and Killings'
  );
  const [dateOfIncident, setDateOfIncident] = useState('');
  const [county, setCounty] = useState('Bor County');
  const [payam, setPayam] = useState('');
  const [boma, setBoma] = useState('');
  const [description, setDescription] = useState('');
  const [victimCount, setVictimCount] = useState('');
  const [perpetratorDetails, setPerpetratorDetails] = useState('');
  const [isWitnessProtected, setIsWitnessProtected] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterContact, setReporterContact] = useState('');

  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      showNotification('Please provide incident details.');
      return;
    }

    const trackingCode = addConfidentialReport({
      incidentType,
      dateOfIncident: dateOfIncident || 'Date not specified',
      county,
      payam: payam.trim() || 'Unspecified Payam',
      boma: boma.trim() || 'Unspecified Boma',
      description: description.trim(),
      victimCount: victimCount.trim() || undefined,
      perpetratorDetails: perpetratorDetails.trim() || undefined,
      isWitnessProtected,
      reporterContact: isAnonymous ? undefined : reporterContact.trim(),
    });

    setSubmittedCode(trackingCode);
  };

  const handleCopyCode = () => {
    if (submittedCode) {
      navigator.clipboard.writeText(submittedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setSubmittedCode(null);
    setDescription('');
    setPayam('');
    setBoma('');
    setVictimCount('');
    setPerpetratorDetails('');
    setReporterContact('');
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6">
        <div className="flex items-center gap-2 text-red-600 font-extrabold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Sitemap Section 10 · Confidential Safeguards</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-1">
          Confidential Human Rights & Incident Reporting
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] mt-1">
          Strictly protected channel to document child abductions, attacks on civilians, displacement, and serious abuses.
        </p>
      </div>

      {/* Mandatory Safeguards Banner */}
      <div className="bg-[#111111] text-white rounded-2xl p-4 sm:p-8 space-y-4 shadow-xl border border-[#222222]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center font-bold shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base">
              10. Confidential Reporting Protocol
            </h3>
            <p className="text-[10px] sm:text-xs text-[#FFD700] font-bold">
              Protected Incident Safeguard · Zero Public Exposure
            </p>
          </div>
        </div>

        <p className="text-xs text-[#bbbbbb] leading-relaxed">
          In strict compliance with JIPA Human Rights Safeguards, <strong>serious-abuse reports require an isolated confidential process and NEVER appear publicly or go to the general WhatsApp number</strong>. Reports are received directly by our vetted Legal & Human Rights Subcommittee for documentation and safe referral.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs text-[#bbbbbb] pt-2 border-t border-[#222222]">
          <div className="flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Anonymous Option</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#FFD700] shrink-0" />
            <span>Encrypted Data Vault</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>Strict Witness Protection</span>
          </div>
        </div>
      </div>

      {/* Success Confirmation Screen */}
      {submittedCode ? (
        <div className="bg-white rounded-2xl border border-emerald-300 p-6 sm:p-8 shadow-md text-center space-y-4 sm:space-y-5 animate-in fade-in duration-300">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
              Report Safely Received & Secured
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] max-w-lg mx-auto">
              Your report has been assigned a unique confidential tracking code. No identifying network data has been logged.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 bg-[#f5f5f5] rounded-xl border border-[#dddddd] inline-block max-w-sm w-full">
            <span className="text-[10px] uppercase font-bold text-[#999999] block mb-1">
              Confidential Tracking Code
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono font-black text-base sm:text-lg text-[#CC9900]">
                {submittedCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 hover:bg-[#dddddd] rounded text-[#666666] transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-[#999999] mt-1">
              Keep this code safe for any confidential follow-ups.
            </p>
          </div>

          <div className="pt-2 sm:pt-4">
            <button
              onClick={resetForm}
              className="w-full sm:w-auto bg-[#111111] hover:bg-[#222222] text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        /* The Report Intake Form */
        <div className="bg-white rounded-2xl border border-[#dddddd] p-4 sm:p-10 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 text-xs">
            {/* Category / Abuse Type */}
            <div>
              <label className="block font-black text-[#222222] text-xs sm:text-sm mb-2">
                Type of Serious Abuse / Incident *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Attacks on Civilians and Killings',
                  'Child Abductions',
                  'Sexual Violence',
                  'Torture and Detention',
                  'Disappearances',
                  'Forced Displacement',
                  'Burning and Looting',
                  'Other Serious Abuses',
                ].map((type) => (
                  <label
                    key={type}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-colors ${
                      incidentType === type
                        ? 'border-red-500 bg-red-50/60 font-bold text-red-950 ring-1 ring-red-400'
                        : 'border-[#dddddd] bg-[#f5f5f5] hover:bg-[#f0f0f0] text-[#444444]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="incidentType"
                      value={type}
                      checked={incidentType === type}
                      onChange={() => setIncidentType(type as any)}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="text-[11px] sm:text-xs">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location (County, Payam, Boma) */}
            <div className="border-t border-[#f0f0f0] pt-4 sm:pt-5 space-y-3 sm:space-y-4">
              <h3 className="font-extrabold text-[#111111] text-xs sm:text-sm">
                Incident Location & Date
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block font-bold text-[#444444] mb-1">County *</label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white text-xs"
                  >
                    {counties.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">Payam</label>
                  <input
                    type="text"
                    placeholder="e.g., Anyidi Payam"
                    value={payam}
                    onChange={(e) => setPayam(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">Boma / Village / Camp</label>
                  <input
                    type="text"
                    placeholder="e.g., Machibol Village"
                    value={boma}
                    onChange={(e) => setBoma(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-bold text-[#444444] mb-1">Approximate Date / Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 14 October 2026, early morning"
                    value={dateOfIncident}
                    onChange={(e) => setDateOfIncident(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">Number of Victims (If known)</label>
                  <input
                    type="text"
                    placeholder="e.g., 3 children abducted, 2 injured"
                    value={victimCount}
                    onChange={(e) => setVictimCount(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-[#f0f0f0] pt-4 sm:pt-5 space-y-3 sm:space-y-4">
              <h3 className="font-extrabold text-[#111111] text-xs sm:text-sm">
                Detailed Incident Description *
              </h3>

              <div>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide objective facts: What took place? Who was attacked? What assets were looted or burned? Were weapons used?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-[#bbbbbb] rounded-xl bg-white text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">
                  Suspected Perpetrators / Armed Group Details (If known)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Armed youth from border area, uniform markings, direction of withdrawal..."
                  value={perpetratorDetails}
                  onChange={(e) => setPerpetratorDetails(e.target.value)}
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white text-xs"
                />
              </div>
            </div>

            {/* Protection & Anonymity */}
            <div className="border-t border-[#f0f0f0] pt-4 sm:pt-5 space-y-3 sm:space-y-4">
              <h3 className="font-extrabold text-[#111111] text-xs sm:text-sm">
                Reporter Identity & Protection
              </h3>

              <div className="space-y-3 bg-[#f5f5f5] p-3.5 sm:p-4 rounded-xl border border-[#dddddd]">
                <label className="flex items-center gap-2.5 cursor-pointer font-bold text-[#222222] text-[11px] sm:text-xs">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="text-red-600 focus:ring-red-500 rounded w-4 h-4"
                  />
                  <span>Submit 100% Anonymously (Recommended if in danger)</span>
                </label>

                {!isAnonymous && (
                  <div>
                    <label className="block font-bold text-[#444444] mb-1 text-[11px]">
                      Confidential Contact Phone or Email (Only for JIPA Human Rights Desk)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., +211 9..."
                      value={reporterContact}
                      onChange={(e) => setReporterContact(e.target.value)}
                      className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white text-xs"
                    />
                  </div>
                )}

                <label className="flex items-center gap-2.5 cursor-pointer text-[#444444] text-[11px] sm:text-xs">
                  <input
                    type="checkbox"
                    checked={isWitnessProtected}
                    onChange={(e) => setIsWitnessProtected(e.target.checked)}
                    className="text-red-600 focus:ring-red-500 rounded w-4 h-4"
                  />
                  <span>Apply strict witness protection protocol (redact identifying names)</span>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Lock className="w-4 h-4" />
                <span>Submit Confidential Report Securely</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
