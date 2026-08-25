import React, { useState } from 'react';
import { 
  DollarSign, 
  Activity, 
  Heart, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  Server,
  Lock,
  ExternalLink,
  Users,
  ArrowLeft
} from 'lucide-react';

interface TransparencyViewProps {
  onBackToHome?: () => void;
}

export const TransparencyView: React.FC<TransparencyViewProps> = ({ onBackToHome }) => {
  const [tipCount, setTipCount] = useState(128);
  const [hasTipped, setHasTipped] = useState(false);

  const monthlyServerCost = 860;
  const monthlyDomainCost = 60;
  const monthlyApiCost = 450;
  const totalCost = monthlyServerCost + monthlyDomainCost + monthlyApiCost;
  const totalRevenue = tipCount * 1;
  const netBalance = totalRevenue - totalCost;

  const handleSimulateTip = () => {
    if (!hasTipped) {
      setTipCount(prev => prev + 1);
      setHasTipped(true);
    }
  };

  return (
    <div className="space-y-3.5 px-4 pt-2 pb-24 animate-fadeIn">
      {/* Top Back Navigation Bar */}
      {onBackToHome && (
        <div className="flex items-center justify-between pb-0.5">
          <button
            onClick={onBackToHome}
            className="h-8 px-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 text-xs font-bold flex items-center space-x-1.5 hover:text-white active:scale-95 transition-all shadow-sm shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-aviation-400" />
            <span>返回首页</span>
          </button>

          <span className="text-[11px] text-slate-400 font-medium font-mono">
            100% OPEN LEDGER
          </span>
        </div>
      )}

      {/* 1. Manifesto Banner */}
      <div className="obsidian-card rounded-3xl p-4 border border-emerald-500/40 space-y-2.5 shadow-xl bg-gradient-to-br from-emerald-950/30 via-obsidian-900 to-obsidian-900">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <h2 className="text-base font-bold text-white tracking-tight">DirectAir 1元透明自造血宣言</h2>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          我们恨透了 OTA 的捆绑欺诈、改名暴利与隐私倒卖。DirectAir **永远不以资本盈利为目的**，仅依靠每张机票「1元自愿支持」覆盖服务器运维成本。
        </p>
      </div>

      {/* 2. Monthly Financial Ledger */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-aviation-400" />
            <h3 className="font-bold text-white text-xs">2026年8月 透明运维收支账本</h3>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">100% 财务公开</span>
        </div>

        {/* Cost Breakdown Items */}
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/5 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Server className="w-4 h-4 text-slate-400" />
              <div>
                <span className="font-bold text-white text-xs block">高可用弹性服务器与 CDN 节点</span>
                <span className="text-[10px] text-slate-400">全国 8 节点边缘报价聚合计算</span>
              </div>
            </div>
            <span className="font-mono text-rose-400 font-bold text-xs">- ¥{monthlyServerCost}</span>
          </div>

          <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/5 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-slate-400" />
              <div>
                <span className="font-bold text-white text-xs block">安全合规与域名证书</span>
                <span className="text-[10px] text-slate-400">全站端到端强加密与隐私网关</span>
              </div>
            </div>
            <span className="font-mono text-rose-400 font-bold text-xs">- ¥{monthlyDomainCost}</span>
          </div>

          <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/5 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-slate-400" />
              <div>
                <span className="font-bold text-white text-xs block">航信中继与官方直连接口带宽</span>
                <span className="text-[10px] text-slate-400">保证报价与放座秒级同步</span>
              </div>
            </div>
            <span className="font-mono text-rose-400 font-bold text-xs">- ¥{monthlyApiCost}</span>
          </div>
        </div>

        {/* Ledger Summary */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 font-sans">本月基础总运维成本：</span>
          <span className="text-base font-black text-rose-400">¥{totalCost}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white font-sans text-xs">旅客「1元自愿支持」累计：</span>
          </div>
          <span className="text-base font-black text-emerald-400">
            {tipCount} 笔 (+ ¥{totalRevenue})
          </span>
        </div>
      </div>

      {/* 3. 1-Yuan Support Simulator CTA */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl">
        <div className="space-y-1">
          <h4 className="font-bold text-white text-xs flex items-center space-x-1.5">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>支持我们保持 100% 透明与纯粹</span>
          </h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            若 DirectAir 帮您避开了 OTA 加价或抢到了次卡余位，欢迎自愿支持 1 元服务器运维费。
          </p>
        </div>

        <button
          onClick={handleSimulateTip}
          className={`w-full h-12 rounded-2xl font-black text-xs shadow-xl flex items-center justify-center space-x-2 transition-all ${
            hasTipped
              ? 'bg-emerald-900 border border-emerald-600 text-emerald-200'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-white shadow-emerald-700/30 active:scale-95 glow-emerald'
          }`}
        >
          <Heart className={`w-4 h-4 ${hasTipped ? 'fill-emerald-200' : ''}`} />
          <span>{hasTipped ? '感谢您的 1 元支持！系统已记入公开账本' : '自愿支持 1 元 · 守护透明机票生态'}</span>
        </button>
      </div>
    </div>
  );
};
