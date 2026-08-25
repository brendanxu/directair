import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Calendar, 
  Users, 
  Search, 
  FileEdit, 
  RefreshCw, 
  ShieldCheck, 
  Armchair, 
  ChevronRight, 
  Lock, 
  ArrowRight, 
  Activity, 
  Radio, 
  Compass,
  Repeat,
  SunMoon,
  Clock,
  Plane,
  Crown,
  Sparkles,
  MapPin,
  ScanFace
} from 'lucide-react';
import { CabinClass, WishlistItem, TripType } from '../../types';
import { AirportPickerSheet } from '../FlightSearch/AirportPickerSheet';
import { DirectAirBrandLogo } from '../Common/DirectAirBrandLogo';
import { SkywardCountdownCard } from './SkywardCountdownCard';
import { InsuranceHubModal } from '../Insurance/InsuranceHubModal';

interface HomeViewProps {
  origin: string;
  setOrigin: (origin: string) => void;
  destination: string;
  setDestination: (destination: string) => void;
  date: string;
  setDate: (date: string) => void;
  returnDate: string;
  setReturnDate: (date: string) => void;
  tripType: TripType;
  setTripType: (type: TripType) => void;
  cabinClass: CabinClass;
  setCabinClass: (cabin: CabinClass) => void;
  onSearchFlights: () => void;
  wishlists: WishlistItem[];
  onOpenWishlist: () => void;
  onOpenRightsTool: (subTab: string) => void;
  onOpenTransparency: () => void;
  onNavigateToTrips?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  origin,
  setOrigin,
  destination,
  setDestination,
  date,
  setDate,
  returnDate,
  setReturnDate,
  tripType,
  setTripType,
  cabinClass,
  setCabinClass,
  onSearchFlights,
  wishlists,
  onOpenWishlist,
  onOpenRightsTool,
  onOpenTransparency,
  onNavigateToTrips,
}) => {
  const [isPickingOrigin, setIsPickingOrigin] = useState<boolean>(false);
  const [isPickingDest, setIsPickingDest] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState<boolean>(false);

  const handleSwapAirports = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSwapping(true);
    setTimeout(() => {
      setOrigin(destination);
      setDestination(origin);
      setIsSwapping(false);
    }, 180);
  };

  const handleSelectTripType = (type: TripType) => {
    setTripType(type);
    if (type === 'DAY_RETURN') {
      setReturnDate(date);
    }
  };

  const handleOutboundDateChange = (newDate: string) => {
    setDate(newDate);
    if (tripType === 'DAY_RETURN' || returnDate < newDate) {
      setReturnDate(newDate);
    }
  };

  const getAirportCityName = (code: string) => {
    switch (code) {
      case 'PEK': return { city: '北京', name: '首都机场' };
      case 'PKX': return { city: '北京', name: '大兴机场' };
      case 'SHA': return { city: '上海', name: '虹桥机场' };
      case 'PVG': return { city: '上海', name: '浦东机场' };
      case 'CAN': return { city: '广州', name: '白云机场' };
      case 'SZX': return { city: '深圳', name: '宝安机场' };
      case 'TFU': return { city: '成都', name: '天府机场' };
      case 'CTU': return { city: '成都', name: '双流机场' };
      case 'HGH': return { city: '杭州', name: '萧山机场' };
      case 'CKG': return { city: '重庆', name: '江北机场' };
      case 'XIY': return { city: '西安', name: '咸阳机场' };
      default: return { city: code, name: '机场' };
    }
  };

  const originInfo = getAirportCityName(origin);
  const destInfo = getAirportCityName(destination);
  const activeMatchedWish = wishlists.find(w => w.radarStatus === 'MATCHED_ACTIVE');

  return (
    <div className="relative space-y-4 px-4 pt-3 pb-24 animate-fadeIn">
      {/* Dynamic Ambient Lighting */}
      <div className="aurora-mesh animate-aurora-drift"></div>

      {/* 1. App Header: DirectAir Brand Logo + Skyward Native Face ID Security Indicator */}
      <div className="relative z-10 flex items-center justify-between px-0.5">
        <DirectAirBrandLogo size="md" showBadge={true} />

        <div className="flex items-center space-x-2">
          {/* Skyward Authentic Lock + Face ID Indicator */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-obsidian-850/90 border border-white/10 text-slate-300 text-xs font-mono shadow-sm">
            <Lock className="w-3 h-3 text-amber-400" />
            <ScanFace className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-bold text-[11px]">Face ID</span>
          </div>

          <button
            onClick={onOpenTransparency}
            className="w-7 h-7 rounded-full bg-obsidian-850 border border-white/10 text-slate-400 hover:text-emerald-300 flex items-center justify-center transition-colors"
            title="1元透明运维账本"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* 2. Skyward Authentic LIVE FLIGHT COUNTDOWN Card (02:14:55) */}
      <SkywardCountdownCard onCardClick={onNavigateToTrips} />

      {/* 3. DirectAir Smart Search Capsule (官网全包查票胶囊) */}
      <div className="relative z-10 obsidian-card rounded-3xl p-4 space-y-3.5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-aviation-400" />
            <span className="text-sm font-bold text-white">官网全包查票</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            100% 航司官方直通
          </span>
        </div>

        {/* Trip Type Segmented Controller (单程 / 往返 / 当日往返) */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-obsidian-950 rounded-2xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => handleSelectTripType('ONE_WAY')}
            className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1 ${
              tripType === 'ONE_WAY'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>单程</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTripType('ROUND_TRIP')}
            className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1 ${
              tripType === 'ROUND_TRIP'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Repeat className="w-3 h-3" />
            <span>往返</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTripType('DAY_RETURN')}
            className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1 ${
              tripType === 'DAY_RETURN'
                ? 'bg-amber-600 text-white shadow-md glow-gold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <SunMoon className="w-3 h-3 text-amber-300" />
            <span>当日往返</span>
          </button>
        </div>

        {/* City Pair Capsule */}
        <div className="relative bg-obsidian-900/95 rounded-2xl p-3.5 border border-white/5 shadow-inner">
          <div className="flex items-center justify-between">
            {/* Origin Picker */}
            <div 
              onClick={() => setIsPickingOrigin(true)}
              className={`flex-1 cursor-pointer select-none pl-1 transition-all duration-200 ${
                isSwapping ? 'opacity-30 translate-x-3' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="flex items-baseline space-x-1.5">
                <span className="text-3xl font-black font-mono text-white tracking-tight leading-none">
                  {origin}
                </span>
                <span className="text-sm font-bold text-slate-200 whitespace-nowrap">
                  {originInfo.city}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium truncate mt-1">
                {originInfo.name}
              </div>
            </div>

            {/* Middle Aerodynamic Swap Button */}
            <div className="px-2 z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={handleSwapAirports}
                className="w-9 h-9 rounded-full bg-obsidian-800 border border-aviation-500/40 text-aviation-400 hover:text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform group"
                title="切换出发与到达城市"
              >
                <ArrowRightLeft className={`w-4 h-4 transition-transform duration-200 ${isSwapping ? 'rotate-180 text-aviation-300' : 'group-hover:scale-110'}`} />
              </button>
              <span className="text-[9px] font-mono text-slate-500 mt-1 font-semibold">互换</span>
            </div>

            {/* Destination Picker */}
            <div 
              onClick={() => setIsPickingDest(true)}
              className={`flex-1 cursor-pointer select-none text-right pr-1 transition-all duration-200 ${
                isSwapping ? 'opacity-30 -translate-x-3' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="flex items-baseline justify-end space-x-1.5">
                <span className="text-sm font-bold text-slate-200 whitespace-nowrap">
                  {destInfo.city}
                </span>
                <span className="text-3xl font-black font-mono text-white tracking-tight leading-none">
                  {destination}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium truncate mt-1">
                {destInfo.name}
              </div>
            </div>
          </div>
        </div>

        {/* Date Selector & Day Return Notice */}
        <div className="space-y-2">
          <div className={`grid ${tripType === 'ONE_WAY' ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
            {/* Outbound Date Picker */}
            <div className="bg-obsidian-950 rounded-2xl p-3 border border-white/5 flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-aviation-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-slate-400 block font-medium leading-none mb-1">
                  {tripType === 'ONE_WAY' ? '出发日期' : '去程日期'}
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleOutboundDateChange(e.target.value)}
                  className="bg-transparent text-white font-mono text-xs font-bold focus:outline-none w-full cursor-pointer"
                />
              </div>
            </div>

            {/* Inbound / Return Date Picker (For ROUND_TRIP and DAY_RETURN) */}
            {tripType !== 'ONE_WAY' && (
              <div className="bg-obsidian-950 rounded-2xl p-3 border border-white/5 flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-400 block font-medium leading-none">
                      回程日期
                    </span>
                    {tripType === 'DAY_RETURN' && (
                      <span className="text-[9px] font-mono px-1 rounded bg-amber-950 text-amber-300 font-bold border border-amber-800/60">
                        当日
                      </span>
                    )}
                  </div>
                  <input
                    type="date"
                    value={returnDate}
                    min={date}
                    disabled={tripType === 'DAY_RETURN'}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className={`bg-transparent font-mono text-xs font-bold focus:outline-none w-full ${
                      tripType === 'DAY_RETURN' ? 'text-amber-300 cursor-not-allowed' : 'text-white cursor-pointer'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cabin Class Radio Options */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-obsidian-950 rounded-2xl border border-white/5 text-xs">
          {[
            { id: 'ECONOMY', label: '经济舱' },
            { id: 'PREMIUM_ECONOMY', label: '超经舱' },
            { id: 'BUSINESS', label: '公务舱' },
            { id: 'FIRST', label: '头等舱' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCabinClass(item.id as CabinClass)}
              className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center ${
                cabinClass === item.id
                  ? 'bg-obsidian-750 text-white border border-white/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Search CTA */}
        <button
          onClick={onSearchFlights}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-aviation-500 via-aviation-600 to-aviation-700 hover:from-aviation-400 hover:to-aviation-600 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-xl glow-cyan active:scale-[0.98] transition-all"
        >
          <Search className="w-4 h-4" />
          <span>查询航司官方全量报价</span>
        </button>
      </div>

      {/* 4. Active Flight Pass Radar Release Alert (次卡放票雷达) */}
      {activeMatchedWish && (
        <div 
          onClick={onOpenWishlist}
          className="relative z-10 rounded-3xl p-3.5 bg-gradient-to-r from-emerald-950/80 via-obsidian-900 to-obsidian-950 border border-emerald-500/40 space-y-2.5 shadow-xl cursor-pointer hover:border-emerald-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-emerald-300 font-mono">
                ⚡ 24h 愿望雷达放票命中
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {activeMatchedWish.matchedOffer?.foundAt || '刚刚'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <div>
              <div className="font-bold text-white text-sm">
                {activeMatchedWish.matchedOffer?.origin} → {activeMatchedWish.matchedOffer?.destination}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {activeMatchedWish.matchedOffer?.airlineName} · 适用【{activeMatchedWish.flightPassInfo?.passName}】
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-black font-mono text-emerald-300">
                ¥{activeMatchedWish.flightPassInfo?.fixedCostPerLeg || 399}
              </div>
              <span className="text-[10px] text-emerald-400 font-bold block">
                剩余 {activeMatchedWish.matchedOffer?.seatsLeft || 2} 席 · 可兑换
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Quick Anti-OTA Tools Strip (维权避坑速查直达) */}
      <div className="relative z-10 space-y-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-300">维权避坑与权益工具</span>
          <span className="text-[10px] text-slate-500 font-mono">去中介化服务</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onOpenRightsTool('name_correction')}
            className="p-3 rounded-2xl bg-obsidian-850/80 border border-white/5 hover:border-slate-700 text-left space-y-1 active:bg-obsidian-750 transition-colors"
          >
            <div className="flex items-center space-x-1.5 text-aviation-400 font-bold">
              <FileEdit className="w-3.5 h-3.5" />
              <span>姓名改错计算器</span>
            </div>
            <p className="text-[10px] text-slate-400">
              国泰仅$60 / 错字小修免费
            </p>
          </button>

          <button
            onClick={() => setIsInsuranceModalOpen(true)}
            className="p-3 rounded-2xl bg-obsidian-850/80 border border-amber-500/20 hover:border-amber-500/40 text-left space-y-1 active:bg-obsidian-750 transition-colors"
          >
            <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>透明直保与自动延误险</span>
            </div>
            <p className="text-[10px] text-slate-400">
              满2小时直赔¥300 · 0默认搭售
            </p>
          </button>
        </div>
      </div>

      {/* Official Transparent Insurance Modal */}
      <InsuranceHubModal
        isOpen={isInsuranceModalOpen}
        onClose={() => setIsInsuranceModalOpen(false)}
        flightNo="MU5101"
      />

      {/* Airport Picker Sheet (Origin / Destination) */}
      {isPickingOrigin && (
        <AirportPickerSheet
          onClose={() => setIsPickingOrigin(false)}
          onSelect={(code) => {
            setOrigin(code);
            setIsPickingOrigin(false);
          }}
          title="选择出发机场 / 城市"
          currentCode={origin}
        />
      )}

      {isPickingDest && (
        <AirportPickerSheet
          onClose={() => setIsPickingDest(false)}
          onSelect={(code) => {
            setDestination(code);
            setIsPickingDest(false);
          }}
          title="选择到达机场 / 城市"
          currentCode={destination}
        />
      )}
    </div>
  );
};
