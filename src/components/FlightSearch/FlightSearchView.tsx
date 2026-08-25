import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Calendar, 
  Users, 
  Luggage, 
  Plane, 
  ChevronRight, 
  Sparkles, 
  AlertCircle,
  Wifi,
  Zap,
  Leaf,
  TrendingDown,
  ArrowLeft,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Crown,
  Repeat,
  Gauge
} from 'lucide-react';
import { FlightOffer, CabinOffer, CabinClass, PassengerProfile, WishlistItem, TripType, LoyaltyMembership } from '../../types';
import { HandoffModal } from './HandoffModal';
import { AirportPickerSheet } from './AirportPickerSheet';
import { FlightDetailSheet } from './FlightDetailSheet';
import { MOCK_DATE_PRICE_STRIP } from '../../data/mockData';

interface FlightSearchViewProps {
  flights: FlightOffer[];
  passengers: PassengerProfile[];
  loyaltyCards?: LoyaltyMembership[];
  wishlists: WishlistItem[];
  tripType: TripType;
  date: string;
  returnDate: string;
  onOpenWishlist: () => void;
  onBackToHome: () => void;
}

export const FlightSearchView: React.FC<FlightSearchViewProps> = ({
  flights,
  passengers,
  loyaltyCards = [],
  wishlists,
  tripType,
  date,
  returnDate,
  onOpenWishlist,
  onBackToHome,
}) => {
  const [origin, setOrigin] = useState('PEK');
  const [destination, setDestination] = useState('SHA');
  const [cabinClass, setCabinClass] = useState<CabinClass>('ECONOMY');
  const [currentDirection, setCurrentDirection] = useState<'OUTBOUND' | 'INBOUND'>('OUTBOUND');

  // Sheet openers
  const [isPickingOrigin, setIsPickingOrigin] = useState(false);
  const [isPickingDestination, setIsPickingDestination] = useState(false);
  const [detailFlight, setDetailFlight] = useState<FlightOffer | null>(null);

  // Filters
  const [onlyBaggage, setOnlyBaggage] = useState(false);
  const [onlyWideBody, setOnlyWideBody] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState<string>('ALL');

  // Active Handoff Modal
  const [activeHandoff, setActiveHandoff] = useState<{
    flight: FlightOffer;
    cabin: CabinOffer;
  } | null>(null);

  const handleSwapAirports = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOrigin(destination);
    setDestination(origin);
  };

  const getAirportCityName = (code: string) => {
    switch (code) {
      case 'PEK': return { city: '北京', name: '首都' };
      case 'PKX': return { city: '北京', name: '大兴' };
      case 'SHA': return { city: '上海', name: '虹桥' };
      case 'PVG': return { city: '上海', name: '浦东' };
      case 'CAN': return { city: '广州', name: '白云' };
      case 'SZX': return { city: '深圳', name: '宝安' };
      case 'TFU': return { city: '成都', name: '天府' };
      case 'CTU': return { city: '成都', name: '双流' };
      case 'HGH': return { city: '杭州', name: '萧山' };
      case 'CKG': return { city: '重庆', name: '江北' };
      case 'XIY': return { city: '西安', name: '咸阳' };
      default: return { city: code, name: '机场' };
    }
  };

  const isRoundTrip = tripType === 'ROUND_TRIP' || tripType === 'DAY_RETURN';

  // Filter flights by direction and preferences
  const filteredFlights = flights.filter(flight => {
    if (isRoundTrip && flight.direction && flight.direction !== currentDirection) {
      return false;
    }
    if (selectedAirline !== 'ALL' && flight.segment.airlineCode !== selectedAirline) return false;
    if (onlyWideBody && !flight.segment.isWideBody) return false;
    if (onlyBaggage) {
      const hasBaggage = flight.offers.some(o => !o.baggageAllowance.includes('无免费托运'));
      if (!hasBaggage) return false;
    }
    return true;
  });

  // Helper to match VIP benefits
  const getMatchedVipPrivilege = (airlineCode: string) => {
    const card = loyaltyCards.find(c => c.airlineCode === airlineCode && (c.tier === 'GOLD' || c.tier === 'PLATINUM' || c.tier === 'SILVER'));
    if (!card) return null;
    if (card.tier === 'GOLD' || card.tier === 'PLATINUM') {
      return {
        cardName: card.programName,
        tierLabel: card.tierLabel,
        perks: '享贵宾室休息 · 额外20kg行李 · 天合/星空优先登机',
        badgeColor: 'golden-vip-border text-amber-300'
      };
    }
    return {
      cardName: card.programName,
      tierLabel: card.tierLabel,
      perks: '享额外10kg行李 · 优先值机柜台',
      badgeColor: 'bg-slate-800 text-slate-200 border-slate-600'
    };
  };

  const originInfo = getAirportCityName(origin);
  const destInfo = getAirportCityName(destination);

  return (
    <div className="relative space-y-3 px-4 pt-2 pb-24 animate-fadeIn">
      {/* Ambient Aurora Light */}
      <div className="aurora-mesh animate-aurora-drift"></div>

      {/* Back to Home Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between pb-0.5">
        <button
          onClick={onBackToHome}
          className="h-8 px-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 text-xs font-bold flex items-center space-x-1 hover:text-white active:scale-95 transition-all shadow-sm shrink-0 whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
          <span>返回首页</span>
        </button>

        <div className="text-right min-w-0 pl-2">
          <span className="text-xs font-mono font-bold text-white block truncate leading-none">
            {origin} ⇄ {destination} ({isRoundTrip ? (tripType === 'DAY_RETURN' ? '当日往返' : '往返程') : '单程'})
          </span>
          <span className="text-[10px] text-slate-400 block font-medium mt-0.5 truncate leading-none">
            全网官方直连实时报价
          </span>
        </div>
      </div>

      {/* Round-Trip Outbound vs Inbound Direction Tabs */}
      {isRoundTrip && (
        <div className="relative z-10 grid grid-cols-2 gap-1.5 p-1 bg-obsidian-950 rounded-2xl border border-white/10 text-xs shadow-lg">
          <button
            onClick={() => setCurrentDirection('OUTBOUND')}
            className={`h-9 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 ${
              currentDirection === 'OUTBOUND'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>去程：{originInfo.city} → {destInfo.city}</span>
            <span className="font-mono text-[10px] opacity-80 font-normal">({date.slice(5)})</span>
          </button>

          <button
            onClick={() => setCurrentDirection('INBOUND')}
            className={`h-9 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 ${
              currentDirection === 'INBOUND'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>返程：{destInfo.city} → {originInfo.city}</span>
            <span className="font-mono text-[10px] opacity-80 font-normal">({returnDate.slice(5)})</span>
          </button>
        </div>
      )}

      {/* 1. Google Stitch Floating Capsule Header */}
      <div className="relative z-10 obsidian-card rounded-3xl p-3 space-y-2 shadow-xl">
        <div className="flex items-center justify-between bg-obsidian-900/90 rounded-2xl p-2.5 border border-white/5">
          <div 
            onClick={() => setIsPickingOrigin(true)}
            className="flex-1 cursor-pointer select-none pl-2 active:opacity-75 transition-opacity min-w-0"
          >
            <span className="text-[9px] text-slate-400 font-semibold block uppercase font-mono leading-none">
              {currentDirection === 'OUTBOUND' ? 'DEP' : 'ARR'}
            </span>
            <div className="text-base font-black text-white font-mono flex items-center space-x-1.5 mt-0.5 leading-none">
              <span>{currentDirection === 'OUTBOUND' ? origin : destination}</span>
              <span className="text-xs font-sans text-slate-300 font-bold truncate">
                {currentDirection === 'OUTBOUND' ? originInfo.city : destInfo.city}
              </span>
            </div>
          </div>

          <button
            onClick={handleSwapAirports}
            className="w-8 h-8 rounded-full bg-obsidian-800 border border-white/10 text-aviation-400 hover:text-white flex items-center justify-center active:scale-90 transition-all shrink-0 mx-2 shadow-md"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>

          <div 
            onClick={() => setIsPickingDestination(true)}
            className="flex-1 text-right cursor-pointer select-none pr-2 active:opacity-75 transition-opacity min-w-0"
          >
            <span className="text-[9px] text-slate-400 font-semibold block uppercase font-mono leading-none">
              {currentDirection === 'OUTBOUND' ? 'ARR' : 'DEP'}
            </span>
            <div className="text-base font-black text-white font-mono flex items-center justify-end space-x-1.5 mt-0.5 leading-none">
              <span className="text-xs font-sans text-slate-300 font-bold truncate">
                {currentDirection === 'OUTBOUND' ? destInfo.city : originInfo.city}
              </span>
              <span>{currentDirection === 'OUTBOUND' ? destination : origin}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Neon Price Insights Gauge */}
      <div className="relative z-10 p-3 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-obsidian-900 to-obsidian-900 border border-emerald-500/30 space-y-1.5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-emerald-300 text-xs font-bold truncate">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">价格洞察：当前航段全包价处于历史低位</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 shrink-0 ml-1.5 whitespace-nowrap">
            低价推荐
          </span>
        </div>

        {/* 3-Tier Price Level Gauge Bar */}
        <div className="space-y-1">
          <div className="h-1.5 w-full rounded-full bg-obsidian-800 flex overflow-hidden">
            <div className="w-1/3 bg-emerald-400 rounded-l-full relative glow-emerald">
              <div className="absolute right-2 -top-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-emerald-500 shadow-md"></div>
            </div>
            <div className="w-1/3 bg-slate-700"></div>
            <div className="w-1/3 bg-rose-500/60 rounded-r-full"></div>
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 font-mono pt-0.5 leading-none">
            <span className="text-emerald-400 font-bold">低位 (¥580-¥750)</span>
            <span>平日均价 (¥900)</span>
            <span>高峰 (¥1250+)</span>
          </div>
        </div>
      </div>

      {/* 3. Quick Filter Pill Chips */}
      <div className="relative z-10 flex items-center space-x-2 overflow-x-auto pb-0.5 no-scrollbar text-xs">
        <select
          value={selectedAirline}
          onChange={(e) => setSelectedAirline(e.target.value)}
          className="h-7 px-2.5 rounded-full bg-obsidian-850 border border-white/10 text-slate-300 text-xs shrink-0 focus:outline-none font-medium"
        >
          <option value="ALL">全部航司</option>
          <option value="MU">东航 (MU)</option>
          <option value="CA">国航 (CA)</option>
          <option value="CZ">南航 (CZ)</option>
          <option value="9C">春秋 (9C)</option>
        </select>

        <button
          onClick={() => setOnlyBaggage(!onlyBaggage)}
          className={`h-7 px-2.5 rounded-full border text-xs font-medium shrink-0 flex items-center space-x-1 transition-all whitespace-nowrap ${
            onlyBaggage
              ? 'bg-aviation-600 border-aviation-500 text-white shadow-md'
              : 'bg-obsidian-850 border-white/10 text-slate-400'
          }`}
        >
          <Luggage className="w-3 h-3" />
          <span>含免费托运</span>
        </button>

        <button
          onClick={() => setOnlyWideBody(!onlyWideBody)}
          className={`h-7 px-2.5 rounded-full border text-xs font-medium shrink-0 flex items-center space-x-1 transition-all whitespace-nowrap ${
            onlyWideBody
              ? 'bg-aviation-600 border-aviation-500 text-white shadow-md'
              : 'bg-obsidian-850 border-white/10 text-slate-400'
          }`}
        >
          <Plane className="w-3 h-3" />
          <span>宽体大客机</span>
        </button>
      </div>

      {/* 4. Flighty & Skyward Physical Boarding Pass Cards Stream */}
      <div className="relative z-10 space-y-3">
        {filteredFlights.length === 0 ? (
          <div className="obsidian-card p-8 rounded-3xl text-center space-y-2 border border-white/10">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-slate-300 text-sm font-semibold">无符合条件的航班</p>
            <p className="text-xs text-slate-500">请尝试放宽筛选条件</p>
          </div>
        ) : (
          filteredFlights.map((flight) => {
            const lowestOffer = flight.offers[0];
            const hasFreeBaggage = !lowestOffer.baggageAllowance.includes('无免费托运');
            const vipBenefit = getMatchedVipPrivilege(flight.segment.airlineCode);

            return (
              <div
                key={flight.id}
                onClick={() => setDetailFlight(flight)}
                className="boarding-pass p-4 active:scale-[0.985] hover:border-aviation-500/50 transition-all cursor-pointer space-y-2.5 shadow-xl relative"
              >
                {/* Header: Airline & Flight No */}
                <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[11px]">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="font-bold text-white text-xs whitespace-nowrap">
                      {flight.segment.airlineName}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-obsidian-800 text-aviation-400 border border-aviation-500/20 font-bold whitespace-nowrap">
                      {flight.segment.flightNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono truncate">
                      {flight.segment.aircraftModel.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex items-center text-[10px] text-emerald-400 font-mono shrink-0 whitespace-nowrap">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    <span>官方直连</span>
                  </div>
                </div>

                {/* Skyward Golden VIP Privilege Banner (Gold/Silver Status Highlight) */}
                {vipBenefit && (
                  <div className={`p-2.5 rounded-2xl border flex items-center justify-between text-[10px] ${vipBenefit.badgeColor} shadow-inner`}>
                    <div className="flex items-center space-x-1.5 truncate">
                      <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-bold">{vipBenefit.tierLabel}特权：</span>
                      <span className="truncate">{vipBenefit.perks}</span>
                    </div>
                    <span className="font-mono text-[9px] opacity-90 uppercase shrink-0 font-black ml-1 text-amber-400">
                      LOUNGE ACCESS
                    </span>
                  </div>
                )}

                {/* Main Schedule & Flighty Trajectory Arc */}
                <div className="flex items-center justify-between py-0.5">
                  {/* Dep Time & City */}
                  <div className="space-y-0.5 min-w-[70px]">
                    <span className="text-2xl font-black font-mono text-white tracking-tight leading-none block">
                      {flight.segment.departureTime}
                    </span>
                    <div className="text-xs font-bold text-slate-300 truncate mt-1">
                      {flight.segment.departureAirportName}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block leading-none">
                      {flight.segment.departureTerminal || '航站楼'}
                    </span>
                  </div>

                  {/* Flighty Trajectory Center & Delay Speedometer Meter */}
                  <div className="flex flex-col items-center justify-center px-2 flex-1 max-w-[120px]">
                    <span className="text-[10px] text-slate-400 font-mono leading-none">
                      {flight.segment.durationMinutes}分
                    </span>
                    <div className="w-full flex items-center space-x-1 my-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                      <div className="h-[1px] bg-gradient-to-r from-slate-600 via-aviation-400 to-slate-600 flex-1 relative">
                        <Plane className="w-3 h-3 text-aviation-400 absolute left-1/2 -top-1.5 -translate-x-1/2" />
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-aviation-400"></div>
                    </div>
                    <div className="flex items-center space-x-1 text-[9px] text-emerald-400 font-mono leading-none whitespace-nowrap">
                      <Gauge className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{flight.segment.punctualityRate} 准点</span>
                    </div>
                  </div>

                  {/* Arr Time & City */}
                  <div className="space-y-0.5 text-right min-w-[70px]">
                    <span className="text-2xl font-black font-mono text-white tracking-tight leading-none block">
                      {flight.segment.arrivalTime}
                    </span>
                    <div className="text-xs font-bold text-slate-300 truncate mt-1">
                      {flight.segment.arrivalAirportName}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block leading-none">
                      {flight.segment.arrivalTerminal || '航站楼'}
                    </span>
                  </div>
                </div>

                {/* Perforated Dividing Line with Notch Cutouts */}
                <div className="relative py-1">
                  <div className="perforated-line h-[1px] w-full opacity-60"></div>
                </div>

                {/* Bottom: Comfort Badges & Big Price */}
                <div className="flex items-center justify-between pt-0.5">
                  {/* Badges */}
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 flex-wrap gap-y-1">
                    <span className="px-1.5 py-0.5 rounded bg-obsidian-850 text-slate-300 font-mono border border-white/5 whitespace-nowrap">
                      💺 {flight.segment.legroomCm}cm
                    </span>
                    {flight.segment.hasWifi && (
                      <span className="px-1.5 py-0.5 rounded bg-aviation-950/80 text-aviation-300 font-mono border border-aviation-800/50 flex items-center whitespace-nowrap">
                        <Wifi className="w-2.5 h-2.5 mr-0.5" />
                        Wi-Fi
                      </span>
                    )}
                    {hasFreeBaggage ? (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 whitespace-nowrap">
                        托运20kg
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/50 whitespace-nowrap">
                        无托运
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-0.5 shrink-0 pl-2">
                    <span className="text-xs font-bold text-aviation-400 font-mono leading-none">¥</span>
                    <span className="text-2xl font-black font-mono text-aviation-400 tracking-tight leading-none">
                      {lowestOffer.totalPrice}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500 ml-0.5" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sheets & Modals */}
      {isPickingOrigin && (
        <AirportPickerSheet
          title="出发机场"
          currentCode={origin}
          onSelect={(code) => setOrigin(code)}
          onClose={() => setIsPickingOrigin(false)}
        />
      )}

      {isPickingDestination && (
        <AirportPickerSheet
          title="到达机场"
          currentCode={destination}
          onSelect={(code) => setDestination(code)}
          onClose={() => setIsPickingDestination(false)}
        />
      )}

      {detailFlight && (
        <FlightDetailSheet
          flight={detailFlight}
          onSelectCabin={(cabin) => setActiveHandoff({ flight: detailFlight, cabin })}
          onClose={() => setDetailFlight(null)}
        />
      )}

      {activeHandoff && (
        <HandoffModal
          flight={activeHandoff.flight}
          cabin={activeHandoff.cabin}
          passengers={passengers}
          onClose={() => setActiveHandoff(null)}
        />
      )}
    </div>
  );
};
