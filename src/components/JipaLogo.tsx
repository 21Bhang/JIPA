import React from 'react';

interface JipaLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  variant?: 'light' | 'dark' | 'color';
  onClick?: () => void;
}

export const JipaLogo: React.FC<JipaLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  variant = 'color',
  onClick,
}) => {
  const sizeMap = {
    xs:   32,
    sm:   44,
    md:   56,
    lg:   72,
    xl:  100,
    hero: 160,
  };

  const px = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Real JIPA logo PNG — background removed */}
      <img
        src="/JIPA_Logo.png"
        alt="JIPA — Jonglei Independent Political Alliance"
        width={px}
        height={px}
        style={{ width: px, height: px }}
        className="shrink-0 drop-shadow-md object-contain"
        draggable={false}
      />

      {/* Optional brand text */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-black tracking-tight text-base sm:text-lg lg:text-xl leading-tight ${
              variant === 'dark' ? 'text-white' : 'text-[#111111]'
            }`}
          >
            JONGLEI INDEPENDENT
            <br />
            POLITICAL ALLIANCE
          </span>
          <span
            className="text-xs sm:text-sm font-extrabold tracking-widest uppercase mt-0.5"
            style={{ color: 'var(--jipa-yellow)' }}
          >
            POWER TO THE PEOPLE
          </span>
        </div>
      )}
    </div>
  );
};
