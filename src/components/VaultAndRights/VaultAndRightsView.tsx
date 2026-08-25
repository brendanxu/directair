import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  ShieldAlert, 
  Activity, 
  User, 
  Lock,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { PassengerProfile, LoyaltyMembership, AirlineDirectoryItem, CompanyInvoiceProfile } from '../../types';
import { PassengerVaultView } from '../PassengerVault/PassengerVaultView';
import { LoyaltyWalletView } from '../LoyaltyWallet/LoyaltyWalletView';
import { AirlineDirectoryView, RightsSubTab } from '../AirlineDirectory/AirlineDirectoryView';
import { TransparencyView } from '../Transparency/TransparencyView';

interface VaultAndRightsViewProps {
  passengers: PassengerProfile[];
  onAddPassenger: (pax: PassengerProfile) => void;
  onDeletePassenger: (id: string) => void;
  invoiceProfiles: CompanyInvoiceProfile[];
  onAddInvoiceProfile: (inv: CompanyInvoiceProfile) => void;
  onDeleteInvoiceProfile: (id: string) => void;
  loyaltyCards: LoyaltyMembership[];
  onAddLoyaltyCard: (card: LoyaltyMembership) => void;
  onUpdateCardBalance: (cardId: string, newBalance: number) => void;
  directory: AirlineDirectoryItem[];
  defaultSection?: 'vault' | 'loyalty' | 'rights' | 'transparency';
  rightsInitialSubTab?: RightsSubTab;
  onBackToHome?: () => void;
}

export const VaultAndRightsView: React.FC<VaultAndRightsViewProps> = ({
  passengers,
  onAddPassenger,
  onDeletePassenger,
  invoiceProfiles,
  onAddInvoiceProfile,
  onDeleteInvoiceProfile,
  loyaltyCards,
  onAddLoyaltyCard,
  onUpdateCardBalance,
  directory,
  defaultSection = 'vault',
  rightsInitialSubTab = 'hotlines',
  onBackToHome,
}) => {
  const [activeSection, setActiveSection] = useState<'vault' | 'loyalty' | 'rights' | 'transparency'>(defaultSection);

  useEffect(() => {
    if (defaultSection) {
      setActiveSection(defaultSection);
    }
  }, [defaultSection]);

  return (
    <div className="relative space-y-3 px-4 pt-2 pb-24 animate-fadeIn">
      {/* Ambient Aurora Light */}
      <div className="aurora-mesh animate-aurora-drift"></div>

      {/* Top Segmented Navigation Control */}
      <div className="relative z-20 obsidian-card rounded-3xl p-1.5 grid grid-cols-4 gap-1 shadow-2xl sticky top-12 backdrop-blur-xl">
        {/* Section 1: Vault */}
        <button
          onClick={() => setActiveSection('vault')}
          className={`py-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-0.5 ${
            activeSection === 'vault'
              ? 'bg-aviation-600 text-white shadow-lg glow-cyan'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-[10px]">保险箱</span>
        </button>

        {/* Section 2: Loyalty Cards */}
        <button
          onClick={() => setActiveSection('loyalty')}
          className={`py-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-0.5 ${
            activeSection === 'loyalty'
              ? 'bg-aviation-600 text-white shadow-lg glow-cyan'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span className="text-[10px]">会员卡</span>
        </button>

        {/* Section 3: Rights Hub */}
        <button
          onClick={() => setActiveSection('rights')}
          className={`py-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-0.5 ${
            activeSection === 'rights'
              ? 'bg-aviation-600 text-white shadow-lg glow-cyan'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span className="text-[10px]">权益售后</span>
        </button>

        {/* Section 4: Transparency */}
        <button
          onClick={() => setActiveSection('transparency')}
          className={`py-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-0.5 ${
            activeSection === 'transparency'
              ? 'bg-emerald-600 text-white shadow-lg glow-emerald'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span className="text-[10px]">账本</span>
        </button>
      </div>

      {/* Render Active Sub-View */}
      <div className="relative z-10 -mx-4">
        {activeSection === 'vault' && (
          <PassengerVaultView
            passengers={passengers}
            onAddPassenger={onAddPassenger}
            onDeletePassenger={onDeletePassenger}
            invoiceProfiles={invoiceProfiles}
            onAddInvoiceProfile={onAddInvoiceProfile}
            onDeleteInvoiceProfile={onDeleteInvoiceProfile}
          />
        )}

        {activeSection === 'loyalty' && (
          <LoyaltyWalletView
            cards={loyaltyCards}
            onAddCard={onAddLoyaltyCard}
            onUpdateBalance={onUpdateCardBalance}
          />
        )}

        {activeSection === 'rights' && (
          <AirlineDirectoryView
            directory={directory}
            initialSubTab={rightsInitialSubTab}
            onBackToHome={onBackToHome}
          />
        )}

        {activeSection === 'transparency' && (
          <TransparencyView onBackToHome={onBackToHome} />
        )}
      </div>
    </div>
  );
};
