import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Bell, 
  BellOff, 
  Trash2, 
  CreditCard, 
  Tag, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Plane,
  Smartphone,
  ShieldCheck,
  Radio,
  Compass,
  ArrowLeft
} from 'lucide-react';
import { WishlistItem } from '../../types';
import { CreateWishlistSheet } from './CreateWishlistSheet';

interface WishlistViewProps {
  wishlists: WishlistItem[];
  onAddWishlist: (item: WishlistItem) => void;
  onDeleteWishlist: (id: string) => void;
  onToggleNotify: (id: string) => void;
  onBackToHome?: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlists,
  onAddWishlist,
  onDeleteWishlist,
  onToggleNotify,
  onBackToHome,
}) => {
  const [filterMode, setFilterMode] = useState<string>('ALL');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filtered = wishlists.filter(item => {
    if (filterMode === 'ALL') return true;
    return item.mode === filterMode;
  });

  return (
    <div className="relative space-y-3.5 px-4 pt-2 pb-24 animate-fadeIn">
      {/* Ambient Aurora Background */}
      <div className="aurora-mesh animate-aurora-drift"></div>

      {/* Top Back Navigation Bar */}
      {onBackToHome && (
        <div className="relative z-10 flex items-center justify-between pb-0.5">
          <button
            onClick={onBackToHome}
            className="h-8 px-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 text-xs font-bold flex items-center space-x-1.5 hover:text-white active:scale-95 transition-all shadow-sm shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-aviation-400" />
            <span>返回首页</span>
          </button>

          <span className="text-[11px] text-slate-400 font-medium">
            24h 笛卡尔积静默雷达
          </span>
        </div>
      )}

      {/* Header Banner - Spacious Layout */}
      <div className="relative z-10 obsidian-card rounded-3xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1 pr-2">
            <div className="w-11 h-11 rounded-2xl bg-aviation-500/10 border border-aviation-400/30 text-aviation-400 flex items-center justify-center shrink-0 shadow-md">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-black text-white tracking-tight whitespace-nowrap">
                  愿望清单与雷达
                </h2>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold whitespace-nowrap">
                  RADAR
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                多城模糊交叉比价 · 航司次卡放票秒推
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="h-9 px-3 rounded-2xl bg-aviation-500 hover:bg-aviation-400 active:scale-95 text-white text-xs font-black flex items-center space-x-1 shadow-md shadow-aviation-600/30 transition-all glow-cyan shrink-0 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新建愿望</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 pt-1 text-xs border-t border-white/5">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`h-8 px-3 rounded-xl transition-all font-medium whitespace-nowrap ${
              filterMode === 'ALL'
                ? 'bg-aviation-600 text-white font-bold shadow-md'
                : 'bg-obsidian-850 text-slate-400 hover:text-slate-200'
            }`}
          >
            全部 ({wishlists.length})
          </button>
          <button
            onClick={() => setFilterMode('FLIGHT_PASS_RADAR')}
            className={`h-8 px-3 rounded-xl transition-all font-medium flex items-center space-x-1 whitespace-nowrap ${
              filterMode === 'FLIGHT_PASS_RADAR'
                ? 'bg-aviation-600 text-white font-bold shadow-md'
                : 'bg-obsidian-850 text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3 h-3" />
            <span>次卡/随心飞</span>
          </button>
          <button
            onClick={() => setFilterMode('LOW_PRICE_ALERT')}
            className={`h-8 px-3 rounded-xl transition-all font-medium flex items-center space-x-1 whitespace-nowrap ${
              filterMode === 'LOW_PRICE_ALERT'
                ? 'bg-aviation-600 text-white font-bold shadow-md'
                : 'bg-obsidian-850 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tag className="w-3 h-3" />
            <span>低价捡漏</span>
          </button>
        </div>
      </div>

      {/* Wishlist Cards Stream */}
      <div className="relative z-10 space-y-3">
        {filtered.length === 0 ? (
          <div className="obsidian-card p-10 rounded-3xl text-center space-y-2 border border-white/10">
            <Compass className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-slate-300 text-sm font-semibold">暂无愿望清单</p>
            <p className="text-xs text-slate-500">
              设置想去的多个目的地或添加持有的航司次卡，出现低价或可约余位时自动提醒
            </p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="mt-2 h-9 px-4 rounded-xl bg-aviation-600 text-white text-xs font-bold shadow-md"
            >
              立即创建
            </button>
          </div>
        ) : (
          filtered.map((item) => {
            const isMatched = item.radarStatus === 'MATCHED_ACTIVE';

            return (
              <div
                key={item.id}
                className={`obsidian-card rounded-3xl p-4 border transition-all space-y-3 shadow-xl overflow-hidden relative ${
                  isMatched 
                    ? 'border-emerald-500/80 bg-gradient-to-br from-emerald-950/40 via-obsidian-900 to-obsidian-900 glow-emerald' 
                    : 'border-white/5'
                }`}
              >
                {/* Radar Background Sweep when matched */}
                {isMatched && (
                  <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full border border-emerald-500/20 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full rounded-full radar-sweep-bg animate-radar-sweep opacity-30"></div>
                  </div>
                )}

                {/* Top Status & Title Row */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{item.title}</span>
                      {item.mode === 'FLIGHT_PASS_RADAR' ? (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono font-bold">
                          次卡雷达
                        </span>
                      ) : (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono font-bold">
                          捡漏监控
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      出行区间：{item.dateRange.label}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => onToggleNotify(item.id)}
                      className={`p-1.5 rounded-lg border ${
                        item.notifyEnabled
                          ? 'bg-aviation-950 border-aviation-700 text-aviation-400'
                          : 'bg-obsidian-850 border-white/5 text-slate-500'
                      }`}
                      title={item.notifyEnabled ? '推送已开启' : '推送已关闭'}
                    >
                      {item.notifyEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => onDeleteWishlist(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Cities Matrix Badges */}
                <div className="p-2.5 rounded-2xl bg-obsidian-950/80 border border-white/5 flex items-center justify-between text-xs relative z-10">
                  <div className="flex flex-wrap gap-1 flex-1">
                    {item.origins.map(o => (
                      <span key={o.code} className="px-1.5 py-0.5 rounded bg-obsidian-850 text-slate-300 text-[10px] font-mono border border-white/5 whitespace-nowrap">
                        {o.name}
                      </span>
                    ))}
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-aviation-400 shrink-0 mx-2" />

                  <div className="flex flex-wrap gap-1 flex-1 justify-end">
                    {item.destinations.map(d => (
                      <span key={d.code} className="px-1.5 py-0.5 rounded bg-aviation-950 text-aviation-300 text-[10px] font-mono border border-aviation-900 whitespace-nowrap">
                        {d.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Matched Banner vs Scanning Status */}
                {isMatched && item.matchedOffer ? (
                  <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-600/60 space-y-2.5 relative z-10 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-emerald-300 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>发现可兑换余位！(余{item.matchedOffer.seatsLeft}张)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.matchedOffer.foundAt}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-200">
                      <div>
                        <span className="font-bold text-white mr-2 font-mono">
                          {item.matchedOffer.flightNo} {item.matchedOffer.depTime}
                        </span>
                        <span className="text-[11px] text-slate-300">
                          {item.matchedOffer.origin} → {item.matchedOffer.destination}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black font-mono text-emerald-400">
                          次卡¥{item.matchedOffer.price}
                        </span>
                      </div>
                    </div>

                    {/* Direct Airline CTA */}
                    <a
                      href={item.matchedOffer.airlineAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98] text-white text-xs font-black shadow-md shadow-emerald-700/30 flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-emerald-100" />
                      <span>立即唤起 {item.flightPassInfo?.airlineName || '航司'} App 抢兑锁定</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-obsidian-950/70 border border-white/5 flex items-center justify-between text-xs relative z-10">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-aviation-400 animate-pulse"></div>
                      <span className="text-slate-300 text-[11px]">
                        {item.mode === 'LOW_PRICE_ALERT'
                          ? `监控目标 ≤ ¥${item.targetPrice} (当前最低 ¥${item.currentLowestPrice})`
                          : `持续追踪 ${item.flightPassInfo?.passName} 放票...`}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono">
                      24H RADAR ACTIVE
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Create Sheet Drawer */}
      {isCreateOpen && (
        <CreateWishlistSheet
          onAddWishlist={onAddWishlist}
          onClose={() => setIsCreateOpen(false)}
        />
      )}
    </div>
  );
};
