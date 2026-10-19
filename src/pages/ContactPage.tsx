import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Globe,
  Building2,
  Send,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { siteSettings, counties, showNotification } = useData();

  const [formType, setFormType] = useState<
    'General Inquiries' | 'PAC Secretariat' | 'Membership / Candidates' | 'Diaspora Contact' | 'Complaints & Feedback'
  >('General Inquiries');

  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('Bor County');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) {
      showNotification('Please provide your name and message.');
      return;
    }
    showNotification(`Message dispatched to JIPA ${formType} Desk. We will get back to you.`);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
            Sitemap Section 15
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
            Contact JIPA
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            PAC Secretariat, all nine county coordination offices, diaspora liaisons, and general inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Top 3 Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFF9C4] text-[#664400] flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-[#111111]">
            01. General & Email Inquiries
          </h3>
          <p className="text-xs text-[#666666]">
            For general questions, public relations, press statements, and event notices.
          </p>
          <a
            href={`mailto:${siteSettings.email}`}
            className="text-[#996600] font-bold text-xs hover:underline block pt-1"
          >
            {siteSettings.email}
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-[#111111]">
            02. PAC Secretariat Desk
          </h3>
          <p className="text-xs text-[#666666]">
            Official WhatsApp number for central leadership coordination and assistance.
          </p>
          <p className="text-[#111111] font-bold font-mono text-xs pt-1">
            {siteSettings.whatsappNumber}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] text-[#222222] flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-[#111111]">
            05. Diaspora Liaison Desk
          </h3>
          <p className="text-xs text-[#666666]">
            Liaison desk for chapters across USA, Australia, Canada, Kenya, Uganda, and UK.
          </p>
          <p className="text-[#444444] font-semibold text-xs pt-1">
            diaspora@jipasouthsudan.org
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Form (Left) + 03. County Contacts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#dddddd] p-4 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-[#111111]">
                Message Received
              </h3>
              <p className="text-xs text-[#666666] max-w-sm mx-auto">
                Thank you for contacting JIPA. A representative from the designated committee will follow up with you.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#111111] hover:bg-[#222222] text-white font-bold text-xs px-5 py-2.5 rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="border-b border-[#f0f0f0] pb-3">
                <h3 className="font-extrabold text-[#111111] text-base">
                  Send an Official Inquiry or Feedback
                </h3>
                <p className="text-[#888888] text-xs">
                  04. Membership · 06. Complaints & Community Feedback
                </p>
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">
                  Inquiry Department *
                </label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as any)}
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                >
                  <option value="General Inquiries">01. General Inquiries</option>
                  <option value="PAC Secretariat">02. PAC Secretariat & Leadership</option>
                  <option value="Membership / Candidates">04. Membership & Candidate Inquiries</option>
                  <option value="Diaspora Contact">05. Diaspora Participation Desk</option>
                  <option value="Complaints & Feedback">06. Complaints & Constructive Feedback</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#444444] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Maker Thon Deng"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">
                    Phone / WhatsApp or Email *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+211 9... or user@example.com"
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#444444] mb-1">
                    Relevant County (If applicable)
                  </label>
                  <select
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                  >
                    {counties.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    <option value="All Counties / State-wide">State-wide / Juba Liaison</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief description of inquiry..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">
                  Message / Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can JIPA assist you or your community? Write clearly..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
                />
              </div>

              <div className="p-3 bg-[#f5f5f5] rounded-lg border border-[#dddddd] text-[#888888] text-[11px]">
                Note: Serious human rights abuses and child abductions must NOT be sent through this general form. Please use the dedicated <strong>Report Atrocities</strong> portal.
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black text-xs py-3 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* 03. All Nine County Contacts (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#111111] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#E6C200]" />
              <span>03. County Coordination Offices</span>
            </h3>
            <span className="text-[11px] text-[#888888]">All 9 Counties</span>
          </div>

          <div className="space-y-3">
            {counties.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-[#dddddd] p-3.5 shadow-sm hover:border-[#FFD700] transition-colors space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#111111]">{c.name}</h4>
                  <span className="text-[10px] text-[#888888] font-semibold">
                    HQ: {c.headquarters}
                  </span>
                </div>
                <p className="text-[#666666] text-[11px]">{c.officeLocation}</p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#444444]">{c.coordinatorPhone}</span>
                  <a
                    href={`https://wa.me/${c.coordinatorWhatsApp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    WhatsApp Desk →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
