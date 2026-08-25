import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  ShieldCheck, 
  FileEdit, 
  RefreshCw, 
  Armchair, 
  Phone, 
  Lock, 
  Building, 
  Users, 
  Award, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  Copy,
  Check,
  Crown
} from 'lucide-react';
import { LoyaltyMembership, PassengerProfile, CompanyInvoiceProfile } from '../../types';
import { MOCK_CREDIT_CARDS } from '../../data/mockData';
import { LoyaltyWalletView } from '../LoyaltyWallet/LoyaltyWalletView';
import { CreditCardVaultView } from '../CreditCards/CreditCardVaultView';
import { PassengerVaultView } from '../PassengerVault/PassengerVaultView';
import { NameCorrectionGuide } from '../RightsHub/NameCorrectionGuide';
import { FlightDisruptionGuide } from '../RightsHub/FlightDisruptionGuide';
import { TicketVerifier } from '../RightsHub/TicketVerifier';
import { SpecialServices } from '../RightsHub/SpecialServices';

interface WalletAndToolsViewProps {
  passengers: PassengerProfile[];
  loyaltyCards: LoyaltyMembership[];
  invoiceProfiles: CompanyInvoiceProfile[];
  onAddPassenger: (passenger: PassengerProfile) => void;
  onDeletePassenger: (id: string) => void;
  onAddLoyaltyCard: (card: LoyaltyMembership) => void;
  onUpdateLoyaltyBalance: (cardId: string, newBalance: number) => void;
  onAddInvoiceProfile: (profile: CompanyInvoiceProfile) => void;
  onDeleteInvoiceProfile: (id: string) => void;
  onBackToHome: () => void;
  initialSubTab?: 'ASSETS' | 'TOOLS';
  initialToolTab?: string;
}

export const WalletAndToolsView: React.FC<WalletAndToolsViewProps> = ({
  passengers,
  loyaltyCards,
  invoiceProfiles,
  onAddPassenger,
  onDeletePassenger,
  onAddLoyaltyCard,
  onUpdateLoyaltyBalance,
  onAddInvoiceProfile,
  onDeleteInvoiceProfile,
  onBackToHome,
  initialSubTab = 'ASSETS',
  initialToolTab,
}) => {
  const [mainTab, setMainTab] = useState<'ASSETS' | 'TOOLS'>(initialSubTab);
  const [activeAssetModule, setActiveAssetModule] = useState<'CARDS' | 'CREDIT_CARDS' | 'PASSENGERS' | 'INVOICES'>('CARDS');
  const [activeToolModule, setActiveToolModule] = useState<string>(initialToolTab || 'name_correction');

  return (
    <div className="space-y-3.5 px-4 pt-2 pb-24 animate-fadeIn">
      {/* 1. Header Banner & Main Tab Switcher */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 leading-none">
                <h2 className="text-base font-black text-white tracking-tight">卡包与维权工具箱</h2>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono font-bold">
                  SKYWARD VAULT
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-1 leading-none">
                端侧钥匙串资产 · 100% 航司官方避坑护甲
              </p>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="h-8 px-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 text-xs font-bold flex items-center space-x-1 hover:text-white active:scale-95 transition-all shadow-sm shrink-0 whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-aviation-400" />
            <span>回首页</span>
          </button>
        </div>

        {/* 2 Main Tabs: ASSETS (我的数字资产) vs TOOLS (航旅维权工具箱) */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-obsidian-950 rounded-2xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setMainTab('ASSETS')}
            className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1.5 ${
              mainTab === 'ASSETS'
                ? 'bg-amber-600 text-white shadow-md glow-gold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>我的数字资产 (Assets)</span>
          </button>

          <button
            type="button"
            onClick={() => setMainTab('TOOLS')}
            className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1.5 ${
              mainTab === 'TOOLS'
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>航旅维权工具箱 (Tools)</span>
          </button>
        </div>
      </div>

      {/* 2. Main Tab 1: ASSETS (我的数字资产) */}
      {mainTab === 'ASSETS' && (
        <div className="space-y-3.5 animate-fadeIn">
          {/* Sub-Pills: 会员卡包 / 信用卡权益 / 乘机人钥匙串 / 企业发票抬头 */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-obsidian-950 rounded-2xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveAssetModule('CARDS')}
              className={`h-7 rounded-xl font-bold transition-all text-[11px] truncate px-1 ${
                activeAssetModule === 'CARDS'
                  ? 'bg-obsidian-800 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              会员卡 ({loyaltyCards.length})
            </button>

            <button
              onClick={() => setActiveAssetModule('CREDIT_CARDS')}
              className={`h-7 rounded-xl font-bold transition-all text-[11px] truncate px-1 flex items-center justify-center space-x-1 ${
                activeAssetModule === 'CREDIT_CARDS'
                  ? 'bg-obsidian-800 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>信用卡 ({MOCK_CREDIT_CARDS.length})</span>
            </button>

            <button
              onClick={() => setActiveAssetModule('PASSENGERS')}
              className={`h-7 rounded-xl font-bold transition-all text-[11px] truncate px-1 ${
                activeAssetModule === 'PASSENGERS'
                  ? 'bg-obsidian-800 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              乘机人 ({passengers.length})
            </button>

            <button
              onClick={() => setActiveAssetModule('INVOICES')}
              className={`h-7 rounded-xl font-bold transition-all text-[11px] truncate px-1 ${
                activeAssetModule === 'INVOICES'
                  ? 'bg-obsidian-800 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              抬头 ({invoiceProfiles.length})
            </button>
          </div>

          {/* Render Asset Modules */}
          {activeAssetModule === 'CARDS' && (
            <LoyaltyWalletView
              cards={loyaltyCards}
              onAddCard={onAddLoyaltyCard}
              onUpdateBalance={onUpdateLoyaltyBalance}
            />
          )}

          {activeAssetModule === 'CREDIT_CARDS' && (
            <CreditCardVaultView
              cards={MOCK_CREDIT_CARDS}
            />
          )}

          {(activeAssetModule === 'PASSENGERS' || activeAssetModule === 'INVOICES') && (
            <PassengerVaultView
              passengers={passengers}
              invoiceProfiles={invoiceProfiles}
              onAddPassenger={onAddPassenger}
              onDeletePassenger={onDeletePassenger}
              onAddInvoiceProfile={onAddInvoiceProfile}
              onDeleteInvoiceProfile={onDeleteInvoiceProfile}
            />
          )}
        </div>
      )}

      {/* 3. Main Tab 2: TOOLS (航旅维权与避坑工具箱) */}
      {mainTab === 'TOOLS' && (
        <div className="space-y-3.5 animate-fadeIn">
          {/* Tool Selector Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setActiveToolModule('name_correction')}
              className={`h-7 px-3 rounded-full text-xs font-bold shrink-0 transition-all ${
                activeToolModule === 'name_correction'
                  ? 'bg-aviation-600 text-white shadow-md'
                  : 'bg-obsidian-850 text-slate-400 border border-white/5'
              }`}
            >
              姓名改错政策
            </button>

            <button
              onClick={() => setActiveToolModule('disruption')}
              className={`h-7 px-3 rounded-full text-xs font-bold shrink-0 transition-all ${
                activeToolModule === 'disruption'
                  ? 'bg-aviation-600 text-white shadow-md'
                  : 'bg-obsidian-850 text-slate-400 border border-white/5'
              }`}
            >
              航变无损退改证明
            </button>

            <button
              onClick={() => setActiveToolModule('verification')}
              className={`h-7 px-3 rounded-full text-xs font-bold shrink-0 transition-all ${
                activeToolModule === 'verification'
                  ? 'bg-aviation-600 text-white shadow-md'
                  : 'bg-obsidian-850 text-slate-400 border border-white/5'
              }`}
            >
              13位客票验真
            </button>

            <button
              onClick={() => setActiveToolModule('services')}
              className={`h-7 px-3 rounded-full text-xs font-bold shrink-0 transition-all ${
                activeToolModule === 'services'
                  ? 'bg-aviation-600 text-white shadow-md'
                  : 'bg-obsidian-850 text-slate-400 border border-white/5'
              }`}
            >
              0元免费值机与热线
            </button>
          </div>

          {/* Render Tool Modules */}
          {activeToolModule === 'name_correction' && <NameCorrectionGuide />}
          {activeToolModule === 'disruption' && <FlightDisruptionGuide />}
          {activeToolModule === 'verification' && <TicketVerifier />}
          {activeToolModule === 'services' && <SpecialServices />}
        </div>
      )}
    </div>
  );
};
