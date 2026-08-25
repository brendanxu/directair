import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  ExternalLink, 
  RefreshCw, 
  Award, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Edit2,
  Crown,
  QrCode,
  Lock,
  Smartphone,
  Share2,
  Check
} from 'lucide-react';
import { LoyaltyMembership } from '../../types';

interface LoyaltyWalletViewProps {
  cards: LoyaltyMembership[];
  onAddCard: (card: LoyaltyMembership) => void;
  onUpdateBalance: (cardId: string, newBalance: number) => void;
}

export const LoyaltyWalletView: React.FC<LoyaltyWalletViewProps> = ({
  cards,
  onAddCard,
  onUpdateBalance,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    cards.length > 0 ? cards[0].id : null
  );
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [newBalanceInput, setNewBalanceInput] = useState<string>('');
  const [addedToAppleWallet, setAddedToAppleWallet] = useState<string | null>(null);

  const handleStartEditBalance = (card: LoyaltyMembership) => {
    setEditingCardId(card.id);
    setNewBalanceInput(card.balance.value.toString());
  };

  const handleSaveBalance = (cardId: string) => {
    const val = parseInt(newBalanceInput, 10);
    if (!isNaN(val)) {
      onUpdateBalance(cardId, val);
    }
    setEditingCardId(null);
  };

  const handleSimulateAppleWallet = (cardId: string) => {
    setAddedToAppleWallet(cardId);
    setTimeout(() => setAddedToAppleWallet(null), 2500);
  };

  const getCardTheme = (card: LoyaltyMembership) => {
    if (card.tier === 'GOLD' || card.tier === 'PLATINUM') {
      return {
        cardBg: 'golden-vip-card',
        textColor: 'text-amber-950',
        subTextColor: 'text-amber-950/75',
        badgeBg: 'bg-amber-950/20 text-amber-950 border-amber-950/30',
        borderColor: 'border-amber-400/40',
        barcodeColor: 'text-amber-950',
        tierLabel: 'GOLDEN VIP',
        loungeAccess: true,
        allianceTag: card.alliance === 'SKYTEAM' ? '天合优享 · SKYTEAM ELITE PLUS' : '星空联盟金卡',
      };
    }
    if (card.tier === 'SILVER') {
      return {
        cardBg: 'bg-gradient-to-br from-slate-200 via-slate-300 to-zinc-400',
        textColor: 'text-slate-900',
        subTextColor: 'text-slate-700',
        badgeBg: 'bg-slate-900/15 text-slate-900 border-slate-900/20',
        borderColor: 'border-slate-400/50',
        barcodeColor: 'text-slate-900',
        tierLabel: 'SILVER TIER',
        loungeAccess: false,
        allianceTag: card.alliance === 'STAR_ALLIANCE' ? '星空联盟银卡 · STAR SILVER' : '银卡会员',
      };
    }
    return {
      cardBg: 'bg-gradient-to-br from-obsidian-800 via-obsidian-850 to-slate-900',
      textColor: 'text-white',
      subTextColor: 'text-slate-400',
      badgeBg: 'bg-white/10 text-slate-200 border-white/10',
      borderColor: 'border-white/10',
      barcodeColor: 'text-white',
      tierLabel: 'CLASSIC MEMBER',
      loungeAccess: false,
      allianceTag: '明珠俱乐部会员',
    };
  };

  return (
    <div className="space-y-4 px-4 pt-2 pb-24 animate-fadeIn">
      {/* Skyward Master Top Header */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 leading-none">
                <h2 className="text-base font-black text-white tracking-tight">SKYWARD 卡包</h2>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono font-bold">
                  PASS DECK
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-1 leading-none flex items-center">
                <Lock className="w-3 h-3 text-emerald-400 mr-1" />
                <span>端侧钥匙串加密 · 支持添加至系统 Wallet</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => alert('已预置主要航司常旅客卡包')}
            className="h-8 px-3 rounded-xl bg-aviation-600 hover:bg-aviation-500 active:scale-95 text-white text-xs font-bold flex items-center space-x-1 shadow-md shadow-aviation-700/30 transition-all shrink-0 whitespace-nowrap glow-cyan"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>绑定新卡</span>
          </button>
        </div>
      </div>

      {/* Skyward Physical Stacked Deck */}
      <div className="relative pt-2 pb-12 min-h-[460px]">
        {cards.map((card, index) => {
          const isSelected = selectedCardId === card.id;
          const theme = getCardTheme(card);

          return (
            <div
              key={card.id}
              onClick={() => setSelectedCardId(isSelected ? null : card.id)}
              style={{
                top: `${index * 52}px`,
                zIndex: isSelected ? 30 : index + 10,
                transform: isSelected 
                  ? 'translateY(-12px) scale(1.02)' 
                  : 'translateY(0) scale(1)',
              }}
              className={`relative rounded-3xl p-5 border shadow-2xl transition-all duration-300 cursor-pointer ${theme.cardBg} ${theme.borderColor} ${
                isSelected ? 'ring-2 ring-amber-300/80 mb-44 shadow-amber-500/10' : 'hover:-translate-y-2'
              }`}
            >
              {/* Skyward Card Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1.5">
                    <Crown className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-black tracking-widest uppercase font-mono">
                      {theme.tierLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight leading-tight">
                    {card.airlineName}
                  </h3>
                  <span className={`text-[10px] font-bold block ${theme.subTextColor}`}>
                    {card.programName} · {theme.allianceTag}
                  </span>
                </div>

                <div className="text-right">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase font-mono ${theme.badgeBg}`}>
                    {card.tierLabel}
                  </span>
                  <span className={`text-[9px] font-mono block mt-1 ${theme.subTextColor}`}>
                    {card.tierExpiresAt ? `至 ${card.tierExpiresAt.slice(0, 7)}` : '长期有效'}
                  </span>
                </div>
              </div>

              {/* Card Number & Passenger Identity */}
              <div className="my-5">
                <div className={`font-mono text-lg tracking-[0.25em] font-black drop-shadow-sm ${theme.textColor}`}>
                  {card.maskedNumber}
                </div>
                <div className={`text-[11px] font-bold mt-0.5 flex items-center justify-between ${theme.subTextColor}`}>
                  <span>持卡人：{card.passengerName}</span>
                  <span className="font-mono text-[10px]">VERIFIED MEMBER</span>
                </div>
              </div>

              {/* Perforated Line with Physical Barcode */}
              <div className="relative py-2 border-t border-dashed border-current/25">
                <div className="flex items-end justify-between">
                  <div>
                    <span className={`text-[10px] block font-semibold ${theme.subTextColor}`}>
                      当前可用账户里程/积分
                    </span>
                    <div className="flex items-baseline space-x-1 mt-0.5">
                      <span className={`text-2xl font-black font-mono tracking-tight ${theme.textColor}`}>
                        {card.balance.value.toLocaleString()}
                      </span>
                      <span className={`text-xs font-bold ${theme.textColor}`}>
                        {card.balance.unit === 'POINTS' ? '积分' : '里程'}
                      </span>
                    </div>
                  </div>

                  {/* Physical Barcode Section */}
                  <div className="flex flex-col items-end">
                    <div className="h-6 w-24 flex space-x-0.5 opacity-80">
                      <div className="w-[3px] h-full bg-current"></div>
                      <div className="w-[1px] h-full bg-current"></div>
                      <div className="w-[2px] h-full bg-current"></div>
                      <div className="w-[1px] h-full bg-current"></div>
                      <div className="w-[4px] h-full bg-current"></div>
                      <div className="w-[2px] h-full bg-current"></div>
                      <div className="w-[1px] h-full bg-current"></div>
                      <div className="w-[3px] h-full bg-current"></div>
                      <div className="w-[2px] h-full bg-current"></div>
                      <div className="w-[1px] h-full bg-current"></div>
                      <div className="w-[3px] h-full bg-current"></div>
                    </div>
                    <span className={`text-[8px] font-mono font-bold tracking-widest mt-0.5 ${theme.subTextColor}`}>
                      {card.memberNumber.slice(0, 4)} {card.memberNumber.slice(-4)}
                    </span>
                  </div>
                </div>

                {/* Lounge Access Ribbon */}
                {theme.loungeAccess && (
                  <div className="mt-2.5 pt-2 border-t border-current/20 flex items-center justify-between text-[10px] font-bold">
                    <span className="flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>已开通全球贵宾休息室通行权</span>
                    </span>
                    <span className="font-mono tracking-wider text-[9px] uppercase px-2 py-0.2 rounded-full bg-black/20">
                      VIP LOUNGE ACCESS
                    </span>
                  </div>
                )}
              </div>

              {/* Expanded Card Details (When Selected / Pulled Up) */}
              {isSelected && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 pt-4 border-t border-current/20 space-y-3 animate-fadeIn text-xs"
                >
                  {/* Balance editor */}
                  <div className="p-3 rounded-2xl bg-black/25 backdrop-blur-md border border-current/15 flex items-center justify-between">
                    {editingCardId === card.id ? (
                      <div className="flex items-center space-x-2 w-full">
                        <input
                          type="number"
                          value={newBalanceInput}
                          onChange={(e) => setNewBalanceInput(e.target.value)}
                          className="w-28 h-8 px-2 rounded-lg bg-black/60 border border-white/30 text-white font-mono text-xs focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveBalance(card.id)}
                          className="h-8 px-3 rounded-lg bg-aviation-600 text-white font-bold text-xs"
                        >
                          保存
                        </button>
                        <button
                          onClick={() => setEditingCardId(null)}
                          className="h-8 px-2 rounded-lg bg-white/10 text-white text-xs"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-[11px] font-bold">手动更新最新里程余额：</span>
                        <button
                          onClick={() => handleStartEditBalance(card)}
                          className="h-7 px-2.5 rounded-lg bg-black/20 hover:bg-black/30 font-bold flex items-center space-x-1 text-[11px]"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>修改数值</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Skyward Action Links Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href={card.officialLinks.missingMilesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 px-3 rounded-xl bg-black/20 hover:bg-black/30 font-bold flex items-center justify-between text-[11px] transition-all"
                    >
                      <div className="flex items-center space-x-1.5">
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>官方里程补登</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    <a
                      href={card.officialLinks.accountUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 px-3 rounded-xl bg-black/20 hover:bg-black/30 font-bold flex items-center justify-between text-[11px] transition-all"
                    >
                      <div className="flex items-center space-x-1.5">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>航司官方会员</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  </div>

                  {/* Simulated Add to Apple Wallet CTA */}
                  <button
                    onClick={() => handleSimulateAppleWallet(card.id)}
                    className="w-full h-11 rounded-xl bg-black text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg hover:bg-black/80 active:scale-95 transition-all"
                  >
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span>
                      {addedToAppleWallet === card.id 
                        ? '✓ 已同步至 Apple Wallet 钱包' 
                        : '添加至 Apple Wallet 钱包 (.pkpass)'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
