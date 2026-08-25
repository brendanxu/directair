import React, { useState } from 'react';
import { 
  Wifi, 
  Battery, 
  ShieldCheck, 
  Smartphone, 
  Maximize2, 
  Minimize2,
  Lock
} from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const currentTime = '09:41';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-0 sm:py-6 sm:px-4 selection:bg-aviation-500 selection:text-white">
      {/* Top Floating Tooling Header for Desktop Viewers */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-3 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-4 h-4 text-aviation-400" />
          <span className="font-semibold text-white">DirectAir 移动端真机视图</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-aviation-950 text-aviation-300 border border-aviation-800">
            iPhone 16 Pro (393 × 852)
          </span>
        </div>

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title={isFullscreen ? '切换为手机机壳模式' : '切换为全宽响应模式'}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>机壳模式</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>全屏宽视图</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container - Either Phone Shell or Fullscreen */}
      <div
        className={`w-full transition-all duration-300 flex flex-col bg-slate-950 relative overflow-hidden ${
          isFullscreen
            ? 'max-w-4xl min-h-screen sm:rounded-3xl sm:border sm:border-slate-800 sm:shadow-2xl'
            : 'max-w-[412px] min-h-screen sm:min-h-[850px] sm:max-h-[890px] sm:rounded-[48px] sm:border-[8px] sm:border-slate-800 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-slate-700/50'
        }`}
      >
        {/* iOS Native Status Bar */}
        <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md pt-3 px-6 pb-2 flex items-center justify-between text-xs text-white select-none shrink-0 border-b border-slate-900/40">
          <span className="font-semibold tracking-tight text-[13px]">{currentTime}</span>

          {/* Dynamic Island Pill */}
          <div className="h-5 px-3 rounded-full bg-slate-900 border border-slate-800/80 flex items-center space-x-1.5 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <Lock className="w-2.5 h-2.5 text-aviation-400" />
            <span className="text-[10px] text-slate-300 font-mono">本地保险箱已就绪</span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-300">
            <span className="text-[10px] font-mono">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Inner Scrollable Mobile App Body */}
        <div className="flex-1 overflow-y-auto flex flex-col relative">
          {children}
        </div>

        {/* iOS Home Indicator Bar at the bottom */}
        <div className="sticky bottom-0 z-50 pointer-events-none pb-2 pt-1 flex justify-center bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
          <div className="w-32 h-1 rounded-full bg-slate-600/70"></div>
        </div>
      </div>
    </div>
  );
};
