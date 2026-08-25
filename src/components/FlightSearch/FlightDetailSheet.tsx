import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  ChevronRight, 
  Luggage, 
  Award, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Wifi,
  Zap,
  Info,
  Clock,
  Sparkles,
  Crown
} from 'lucide-react';
import { FlightOffer, CabinOffer } from '../../types';

interface FlightDetailSheetProps {
  flight: FlightOffer;
  onSelectCabin: (cabin: CabinOffer) => void;
  onClose: () => void;
}

export const FlightDetailSheet: React.FC<FlightDetailSheetProps> = ({
  flight,
  onSelectCabin,
  onClose,
}) => {
  const [selectedCabinId, setSelectedCabinId] = useState<string>(
    flight.offers.length > 0 ? flight.offers[0].id : ''
  );

  const selectedCabin = flight.offers.find(o => o.id === selectedCabinId) || flight.offers[0];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Tap backdrop to close */}
      <div className="flex-1" onClick={onClose}></div>

      {/* Sheet Container */}
      <div className="obsidian-card w-full max-w-[412px] mx-auto rounded-t-3xl border-t border-white/10 shadow-2xl p-5 space-y-4 max-h-[88vh] overflow-y-auto bg-obsidian-900/98 animate-slideUp">
        {/* Top Drag Indicator */}
        <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto -mt-1 mb-0.5 shrink-0"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-base tracking-tight">
                {flight.segment.airlineName} {flight.segment.flightNumber}
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-aviation-950 text-aviation-300 border border-aviation-800">
                {flight.segment.aircraftModel.split(' ')[0]}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium block mt-0.5">
              {flight.segment.departureTime} ({flight.segment.departureAirportName}) → {flight.segment.arrivalTime} ({flight.segment.arrivalAirportName})
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-obsidian-800 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center active:scale-90 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cabin Class Tier Selector Pills */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 block">选择官方直连舱位等级</span>
          <div className="grid grid-cols-3 gap-2">
            {flight.offers.map((cabin) => {
              const isSelected = selectedCabinId === cabin.id;
              const isBusiness = cabin.cabinClass === 'BUSINESS';

              return (
                <button
                  key={cabin.id}
                  onClick={() => setSelectedCabinId(cabin.id)}
                  className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-[76px] ${
                    isSelected
                      ? (isBusiness 
                          ? 'golden-vip-border text-amber-300 glow-gold' 
                          : 'bg-aviation-950/90 border-aviation-500 text-aviation-300 glow-cyan')
                      : 'bg-obsidian-950/70 border-white/5 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs font-black truncate">
                      {cabin.bookingClass}
                    </span>
                    {isBusiness && (
                      <Crown className="w-3 h-3 text-amber-400 shrink-0" />
                    )}
                  </div>

                  <div className="mt-1">
                    <span className="text-sm font-black font-mono block leading-none">
                      ¥{cabin.totalPrice}
                    </span>
                    <span className="text-[9px] opacity-75 font-mono block mt-0.5">
                      全包 (含机建)
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Cabin Rules & Comfort Details */}
        <div className="p-4 rounded-2xl bg-obsidian-950/90 border border-white/5 space-y-3">
          {/* Baggage & Miles */}
          <div className="grid grid-cols-2 gap-3 text-xs border-b border-white/5 pb-3">
            <div className="flex items-start space-x-2">
              <Luggage className="w-4 h-4 text-aviation-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">托运行李额</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{selectedCabin.baggageAllowance}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">常旅客里程累积</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{selectedCabin.mileageAccrual}</span>
              </div>
            </div>
          </div>

          {/* Refund & Change Policy Matrix */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-slate-200 font-bold">
                <FileText className="w-3.5 h-3.5 text-aviation-400" />
                <span>官方自愿退改签梯次费率</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">100% 航司官方标准</span>
            </div>

            <div className="space-y-1.5 bg-obsidian-900/80 p-3 rounded-xl border border-white/5 text-[11px]">
              {selectedCabin.refundRules.map((rule, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400 shrink-0 mr-2">{rule.timeRange}</span>
                  <span className="font-mono font-bold text-right text-aviation-300">{rule.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Action Button: 48px Height */}
        <button
          onClick={() => onSelectCabin(selectedCabin)}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-aviation-500 via-aviation-600 to-indigo-600 hover:from-aviation-400 text-white font-black text-xs shadow-xl shadow-aviation-600/30 flex items-center justify-center space-x-2 transition-all glow-cyan"
        >
          <span>去 {flight.segment.airlineName} 官方直连出票 (¥{selectedCabin.totalPrice})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
