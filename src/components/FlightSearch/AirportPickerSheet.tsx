import React, { useState } from 'react';
import { 
  X, 
  Search, 
  MapPin, 
  Check, 
  Sparkles,
  Plane
} from 'lucide-react';

interface AirportPickerSheetProps {
  title: string;
  currentCode: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}

const POPULAR_CITIES = [
  { code: 'PEK', city: '北京', name: '首都国际机场', isHub: true },
  { code: 'PKX', city: '北京', name: '大兴国际机场', isHub: true },
  { code: 'SHA', city: '上海', name: '虹桥国际机场', isHub: true },
  { code: 'PVG', city: '上海', name: '浦东国际机场', isHub: true },
  { code: 'CAN', city: '广州', name: '白云国际机场', isHub: true },
  { code: 'SZX', city: '深圳', name: '宝安国际机场', isHub: true },
  { code: 'TFU', city: '成都', name: '天府国际机场', isHub: true },
  { code: 'CTU', city: '成都', name: '双流国际机场', isHub: false },
  { code: 'HGH', city: '杭州', name: '萧山国际机场', isHub: false },
  { code: 'CKG', city: '重庆', name: '江北国际机场', isHub: true },
  { code: 'XIY', city: '西安', name: '咸阳国际机场', isHub: true },
  { code: 'KMG', city: '昆明', name: '长水国际机场', isHub: true },
  { code: 'DLU', city: '大理', name: '荒草坝机场', isHub: false },
  { code: 'LJG', city: '丽江', name: '三义国际机场', isHub: false },
  { code: 'SYX', city: '三亚', name: '凤凰国际机场', isHub: false },
  { code: 'HAK', city: '海口', name: '美兰国际机场', isHub: false },
];

export const AirportPickerSheet: React.FC<AirportPickerSheetProps> = ({
  title,
  currentCode,
  onSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAirports = POPULAR_CITIES.filter(
    (item) =>
      item.city.includes(searchTerm) ||
      item.name.includes(searchTerm) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="flex-1" onClick={onClose}></div>

      {/* Sheet Container */}
      <div className="obsidian-card w-full max-w-[412px] mx-auto rounded-t-3xl border-t border-white/10 shadow-2xl p-5 space-y-4 max-h-[85vh] flex flex-col bg-obsidian-900/98 animate-slideUp">
        <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto -mt-1 mb-0.5 shrink-0"></div>

        {/* Sheet Title */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
          <div className="flex items-center space-x-2">
            <Plane className="w-4 h-4 text-aviation-400" />
            <h3 className="font-bold text-white text-base tracking-tight">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-obsidian-800 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center active:scale-90 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar: 44px Height */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索城市、机场名称或三字码 (如: 北京, PEK)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-obsidian-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-aviation-500 transition-colors"
            autoFocus
          />
        </div>

        {/* Popular Quick Pills */}
        <div className="space-y-1.5 shrink-0">
          <span className="text-[10px] text-slate-400 font-mono uppercase block">热门枢纽城市：</span>
          <div className="flex flex-wrap gap-1.5">
            {['PEK', 'SHA', 'CAN', 'SZX', 'TFU', 'HGH', 'CKG', 'XIY', 'DLU', 'SYX'].map((code) => {
              const item = POPULAR_CITIES.find((c) => c.code === code);
              if (!item) return null;
              const isSelected = currentCode === code;
              return (
                <button
                  key={code}
                  onClick={() => {
                    onSelect(code);
                    onClose();
                  }}
                  className={`h-7 px-2.5 rounded-xl border text-[11px] font-medium flex items-center space-x-1 active:scale-95 transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-aviation-600 border-aviation-400 text-white font-bold'
                      : 'bg-obsidian-850 border-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{item.city}</span>
                  <span className="font-mono text-[9px] opacity-75">{code}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Airports List */}
        <div className="space-y-2 overflow-y-auto flex-1 pr-1 no-scrollbar pt-1">
          {filteredAirports.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              未找到匹配的机场，请尝试搜索拼音或英文三字码
            </div>
          ) : (
            filteredAirports.map((airport) => {
              const isSelected = currentCode === airport.code;
              return (
                <div
                  key={airport.code}
                  onClick={() => {
                    onSelect(airport.code);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
                    isSelected
                      ? 'bg-aviation-950/80 border-aviation-500/80 text-white'
                      : 'bg-obsidian-950/60 border-white/5 text-slate-300 hover:bg-obsidian-850'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold font-mono text-xs ${
                        isSelected
                          ? 'bg-aviation-600 text-white'
                          : 'bg-obsidian-800 text-slate-300'
                      }`}
                    >
                      {airport.code}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-white text-xs">{airport.city}</span>
                        <span className="text-xs text-slate-400 font-normal">· {airport.name}</span>
                      </div>
                      {airport.isHub && (
                        <span className="text-[9px] text-aviation-400 font-mono">枢纽机场</span>
                      )}
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-aviation-400 shrink-0" />}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
