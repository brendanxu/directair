import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Phone, 
  Globe, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  FileText, 
  PlaneTakeoff,
  Award,
  FileEdit,
  RefreshCw,
  ShieldCheck,
  Armchair,
  ArrowLeft
} from 'lucide-react';
import { AirlineDirectoryItem } from '../../types';
import { NameCorrectionGuide } from '../RightsHub/NameCorrectionGuide';
import { FlightDisruptionGuide } from '../RightsHub/FlightDisruptionGuide';
import { TicketVerifier } from '../RightsHub/TicketVerifier';
import { SpecialServices } from '../RightsHub/SpecialServices';

export type RightsSubTab = 'hotlines' | 'name_correction' | 'disruption' | 'verification' | 'services';

interface AirlineDirectoryViewProps {
  directory: AirlineDirectoryItem[];
  initialSubTab?: RightsSubTab;
  onBackToHome?: () => void;
}

export const AirlineDirectoryView: React.FC<AirlineDirectoryViewProps> = ({ 
  directory,
  initialSubTab = 'hotlines',
  onBackToHome,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<RightsSubTab>(initialSubTab);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const filteredDirectory = directory.filter(airline => 
    airline.airlineName.includes(searchTerm) || 
    airline.airlineCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (airline.alliance && airline.alliance.includes(searchTerm))
  );

  return (
    <div className="space-y-3.5 px-4 pt-2 pb-24 animate-fadeIn">
      {/* Top Back Navigation Bar (If navigated from Home) */}
      {onBackToHome && (
        <div className="flex items-center justify-between pb-0.5">
          <button
            onClick={onBackToHome}
            className="h-8 px-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 text-xs font-bold flex items-center space-x-1.5 hover:text-white active:scale-95 transition-all shadow-sm shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-aviation-400" />
            <span>返回首页</span>
          </button>

          <span className="text-[11px] text-slate-400 font-medium">
            航旅维权与避坑直达
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-aviation-500/10 border border-aviation-400/30 text-aviation-400 flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 leading-none">
              <h2 className="text-base font-bold text-white tracking-tight">航旅权益与售后中心</h2>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
                ANTI-OTA HUB
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1 leading-none">
              打破中介信息差 · 姓名改错/航变退改/客票验真一站搞定
            </p>
          </div>
        </div>

        {/* Sub Navigation Segmented Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs border-t border-white/5 pt-2.5">
          <button
            onClick={() => setActiveSubTab('hotlines')}
            className={`h-8 px-3 rounded-xl font-bold shrink-0 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'hotlines'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'bg-obsidian-850 text-slate-400 border border-white/5 hover:text-slate-200'
            }`}
          >
            <Phone className="w-3 h-3" />
            <span>航司热线</span>
          </button>

          <button
            onClick={() => setActiveSubTab('name_correction')}
            className={`h-8 px-3 rounded-xl font-bold shrink-0 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'name_correction'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'bg-obsidian-850 text-slate-400 border border-white/5 hover:text-slate-200'
            }`}
          >
            <FileEdit className="w-3 h-3" />
            <span>姓名改错政策</span>
          </button>

          <button
            onClick={() => setActiveSubTab('disruption')}
            className={`h-8 px-3 rounded-xl font-bold shrink-0 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'disruption'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'bg-obsidian-850 text-slate-400 border border-white/5 hover:text-slate-200'
            }`}
          >
            <RefreshCw className="w-3 h-3" />
            <span>航变无损退改</span>
          </button>

          <button
            onClick={() => setActiveSubTab('verification')}
            className={`h-8 px-3 rounded-xl font-bold shrink-0 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'verification'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'bg-obsidian-850 text-slate-400 border border-white/5 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>13位票号验真</span>
          </button>

          <button
            onClick={() => setActiveSubTab('services')}
            className={`h-8 px-3 rounded-xl font-bold shrink-0 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'services'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'bg-obsidian-850 text-slate-400 border border-white/5 hover:text-slate-200'
            }`}
          >
            <Armchair className="w-3 h-3" />
            <span>0元值机/服务</span>
          </button>
        </div>
      </div>

      {/* View Content based on activeSubTab */}
      {activeSubTab === 'name_correction' && <NameCorrectionGuide />}
      {activeSubTab === 'disruption' && <FlightDisruptionGuide />}
      {activeSubTab === 'verification' && <TicketVerifier />}
      {activeSubTab === 'services' && <SpecialServices />}

      {/* Hotline Directory SubTab */}
      {activeSubTab === 'hotlines' && (
        <div className="space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索航司名称或二字码 (如: 国航, MU)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-3.5 rounded-2xl bg-obsidian-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-aviation-500"
            />
          </div>

          {filteredDirectory.map((airline) => (
            <div
              key={airline.airlineCode}
              className="obsidian-card rounded-3xl p-4 border border-white/10 hover:border-slate-700 space-y-3 shadow-xl"
            >
              {/* Airline Header & Dial Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${airline.logoColor} flex items-center justify-center font-bold font-mono text-white text-xs shadow-md`}>
                    {airline.airlineCode}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-white text-sm">{airline.airlineName}</h3>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-obsidian-800 text-slate-300 font-bold">
                        {airline.airlineCode}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {airline.alliance || '独立运营'}
                    </span>
                  </div>
                </div>

                {/* Call Hotline CTA */}
                <a
                  href={`tel:${airline.hotline}`}
                  className="h-8 px-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center space-x-1 active:scale-95 transition-all shadow-sm shrink-0 whitespace-nowrap"
                >
                  <Phone className="w-3 h-3" />
                  <span>{airline.hotline}</span>
                </a>
              </div>

              {/* Service Links Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <a
                  href={airline.refundPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-2.5 rounded-xl bg-obsidian-950 border border-white/5 text-slate-300 hover:text-white flex items-center justify-between text-[11px] active:bg-obsidian-850"
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <FileText className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
                    <span className="truncate">官方退改费率</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 shrink-0 ml-1" />
                </a>

                <a
                  href={airline.onlineCheckinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-2.5 rounded-xl bg-obsidian-950 border border-white/5 text-slate-300 hover:text-white flex items-center justify-between text-[11px] active:bg-obsidian-850"
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <PlaneTakeoff className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
                    <span className="truncate">在线值机选座</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 shrink-0 ml-1" />
                </a>

                <a
                  href={airline.missingMilesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-2.5 rounded-xl bg-obsidian-950 border border-white/5 text-slate-300 hover:text-white flex items-center justify-between text-[11px] active:bg-obsidian-850"
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <Award className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
                    <span className="truncate">会员里程补登</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 shrink-0 ml-1" />
                </a>

                <a
                  href={airline.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-2.5 rounded-xl bg-obsidian-950 border border-white/5 text-slate-300 hover:text-white flex items-center justify-between text-[11px] active:bg-obsidian-850"
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <Globe className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
                    <span className="truncate">航司官方网站</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 shrink-0 ml-1" />
                </a>
              </div>

              {/* Verification Tag */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-white/5 font-mono">
                <span className="flex items-center text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  已核验 2026-08-24
                </span>
                {airline.hotlineOverseas && <span>境外: {airline.hotlineOverseas}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
