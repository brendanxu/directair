import React from 'react';
import { 
  RefreshCw, 
  FileText, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const FlightDisruptionGuide: React.FC = () => {
  return (
    <div className="space-y-3.5">
      {/* Statutory Rights Banner */}
      <div className="obsidian-card rounded-3xl p-4 border border-emerald-500/40 space-y-2.5 shadow-xl bg-gradient-to-br from-emerald-950/30 via-obsidian-900 to-obsidian-900">
        <div className="flex items-center space-x-2 text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <h3 className="font-bold text-sm text-white">中国民航局法定非自愿退改权利</h3>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          凡因**天气、航空管制、飞机机械故障**等原因导致航班发生**延误超过 15 分钟**、取消或提前起飞，旅客享有法定的两大权利：
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-3 rounded-2xl bg-obsidian-950/80 border border-white/5 space-y-1">
            <span className="font-bold text-emerald-400 block text-xs">① 100% 全额原路退款</span>
            <span className="text-[10px] text-slate-400 block leading-relaxed">
              免除全部退票手续费，即使最严苛的特价票也必须全额退款。
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-obsidian-950/80 border border-white/5 space-y-1">
            <span className="font-bold text-emerald-400 block text-xs">② 免费非自愿改签</span>
            <span className="text-[10px] text-slate-400 block leading-relaxed">
              可免费改期至原航班前后 3 天内该航司任意有空位的航班。
            </span>
          </div>
        </div>
      </div>

      {/* Official Delay Certificate Generator */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-aviation-400 shrink-0" />
            <h4 className="font-bold text-white text-xs">各航司官方电子延误证明直开通道</h4>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">秒级直出 (盖公章)</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href="https://m.airchina.com.cn/ac/delay"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl bg-obsidian-950 border border-white/5 text-slate-300 hover:text-white flex items-center justify-between text-[11px] active:bg-obsidian-850 transition-colors"
          >
            <span>国航延误证明</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          </a>

          <a
            href="https://m.ceair.com/service/delay-cert"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl bg-obsidian-950 border border-white/5 text-slate-300 hover:text-white flex items-center justify-between text-[11px] active:bg-obsidian-850 transition-colors"
          >
            <span>东航延误证明</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          </a>

          <a
            href="https://m.csair.com/delay-proof"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl bg-obsidian-950 border border-white/5 text-slate-300 hover:text-white flex items-center justify-between text-[11px] active:bg-obsidian-850 transition-colors"
          >
            <span>南航延误证明</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          </a>

          <a
            href="https://m.hnair.com/delay"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl bg-obsidian-950 border border-white/5 text-slate-300 hover:text-white flex items-center justify-between text-[11px] active:bg-obsidian-850 transition-colors"
          >
            <span>海航延误证明</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};
