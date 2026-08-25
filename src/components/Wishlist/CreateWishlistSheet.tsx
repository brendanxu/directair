import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Bell, 
  Tag, 
  CreditCard, 
  Calendar,
  Check,
  Plus
} from 'lucide-react';
import { WishlistItem, WishlistMode } from '../../types';

interface CreateWishlistSheetProps {
  onAddWishlist: (item: WishlistItem) => void;
  onClose: () => void;
}

const CITY_OPTIONS = [
  { code: 'PEK', name: '北京首都', group: 'origin' },
  { code: 'PKX', name: '北京大兴', group: 'origin' },
  { code: 'TSN', name: '天津滨海', group: 'origin' },
  { code: 'SHA', name: '上海虹桥', group: 'origin' },
  { code: 'PVG', name: '上海浦东', group: 'origin' },
  { code: 'CAN', name: '广州白云', group: 'origin' },
  { code: 'SZX', name: '深圳宝安', group: 'origin' },

  { code: 'DLU', name: '大理荒草坝', group: 'dest' },
  { code: 'LJG', name: '丽江三义', group: 'dest' },
  { code: 'KMG', name: '昆明长水', group: 'dest' },
  { code: 'TFU', name: '成都天府', group: 'dest' },
  { code: 'SYX', name: '三亚凤凰', group: 'dest' },
  { code: 'HAK', name: '海口美兰', group: 'dest' },
  { code: 'XIY', name: '西安咸阳', group: 'dest' },
];

export const CreateWishlistSheet: React.FC<CreateWishlistSheetProps> = ({
  onAddWishlist,
  onClose,
}) => {
  const [mode, setMode] = useState<WishlistMode>('LOW_PRICE_ALERT');
  const [title, setTitle] = useState('');
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>(['PEK', 'PKX']);
  const [selectedDests, setSelectedDests] = useState<string[]>(['DLU', 'LJG']);
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-07');
  const [targetPrice, setTargetPrice] = useState('800');
  const [selectedPass, setSelectedPass] = useState('MU_PASS');

  const toggleOrigin = (code: string) => {
    setSelectedOrigins(prev => 
      prev.includes(code) ? (prev.length > 1 ? prev.filter(c => c !== code) : prev) : [...prev, code]
    );
  };

  const toggleDest = (code: string) => {
    setSelectedDests(prev => 
      prev.includes(code) ? (prev.length > 1 ? prev.filter(c => c !== code) : prev) : [...prev, code]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const originObjs = selectedOrigins.map(code => ({
      code,
      name: CITY_OPTIONS.find(c => c.code === code)?.name || code
    }));

    const destObjs = selectedDests.map(code => ({
      code,
      name: CITY_OPTIONS.find(c => c.code === code)?.name || code
    }));

    const newItem: WishlistItem = {
      id: `wish-${Date.now()}`,
      title: title || (mode === 'LOW_PRICE_ALERT' ? `捡漏监控 (${originObjs.map(o => o.name).join('/')} → ${destObjs.map(d => d.name).join('/')})` : `航司次卡雷达 (${destObjs.map(d => d.name).join('/')})`),
      mode: mode,
      origins: originObjs,
      destinations: destObjs,
      dateRange: {
        startDate,
        endDate,
        label: `${startDate.slice(5)} 至 ${endDate.slice(5)}`
      },
      targetPrice: mode === 'LOW_PRICE_ALERT' ? parseInt(targetPrice, 10) || 800 : undefined,
      currentLowestPrice: mode === 'LOW_PRICE_ALERT' ? parseInt(targetPrice, 10) + 320 : undefined,
      flightPassInfo: mode === 'FLIGHT_PASS_RADAR' ? {
        passName: selectedPass === 'MU_PASS' ? '东方航空·畅行次卡 (400元/段)' : selectedPass === 'CZ_PASS' ? '南方航空·畅游中国' : '中国国航·随心卡',
        airlineCode: selectedPass === 'MU_PASS' ? 'MU' : selectedPass === 'CZ_PASS' ? 'CZ' : 'CA',
        airlineName: selectedPass === 'MU_PASS' ? '中国东方航空' : selectedPass === 'CZ_PASS' ? '中国南方航空' : '中国国际航空',
        fixedCostPerLeg: selectedPass === 'MU_PASS' ? 400 : 50,
        eligibleBookingClass: 'X/O/E舱'
      } : undefined,
      radarStatus: 'SCANNING',
      createdAt: new Date().toISOString(),
      notifyEnabled: true
    };

    onAddWishlist(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="flex-1" onClick={onClose}></div>

      {/* Sheet Container */}
      <div className="obsidian-card w-full max-w-[412px] mx-auto rounded-t-3xl border-t border-white/10 shadow-2xl p-5 space-y-4 max-h-[88vh] overflow-y-auto bg-obsidian-900/98 animate-slideUp">
        <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto -mt-1 mb-0.5 shrink-0"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-aviation-400" />
            <h3 className="font-bold text-white text-base tracking-tight">新建愿望清单与余位雷达</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-obsidian-800 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center active:scale-90 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-obsidian-950 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => setMode('LOW_PRICE_ALERT')}
            className={`h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              mode === 'LOW_PRICE_ALERT'
                ? 'bg-aviation-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>低价捡漏监控</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('FLIGHT_PASS_RADAR')}
            className={`h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              mode === 'FLIGHT_PASS_RADAR'
                ? 'bg-aviation-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>航司次卡/随心飞</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1.5 leading-none">愿望标题 (可选)</label>
            <input
              type="text"
              placeholder={mode === 'LOW_PRICE_ALERT' ? '如: 十一大理/丽江捡漏 (京津冀出发)' : '如: 东航次卡兑换监控 (上海-成都)'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aviation-500"
            />
          </div>

          {/* Multi-Origins */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between leading-none">
              <span className="text-slate-300 font-semibold">可接受的出发地 (支持多选)</span>
              <span className="text-[10px] text-aviation-400 font-mono">已选 {selectedOrigins.length} 个</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CITY_OPTIONS.filter(c => c.group === 'origin').map(c => {
                const isSelected = selectedOrigins.includes(c.code);
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => toggleOrigin(c.code)}
                    className={`h-7 px-2.5 rounded-xl border text-[11px] font-medium transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-aviation-950 text-aviation-300 border-aviation-500 font-bold'
                        : 'bg-obsidian-950 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multi-Destinations */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between leading-none">
              <span className="text-slate-300 font-semibold">可接受的目的地 (支持多选)</span>
              <span className="text-[10px] text-aviation-400 font-mono">已选 {selectedDests.length} 个</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CITY_OPTIONS.filter(c => c.group === 'dest').map(c => {
                const isSelected = selectedDests.includes(c.code);
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => toggleDest(c.code)}
                    className={`h-7 px-2.5 rounded-xl border text-[11px] font-medium transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-aviation-950 text-aviation-300 border-aviation-500 font-bold'
                        : 'bg-obsidian-950 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Window */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-300 font-semibold block mb-1 leading-none">最早出发日</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1 leading-none">最晚出发日</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono font-bold"
              />
            </div>
          </div>

          {/* Mode Condition Fields */}
          {mode === 'LOW_PRICE_ALERT' ? (
            <div className="p-3.5 rounded-2xl bg-obsidian-950 border border-white/10 space-y-2">
              <label className="text-slate-200 font-semibold block leading-none">
                触发通知的目标全包价 (¥)
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold font-mono text-aviation-400 leading-none">≤ ¥</span>
                <input
                  type="number"
                  required
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-base font-mono font-black focus:outline-none focus:border-aviation-500"
                />
              </div>
              <p className="text-[10px] text-slate-400 leading-snug">
                当笛卡尔积交叉航线中任意一班全包价低于此阈值，即刻推送通知
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-obsidian-950 border border-white/10 space-y-2">
              <label className="text-slate-200 font-semibold block leading-none">
                选择您持有的航司产品
              </label>
              <select
                value={selectedPass}
                onChange={(e) => setSelectedPass(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white font-medium focus:outline-none"
              >
                <option value="MU_PASS">东方航空 · 畅行次卡 (约400元/段 X/O舱)</option>
                <option value="CZ_PASS">南方航空 · 畅游中国 (E/X舱)</option>
                <option value="CA_PASS">中国国航 · 随心卡/青年次卡</option>
              </select>
              <p className="text-[10px] text-emerald-400 leading-snug">
                雷达将 24h 追踪该航司对应兑换舱位的余位，一旦放票秒级提醒
              </p>
            </div>
          )}

          {/* Submit: 48px Height */}
          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-aviation-500 to-aviation-600 hover:from-aviation-400 active:scale-[0.98] text-white font-black text-xs shadow-xl shadow-aviation-600/30 flex items-center justify-center space-x-2 transition-all glow-cyan"
          >
            <Bell className="w-4 h-4" />
            <span>开启愿望清单 24h 自动雷达</span>
          </button>
        </form>
      </div>
    </div>
  );
};
