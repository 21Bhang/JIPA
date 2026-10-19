import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { NewsItem, MeetingItem, CandidateItem, CountyInfo } from '../types';
import {
  Lock,
  Unlock,
  Settings,
  FileText,
  Calendar,
  Vote,
  Building2,
  Users,
  ShieldAlert,
  Save,
  Plus,
  Trash2,
  Edit2,
  Download,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    news,
    addNews,
    updateNews,
    deleteNews,
    meetings,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    candidates,
    addCandidate,
    updateCandidate,
    counties,
    updateCounty,
    registrations,
    confidentialReports,
    showNotification,
  } = useData();

  const [enteredPin, setEnteredPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<
    'settings' | 'news' | 'meetings' | 'candidates' | 'counties' | 'registrations' | 'reports'
  >('settings');

  // Form states for Settings
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  // Form states for News
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<NewsItem['category']>('Latest News');
  const [newsCounty, setNewsCounty] = useState('State-wide');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsImageUrl, setNewsImageUrl] = useState('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80');

  // Form states for Meetings
  const [meetTitle, setMeetTitle] = useState('');
  const [meetType, setMeetType] = useState<MeetingItem['type']>('Community Meetings');
  const [meetDate, setMeetDate] = useState('01 Nov 2026');
  const [meetTime, setMeetTime] = useState('10:00 AM – 1:00 PM');
  const [meetCounty, setMeetCounty] = useState('Bor County');
  const [meetLocation, setMeetLocation] = useState('');
  const [meetAgenda, setMeetAgenda] = useState('');

  // Selected County to Edit
  const [editingCountyId, setEditingCountyId] = useState(counties[0].id);
  const countyToEdit = counties.find((c) => c.id === editingCountyId) || counties[0];
  const [countyCoordinator, setCountyCoordinator] = useState(countyToEdit.coordinatorName);
  const [countyPhone, setCountyPhone] = useState(countyToEdit.coordinatorPhone);
  const [countyOffice, setCountyOffice] = useState(countyToEdit.officeLocation);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === siteSettings.adminPin || enteredPin === '2026') {
      setIsAuthenticated(true);
      showNotification('Administrator authenticated.');
    } else {
      showNotification('Incorrect PIN. (Default default PIN is 2026)');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim()) {
      showNotification('Please fill in title and summary.');
      return;
    }
    addNews({
      title: newsTitle.trim(),
      category: newsCategory,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      county: newsCounty,
      summary: newsSummary.trim(),
      content: newsContent.trim() || newsSummary.trim(),
      author: 'JIPA Administration',
      imageUrl: newsImageUrl.trim(),
      featured: false,
    });
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
  };

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetTitle.trim() || !meetLocation.trim()) {
      showNotification('Please provide meeting title and location.');
      return;
    }
    addMeeting({
      title: meetTitle.trim(),
      type: meetType,
      date: meetDate,
      time: meetTime,
      county: meetCounty,
      location: meetLocation.trim(),
      agenda: meetAgenda.trim() || 'General community briefing',
      contactPerson: 'Local Committee Desk',
      contactPhone: siteSettings.phone,
      openToPublic: true,
    });
    setMeetTitle('');
    setMeetLocation('');
    setMeetAgenda('');
  };

  const handleSaveCounty = (e: React.FormEvent) => {
    e.preventDefault();
    updateCounty({
      ...countyToEdit,
      coordinatorName: countyCoordinator,
      coordinatorPhone: countyPhone,
      officeLocation: countyOffice,
    });
  };

  const exportRegistrationsCsv = () => {
    if (registrations.length === 0) {
      showNotification('No member registrations to export yet.');
      return;
    }
    const headers = 'ID,Timestamp,Full Name,Gender,Phone,WhatsApp,County,Payam,Boma,Diaspora,Interests\n';
    const rows = registrations
      .map(
        (r) =>
          `"${r.id}","${r.timestamp}","${r.fullName}","${r.gender}","${r.phone}","${r.whatsapp}","${r.county}","${r.payam}","${r.boma}","${r.isDiaspora ? 'Yes' : 'No'}","${r.interests.join(';')}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jipa_members_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Member registrations exported to CSV.');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FFD700] text-[#0a0a0a] flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#111111]">
            JIPA Administrator Portal
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Restricted access for website administrator and PAC secretariat.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl border border-[#dddddd] shadow-sm space-y-4 text-xs text-left">
          <div>
            <label className="block font-bold text-[#444444] mb-1">
              Security PIN Code
            </label>
            <input
              type="password"
              autoFocus
              placeholder="Enter PIN (Default: 2026)"
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              className="w-full p-2.5 border border-[#bbbbbb] rounded-lg text-sm text-center font-mono font-bold tracking-widest"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#111111] hover:bg-[#222222] text-white font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4" />
            <span>Authenticate Session</span>
          </button>
          <p className="text-[10px] text-[#999999] text-center">
            Authorized administrator credential verification
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#dddddd]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              Admin Session Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111] mt-1">
            Website Administration & Data Hub
          </h1>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs font-bold text-[#666666] hover:text-[#111111] bg-[#f0f0f0] px-3.5 py-2 rounded-lg self-start sm:self-auto"
        >
          Lock / Logout
        </button>
      </div>

      {/* Tabs (Horizontal touch scroll on mobile, flex row on desktop) */}
      <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-1.5 sm:gap-2 border-b border-[#dddddd] pb-2 text-xs flex-nowrap">
        {[
          { id: 'settings', label: 'Site Settings & WhatsApp', icon: Settings },
          { id: 'news', label: `News & Statements (${news.length})`, icon: FileText },
          { id: 'meetings', label: `Meetings (${meetings.length})`, icon: Calendar },
          { id: 'candidates', label: `Candidates (${candidates.length})`, icon: Vote },
          { id: 'counties', label: 'County Desks & Contacts', icon: Building2 },
          { id: 'registrations', label: `Registrations (${registrations.length})`, icon: Users },
          { id: 'reports', label: `Confidential Reports (${confidentialReports.length})`, icon: ShieldAlert, highlight: true },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-3 sm:px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-[#FFD700] text-[#0a0a0a] shadow-sm'
                  : tab.highlight
                  ? 'bg-red-50 text-red-700 hover:bg-red-100'
                  : 'bg-white text-[#666666] hover:bg-[#f0f0f0] active:bg-[#dddddd]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SETTINGS */}
      {activeAdminTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-[#dddddd] p-6 sm:p-8 shadow-sm max-w-3xl space-y-6 text-xs">
          <div>
            <h2 className="text-lg font-black text-[#111111]">
              Site Configuration (Developer Note 08 & Section 17)
            </h2>
            <p className="text-[#888888]">
              Update official contact numbers, WhatsApp live channel, and official social accounts.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#444444] mb-1">
                  Official WhatsApp Number * (Section 17.02)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                  }
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, email: e.target.value })
                  }
                  className="w-full p-2.5 border border-[#bbbbbb] rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">
                Default WhatsApp Initial Message
              </label>
              <input
                type="text"
                value={settingsForm.whatsappMessageDefault}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, whatsappMessageDefault: e.target.value })
                }
                className="w-full p-2.5 border border-[#bbbbbb] rounded-lg"
              />
            </div>

            <div className="pt-2 border-t border-[#f0f0f0] space-y-3">
              <h3 className="font-extrabold text-[#222222] text-sm">
                Social Media Links (Section 17.03 - @JIPASouthSudan)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#666666] mb-1">Facebook</label>
                  <input
                    type="text"
                    value={settingsForm.socials.facebook}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        socials: { ...settingsForm.socials, facebook: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#666666] mb-1">X (Twitter)</label>
                  <input
                    type="text"
                    value={settingsForm.socials.twitter}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        socials: { ...settingsForm.socials, twitter: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#666666] mb-1">Instagram</label>
                  <input
                    type="text"
                    value={settingsForm.socials.instagram}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        socials: { ...settingsForm.socials, instagram: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#666666] mb-1">TikTok</label>
                  <input
                    type="text"
                    value={settingsForm.socials.tiktok}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        socials: { ...settingsForm.socials, tiktok: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#666666] mb-1">YouTube</label>
                  <input
                    type="text"
                    value={settingsForm.socials.youtube}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        socials: { ...settingsForm.socials, youtube: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#666666] mb-1">Admin Passkey PIN</label>
                  <input
                    type="text"
                    value={settingsForm.adminPin}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, adminPin: e.target.value })
                    }
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="bg-[#111111] hover:bg-[#222222] text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Site Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: NEWS */}
      {activeAdminTab === 'news' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-4 text-xs">
            <h2 className="text-base font-black text-[#111111] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#E6C200]" />
              <span>Publish New Article or Statement</span>
            </h2>

            <form onSubmit={handleAddNews} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#444444] mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Article headline..."
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">Category</label>
                  <select
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value as any)}
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                  >
                    <option value="Latest News">Latest News</option>
                    <option value="Announcements">Announcements</option>
                    <option value="Public Statements">Public Statements</option>
                    <option value="Speeches and Interviews">Speeches & Interviews</option>
                    <option value="Archive">Archive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#444444] mb-1">County Tag</label>
                  <select
                    value={newsCounty}
                    onChange={(e) => setNewsCounty(e.target.value)}
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                  >
                    <option value="State-wide">State-wide</option>
                    {counties.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newsImageUrl}
                    onChange={(e) => setNewsImageUrl(e.target.value)}
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">Summary Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short excerpt for homepage cards..."
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  className="w-full p-2 border border-[#bbbbbb] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">Full Content</label>
                <textarea
                  rows={4}
                  placeholder="Full text of statement..."
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  className="w-full p-2 border border-[#bbbbbb] rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black py-2.5 px-5 rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Article</span>
              </button>
            </form>
          </div>

          {/* Existing News List */}
          <div className="bg-white rounded-2xl border border-[#dddddd] divide-y divide-[#f0f0f0] overflow-hidden text-xs">
            {news.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#996600]">{item.category}</span>
                  <h4 className="font-extrabold text-sm text-[#111111]">{item.title}</h4>
                  <p className="text-[#888888] text-[11px]">{item.date} · {item.county || 'State-wide'}</p>
                </div>
                <button
                  onClick={() => deleteNews(item.id)}
                  className="p-2 text-[#999999] hover:text-red-600 rounded-lg transition-colors"
                  title="Delete article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MEETINGS */}
      {activeAdminTab === 'meetings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-4 text-xs">
            <h2 className="text-base font-black text-[#111111] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#E6C200]" />
              <span>Schedule New Meeting / Gathering</span>
            </h2>

            <form onSubmit={handleAddMeeting} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#444444] mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Youth and Women Assembly"
                    value={meetTitle}
                    onChange={(e) => setMeetTitle(e.target.value)}
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">Type</label>
                  <select
                    value={meetType}
                    onChange={(e) => setMeetType(e.target.value as any)}
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                  >
                    <option value="Community Meetings">Community Meetings</option>
                    <option value="County Meetings">County Meetings</option>
                    <option value="PAC Meetings">PAC Meetings</option>
                    <option value="Payam Meetings">Payam Meetings</option>
                    <option value="Boma Meetings">Boma Meetings</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#444444] mb-1">Date</label>
                  <input
                    type="text"
                    value={meetDate}
                    onChange={(e) => setMeetDate(e.target.value)}
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">Time</label>
                  <input
                    type="text"
                    value={meetTime}
                    onChange={(e) => setMeetTime(e.target.value)}
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#444444] mb-1">County</label>
                  <select
                    value={meetCounty}
                    onChange={(e) => setMeetCounty(e.target.value)}
                    className="w-full p-2 border border-[#bbbbbb] rounded-lg bg-white"
                  >
                    {counties.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    <option value="Juba / Central">Juba / Central</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">Venue / Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Akobo Town Center Pavilion"
                  value={meetLocation}
                  onChange={(e) => setMeetLocation(e.target.value)}
                  className="w-full p-2 border border-[#bbbbbb] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-[#444444] mb-1">Agenda Summary</label>
                <input
                  type="text"
                  placeholder="Discussion points..."
                  value={meetAgenda}
                  onChange={(e) => setMeetAgenda(e.target.value)}
                  className="w-full p-2 border border-[#bbbbbb] rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black py-2.5 px-5 rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Meeting</span>
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-[#dddddd] divide-y divide-[#f0f0f0] overflow-hidden text-xs">
            {meetings.map((m) => (
              <div key={m.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#996600]">{m.type}</span>
                  <h4 className="font-extrabold text-sm text-[#111111]">{m.title}</h4>
                  <p className="text-[#888888] text-[11px]">{m.date} · {m.location} ({m.county})</p>
                </div>
                <button
                  onClick={() => deleteMeeting(m.id)}
                  className="p-2 text-[#999999] hover:text-red-600 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CANDIDATES */}
      {activeAdminTab === 'candidates' && (
        <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-4 text-xs">
          <h2 className="text-base font-black text-[#111111]">
            Candidate Verification & PAC Endorsement (Developer Note 09)
          </h2>
          <div className="divide-y divide-[#f0f0f0]">
            {candidates.map((cand) => (
              <div key={cand.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#996600]">{cand.office}</span>
                  <h4 className="font-bold text-sm text-[#111111]">{cand.name}</h4>
                  <p className="text-[#888888]">{cand.county} · Verified: {cand.verifiedDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={cand.status}
                    onChange={(e) => updateCandidate({ ...cand, status: e.target.value as any })}
                    className="p-1.5 border border-[#bbbbbb] rounded text-xs bg-white font-bold"
                  >
                    <option value="Vetted & Endorsed">Vetted & Endorsed</option>
                    <option value="Application Under Review">Application Under Review</option>
                    <option value="Nominated">Nominated</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: COUNTIES */}
      {activeAdminTab === 'counties' && (
        <div className="bg-white rounded-2xl border border-[#dddddd] p-6 sm:p-8 shadow-sm space-y-6 text-xs max-w-2xl">
          <div>
            <h2 className="text-base font-black text-[#111111]">
              Update County Coordination Desk Details
            </h2>
            <p className="text-[#888888]">Select a county to update representative contact and address.</p>
          </div>

          <form onSubmit={handleSaveCounty} className="space-y-4">
            <div>
              <label className="block font-bold text-[#444444] mb-1">Select County</label>
              <select
                value={editingCountyId}
                onChange={(e) => {
                  setEditingCountyId(e.target.value);
                  const selected = counties.find((c) => c.id === e.target.value);
                  if (selected) {
                    setCountyCoordinator(selected.coordinatorName);
                    setCountyPhone(selected.coordinatorPhone);
                    setCountyOffice(selected.officeLocation);
                  }
                }}
                className="w-full p-2.5 border border-[#bbbbbb] rounded-lg bg-white"
              >
                {counties.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">Coordinator / Liaison Name</label>
              <input
                type="text"
                value={countyCoordinator}
                onChange={(e) => setCountyCoordinator(e.target.value)}
                className="w-full p-2.5 border border-[#bbbbbb] rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">Phone & WhatsApp</label>
              <input
                type="text"
                value={countyPhone}
                onChange={(e) => setCountyPhone(e.target.value)}
                className="w-full p-2.5 border border-[#bbbbbb] rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-[#444444] mb-1">Office Location</label>
              <input
                type="text"
                value={countyOffice}
                onChange={(e) => setCountyOffice(e.target.value)}
                className="w-full p-2.5 border border-[#bbbbbb] rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="bg-[#111111] hover:bg-[#222222] text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Update {countyToEdit.name}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 6: MEMBER REGISTRATIONS */}
      {activeAdminTab === 'registrations' && (
        <div className="bg-white rounded-2xl border border-[#dddddd] p-6 shadow-sm space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-black text-[#111111]">
                Registered Members & Volunteers ({registrations.length})
              </h2>
              <p className="text-[#888888]">
                Submitted through the Join JIPA portal.
              </p>
            </div>
            <button
              onClick={exportRegistrationsCsv}
              className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black px-4 py-2 rounded-lg flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          {registrations.length === 0 ? (
            <div className="p-8 text-center text-[#999999]">
              No new registrations received in this browser session. Test register via "Join JIPA".
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left divide-y divide-[#dddddd]">
                <thead>
                  <tr className="text-[#999999] font-bold text-[10px] uppercase">
                    <th className="py-2">Name</th>
                    <th className="py-2">County & Payam</th>
                    <th className="py-2">Phone</th>
                    <th className="py-2">Diaspora</th>
                    <th className="py-2">Interests</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  {registrations.map((r) => (
                    <tr key={r.id}>
                      <td className="py-2.5 font-bold text-[#111111]">{r.fullName}</td>
                      <td className="py-2.5 text-[#666666]">{r.county} ({r.payam})</td>
                      <td className="py-2.5 font-mono text-[#444444]">{r.phone}</td>
                      <td className="py-2.5 text-[#888888]">{r.isDiaspora ? r.diasporaCountry : 'Local'}</td>
                      <td className="py-2.5 text-[11px] text-[#888888]">{r.interests.slice(0, 2).join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 7: CONFIDENTIAL ATROCITY REPORTS (Developer Note 10) */}
      {activeAdminTab === 'reports' && (
        <div className="bg-[#111111] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl border border-red-900/50 text-xs">
          <div className="flex items-center gap-3 border-b border-[#222222] pb-4">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <div>
              <h2 className="text-base font-black text-white">
                Protected Confidential Incident Vault
              </h2>
              <p className="text-[#999999] text-[11px]">
                Developer Note 10 Safeguard: Isolated from public view and general WhatsApp.
              </p>
            </div>
          </div>

          {confidentialReports.length === 0 ? (
            <div className="p-12 text-center text-[#888888]">
              Vault clean. No reports currently stored in this local session.
            </div>
          ) : (
            <div className="space-y-3">
              {confidentialReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-[#222222]/90 rounded-xl border border-[#444444] space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-black text-[#FFD700] bg-[#111111]/80 px-2.5 py-0.5 rounded border border-[#E6C200]/30">
                      {report.trackingCode}
                    </span>
                    <span className="text-[10px] text-red-300 font-bold uppercase bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">
                      {report.incidentType}
                    </span>
                    <span className="text-[#999999] text-[10px]">
                      {new Date(report.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-xs text-[#bbbbbb] space-y-1">
                    <p>
                      <strong>Location:</strong> {report.county} · {report.payam} ({report.boma})
                    </p>
                    <p>
                      <strong>Date of Incident:</strong> {report.dateOfIncident}
                    </p>
                    {report.victimCount && (
                      <p className="text-[#FFE44D]">
                        <strong>Casualties / Victims:</strong> {report.victimCount}
                      </p>
                    )}
                    <p className="text-[#dddddd] bg-[#111111] p-2.5 rounded border border-[#444444] mt-2 leading-relaxed">
                      {report.description}
                    </p>
                    {report.perpetratorDetails && (
                      <p className="text-[#999999] text-[11px] pt-1">
                        <strong>Perpetrator Info:</strong> {report.perpetratorDetails}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#444444] flex items-center justify-between text-[11px]">
                    <span className="text-[#999999]">
                      Contact: {report.reporterContact ? report.reporterContact : 'Anonymous Reporter (Protected)'}
                    </span>
                    <span className="font-bold text-emerald-400">
                      Status: {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
