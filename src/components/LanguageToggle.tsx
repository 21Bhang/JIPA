import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center gap-1 bg-[#222222]/80 border border-[#444444] rounded-lg p-0.5"
      role="group"
      aria-label="Language selector"
    >
      {!compact && (
        <Globe className="w-3 h-3 text-[#999999] ml-1.5 shrink-0" aria-hidden="true" />
      )}
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded-md text-[11px] font-black transition-all ${
          lang === 'en'
            ? 'bg-[#FFD700] text-[#0a0a0a]'
            : 'text-[#bbbbbb] hover:text-white'
        }`}
        aria-pressed={lang === 'en'}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`px-2 py-1 rounded-md text-[11px] font-black transition-all ${
          lang === 'ar'
            ? 'bg-[#FFD700] text-[#0a0a0a]'
            : 'text-[#bbbbbb] hover:text-white'
        }`}
        aria-pressed={lang === 'ar'}
        aria-label="التبديل إلى العربية"
      >
        عربي
      </button>
    </div>
  );
};
