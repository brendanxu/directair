import React from 'react';
import { 
  Home, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  Luggage
} from 'lucide-react';
import { DirectAirBrandLogo } from './Common/DirectAirBrandLogo';

export type ActiveTab = 'home' | 'flight_results' | 'wishlist' | 'trips' | 'wallet_and_tools' | 'transparency';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (activeTab: ActiveTab) => void;
  tripCount: number;
  wishlistCount: number;
  assetCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  tripCount,
  wishlistCount,
  assetCount,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'home': return '官网直通';
      case 'flight_results': return '官方航班报价';
      case 'wishlist': return '愿望清单 & 次卡雷达';
      case 'trips': return '我的行程 (Trips)';
      case 'wallet_and_tools': return '卡包与工具箱';
      case 'transparency': return '透明运维账本';
    }
  };

  const isHomeOrResults = activeTab === 'home' || activeTab === 'flight_results';

  return (
    <>
      {/* Mobile Top App Header */}
      <div className="sticky top-0 z-40 bg-obsidian-950/90 backdrop-blur-xl px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer select-none"
        >
          <DirectAirBrandLogo size="sm" showBadge={true} />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-300 whitespace-nowrap">{getTabTitle()}</span>
          <button
            onClick={() => setActiveTab(activeTab === 'transparency' ? 'home' : 'transparency')}
            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
              activeTab === 'transparency'
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                : 'bg-obsidian-850 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
            title="查看透明运维账本"
          >
            <Activity className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Native 4-Tab Bottom TabBar - Apple HIG & Skyward Glassmorphism */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-obsidian-950/95 border-t border-white/10 backdrop-blur-2xl px-2 pt-2 pb-5 flex justify-around items-center max-w-[412px] mx-auto shadow-2xl">
        {/* Tab 1: Home (首页) */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all active:scale-95 ${
            isHomeOrResults ? 'text-aviation-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wide whitespace-nowrap leading-none">首页</span>
        </button>

        {/* Tab 2: Wishlist & Radar (愿望雷达) */}
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-2xl relative transition-all active:scale-95 ${
            activeTab === 'wishlist' ? 'text-aviation-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wide whitespace-nowrap leading-none">愿望雷达</span>
          {wishlistCount > 0 && (
            <span className="absolute top-0.5 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white text-[8px] flex items-center justify-center font-mono animate-pulse">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Tab 3: Trips (我的行程) */}
        <button
          onClick={() => setActiveTab('trips')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-2xl relative transition-all active:scale-95 ${
            activeTab === 'trips' ? 'text-amber-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Luggage className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wide whitespace-nowrap leading-none">我的行程</span>
          {tripCount > 0 && (
            <span className="absolute top-0.5 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-amber-950 text-[8px] flex items-center justify-center font-mono font-black">
              {tripCount}
            </span>
          )}
        </button>

        {/* Tab 4: Wallet & Tools (卡包与工具) */}
        <button
          onClick={() => setActiveTab('wallet_and_tools')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-2xl relative transition-all active:scale-95 ${
            activeTab === 'wallet_and_tools' ? 'text-aviation-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wide whitespace-nowrap leading-none">卡包与工具</span>
          {assetCount > 0 && (
            <span className="absolute top-0.5 right-1 w-3.5 h-3.5 rounded-full bg-slate-700 text-slate-200 text-[8px] flex items-center justify-center font-mono">
              {assetCount}
            </span>
          )}
        </button>
      </nav>
    </>
  );
};
