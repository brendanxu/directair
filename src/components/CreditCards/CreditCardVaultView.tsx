import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Plus, 
  ExternalLink,
  Award,
  Crown,
  Lock,
  Layers,
  ArrowRight,
  Plane,
  AlertCircle
} from 'lucide-react';
import { CreditCardBenefit } from '../../types';

interface CreditCardVaultViewProps {
  cards: CreditCardBenefit[];
  onToggleCardBound?: (cardId: string) => void;
  onAddNewCard?: (card: CreditCardBenefit) => void;
}

export const CreditCardVaultView: React.FC<CreditCardVaultViewProps> = ({
  cards,
  onToggleCardBound,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || '');
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false);
  const [claimSuccessToast, setClaimSuccessToast] = useState<string | null>(null);

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];
  const boundCards = cards.filter(c => c.isBound);

  const handleSimulateClaimPackage = () => {
    setClaimSuccessToast('✓ 已自动为您打包【13位客票电子收据 + 航司准点验真证明】，支持一键发送至保险公司报案！');
    setTimeout(() => setClaimSuccessToast(null), 3500);
  };

  return (
    <div className="space-y-4 select-none animate-fadeIn">
      {/* 1. Vault Security Header */}
      <div className="obsidian-card rounded-3xl p-4 border border-amber-500/25 space-y-2.5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 leading-none">
                <h3 className="text-sm font-black text-white">信用卡航旅权益金库</h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 font-bold border border-amber-800">
                  INSURANCE HUB
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                自动匹配官方延误险 · 贵宾厅点数管理 · 零人工开证明
              </span>
            </div>
          </div>

          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full font-bold">
            已激活 {boundCards.length} 张大白金
          </span>
        </div>
      </div>

      {/* 2. Horizontal Credit Cards Swiper Deck */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs">
          <span className="font-bold text-slate-300">我的高端信用卡</span>
          <span className="text-[10px] text-slate-500 font-mono">轻触切换查看权益</span>
        </div>

        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1 px-0.5">
          {cards.map((card) => {
            const isSelected = card.id === selectedCardId;
            return (
              <div
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`min-w-[210px] max-w-[210px] rounded-2xl p-4 bg-gradient-to-br ${card.cardBgGradient} border transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden flex flex-col justify-between h-[125px] ${
                  isSelected 
                    ? 'ring-2 ring-amber-300 border-amber-300 scale-102 shadow-amber-500/20' 
                    : 'border-white/10 opacity-75 hover:opacity-100 hover:scale-100'
                }`}
              >
                {/* Top Card Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-white/80 block leading-tight">
                      {card.bankName}
                    </span>
                    <h4 className="text-xs font-black text-white tracking-tight mt-0.5">
                      {card.cardName}
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-amber-300 border border-white/10 font-black">
                    {card.cardTierLabel}
                  </span>
                </div>

                {/* Card Number & Suffix */}
                <div className="flex items-end justify-between text-white">
                  <div className="font-mono text-xs tracking-widest font-black opacity-90">
                    •••• •••• •••• {card.cardSuffix}
                  </div>
                  {card.delayInsurance.isActiveForCurrentFlight && (
                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                      今日承保中
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Card Rights & Delay Insurance Deep Dive */}
      {selectedCard && (
        <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-4 shadow-xl animate-fadeIn">
          {/* Card Title & Status */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <div className="flex items-center space-x-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-black text-white">{selectedCard.bankName} · {selectedCard.cardName}</h4>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                持卡人：{selectedCard.cardHolderName} · 卡号末四位 {selectedCard.cardSuffix}
              </span>
            </div>

            <a
              href={`tel:${selectedCard.delayInsurance.claimPhone}`}
              className="h-8 px-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center space-x-1 hover:bg-amber-500/25 active:scale-95 transition-all shrink-0"
            >
              <Phone className="w-3 h-3" />
              <span>报案专线</span>
            </a>
          </div>

          {/* Core Benefit 1: 免费航班延误险规则 */}
          <div className="rounded-2xl p-3.5 bg-gradient-to-r from-amber-950/40 via-obsidian-950 to-obsidian-950 border border-amber-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-amber-300 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>官方免费延误险（无需花钱自购）</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
                起延 {selectedCard.delayInsurance.triggerHours} 小时即赔
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">单次最高赔付</span>
                <span className="text-sm font-black font-mono text-amber-200 mt-0.5 block">
                  {selectedCard.delayInsurance.payoutAmount}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">年度累计限额</span>
                <span className="text-xs font-bold text-slate-200 mt-0.5 block">
                  {selectedCard.delayInsurance.annualLimit}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-obsidian-900 border border-white/5 space-y-1">
              <span className="text-[10px] text-amber-400/90 font-bold flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>理赔触发条件：</span>
              </span>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                {selectedCard.delayInsurance.terms}
              </p>
            </div>
          </div>

          {/* Core Benefit 2: 机场贵宾厅 & 里程比例 */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* VIP Lounges */}
            <div className="rounded-2xl p-3 bg-obsidian-950 border border-white/5 space-y-1.5">
              <span className="text-[10px] text-slate-400 block font-medium">机场贵宾厅 / CIP</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-black font-mono text-white">
                  {selectedCard.loungePasses.total - selectedCard.loungePasses.used}
                </span>
                <span className="text-[10px] text-slate-400">/ 每年 {selectedCard.loungePasses.total} 次可用</span>
              </div>
              <span className="text-[9px] text-slate-500 block truncate">
                {selectedCard.loungePasses.provider}
              </span>
            </div>

            {/* Mileage Conversion */}
            <div className="rounded-2xl p-3 bg-obsidian-950 border border-white/5 space-y-1.5">
              <span className="text-[10px] text-slate-400 block font-medium">航司里程兑换比</span>
              <div className="text-xs font-black text-amber-300 font-mono pt-1 truncate">
                {selectedCard.mileageRate.ratio}
              </div>
              <span className="text-[9px] text-slate-500 block truncate">
                支持 {selectedCard.mileageRate.supportedAirlines}
              </span>
            </div>
          </div>

          {/* Quick Action: 1-Click Generate Claim Pack (一键生成理赔材料包) */}
          <button
            onClick={handleSimulateClaimPackage}
            className="w-full h-11 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-amber-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-xl shadow-amber-900/30 active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>一键生成官方延误理赔材料包 (免开延误证明)</span>
          </button>

          {/* Toast Notification */}
          {claimSuccessToast && (
            <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs font-medium space-y-1 animate-fadeIn">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>理赔包生成就绪</span>
              </div>
              <p className="text-[11px] text-emerald-300/90 leading-relaxed">
                {claimSuccessToast}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
