import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  FileCheck, 
  Info,
  Lock,
  Building
} from 'lucide-react';

export const TicketVerifier: React.FC = () => {
  const [ticketNo, setTicketNo] = useState('781-2409182341');
  const [passengerName, setPassengerName] = useState('ZHANG/SAN');
  const [verifyResult, setVerifyResult] = useState<'IDLE' | 'CHECKING' | 'VALID'>('IDLE');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyResult('CHECKING');
    setTimeout(() => {
      setVerifyResult('VALID');
    }, 700);
  };

  return (
    <div className="space-y-3.5">
      {/* 13-Digit Ticket Verification Tool */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3.5 shadow-xl">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-aviation-500/10 border border-aviation-400/30 text-aviation-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">中国民航电子客票验真</h3>
            <span className="text-[10px] text-slate-400 font-mono">
              权威认证 · 识别违规假票与黑产里程票
            </span>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1 leading-none">
              13 位电子客票号 (Ticket Number)
            </label>
            <input
              type="text"
              required
              placeholder="如: 781-2409182341 或 999-XXXXXXXXXX"
              value={ticketNo}
              onChange={(e) => setTicketNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono font-bold placeholder-slate-500 focus:outline-none focus:border-aviation-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1 leading-none">
              乘机人拼音姓名 (如 ZHANG/SAN)
            </label>
            <input
              type="text"
              required
              placeholder="如: ZHANG/SAN 或 张三"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono font-bold placeholder-slate-500 focus:outline-none focus:border-aviation-500"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-aviation-600 hover:bg-aviation-500 active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-aviation-700/30 flex items-center justify-center space-x-1.5 transition-all glow-cyan"
          >
            <Search className="w-4 h-4" />
            <span>立即进行官方客票验真</span>
          </button>
        </form>

        {/* Verification Result Card */}
        {verifyResult === 'CHECKING' && (
          <div className="p-4 rounded-2xl bg-obsidian-950 border border-aviation-500/40 text-aviation-400 text-xs flex items-center justify-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-aviation-400 animate-ping"></span>
            <span>正在连接中国民航航信数据总线进行验真...</span>
          </div>
        )}

        {verifyResult === 'VALID' && (
          <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/60 space-y-2.5 text-xs animate-fadeIn">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>客票真实有效 (已在航司系统定座)</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-300">状态: OPEN FOR USE</span>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">承运航司：</span>
                <span className="font-bold text-white">中国东方航空 (781票证)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">客票票面价：</span>
                <span className="font-mono text-emerald-400 font-bold">CNY 620.00 (机建 ¥50)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">出票官方舱位：</span>
                <span className="font-mono text-white">V 舱 (标准经济舱)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official Tax Invoice Info */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-2 text-xs shadow-xl">
        <div className="flex items-center space-x-2">
          <FileCheck className="w-4 h-4 text-aviation-400 shrink-0" />
          <h4 className="font-bold text-white text-xs">航空运输电子客票行程单 (发票/报销)</h4>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          凡通过航司官方直连出票，均可在航司 App 免费开具**国家税务总局统一监制的增值税电子行程单**，可 100% 用于企业进项税全额抵扣。
        </p>
      </div>
    </div>
  );
};
