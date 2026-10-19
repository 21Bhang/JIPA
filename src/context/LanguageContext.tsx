import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  // Nav
  home: string;
  about: string;
  leadership: string;
  pac: string;
  counties: string;
  candidates: string;
  news: string;
  joinJipa: string;
  contact: string;
  // Hero
  heroTagline: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroJoin: string;
  heroLearnMore: string;
  // Sections
  latestNews: string;
  upcomingMeetings: string;
  nineCounties: string;
  ourPriorities: string;
  joinCta: string;
  // General
  readMore: string;
  viewAll: string;
  search: string;
  back: string;
  submit: string;
  cancel: string;
  close: string;
  download: string;
  share: string;
  loading: string;
  // Pages
  aboutJipa: string;
  ourCandidates: string;
  reportAtrocities: string;
  officialDocuments: string;
  meetingsSchedule: string;
  electionsVoting: string;
  politicalAction: string;
  priorities20: string;
  adminPanel: string;
  // About phrases
  powerToThePeople: string;
  jongleiState: string;
  southSudan: string;
}

const translations: Record<Language, Translations> = {
  en: {
    home: 'Home',
    about: 'About',
    leadership: 'Leadership',
    pac: 'PAC',
    counties: 'Counties',
    candidates: 'Candidates',
    news: 'News',
    joinJipa: 'Join JIPA',
    contact: 'Contact',
    heroTagline: 'JONGLEI INDEPENDENT POLITICAL ALLIANCE',
    heroTitle1: 'POWER TO',
    heroTitle2: 'THE PEOPLE',
    heroSubtitle:
      'An independent political movement bringing together independent candidates, voters and supporters from all nine counties of Jonglei State.',
    heroJoin: 'Join JIPA',
    heroLearnMore: 'Learn More',
    latestNews: 'Latest News',
    upcomingMeetings: 'Upcoming Meetings',
    nineCounties: 'Nine Counties',
    ourPriorities: 'Our Priorities',
    joinCta: 'Stand with Jonglei. Join JIPA Today.',
    readMore: 'Read More',
    viewAll: 'View All',
    search: 'Search',
    back: 'Back',
    submit: 'Submit',
    cancel: 'Cancel',
    close: 'Close',
    download: 'Download',
    share: 'Share',
    loading: 'Loading…',
    aboutJipa: 'About JIPA',
    ourCandidates: 'Our Candidates',
    reportAtrocities: 'Report Atrocities',
    officialDocuments: 'Official Documents',
    meetingsSchedule: 'Meetings & Schedule',
    electionsVoting: 'Elections & Voting',
    politicalAction: 'Political Action',
    priorities20: 'Our 20 Priorities',
    adminPanel: 'Admin Panel',
    powerToThePeople: 'POWER TO THE PEOPLE',
    jongleiState: 'Jonglei State',
    southSudan: 'South Sudan',
  },
  ar: {
    home: 'الرئيسية',
    about: 'عن التحالف',
    leadership: 'القيادة',
    pac: 'لجنة العمل السياسي',
    counties: 'المقاطعات',
    candidates: 'المرشحون',
    news: 'الأخبار',
    joinJipa: 'انضم إلى جيبا',
    contact: 'تواصل معنا',
    heroTagline: 'تحالف جونغلي المستقل السياسي',
    heroTitle1: 'السلطة',
    heroTitle2: 'للشعب',
    heroSubtitle:
      'حركة سياسية مستقلة تجمع المرشحين المستقلين والناخبين والمؤيدين من جميع مقاطعات ولاية جونغلي التسع.',
    heroJoin: 'انضم إلى جيبا',
    heroLearnMore: 'اعرف المزيد',
    latestNews: 'آخر الأخبار',
    upcomingMeetings: 'الاجتماعات القادمة',
    nineCounties: 'المقاطعات التسع',
    ourPriorities: 'أولوياتنا',
    joinCta: 'قف مع جونغلي. انضم إلى جيبا اليوم.',
    readMore: 'اقرأ المزيد',
    viewAll: 'عرض الكل',
    search: 'بحث',
    back: 'رجوع',
    submit: 'إرسال',
    cancel: 'إلغاء',
    close: 'إغلاق',
    download: 'تحميل',
    share: 'مشاركة',
    loading: 'جارٍ التحميل…',
    aboutJipa: 'عن جيبا',
    ourCandidates: 'مرشحونا',
    reportAtrocities: 'الإبلاغ عن الانتهاكات',
    officialDocuments: 'الوثائق الرسمية',
    meetingsSchedule: 'الاجتماعات والجدول',
    electionsVoting: 'الانتخابات والتصويت',
    politicalAction: 'العمل السياسي',
    priorities20: 'أولوياتنا العشرون',
    adminPanel: 'لوحة الإدارة',
    powerToThePeople: 'السلطة للشعب',
    jongleiState: 'ولاية جونغلي',
    southSudan: 'جنوب السودان',
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('jipa_lang');
      if (saved === 'ar' || saved === 'en') return saved as Language;
    } catch {}
    return 'en';
  });

  const setLang = (l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem('jipa_lang', l);
    } catch {}
  };

  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
