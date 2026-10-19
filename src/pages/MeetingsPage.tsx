import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { MeetingItem } from '../types';
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  Filter,
  CheckCircle2,
  Users,
  Search,
  MessageCircle,
} from 'lucide-react';

export const MeetingsPage: React.FC = () => {
  const { meetings, counties, showNotification } = useData();

  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [rsvpModalMeeting, setRsvpModalMeeting] = useState<MeetingItem | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');

  const meetingTypes = [
    { id: 'all', label: 'All Gatherings' },
    { id: 'PAC Meetings', label: '02. PAC Plenary' },
    { id: 'County Meetings', label: '03. County Assemblies' },
    { id: 'Payam Meetings', label: '04. Payam Meetings' },
    { id: 'Boma Meetings', label: '05. Boma Rallies' },
    { id: 'Community Meetings', label: '06. Community Gatherings' },
  ];

  const filteredMeetings = meetings.filter((m) => {
    const matchesType = typeFilter === 'all' || m.type === typeFilter;
    const matchesCounty = selectedCounty === 'all' || m.county.includes(selectedCounty);
    return matchesType && matchesCounty;
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpPhone.trim()) {
      showNotification('Please enter your name and phone number.');
      return;
    }
    showNotification(`Attendance registered for ${rsvpModalMeeting?.title}. Details sent to your phone.`);
    setRsvpModalMeeting(null);
    setRsvpName('');
    setRsvpPhone('');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#dddddd] pb-4 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#CC9900] uppercase">
            Sitemap Section 13
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#111111] mt-0.5">
            Meetings & Schedule
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            PAC plenary sessions, county coordination assemblies, boma gatherings, and meeting notices.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 self-start md:self-auto">
          ● All Meetings Follow Non-Violent Principles
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#dddddd] p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap w-full md:w-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-[#999999] shrink-0 hidden sm:block" />
          {meetingTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setTypeFilter(type.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                typeFilter === type.id
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-[#f0f0f0] text-[#666666] hover:bg-[#dddddd] active:bg-[#bbbbbb]'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-[#666666]">County:</span>
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="p-1.5 border border-[#bbbbbb] rounded-lg text-xs bg-white text-[#222222] focus:outline-none"
          >
            <option value="all">All Locations</option>
            {counties.map((c) => (
              <option key={c.id} value={c.name.replace(' County', '')}>
                {c.name}
              </option>
            ))}
            <option value="Juba">Juba Liaison</option>
          </select>
        </div>
      </div>

      {/* 01. Upcoming Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#dddddd] p-12 text-center text-sm text-[#888888]">
            No meetings matching your current filter. Please check back soon or view all counties.
          </div>
        ) : (
          filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm hover:border-[#FFD700] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Date & Info */}
              <div className="flex items-start gap-5">
                {/* Date Badge */}
                <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/20 text-[#996600] flex flex-col items-center justify-center font-black shrink-0 border border-[#FFE44D]/40">
                  <span className="text-xs uppercase leading-none">
                    {meeting.date.split(' ')[1]}
                  </span>
                  <span className="text-xl leading-none mt-0.5">
                    {meeting.date.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-semibold text-[#888888] mt-0.5">
                    2026
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-[#664400] bg-[#FFF9C4] px-2 py-0.5 rounded">
                      {meeting.type}
                    </span>
                    <span className="text-xs font-bold text-[#666666]">
                      {meeting.county}
                    </span>
                    {meeting.openToPublic ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Open to Community
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#666666] bg-[#f0f0f0] px-2 py-0.5 rounded">
                        Accredited Delegates
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-[#111111]">
                    {meeting.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#888888]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#999999]" />
                      <span>{meeting.time}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#999999]" />
                      <span>{meeting.location}</span>
                    </span>
                  </div>

                  <p className="text-xs text-[#666666] pt-1 leading-relaxed max-w-2xl">
                    <strong>Agenda:</strong> {meeting.agenda}
                  </p>
                </div>
              </div>

              {/* Right Action */}
              <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                <button
                  onClick={() => setRsvpModalMeeting(meeting)}
                  className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  Register / RSVP
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 07. Meeting Notices Guidance */}
      <div className="bg-[#f5f5f5] border border-[#dddddd] rounded-2xl p-6 text-xs text-[#666666] space-y-2">
        <h4 className="font-extrabold text-[#111111] text-sm">
          07. Meeting Notices & Protocol for Community Gatherings
        </h4>
        <p className="leading-relaxed">
          All JIPA assemblies are conducted in accordance with the Operating Guidelines. Proceedings begin with a prayer, traditional elder blessings, and an open agenda. Minutes and resolutions are transcribed and certified by the PAC Secretariat for public transparency.
        </p>
      </div>

      {/* RSVP MODAL */}
      {rsvpModalMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-[#111111] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#dddddd]">
              <h3 className="font-black text-base">RSVP: {rsvpModalMeeting.title}</h3>
              <button
                onClick={() => setRsvpModalMeeting(null)}
                className="text-[#999999] hover:text-[#444444]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#666666]">
              Date: <strong>{rsvpModalMeeting.date}</strong> ({rsvpModalMeeting.time})<br />
              Location: <strong>{rsvpModalMeeting.location}</strong>
            </p>

            <form onSubmit={handleRsvpSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#444444] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rebecca Nyibol"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+211 9..."
                  value={rsvpPhone}
                  onChange={(e) => setRsvpPhone(e.target.value)}
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRsvpModalMeeting(null)}
                  className="px-4 py-2 border rounded-lg text-[#666666]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFD700] hover:bg-[#FFE44D] font-bold rounded-lg text-[#0a0a0a]"
                >
                  Confirm Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
