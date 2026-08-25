import React from 'react';
import officialIcon from '../../assets/brand_icon_official.png';

interface DirectAirBrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const DirectAirBrandLogo: React.FC<DirectAirBrandLogoProps> = ({
  size = 'md',
  showBadge = true,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
    xl: 'w-16 h-16',
  }[size];

  const textSize = {
    sm: { zh: 'text-sm', en: 'text-xs', badge: 'text-[8px] px-1 py-0.2' },
    md: { zh: 'text-base', en: 'text-sm', badge: 'text-[9px] px-1.5 py-0.5' },
    lg: { zh: 'text-2xl', en: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    xl: { zh: 'text-3xl', en: 'text-2xl', badge: 'text-xs px-2.5 py-0.5' },
  }[size];

  return (
    <div className={`flex items-center space-x-2 select-none ${className}`}>
      {/* 1. Official Confirmed Golden Continuous Flight Mark */}
      <div className={`relative shrink-0 flex items-center justify-center ${iconDimensions}`}>
        <img
          src={officialIcon}
          alt="直航 DirectAir"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(223,169,56,0.35)] transform hover:scale-105 transition-transform"
        />
      </div>

      {/* 2. Confirmed Scheme A Typography: 「直航」in Gold + 「DirectAir」in Pure White */}
      <div className="flex items-baseline space-x-1.5 leading-none">
        <span className={`font-black text-amber-300 tracking-tight font-sans ${textSize.zh}`}>
          直航
        </span>
        <span className={`font-black text-white tracking-tight font-sans ${textSize.en}`}>
          DirectAir
        </span>

        {showBadge && (
          <span className={`rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono font-bold whitespace-nowrap ml-1 ${textSize.badge}`}>
            PRO
          </span>
        )}
      </div>
    </div>
  );
};
