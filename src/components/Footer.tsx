import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { NavigationPage } from '../types';
import { JipaLogo } from './JipaLogo';
import {
  Mail,
  Globe,
  ShieldCheck,
  FileText,
  Heart,
  Share2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, siteSettings } = useData();
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'accessibility' | null>(null);

  const col1Links: { label: string; page: NavigationPage }[] = [
    { label: 'About JIPA', page: 'about' },
    { label: 'Leadership', page: 'leadership' },
    { label: 'Political Action Committee (PAC)', page: 'pac' },
    { label: 'Nine Counties', page: 'counties' },
    { label: 'Candidates', page: 'candidates' },
    { label: 'Elections & Voting', page: 'elections' },
  ];

  const col2Links: { label: string; page: NavigationPage }[] = [
    { label: 'Our 20 Priorities', page: 'priorities' },
    { label: 'News & Statements', page: 'news' },
    { label: 'Meetings Calendar', page: 'meetings' },
    { label: 'Official Documents', page: 'documents' },
    { label: 'Join JIPA (Register)', page: 'join' },
    { label: 'Report Atrocities (Confidential)', page: 'report' },
    { label: 'Contact Us', page: 'contact' },
  ];

  return (
    <>
      <footer className="bg-[#111111] text-[#bbbbbb] pt-16 pb-12 border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#222222]">
            {/* Column 1: Brand & Slogan */}
            <div className="space-y-4">
              <div
                onClick={() => navigateTo('home')}
                className="cursor-pointer inline-flex items-center gap-3"
              >
                <JipaLogo size="sm" variant="dark" />
                <div>
                  <h3 className="font-black text-white text-base leading-tight tracking-tight">
                    JONGLEI INDEPENDENT
                    <br />
                    POLITICAL ALLIANCE
                  </h3>
                  <p className="text-xs font-black tracking-widest text-[#FFD700] uppercase mt-0.5">
                    POWER TO THE PEOPLE
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#999999] leading-relaxed">
                An independent, grassroots political movement uniting independent candidates, voters, and communities across all nine counties of Jonglei State.
              </p>

              <div className="pt-2 text-xs text-[#999999] space-y-1.5">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Bor State Capital Liaison Desk</span>
                </p>
                <p className="text-[#888888]">
                  Non-partisan · Transparent · Community-Led
                </p>
              </div>
            </div>

            {/* Column 2: Governance & Counties */}
            <div>
              <h4 className="text-xs font-black tracking-wider text-[#FFD700] uppercase mb-4">
                Alliance & Counties
              </h4>
              <ul className="space-y-2 text-sm">
                {col1Links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigateTo(link.page)}
                      className="text-[#bbbbbb] hover:text-[#FFD700] transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Action, Priorities & Documents */}
            <div>
              <h4 className="text-xs font-black tracking-wider text-[#FFD700] uppercase mb-4">
                Priorities & Action
              </h4>
              <ul className="space-y-2 text-sm">
                {col2Links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigateTo(link.page)}
                      className="text-[#bbbbbb] hover:text-[#FFD700] transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Social Media */}
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-wider text-[#FFD700] uppercase mb-4">
                Official Contacts & Socials
              </h4>

              <div className="space-y-2.5 text-xs text-[#bbbbbb]">
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="flex items-center gap-2.5 text-[#bbbbbb] hover:text-[#FFD700] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#FFD700] shrink-0" />
                  <span>{siteSettings.email}</span>
                </a>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#FFD700] shrink-0" />
                  <span>{siteSettings.domain}</span>
                </div>
                <div className="text-[#999999]">
                  Official Handle:{' '}
                  <span className="text-white font-bold">@JIPASouthSudan</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <p className="text-[11px] font-bold text-[#999999] uppercase mb-2">
                  Follow JIPA Across Media
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={siteSettings.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#E6C200] hover:text-[#111111] flex items-center justify-center text-xs font-black transition-colors"
                  >
                    f
                  </a>
                  <a
                    href={siteSettings.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X Twitter"
                    className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#E6C200] hover:text-[#111111] flex items-center justify-center text-xs font-black transition-colors"
                  >
                    𝕏
                  </a>
                  <a
                    href={siteSettings.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#E6C200] hover:text-[#111111] flex items-center justify-center text-xs font-black transition-colors"
                  >
                    IG
                  </a>
                  <a
                    href={siteSettings.socials.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                    className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#E6C200] hover:text-[#111111] flex items-center justify-center text-xs font-black transition-colors"
                  >
                    TT
                  </a>
                  <a
                    href={siteSettings.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#E6C200] hover:text-[#111111] flex items-center justify-center text-xs font-black transition-colors"
                  >
                    YT
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Compliance */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#888888]">
            <p className="text-center md:text-left">
              © 2026 Jonglei Independent Political Alliance (JIPA). All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setModalType('privacy')}
                className="hover:text-[#bbbbbb] transition-colors"
              >
                Privacy Policy
              </button>
              <span>|</span>
              <button
                onClick={() => setModalType('terms')}
                className="hover:text-[#bbbbbb] transition-colors"
              >
                Terms of Use
              </button>
              <span>|</span>
              <button
                onClick={() => setModalType('accessibility')}
                className="hover:text-[#bbbbbb] transition-colors"
              >
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl text-[#222222]">
            <div className="flex items-center justify-between pb-4 border-b border-[#dddddd]">
              <h3 className="text-lg font-black text-[#111111]">
                {modalType === 'privacy' && 'JIPA Privacy Policy & Data Protection'}
                {modalType === 'terms' && 'Terms of Use & Community Conduct'}
                {modalType === 'accessibility' && 'Accessibility & Low-Bandwidth Standard'}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="text-[#888888] hover:text-[#111111] p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-sm text-[#666666] space-y-3 leading-relaxed">
              {modalType === 'privacy' && (
                <>
                  <p>
                    <strong>1. Member Privacy:</strong> JIPA is committed to the absolute protection of personal information. Member registrations, contact numbers, and community involvement records are never sold, rented, or shared with partisan bodies or external commercial agencies.
                  </p>
                  <p>
                    <strong>2. Confidential Reporting Safeguards:</strong> Under Developer Note 10, reports of human rights abuses and atrocities submitted through the Confidential Portal are protected with dedicated encryption. They never go to general WhatsApp numbers and are accessible only to accredited human-rights desks.
                  </p>
                  <p>
                    <strong>3. Voluntary Participation:</strong> No citizen is forced to create an account to read or explore JIPA public resources.
                  </p>
                </>
              )}

              {modalType === 'terms' && (
                <>
                  <p>
                    <strong>1. Emerging Movement Status:</strong> JIPA is an emerging, unregistered political movement operating under collective Guiding Principles and Operating Guidelines to advance peace and independent leadership in Jonglei State.
                  </p>
                  <p>
                    <strong>2. Non-Violence & Integrity:</strong> All candidates, coordinators, and members agree to maintain strictly non-violent, lawful, and peaceful civic engagement.
                  </p>
                  <p>
                    <strong>3. Slogan & Logo Usage:</strong> The approved JIPA emblem and the slogan "POWER TO THE PEOPLE" may not be altered or used for fraudulent purposes.
                  </p>
                </>
              )}

              {modalType === 'accessibility' && (
                <>
                  <p>
                    <strong>1. Mobile-First & Slow Connections:</strong> This platform is purposefully optimized for low-bandwidth 2G/3G connectivity typical in rural Jonglei State, with lightweight vector icons, minimal script payloads, and fast caching.
                  </p>
                  <p>
                    <strong>2. Simple English:</strong> Text is written in clear, direct English widely understood by South Sudanese readers.
                  </p>
                  <p>
                    <strong>3. Offline Assistance:</strong> Readers in remote Payams and Bomas can register or receive documents via assisted registration with local county representatives.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-[#dddddd] text-right">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-[#111111] text-white font-bold text-sm rounded-lg hover:bg-[#222222]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
