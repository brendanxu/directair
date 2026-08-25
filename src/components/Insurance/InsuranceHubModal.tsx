import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  FileText,
  BadgeAlert,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { InsuranceProduct } from '../../types';
import { MOCK_INSURANCE_PRODUCTS } from '../../data/mockData';

interface InsuranceHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  flightNo?: string;
}

export const InsuranceHubModal: React.FC<InsuranceHubModalProps> = ({
  isOpen,
  onClose,
  flightNo = 'MU5101',
}) => {
  const [selectedInsuranceIds, setSelectedInsuranceIds] = useState<string[]>(['ins-delay-parametric']);
  const [isPolicyPurchased, setIsPolicyPurchased] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    setSelectedInsuranceIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalPrice = selectedInsuranceIds.reduce((sum, id) => {
    const prod = MOCK_INSURANCE_PRODUCTS.find(p => p.id === id);
    return sum + (prod ? prod.price : 0);
  }, 0);

  const totalOtaPrice = selectedInsuranceIds.reduce((sum, id) => {
    const prod = MOCK_INSURANCE_PRODUCTS.find(p => p.id === id);
    return sum + (prod ? prod.originalOtaPrice : 0);
  }, 0);

  const savedAmount = totalOtaPrice - totalPrice;

  const handleConfirmOrder = () => {
    setIsPolicyPurchased(true);
    setTimeout(() => {
      setIsPolicyPurchased(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn select-none">
      <div className="w-full max-w-[420px] bg-obsidian-950 border border-white/10 rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl p-5 space-y-4 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-aviation-500/10 border border-aviation-400/30 text-aviation-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 leading-none">
                <h3 className="text-sm font-black text-white">官方直连 · 透明航空保险</h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                  0 默认勾选
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                人保 / 太保 / 平安官方直出 · 击穿 OTA 85% 暴利
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-obsidian-850 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Banner: 零材料自动闪赔延误险 */}
        <div className="rounded-2xl p-3.5 bg-gradient-to-r from-amber-950/40 via-obsidian-900 to-obsidian-900 border border-amber-500/30 space-y-2">
          <div className="flex items-center space-x-1.5 text-amber-300 text-xs font-bold font-mono">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>极客参数化闪赔机制 (零材料 · 秒到账)</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            DirectAir 直连民航 ADS-B 雷达数据。若航班【{flightNo}】起飞延误达 120 分钟，系统自动向微信/支付宝直赔 ¥300，无需跑柜台开证明！
          </p>
        </div>

        {/* Insurance Products List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-slate-300">可选保障险种</span>
            <span className="text-[10px] text-slate-500 font-mono">按需勾选 · 随时可退</span>
          </div>

          {MOCK_INSURANCE_PRODUCTS.map((prod) => {
            const isSelected = selectedInsuranceIds.includes(prod.id);

            return (
              <div
                key={prod.id}
                onClick={() => toggleSelect(prod.id)}
                className={`rounded-2xl p-3.5 border transition-all cursor-pointer space-y-2 relative ${
                  isSelected
                    ? 'bg-obsidian-900 border-amber-400/60 ring-1 ring-amber-400/40 shadow-lg'
                    : 'bg-obsidian-950 border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Product Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2.5">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 transition-colors ${
                      isSelected
                        ? 'bg-amber-400 border-amber-300 text-amber-950'
                        : 'border-slate-600 bg-obsidian-850'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 fill-amber-950 text-amber-300" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-tight">{prod.name}</h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                        承保方：{prod.underwriter}
                      </span>
                    </div>
                  </div>

                  {/* Price Comparison Tag */}
                  <div className="text-right">
                    <div className="flex items-baseline space-x-1 justify-end">
                      <span className="text-sm font-black font-mono text-amber-300">¥{prod.price}</span>
                      <span className="text-[10px] text-slate-500 line-through font-mono">OTA ¥{prod.originalOtaPrice}</span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold block">
                      立省 ¥{(prod.originalOtaPrice - prod.price).toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Coverage Details */}
                <div className="pl-7 space-y-1">
                  <div className="text-[11px] font-bold text-amber-200/90">
                    {prod.coverageHeadline}
                  </div>
                  <ul className="text-[10px] text-slate-400 space-y-0.5 list-disc list-inside">
                    {prod.coverageDetails.map((detail, idx) => (
                      <li key={idx} className="truncate">{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Checkout Summary */}
        <div className="pt-3 border-t border-white/10 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">已选 {selectedInsuranceIds.length} 项保障</span>
              {savedAmount > 0 && (
                <span className="text-[10px] text-emerald-400 font-mono font-bold block">
                  相比传统 OTA 累计为您节省 ¥{savedAmount.toFixed(1)}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">实付：</span>
              <span className="text-xl font-black font-mono text-amber-300">¥{totalPrice.toFixed(1)}</span>
            </div>
          </div>

          <button
            disabled={selectedInsuranceIds.length === 0}
            onClick={handleConfirmOrder}
            className={`w-full h-11 rounded-2xl font-black text-xs flex items-center justify-center space-x-2 shadow-xl transition-all ${
              selectedInsuranceIds.length > 0
                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-amber-950 hover:brightness-110 active:scale-98'
                : 'bg-obsidian-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>确认出具正规电子保单 (支持验真)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {isPolicyPurchased && (
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-bold text-center animate-fadeIn">
              ✓ 电子保单出具成功！已自动绑定航班【{flightNo}】，随时支持 24h 自动理赔
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
