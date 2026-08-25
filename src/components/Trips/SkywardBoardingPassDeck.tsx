import React, { useState } from 'react';
import { Crown, Sparkles, Plane, Clock, ShieldCheck, CheckCircle2, ChevronRight, QrCode } from 'lucide-react';

export interface BoardingPassItem {
  id: string;
  tier: 'GOLDEN_VIP' | 'SILVER_TICKET' | 'TITANIUM_VIP';
  tierLabel: string;
  airlineName: string;
  airlineCode: string;
  flightNumber: string;
  originCode: string;
  originName: string;
  destCode: string;
  destName: string;
  dateStr: string;
  passengerName: string;
  seat: string;
  cabinClass: string;
  gate: string;
  boardingTime: string;
  loungeAccess: string;
  barcodeNumber: string;
}

const DEFAULT_PASSES: BoardingPassItem[] = [
  {
    id: 'pass-gold',
    tier: 'GOLDEN_VIP',
    tierLabel: 'GOLDEN VIP',
    airlineName: 'BRITISH AIRWAYS',
    airlineCode: 'BA',
    flightNumber: 'BA268',
    originCode: 'JFK',
    originName: '纽约肯尼迪',
    destCode: 'LHR',
    destName: '伦敦希思罗',
    dateStr: '17 OCT',
    passengerName: 'John D. Smith',
    seat: '2A',
    cabinClass: 'First Class',
    gate: 'B42',
    boardingTime: '18:30',
    loungeAccess: 'VIP LOUNGE ACCESS',
    barcodeNumber: '9984 2901 5510 8821 02',
  },
  {
    id: 'pass-silver',
    tier: 'SILVER_TICKET',
    tierLabel: 'SILVER TICKET',
    airlineName: 'Emirates',
    airlineCode: 'EK',
    flightNumber: 'EK202',
    originCode: 'JFK',
    originName: '纽约肯尼迪',
    destCode: 'DXB',
    destName: '迪拜国际',
    dateStr: '24 OCT',
    passengerName: 'John D. Smith',
    seat: '08K',
    cabinClass: 'Business Class',
    gate: 'A18',
    boardingTime: '21:15',
    loungeAccess: 'EMIRATES LOUNGE',
    barcodeNumber: '1760 8831 4402 1109 43',
  },
  {
    id: 'pass-china-eastern',
    tier: 'TITANIUM_VIP',
    tierLabel: 'PLATINUM VIP',
    airlineName: 'CHINA EASTERN',
    airlineCode: 'MU',
    flightNumber: 'MU5101',
    originCode: 'PEK',
    originName: '北京首都',
    destCode: 'SHA',
    destName: '上海虹桥',
    dateStr: '01 NOV',
    passengerName: 'BRENDAN XU',
    seat: '12F',
    cabinClass: 'Super Premium',
    gate: 'C42',
    boardingTime: '07:20',
    loungeAccess: '东航头等舱贵宾室',
    barcodeNumber: '7810 5101 2291 0048 12',
  },
];

export const SkywardBoardingPassDeck: React.FC = () => {
  const [activePassId, setActivePassId] = useState<string>('pass-gold');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const activePass = DEFAULT_PASSES.find(p => p.id === activePassId) || DEFAULT_PASSES[0];
  const otherPasses = DEFAULT_PASSES.filter(p => p.id !== activePassId);

  return (
    <div className="relative py-4 select-none">
      {/* 3D Physical Boarding Pass Card Fan Stack */}
      <div 
        className="relative h-[340px] flex items-center justify-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* 1. Left Angled Ticket (Silver / Secondary) */}
        {otherPasses[0] && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setActivePassId(otherPasses[0].id);
            }}
            className={`absolute w-[205px] h-[310px] rounded-3xl p-4 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden border border-slate-300/40 text-slate-800 ${
              isExpanded 
                ? '-translate-x-28 rotate-[-14deg] scale-95 z-10' 
                : '-translate-x-12 -rotate-6 translate-y-3 scale-[0.92] z-10 hover:-translate-x-16'
            }`}
            style={{
              background: 'linear-gradient(145deg, #F8FAFC 0%, #E2E8F0 50%, #CBD5E1 100%)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-400/20 pb-2">
              <div className="flex items-center space-x-1.5 text-slate-700">
                <Crown className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono font-black tracking-widest uppercase">
                  {otherPasses[0].tierLabel}
                </span>
              </div>
              <div className="w-3 h-3 rounded-full border border-slate-400/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
              </div>
            </div>

            {/* Airline & Route */}
            <div className="space-y-1 my-auto">
              <span className="text-xs font-black tracking-tight block text-slate-900">
                {otherPasses[0].airlineName}
              </span>
              <div className="text-[10px] font-mono text-slate-600">Flight</div>
              <div className="text-lg font-black font-mono leading-none text-slate-950">
                {otherPasses[0].flightNumber}
              </div>
              <div className="text-xs font-black font-mono pt-1 text-slate-800">
                {otherPasses[0].originCode} → {otherPasses[0].destCode}
              </div>
            </div>

            {/* Footer Barcode */}
            <div className="space-y-1.5 pt-2 border-t border-slate-400/20">
              <div className="flex justify-between text-[9px] font-mono text-slate-700">
                <span>Gate {otherPasses[0].gate}</span>
                <span>Seat {otherPasses[0].seat}</span>
              </div>
              <div className="h-6 w-full flex items-center justify-center space-x-0.5 opacity-80 overflow-hidden">
                {[4, 2, 6, 3, 5, 2, 7, 3, 5, 2, 4, 6, 2, 5, 3, 6, 2, 4, 3, 5, 2].map((w, idx) => (
                  <div key={idx} className="bg-slate-900 h-full rounded-sm" style={{ width: `${w}px` }}></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Right Angled Ticket (Titanium / Tertiary) */}
        {otherPasses[1] && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setActivePassId(otherPasses[1].id);
            }}
            className={`absolute w-[205px] h-[310px] rounded-3xl p-4 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden border border-slate-700/60 text-slate-100 ${
              isExpanded 
                ? 'translate-x-28 rotate-[14deg] scale-95 z-10' 
                : 'translate-x-12 rotate-6 translate-y-3 scale-[0.92] z-10 hover:translate-x-16'
            }`}
            style={{
              background: 'linear-gradient(145deg, #334155 0%, #1E293B 50%, #0F172A 100%)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <div className="flex items-center space-x-1.5 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono font-black tracking-widest uppercase">
                  {otherPasses[1].tierLabel}
                </span>
              </div>
              <div className="w-3 h-3 rounded-full border border-slate-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              </div>
            </div>

            {/* Airline & Route */}
            <div className="space-y-1 my-auto">
              <span className="text-xs font-black tracking-tight block text-white">
                {otherPasses[1].airlineName}
              </span>
              <div className="text-[10px] font-mono text-slate-400">Flight</div>
              <div className="text-lg font-black font-mono leading-none text-amber-300">
                {otherPasses[1].flightNumber}
              </div>
              <div className="text-xs font-black font-mono pt-1 text-slate-200">
                {otherPasses[1].originCode} → {otherPasses[1].destCode}
              </div>
            </div>

            {/* Footer Barcode */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex justify-between text-[9px] font-mono text-slate-300">
                <span>Gate {otherPasses[1].gate}</span>
                <span>Seat {otherPasses[1].seat}</span>
              </div>
              <div className="h-6 w-full flex items-center justify-center space-x-0.5 opacity-80 overflow-hidden">
                {[4, 2, 6, 3, 5, 2, 7, 3, 5, 2, 4, 6, 2, 5, 3, 6, 2, 4, 3, 5, 2].map((w, idx) => (
                  <div key={idx} className="bg-amber-300 h-full rounded-sm" style={{ width: `${w}px` }}></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Centerpiece Authentic GOLDEN VIP Physical Boarding Pass */}
        <div
          className={`relative w-[228px] h-[332px] rounded-3xl p-4.5 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(223,169,56,0.25)] flex flex-col justify-between overflow-hidden border border-amber-300/60 z-30 ${
            isExpanded ? 'scale-105 shadow-[0_25px_60px_rgba(223,169,56,0.35)]' : 'hover:scale-[1.02]'
          }`}
          style={{
            background: 'linear-gradient(155deg, #FCE8A6 0%, #F3CE72 25%, #DFA938 55%, #B88218 85%, #8A5F0C 100%)',
            color: '#1E1402',
          }}
        >
          {/* Subtle Specular Metal Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"></div>

          {/* Notched Punch Holes on Left & Right Sides */}
          <div className="absolute -left-2.5 top-[230px] w-5 h-5 rounded-full bg-obsidian-950 border border-amber-600/40 pointer-events-none shadow-inner"></div>
          <div className="absolute -right-2.5 top-[230px] w-5 h-5 rounded-full bg-obsidian-950 border border-amber-600/40 pointer-events-none shadow-inner"></div>

          {/* Top Notch & Header: Crown & Tier Label */}
          <div className="flex items-center justify-between border-b border-amber-900/20 pb-2 relative z-10">
            <div className="flex items-center space-x-1.5 font-black text-amber-950">
              <Crown className="w-4 h-4 fill-amber-950" />
              <span className="text-[11px] font-mono font-black tracking-widest">
                {activePass.tierLabel}
              </span>
            </div>

            {/* Metal Rivet Icon */}
            <div className="w-4 h-4 rounded-full border border-amber-900/40 flex items-center justify-center bg-amber-200/40 shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-950/80"></div>
            </div>
          </div>

          {/* Airline Brand Title */}
          <div className="space-y-1 relative z-10 pt-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase font-sans text-amber-950">
                {activePass.airlineName}
              </span>
              <Plane className="w-3.5 h-3.5 text-amber-950" />
            </div>

            {/* Flight Number */}
            <div className="pt-0.5">
              <span className="text-[9px] font-mono text-amber-900 font-bold uppercase block leading-none">
                Flight
              </span>
              <span className="text-2xl font-black font-mono text-amber-950 tracking-tight leading-none">
                {activePass.flightNumber}
              </span>
            </div>
          </div>

          {/* Route & Date */}
          <div className="flex items-baseline justify-between relative z-10 py-1 border-y border-amber-900/15">
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-black font-mono text-amber-950 leading-none">
                {activePass.originCode}
              </span>
              <span className="text-xs font-bold text-amber-900">✈</span>
              <span className="text-lg font-black font-mono text-amber-950 leading-none">
                {activePass.destCode}
              </span>
            </div>
            <span className="text-xs font-black font-mono text-amber-950 uppercase">
              {activePass.dateStr}
            </span>
          </div>

          {/* Passenger & Seat Details */}
          <div className="grid grid-cols-2 gap-2 relative z-10 text-xs">
            <div>
              <span className="text-[9px] font-mono text-amber-900 font-bold block leading-none">
                Passenger
              </span>
              <span className="text-xs font-black text-amber-950 truncate block pt-0.5">
                {activePass.passengerName}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-amber-900 font-bold block leading-none">
                Seat
              </span>
              <div className="text-sm font-black font-mono text-amber-950 leading-none pt-0.5">
                {activePass.seat}
              </div>
              <span className="text-[8px] font-bold text-amber-900 block leading-tight">
                {activePass.cabinClass}
              </span>
            </div>
          </div>

          {/* Gate & Boarding Time */}
          <div className="grid grid-cols-2 gap-2 relative z-10 pt-1">
            <div>
              <span className="text-[9px] font-mono text-amber-900 font-bold block leading-none">
                Gate
              </span>
              <span className="text-base font-black font-mono text-amber-950 leading-none">
                {activePass.gate}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-amber-900 font-bold block leading-none">
                Boarding
              </span>
              <span className="text-base font-black font-mono text-amber-950 leading-none">
                {activePass.boardingTime}
              </span>
            </div>
          </div>

          {/* Perforated Barcode & VIP Lounge Access Tag */}
          <div className="space-y-1.5 pt-2 border-t border-dashed border-amber-900/30 relative z-10">
            {/* Real Barcode Stripes */}
            <div className="h-8 w-full flex items-center justify-between px-1 bg-amber-100/30 rounded-lg py-1">
              {[3, 1, 4, 2, 5, 2, 6, 1, 4, 3, 2, 5, 1, 6, 2, 3, 5, 1, 4, 2, 3, 6, 2, 4, 1, 5, 3].map((w, idx) => (
                <div key={idx} className="bg-amber-950 h-full rounded-sm" style={{ width: `${w}px` }}></div>
              ))}
            </div>

            {/* Bottom VIP Lounge Pill */}
            <div className="w-full py-1 rounded-full bg-amber-950/90 text-amber-300 text-[9px] font-mono font-black tracking-widest text-center shadow-md">
              {activePass.loungeAccess}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-1">
        <span className="text-[10px] text-slate-500 font-mono">
          轻触展开多航段登机牌 · 离线 Face ID 实体加密
        </span>
      </div>
    </div>
  );
};
