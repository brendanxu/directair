import React from 'react';
import { 
  Armchair, 
  Utensils, 
  HeartHandshake, 
  Baby, 
  Luggage, 
  ExternalLink, 
  ShieldCheck, 
  Clock,
  CheckCircle2,
  Phone
} from 'lucide-react';

export const SpecialServices: React.FC = () => {
  return (
    <div className="space-y-3.5">
      {/* Free Check-in Timetable */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-aviation-500/10 border border-aviation-400/30 text-aviation-400 flex items-center justify-center shrink-0">
            <Armchair className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">官方 0 元免费值机选座时间表</h4>
            <span className="text-[10px] text-emerald-400 font-medium">拒绝 OTA 收费 30~80 元“代办值机”</span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/5 flex justify-between items-center">
            <div>
              <span className="font-bold text-white block">国内航线开放时间</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">起飞前 24~48 小时免费开放自选座</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-aviation-950 text-aviation-300 text-[10px] font-mono border border-aviation-800 shrink-0 whitespace-nowrap">
              0 元全免费
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/5 flex justify-between items-center">
            <div>
              <span className="font-bold text-white block">国际航线开放时间</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">起飞前 48 小时官方开放值机</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-aviation-950 text-aviation-300 text-[10px] font-mono border border-aviation-800 shrink-0 whitespace-nowrap">
              0 元全免费
            </span>
          </div>
        </div>
      </div>

      {/* Special Care Services */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">特殊旅客服务官方申请直通</h4>
            <span className="text-[10px] text-slate-400">官方通道免费申请 · 全程专人陪护保障</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Wheelchair */}
          <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/5 space-y-1">
            <div className="flex items-center space-x-1 text-slate-200 font-bold">
              <HeartHandshake className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
              <span>轮椅旅客申请</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              机下及客舱内轮椅服务，起飞前24小时由航司免费安排。
            </p>
          </div>

          {/* Unaccompanied Minors */}
          <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/5 space-y-1">
            <div className="flex items-center space-x-1 text-slate-200 font-bold">
              <Baby className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
              <span>无成人陪伴儿童</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              5~12周岁儿童单独乘机，航司地服专人全程护送交接。
            </p>
          </div>

          {/* Infant Bassinet */}
          <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/5 space-y-1">
            <div className="flex items-center space-x-1 text-slate-200 font-bold">
              <Baby className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
              <span>婴儿摇篮 & 餐食</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              宽体机前排免费婴儿摇篮预定及免费婴儿辅食餐。
            </p>
          </div>

          {/* Special Meals */}
          <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/5 space-y-1">
            <div className="flex items-center space-x-1 text-slate-200 font-bold">
              <Utensils className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
              <span>清真 / 素食餐</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              起飞前24小时免费定制清真、低脂、儿童、素食餐。
            </p>
          </div>
        </div>
      </div>

      {/* Baggage Discount Hub */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-2 text-xs shadow-xl">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-aviation-500/10 border border-aviation-400/30 text-aviation-400 flex items-center justify-center shrink-0">
            <Luggage className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">额外行李提前预购享官方 7 折</h4>
            <span className="text-[10px] text-slate-400">避免机场柜台高额现场罚金</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
          春秋、九元等低成本航空及全服务航司超重行李，在航司官方 App 或小程序提前 6 小时购买可享 **7~8 折官方优惠**。
        </p>
      </div>
    </div>
  );
};
