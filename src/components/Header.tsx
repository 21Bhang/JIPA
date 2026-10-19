import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { NavigationPage } from '../types';
import { JipaLogo } from './JipaLogo';
import { LanguageToggle } from './LanguageToggle';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  ShieldAlert,
  Flame,
  Users,
  Building2,
  FileText,
  Calendar,
  Vote,
  Flag,
  Phone,
  HelpCircle,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPage, navigateTo, setIsSearchOpen, siteSettings } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const desktopNavItems: { label: string; page: NavigationPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Leadership', page: 'leadership' },
    { label: 'PAC', page: 'pac' },
    { label: 'Counties', page: 'counties' },
    { label: 'Candidates', page: 'candidates' },
    { label: 'News', page: 'news' },
    { label: 'Join JIPA', page: 'join' },
    { label: 'Contact', page: 'contact' },
  ];

  const fullSitemapMenu = [
    {
      label: 'Home',
      page: 'home' as NavigationPage,
      icon: Flame,
      subItems: ['About JIPA', 'Vision and Mission', 'PAC', 'Nine Counties', 'Candidates', 'Priorities', 'Report Atrocities'],
    },
    {
      label: 'About JIPA',
      page: 'about' as NavigationPage,
      icon: HelpCircle,
      subItems: ['Who We Are', 'Background', 'Vision & Mission', 'Mandate', 'Guiding Principles', 'Operating Guidelines'],
    },
    {
      label: 'Leadership',
      page: 'leadership' as NavigationPage,
      icon: Users,
      subItems: ['General Assembly', 'PAC Executive', 'Standing Subcommittees', 'Advisory Board', 'County Reps'],
    },
    {
      label: 'Political Action Committee (PAC)',
      page: 'pac' as NavigationPage,
      icon: Users,
      subItems: ['180 County Delegates', '10 Standing Subcommittees', '15 Advisors', 'Resolutions & Notices'],
    },
    {
      label: 'Nine Counties',
      page: 'counties' as NavigationPage,
      icon: Building2,
      subItems: ['Bor', 'Twic East', 'Duk', 'Akobo', 'Nyirol', 'Uror', 'Ayod', 'Pigi', 'Fangak', 'Payams & Bomas'],
    },
    {
      label: 'Candidates',
      page: 'candidates' as NavigationPage,
      icon: Vote,
      subItems: ['Become a Candidate', 'Vetting & Eligibility', 'Gubernatorial', 'National & State MP', 'Candidate Pledge'],
    },
    {
      label: 'Elections',
      page: 'elections' as NavigationPage,
      icon: Vote,
      subItems: ['Electoral Law', 'Voter Registration', 'Polling Stations', 'Election Observation', 'Election Complaints'],
    },
    {
      label: 'Political Action',
      page: 'action' as NavigationPage,
      icon: Flag,
      subItems: ['Community Meetings', 'Chiefs & Elders', 'Youth & Women', 'Peaceful Demonstrations', 'Petitions'],
    },
    {
      label: 'Our 20 Priorities',
      page: 'priorities' as NavigationPage,
      icon: Flame,
      subItems: ['Peace & Security', 'Child Recovery', 'Anti-Raiding', 'Flood Dikes', 'Roads & River Transport', 'Hospitals'],
    },
    {
      label: 'Report Atrocities',
      page: 'report' as NavigationPage,
      icon: ShieldAlert,
      highlight: true,
      subItems: ['Attacks on Civilians', 'Child Abductions', 'Sexual Violence', 'Confidential Reporting Vault'],
    },
    {
      label: 'Join JIPA',
      page: 'join' as NavigationPage,
      icon: Users,
      highlight: true,
      subItems: ['Register Interest', 'Volunteer Signup', 'Diaspora Chapters', 'Assisted County Registration'],
    },
    {
      label: 'News & Statements',
      page: 'news' as NavigationPage,
      icon: FileText,
      subItems: ['Latest News', 'Announcements', 'Public Statements', 'Speeches', 'Archive'],
    },
    {
      label: 'Meetings & Schedule',
      page: 'meetings' as NavigationPage,
      icon: Calendar,
      subItems: ['PAC Meetings', 'County Assemblies', 'Boma Rallies', 'Meeting Notices'],
    },
    {
      label: 'Official Documents',
      page: 'documents' as NavigationPage,
      icon: FileText,
      subItems: ['Guiding Principles', 'Operating Guidelines', 'Manifesto', 'Nomination Forms', 'Resolutions'],
    },
    {
      label: 'Contact & Offices',
      page: 'contact' as NavigationPage,
      icon: Phone,
      subItems: ['Secretariat Juba/Bor', 'All 9 County Reps', 'Diaspora Inquiries', 'Official WhatsApp'],
    },
  ];

  const handleNavClick = (page: NavigationPage) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#dddddd] shadow-xs transition-all">
        {/* Top Mini Bar for slow connections / official contact (Desktop) */}
        <div className="bg-[#111111] text-[#bbbbbb] text-xs px-4 py-1.5 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>Jonglei State, Republic of South Sudan</span>
              <span className="text-[#666666]">|</span>
              <a
                href={`mailto:${siteSettings.email}`}
                className="hover:text-[#FFD700] transition-colors"
              >
                {siteSettings.email}
              </a>
              <span className="text-[#666666]">|</span>
              <span className="text-[#FFD700] font-semibold">@JIPASouthSudan</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#FFE44D] font-bold tracking-wider uppercase text-[10px] bg-[#111111]/80 px-2 py-0.5 rounded border border-[#E6C200]/40">
                Independent Political Movement
              </span>
              <button
                onClick={() => handleNavClick('report')}
                className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Report Atrocities (Confidential)</span>
              </button>
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            {/* Logo and Brand Name */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1 sm:flex-initial"
            >
              <JipaLogo size="sm" className="shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-black text-xs sm:text-base lg:text-lg leading-tight tracking-tight text-[#111111] group-hover:text-[#222222] transition-colors truncate sm:whitespace-normal">
                  JONGLEI INDEPENDENT
                  <br className="hidden sm:inline" />
                  <span className="sm:inline"> POLITICAL ALLIANCE</span>
                </span>
                <span className="text-[9px] sm:text-xs font-black tracking-widest text-[#E6C200] uppercase mt-0.5 truncate">
                  POWER TO THE PEOPLE
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {desktopNavItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`px-3 py-2 text-sm font-bold rounded-md transition-colors ${
                      isActive
                        ? 'text-[#CC9900] bg-[#FFFDE7] border-b-2 border-[#E6C200]'
                        : 'text-[#444444] hover:text-[#111111] hover:bg-[#f0f0f0]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right Utilities (Search + Hamburger Drawer trigger) */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search site"
                className="p-2.5 text-[#666666] hover:text-[#111111] hover:bg-[#f0f0f0] rounded-lg transition-colors"
                title="Search JIPA"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="All Pages Sitemap Menu"
                className="p-2 text-[#222222] hover:text-[#0a0a0a] hover:bg-[#f0f0f0] rounded-lg transition-colors flex items-center gap-1.5 font-bold text-sm"
                title="Full Site Directory"
              >
                <Menu className="w-6 h-6 text-[#111111]" />
                <span className="text-xs uppercase font-extrabold text-[#666666] tracking-wider">
                  Menu
                </span>
              </button>
            </div>

            {/* Mobile Controls (Touch-friendly 44px+ hit area) */}
            <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search site"
                className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#111111] rounded-lg active:bg-[#f0f0f0]"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="w-11 h-11 flex items-center justify-center text-[#111111] bg-[#f0f0f0] active:bg-[#dddddd] rounded-xl transition-colors shadow-xs"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Sitemap Slide-over Drawer (Touch-Optimized for all phones) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0a0a0a]/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-[#111111] text-white h-full overflow-y-auto no-scrollbar shadow-2xl z-10 flex flex-col">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-[#111111]/98 backdrop-blur-md px-5 py-4 border-b border-[#222222] flex items-center justify-between z-20">
              <div className="flex items-center gap-2.5">
                <JipaLogo size="xs" variant="dark" />
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm tracking-tight text-white leading-tight">
                    JIPA SITEMAP DIRECTORY
                  </h3>
                  <p className="text-[10px] font-bold text-[#FFD700] tracking-wider">
                    POWER TO THE PEOPLE
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[#999999] hover:text-white rounded-lg active:bg-[#222222] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="px-5 py-4 space-y-2 flex-1 pb-16">
              <div className="p-3 bg-[#E6C200]/10 border border-[#E6C200]/30 rounded-xl mb-3">
                <p className="text-xs text-[#FFF176] leading-relaxed">
                  Official portal for the 9 counties of Jonglei State. Fast, open, and accessible on all devices.
                </p>
              </div>

              {fullSitemapMenu.map((item) => {
                const Icon = item.icon;
                const isSelected = currentPage === item.page;
                const isExpanded = expandedSubmenu === item.label;

                return (
                  <div
                    key={item.label}
                    className="border-b border-[#222222]/80 pb-1.5 last:border-none"
                  >
                    <div className="flex items-center justify-between min-h-[44px]">
                      <button
                        onClick={() => handleNavClick(item.page)}
                        className={`flex items-center gap-3 py-2 text-left text-sm font-bold transition-colors flex-1 ${
                          isSelected
                            ? 'text-[#FFD700] font-extrabold'
                            : item.highlight
                            ? 'text-[#FFE44D] hover:text-[#FFF176]'
                            : 'text-[#dddddd] hover:text-white'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isSelected
                              ? 'text-[#FFD700]'
                              : item.highlight
                              ? 'text-[#FFD700]'
                              : 'text-[#999999]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>

                      {item.subItems && item.subItems.length > 0 && (
                        <button
                          onClick={() => setExpandedSubmenu(isExpanded ? null : item.label)}
                          className="w-10 h-10 flex items-center justify-center text-[#999999] hover:text-[#FFD700] active:bg-[#222222] rounded-lg transition-colors shrink-0"
                          aria-label="Expand submenu"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#FFD700]' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Expandable Submenu */}
                    {isExpanded && item.subItems && (
                      <div className="pl-6 pr-2 py-2 mt-1 space-y-2 bg-[#0a0a0a]/60 rounded-xl text-xs text-[#bbbbbb]">
                        {item.subItems.map((sub) => (
                          <div
                            key={sub}
                            onClick={() => handleNavClick(item.page)}
                            className="py-1.5 hover:text-[#FFE44D] cursor-pointer flex items-center justify-between active:text-[#FFD700]"
                          >
                            <span>{sub}</span>
                            <span className="text-[10px] text-[#888888]">→</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-5 pb-[max(1.25rem,calc(0.75rem+env(safe-area-inset-bottom,0px)))] bg-[#0a0a0a] border-t border-[#222222] text-xs text-[#999999] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="truncate">WhatsApp: {siteSettings.whatsappNumber}</span>
                <LanguageToggle compact />
              </div>
              <p className="text-[10px] text-[#888888]">
                www.jipasouthsudan.org
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
