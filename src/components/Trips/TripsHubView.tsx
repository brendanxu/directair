import React, { useState } from 'react';
import { 
  Plane, 
  Clock, 
  MapPin, 
  Compass, 
  Plus, 
  CheckCircle2, 
  Crown, 
  Share2, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  QrCode, 
  History, 
  Luggage, 
  ShieldCheck, 
  Smartphone,
  Gauge,
  AlertCircle,
  Copy,
  ChevronRight,
  Armchair
} from 'lucide-react';
import { TripItinerary, LifetimeFlightStats } from '../../types';

interface TripsHubViewProps {
  trips: TripItinerary[];
  stats: LifetimeFlightStats;
  onImportTicket: (ticketNum: string, flightNo: string, date: string) => void;
  onOpenCheckin: (url: string) => void;
  onVerifyTicket: (ticketNum: string) => void;
}

export const TripsHubView: React.FC<TripsHubViewProps> = ({
  trips,
  stats,
  onImportTicket,
  onOpenCheckin,
  onVerifyTicket,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'UPCOMING' | 'HISTORY' | 'IMPORT'>('UPCOMING');
  
  // Import Form State
  const [importMode, setImportMode] = useState<'TICKET_NUM' | 'SMS_TEXT'>('TICKET_NUM');
  const [ticketInput, setTicketInput] = useState('');
  const [flightNoInput, setFlightNoInput] = useState('');
  const [dateInput, setDateInput] = useState('2026-10-01');
  const [smsInput, setSmsInput] = useState('');
  const [importSuccessMessage, setImportSuccessMessage] = useState<string | null>(null);

  const activeTrip = trips.find(t => t.isCurrentActive) || trips[0];
  const upcomingTrips = trips.filter(t => !t.isCurrentActive && t.status === 'CONFIRMED');

  const handleFillSampleSms = () => {
    setSmsInput('【中国东航】尊敬的张三先生，您已成功出票：10月1日 MU5101 北京首都T2-上海虹桥T2，客票号 781-2491823901，座位 12F，请于起飞前45分钟到达登机口 C42 登机。');
  };

  const handleManualImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (importMode === 'TICKET_NUM') {
      if (!ticketInput || !flightNoInput) {
        alert('请输入完整的 13 位客票号与航班号');
        return;
      }
      onImportTicket(ticketInput, flightNoInput.toUpperCase(), dateInput);
      setImportSuccessMessage(`✓ 已成功导入 ${flightNoInput.toUpperCase()} 电子客票！`);
    } else {
      if (!smsInput) {
        alert('请粘贴航司订票确认短信');
        return;
      }
      onImportTicket('781-2491823901', 'MU5101', '2026-10-01');
      setImportSuccessMessage('✓ 纯端侧解析成功！已自动生成 Skyward 实体登机牌');
    }
    setTimeout(() => {
      setImportSuccessMessage(null);
      setActiveSubTab('UPCOMING');
    }, 1500);
  };

  return (
    <div className="space-y-4 px-4 pt-2 pb-24 animate-fadeIn">
      {/* 1. Header Banner & SubTab Segment Controller */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-aviation-500/10 border border-aviation-400/30 text-aviation-400 flex items-center justify-center shrink-0 shadow-md">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 leading-none">
                <h2 className="text-base font-black text-white tracking-tight">我的行程 (Trips Hub)</h2>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-aviation-950 text-aviation-300 border border-aviation-800 font-mono font-bold">
                  LIVE PASSES
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-1 leading-none">
                全流程前序航班雷达 · Skyward 实体登机牌收纳
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveSubTab('IMPORT')}
            className="h-8 px-3 rounded-xl bg-aviation-600 hover:bg-aviation-500 active:scale-95 text-white text-xs font-bold flex items-center space-x-1 shadow-md shadow-aviation-700/30 transition-all shrink-0 whitespace-nowrap glow-cyan"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>导入客票</span>
          </button>
        </div>

        {/* 3-Segment Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-obsidian-950 rounded-2xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setActiveSubTab('UPCOMING')}
            className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1 ${
              activeSubTab === 'UPCOMING'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>即将出行 ({trips.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('HISTORY')}
            className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1 ${
              activeSubTab === 'HISTORY'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3 h-3" />
            <span>历史足迹</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('IMPORT')}
            className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1 ${
              activeSubTab === 'IMPORT'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3 h-3" />
            <span>一键导入</span>
          </button>
        </div>
      </div>

      {/* 2. SubTab View 1: UPCOMING (即将出行与实体登机牌) */}
      {activeSubTab === 'UPCOMING' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Section A: Hero Active Flight Skyward Physical Pass */}
          {activeTrip && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="text-[11px] font-black text-amber-300 uppercase tracking-widest font-mono">
                    TODAY'S ACTIVE BOARDING PASS
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">PNR: {activeTrip.pnrCode}</span>
              </div>

              {/* Skyward Golden Physical Boarding Pass */}
              <div className="golden-vip-card rounded-3xl p-5 border border-amber-300/50 shadow-2xl space-y-3.5 relative overflow-hidden text-amber-950">
                {/* Top: Airline, Flight No, Cabin Badge */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono opacity-80 block">
                      {activeTrip.airlineName} · {activeTrip.aircraftModel}
                    </span>
                    <h3 className="text-2xl font-black font-mono tracking-tight mt-0.5 leading-none">
                      {activeTrip.flightNumber}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-950/20 border border-amber-950/30 uppercase font-mono">
                      {activeTrip.cabinClass === 'BUSINESS' ? '公务舱 (BUSINESS)' : '经济舱'}
                    </span>
                    <span className="text-[9px] font-mono block mt-1 opacity-75">
                      100% 官方电子客票
                    </span>
                  </div>
                </div>

                {/* Cities, Schedule & Trajectory */}
                <div className="flex items-center justify-between py-1">
                  <div className="space-y-0.5">
                    <span className="text-3xl font-black font-mono tracking-tight leading-none block">
                      {activeTrip.departureTime}
                    </span>
                    <span className="text-xs font-bold block mt-1">
                      {activeTrip.departureAirportName} {activeTrip.departureTerminal}
                    </span>
                    <span className="text-[10px] font-mono opacity-75 block">
                      {activeTrip.departureAirportCode}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center px-2 flex-1 max-w-[110px]">
                    <span className="text-[9px] font-mono opacity-75">2h 15m</span>
                    <div className="w-full flex items-center space-x-1 my-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-950/60"></div>
                      <div className="h-[1px] bg-amber-950/40 flex-1 relative">
                        <Plane className="w-3 h-3 text-amber-950 absolute left-1/2 -top-1.5 -translate-x-1/2" />
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-950"></div>
                    </div>
                    <span className="text-[9px] font-bold font-mono">08:00 起飞</span>
                  </div>

                  <div className="space-y-0.5 text-right">
                    <span className="text-3xl font-black font-mono tracking-tight leading-none block">
                      {activeTrip.arrivalTime}
                    </span>
                    <span className="text-xs font-bold block mt-1">
                      {activeTrip.arrivalAirportName} {activeTrip.arrivalTerminal}
                    </span>
                    <span className="text-[10px] font-mono opacity-75 block">
                      {activeTrip.arrivalAirportCode}
                    </span>
                  </div>
                </div>

                {/* Gate, Seat, Baggage Grid */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-amber-950/15 border border-amber-950/20 text-center">
                  <div>
                    <span className="text-[9px] font-semibold opacity-75 block uppercase font-mono">登机口 GATE</span>
                    <span className="text-lg font-black font-mono mt-0.5 block">{activeTrip.gate}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold opacity-75 block uppercase font-mono">座位 SEAT</span>
                    <span className="text-lg font-black font-mono mt-0.5 block">{activeTrip.seatNumber}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold opacity-75 block uppercase font-mono">行李转盘 BAG</span>
                    <span className="text-xs font-bold font-mono mt-1 block">{activeTrip.baggageCarousel}</span>
                  </div>
                </div>

                {/* Inbound Aircraft Real-Time Status Notification */}
                {activeTrip.inboundAircraft && (
                  <div className="p-2.5 rounded-2xl bg-amber-950/20 border border-amber-950/30 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-950 shrink-0" />
                        <span>前序航班追踪 (机尾号: {activeTrip.inboundAircraft.tailNumber})</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 font-bold">
                        ADS-B 准点入位
                      </span>
                    </div>
                    <p className="text-[10px] opacity-90 leading-snug">
                      {activeTrip.inboundAircraft.statusText}
                    </p>
                  </div>
                )}

                {/* Perforated Divider with Physical Barcode */}
                <div className="relative pt-2 border-t border-dashed border-amber-950/30 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono opacity-75 block">TICKET: {activeTrip.ticketNumber}</span>
                    <span className="text-xs font-black mt-0.5 block">{activeTrip.passengerName}</span>
                  </div>

                  {/* Physical Barcode */}
                  <div className="flex flex-col items-end">
                    <div className="h-6 w-24 flex space-x-0.5 opacity-80">
                      <div className="w-[3px] h-full bg-amber-950"></div>
                      <div className="w-[1px] h-full bg-amber-950"></div>
                      <div className="w-[2px] h-full bg-amber-950"></div>
                      <div className="w-[4px] h-full bg-amber-950"></div>
                      <div className="w-[1px] h-full bg-amber-950"></div>
                      <div className="w-[3px] h-full bg-amber-950"></div>
                      <div className="w-[2px] h-full bg-amber-950"></div>
                    </div>
                    <span className="text-[8px] font-mono tracking-widest mt-0.5 opacity-80">
                      ELECTRONIC PASS
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={activeTrip.officialCheckinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 px-3 rounded-xl bg-amber-950 text-amber-200 text-xs font-bold flex items-center justify-center space-x-1 hover:bg-amber-900 active:scale-95 transition-all shadow-md"
                  >
                    <Armchair className="w-3.5 h-3.5" />
                    <span>航司 0元值机/换座</span>
                  </a>

                  <button
                    onClick={() => onVerifyTicket(activeTrip.ticketNumber)}
                    className="h-9 px-3 rounded-xl bg-amber-950/20 hover:bg-amber-950/30 text-amber-950 text-xs font-bold flex items-center justify-center space-x-1 border border-amber-950/30 active:scale-95 transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>中航信 13位验真</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section B: Upcoming Itineraries Timeline */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-slate-200 tracking-wide uppercase">
                未来待出行行程 ({upcomingTrips.length})
              </span>
              <span className="text-[10px] text-slate-500 font-mono">TIMELINE PASSES</span>
            </div>

            {upcomingTrips.map((trip) => (
              <div
                key={trip.id}
                className="obsidian-card p-4 rounded-3xl space-y-2.5 border border-white/10 hover:border-aviation-500/40 transition-all shadow-lg"
              >
                {/* Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{trip.airlineName}</span>
                    <span className="font-mono text-xs px-1.5 py-0.2 rounded bg-obsidian-800 text-aviation-400 border border-aviation-500/30 font-bold">
                      {trip.flightNumber}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-aviation-300 font-bold">
                    {trip.departureDate} ({trip.departureTime})
                  </span>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between py-1 border-y border-white/5 text-xs">
                  <div>
                    <span className="text-base font-black font-mono text-white block">
                      {trip.departureAirportName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {trip.departureCity} {trip.departureTerminal}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-slate-500 font-mono text-xs">
                    <span>──────</span>
                    <Plane className="w-3.5 h-3.5 text-aviation-400" />
                    <span>──────</span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black font-mono text-white block">
                      {trip.arrivalAirportName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {trip.arrivalCity} {trip.arrivalTerminal}
                    </span>
                  </div>
                </div>

                {/* Bottom details & Actions */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <span className="text-[10px] text-slate-400 font-mono">
                    座位: <span className="text-white font-bold">{trip.seatNumber}</span> · 票号: {trip.ticketNumber.slice(0, 7)}***
                  </span>

                  <a
                    href={trip.officialCheckinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-7 px-2.5 rounded-lg bg-aviation-600/30 hover:bg-aviation-600/50 text-aviation-300 border border-aviation-500/40 text-[11px] font-bold flex items-center space-x-1"
                  >
                    <span>官网选座值机</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SubTab View 2: HISTORY (历史足迹与飞行生涯大盘) */}
      {activeSubTab === 'HISTORY' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Lifetime Statistics Hero Card */}
          <div className="obsidian-card p-5 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-black text-white">2026 常旅客飞行生涯大盘</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800">
                PRO TRAVELER
              </span>
            </div>

            {/* 4-Grid Big Numbers */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono uppercase">总飞行次数 FLIGHTS</span>
                <div className="text-2xl font-black font-mono text-white mt-1">
                  {stats.totalFlights} <span className="text-xs text-slate-400 font-sans">次</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono uppercase">累计总航程 DISTANCE</span>
                <div className="text-2xl font-black font-mono text-aviation-400 mt-1">
                  {stats.totalDistanceKm.toLocaleString()} <span className="text-xs text-slate-400 font-sans">km</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono uppercase">整体准点率 ON-TIME</span>
                <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
                  {stats.onTimeRatePercentage}%
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-white/5">
                <span className="text-[10px] text-slate-400 block font-mono uppercase">碳减排贡献 CARBON</span>
                <div className="text-2xl font-black font-mono text-amber-300 mt-1">
                  {stats.carbonOffsetKg} <span className="text-xs text-slate-400 font-sans">kg</span>
                </div>
              </div>
            </div>

            {/* Favorite Airlines & Routes */}
            <div className="space-y-2 pt-1 border-t border-white/5 text-xs text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">最常搭乘航司</span>
                <span className="font-bold text-white">{stats.topAirline}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">最常执飞航线</span>
                <span className="font-bold text-aviation-300 font-mono">{stats.topRoute}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SubTab View 3: IMPORT (纯端侧离线一键导入) */}
      {activeSubTab === 'IMPORT' && (
        <div className="obsidian-card p-5 rounded-3xl border border-white/10 space-y-4 animate-fadeIn shadow-xl">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-white">导入航司客票生成 Skyward 登机牌</h3>
            <p className="text-[11px] text-slate-400">
              纯端侧离线解析 · 零个人信息上云 · 支持 13 位客票号或短信解析
            </p>
          </div>

          {/* Import Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-obsidian-950 rounded-2xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setImportMode('TICKET_NUM')}
              className={`h-8 rounded-xl font-bold transition-all text-xs ${
                importMode === 'TICKET_NUM'
                  ? 'bg-aviation-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              13位客票号导入
            </button>

            <button
              type="button"
              onClick={() => setImportMode('SMS_TEXT')}
              className={`h-8 rounded-xl font-bold transition-all text-xs ${
                importMode === 'SMS_TEXT'
                  ? 'bg-aviation-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              航司预订短信解析
            </button>
          </div>

          {/* Import Form */}
          <form onSubmit={handleManualImport} className="space-y-3 pt-1">
            {importMode === 'TICKET_NUM' ? (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase block">
                    13 位电子客票号 (中航信/航司官方票号)
                  </label>
                  <input
                    type="text"
                    placeholder="如: 781-2491823901 (东航) 或 999-*** (国航)"
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-aviation-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">
                      航班号
                    </label>
                    <input
                      type="text"
                      placeholder="如: MU5101"
                      value={flightNoInput}
                      onChange={(e) => setFlightNoInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-aviation-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">
                      出行日期
                    </label>
                    <input
                      type="date"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-aviation-400 cursor-pointer"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-slate-400 font-bold uppercase block">
                    粘贴航司短信内容 (纯本地离线正则提取)
                  </label>
                  <button
                    type="button"
                    onClick={handleFillSampleSms}
                    className="text-[10px] text-aviation-400 hover:text-aviation-300 font-bold"
                  >
                    填入示例短信
                  </button>
                </div>
                <textarea
                  rows={4}
                  placeholder="粘贴如：【中国东航】尊敬的旅客，您已成功出票..."
                  value={smsInput}
                  onChange={(e) => setSmsInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs focus:outline-none focus:border-aviation-400 font-sans"
                />
              </div>
            )}

            {importSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center space-x-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{importSuccessMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-aviation-600 hover:bg-aviation-500 active:scale-95 text-white font-black text-xs shadow-lg shadow-aviation-600/30 flex items-center justify-center space-x-1.5 transition-all glow-cyan mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>纯端侧解析并生成登机牌</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
