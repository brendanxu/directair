import React, { useState, useEffect } from 'react';
import { ChevronRight, Plane } from 'lucide-react';

interface SkywardCountdownCardProps {
  onCardClick?: () => void;
  flightNo?: string;
  airlineName?: string;
  originCode?: string;
  destCode?: string;
  gate?: string;
  seat?: string;
}

export const SkywardCountdownCard: React.FC<SkywardCountdownCardProps> = ({
  onCardClick,
  flightNo = 'MU5101',
  airlineName = '中国东航',
  originCode = 'PEK',
  destCode = 'SHA',
  gate = 'C42',
  seat = '12F',
}) => {
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(8062); // ~ 02:14:22

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = Math.floor(timeLeftSeconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((timeLeftSeconds % 3600) / 60).toString().padStart(2, '0');
  const secs = (timeLeftSeconds % 60).toString().padStart(2, '0');

  return (
    <div 
      onClick={onCardClick}
      className="cursor-pointer group relative rounded-2xl px-4 py-3 bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-amber-500/35 hover:border-amber-400/60 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_16px_rgba(223,169,56,0.12)] transition-all duration-200 select-none overflow-hidden"
    >
      {/* Background Ambient Warm Golden Glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Main Single-Tier Compact Layout (Height ~72px, 0 Overflow, 0 Clipping) */}
      <div className="flex items-center justify-between relative z-10">
        {/* Left Side: Route, Flight Number & Gate/Seat */}
        <div className="space-y-1 min-w-0 pr-3">
          {/* Airline, Flight No & Live Indicator */}
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
            <span className="font-bold text-amber-300 font-mono tracking-tight text-[11px]">
              {airlineName} {flightNo}
            </span>
            <span className="text-slate-600 text-[10px]">·</span>
            <span className="text-[10px] text-slate-400 font-medium">
              登机口 <strong className="text-amber-300 font-mono font-bold">{gate}</strong>
            </span>
            <span className="text-slate-600 text-[10px]">·</span>
            <span className="text-[10px] text-slate-400 font-medium">
              座位 <strong className="text-slate-200 font-mono font-bold">{seat}</strong>
            </span>
          </div>

          {/* Large City Codes Route */}
          <div className="flex items-baseline space-x-2 leading-none">
            <span className="text-xl font-black font-mono text-white tracking-tight">
              {originCode}
            </span>
            <Plane className="w-3.5 h-3.5 text-amber-400 shrink-0 transform rotate-45" />
            <span className="text-xl font-black font-mono text-white tracking-tight">
              {destCode}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-800/40 px-1.5 py-0.2 rounded ml-1">
              准点
            </span>
          </div>
        </div>

        {/* Right Side: Compact Glowing Countdown */}
        <div className="text-right shrink-0 pl-2">
          <div className="flex items-center justify-end space-x-1 text-[10px] font-mono text-slate-400 font-bold">
            <span className="tracking-wide text-amber-400/90">起飞倒计时</span>
            <ChevronRight className="w-3 h-3 text-amber-400/70 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Properly Sized Crisp Monospace Timer */}
          <div className="text-xl font-black font-mono text-amber-100 tracking-wider drop-shadow-[0_0_10px_rgba(247,208,112,0.55)] leading-none mt-1">
            {hrs}:{mins}:{secs}
          </div>

          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block mt-0.5">
            HRS : MIN : SEC
          </span>
        </div>
      </div>

      {/* Bottom Integrated Thin 2px Golden Flight Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-obsidian-950/80">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_6px_rgba(223,169,56,0.8)]"
          style={{ width: '68%' }}
        ></div>
      </div>
    </div>
  );
};
