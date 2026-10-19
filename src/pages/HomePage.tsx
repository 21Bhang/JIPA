import React from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { useData } from '../context/DataContext';
import { JipaLogo } from '../components/JipaLogo';
import { JongleiMap } from '../components/JongleiMap';
import { useLanguage } from '../context/LanguageContext';
import {
  Users,
  Building2,
  Vote,
  FileText,
  ShieldAlert,
  Calendar,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

// Reusable fade-in-up animation
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' as const },
  }),
};

export const HomePage: React.FC = () => {
  const { navigateTo, news, meetings, counties } = useData();
  const { t } = useLanguage();

  // 7 Quick Action Cards matching mockup
  const quickCards = [
    {
      id: 'about',
      title: t.aboutJipa,
      subtitle: 'Who we are and our priorities',
      icon: Users,
      onClick: () => navigateTo('about'),
    },
    {
      id: 'pac',
      title: t.pac,
      subtitle: 'Political Action Committee',
      icon: Users,
      onClick: () => navigateTo('pac'),
    },
    {
      id: 'counties',
      title: t.nineCounties,
      subtitle: 'Bor, Twic East, Duk, Akobo, Nyirol, Uror, Ayod, Pigi, Fangak',
      icon: Building2,
      onClick: () => navigateTo('counties'),
    },
    {
      id: 'candidates',
      title: t.candidates,
      subtitle: 'Independent candidates',
      icon: Vote,
      onClick: () => navigateTo('candidates'),
    },
    {
      id: 'news',
      title: t.news,
      subtitle: 'Latest news and announcements',
      icon: FileText,
      onClick: () => navigateTo('news'),
    },
    {
      id: 'join',
      title: t.joinJipa,
      subtitle: 'Membership and support',
      icon: Users,
      onClick: () => navigateTo('join'),
    },
    {
      id: 'report',
      title: t.reportAtrocities,
      subtitle: 'Report incidents confidentially',
      icon: ShieldAlert,
      onClick: () => navigateTo('report'),
    },
  ];

  const latestThreeNews = news.slice(0, 3);
  const upcomingFourMeetings = meetings.slice(0, 4);

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      {/* HERO SECTION matching mockup */}
      <section className="relative overflow-hidden bg-[#111111] min-h-[440px] sm:min-h-[520px] lg:min-h-[560px] flex items-center">
        {/* Background Nile River / Jonglei Landscape Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=80')`,
          }}
        >
          {/* Sunset Dramatic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6 text-white text-left">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-[11px] sm:text-sm font-extrabold tracking-widest text-[#FFD700] uppercase drop-shadow-md"
              >
                {t.heroTagline}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none drop-shadow-lg"
              >
                {t.heroTitle1} <br />
                <span className="text-[#FFD700]">{t.heroTitle2}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-sm sm:text-lg text-[#dddddd] max-w-2xl font-medium leading-relaxed drop-shadow"
              >
                {t.heroSubtitle}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <button
                  onClick={() => navigateTo('join')}
                  className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group text-sm sm:text-base active:scale-98"
                >
                  <span>{t.heroJoin}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('about')}
                  className="bg-[#111111]/80 hover:bg-[#222222] text-white font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-[#666666]/80 backdrop-blur-xs transition-all text-sm sm:text-base text-center active:scale-98"
                >
                  {t.heroLearnMore}
                </button>
              </motion.div>
            </div>

            {/* Right Emblem Seal (Desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="hidden lg:flex lg:col-span-4 justify-center items-center"
            >
              <div className="relative p-3 rounded-full bg-[#0a0a0a]/40 backdrop-blur-md border border-[#FFD700]/30 shadow-2xl">
                <JipaLogo size="hero" />
                <div className="absolute -inset-2 rounded-full border border-[#FFD700]/20 animate-pulse pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7 QUICK NAVIGATION CARDS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-4">
          {quickCards.map((card, idx) => {
            const Icon = card.icon;
            const isLastOdd = idx === 6;
            return (
              <motion.div
                key={card.id}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                onClick={card.onClick}
                className={`bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md border border-[#dddddd] hover:border-[#FFD700] active:bg-[#FFFDE7]/40 cursor-pointer transition-all flex flex-col justify-between group h-full ${
                  isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFD700]/20 text-[#CC9900] flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-[#FFD700] group-hover:text-[#0a0a0a] transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-extrabold text-[#111111] text-xs sm:text-sm leading-tight mb-0.5 sm:mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#888888] line-clamp-2 leading-snug">
                    {card.subtitle}
                  </p>
                </div>
                <div className="mt-2 sm:mt-3 pt-1 text-right">
                  <span className="text-[#999999] group-hover:text-[#E6C200] font-bold text-xs inline-block group-hover:translate-x-0.5 transition-transform">
                    ›
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* MAIN TWO-COLUMN SECTION: LATEST NEWS (Left) + UPCOMING MEETINGS (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LATEST NEWS COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-[#dddddd] pb-3">
              <h2 className="text-lg sm:text-2xl font-black text-[#111111]">
                {t.latestNews}
              </h2>
              <button
                onClick={() => navigateTo('news')}
                className="text-xs sm:text-sm font-bold text-[#444444] hover:text-[#CC9900] flex items-center gap-1 transition-colors"
              >
                <span>{t.viewAll}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* 3 News Cards in Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {latestThreeNews.map((item, idx) => (
                <motion.article
                  key={item.id}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeUp}
                  onClick={() => navigateTo('news', item.id)}
                  className="bg-white rounded-xl border border-[#dddddd] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col cursor-pointer group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f0f0f0]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.county && (
                      <span className="absolute bottom-2 left-2 bg-[#111111]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {item.county}
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                    <div>
                      <time className="text-[10px] sm:text-[11px] font-bold text-[#999999] block mb-1">
                        {item.date}
                      </time>
                      <h3 className="font-extrabold text-xs sm:text-sm text-[#111111] leading-snug line-clamp-2 group-hover:text-[#CC9900] transition-colors mb-1.5 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#666666] line-clamp-3 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                    <div className="pt-3 sm:pt-4 mt-2 border-t border-[#f0f0f0] flex items-center text-xs font-bold text-[#222222] group-hover:text-[#CC9900]">
                      <span>{t.readMore}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* UPCOMING MEETINGS COLUMN (4 cols) */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-[#dddddd] pb-3">
              <h2 className="text-lg sm:text-2xl font-black text-[#111111]">
                {t.upcomingMeetings}
              </h2>
              <button
                onClick={() => navigateTo('meetings')}
                className="text-xs sm:text-sm font-bold text-[#444444] hover:text-[#CC9900] flex items-center gap-1 transition-colors"
              >
                <span>{t.viewAll}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#dddddd] divide-y divide-[#f0f0f0] shadow-xs overflow-hidden">
              {upcomingFourMeetings.map((meet) => (
                <div
                  key={meet.id}
                  onClick={() => navigateTo('meetings')}
                  className="p-3.5 sm:p-4 hover:bg-[#f5f5f5] active:bg-[#FFFDE7]/50 cursor-pointer transition-colors flex items-center justify-between group min-h-[56px]"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#f0f0f0] rounded-lg text-[#666666] group-hover:bg-[#FFF9C4] group-hover:text-[#664400] transition-colors shrink-0 mt-0.5">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#999999] block">
                        {meet.date}
                      </span>
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#111111] group-hover:text-[#CC9900] transition-colors leading-snug line-clamp-1">
                        {meet.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-[#888888] mt-0.5">
                        {meet.county}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#999999] group-hover:text-[#CC9900] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </div>
              ))}
            </div>

            {/* Quick Action Box: Confidential Report */}
            <div className="bg-gradient-to-br from-red-50 to-[#FFFDE7] border border-red-200/80 rounded-xl p-4 text-[#111111] space-y-2">
              <div className="flex items-center gap-2 text-red-700 font-extrabold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Confidential Incident Desk</span>
              </div>
              <p className="text-xs text-[#444444] leading-relaxed">
                Have you witnessed child abductions, attacks on civilians, or rights abuses? Report through our secure, encrypted channel.
              </p>
              <button
                onClick={() => navigateTo('report')}
                className="text-xs font-bold text-red-700 hover:text-red-800 underline flex items-center gap-1"
              >
                <span>Submit Confidential Report Securely</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* JONGLEI STATE MAP + NINE COUNTIES */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="bg-[#111111] text-white rounded-2xl p-5 sm:p-8 relative overflow-hidden"
        >
          <div className="relative z-10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#FFD700] uppercase">
                  State-Wide Representation
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white mt-0.5">
                  {t.nineCounties} of Jonglei
                </h3>
                <p className="text-xs sm:text-sm text-[#bbbbbb] mt-1">
                  20 PAC Delegates, local committees, and vetted independent candidates in every county.
                </p>
              </div>
              <button
                onClick={() => navigateTo('counties')}
                className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] font-black px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all self-start sm:self-auto shrink-0"
              >
                Explore All Counties
              </button>
            </div>

            Map + Counties Grid
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Interactive Map */}
              <div className="lg:col-span-5">
                <JongleiMap className="w-full" />
                <p className="text-[10px] text-[#888888] text-center mt-2">
                  Click any county to explore
                </p>
              </div>

              {/* 9 County Grid */}
              <div className="lg:col-span-7 grid grid-cols-3 gap-2">
                {counties.map((county, idx) => (
                  <motion.div
                    key={county.id}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    onClick={() => navigateTo('counties', county.id)}
                    className="bg-[#222222]/80 hover:bg-[#E6C200] hover:text-[#0a0a0a] p-2.5 sm:p-3 rounded-xl border border-[#444444] cursor-pointer transition-all text-center group active:scale-95"
                  >
                    <p className="font-extrabold text-[11px] sm:text-xs text-[#dddddd] group-hover:text-[#0a0a0a] leading-tight truncate">
                      {county.name.replace(' County', '')}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-[#999999] group-hover:text-[#111111] mt-0.5 truncate">
                      {county.headquarters}
                    </p>
                    <p className="text-[9px] text-[#888888] group-hover:text-[#111111] mt-0.5">
                      {county.meetingsCount} meetings
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PRIORITIES & RECONCILIATION HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="border border-[#dddddd] rounded-2xl bg-white p-5 sm:p-10 shadow-xs">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2">
            <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-[#CC9900] uppercase">
              Community Mandate
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-[#111111]">
              Our Foundational Priorities for Jonglei
            </h3>
            <p className="text-xs sm:text-sm text-[#666666]">
              JIPA addresses 20 strategic priorities agreed by grassroots assemblies to permanently transform life across Jonglei State.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                num: '01',
                title: 'Peace & Ending Abductions',
                desc: 'Uncompromising commitment to inter-communal dialogue, halting cattle raids, and reuniting every abducted child with their family.',
                color: 'bg-[#E6C200]',
                textColor: 'text-[#0a0a0a]',
                bg: 'bg-[#FFFDE7]/50 border-[#FFF176]/60',
              },
              {
                num: '07',
                title: 'Roads & River Transport',
                desc: 'Paving the Bor-Akobo highway and deploying public White Nile barges to end isolation and slash food prices.',
                color: 'bg-[#111111]',
                textColor: 'text-[#FFD700]',
                bg: 'bg-[#f5f5f5] border-[#dddddd]',
              },
              {
                num: '17',
                title: 'Permanent Flood Dikes',
                desc: 'Heavy machinery flood walls and river dredging in Twic East, Bor, Duk, Ayod, and Fangak to safeguard homes and farms.',
                color: 'bg-[#E6C200]',
                textColor: 'text-[#0a0a0a]',
                bg: 'bg-[#FFFDE7]/50 border-[#FFF176]/60',
              },
            ].map((p, i) => (
              <motion.div
                key={p.num}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className={`p-4 sm:p-5 rounded-xl border space-y-2 ${p.bg}`}
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${p.color} ${p.textColor} flex items-center justify-center font-black text-sm`}>
                  {p.num}
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#111111]">{p.title}</h4>
                <p className="text-xs text-[#666666] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <button
              onClick={() => navigateTo('priorities')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#CC9900] hover:text-[#996600] underline"
            >
              <span>Explore All 20 Priorities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* JOIN JIPA CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#FFD700] via-[#E6C200] to-yellow-500 rounded-2xl p-6 sm:p-12 text-[#0a0a0a] flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-md"
        >
          <div className="space-y-1.5 sm:space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-4xl font-black leading-tight">
              {t.joinCta}
            </h3>
            <p className="text-[#111111] font-medium text-xs sm:text-base">
              Register as a voter, supporter, volunteer, or diaspora coordinator. No accounts or membership fees required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('join')}
              className="bg-[#0a0a0a] hover:bg-[#111111] text-white font-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-lg transition-all text-xs sm:text-sm text-center"
            >
              Register Interest Now
            </button>
            <button
              onClick={() => navigateTo('candidates')}
              className="bg-white/95 hover:bg-white text-[#0a0a0a] font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl transition-all text-xs sm:text-sm text-center"
            >
              Run as Candidate
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
