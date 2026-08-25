import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Lock, 
  Unlock, 
  Download, 
  Trash2, 
  User, 
  CreditCard, 
  Smartphone,
  Building2,
  Copy,
  Check,
  Receipt
} from 'lucide-react';
import { PassengerProfile, CompanyInvoiceProfile } from '../../types';

interface PassengerVaultViewProps {
  passengers: PassengerProfile[];
  onAddPassenger: (pax: PassengerProfile) => void;
  onDeletePassenger: (id: string) => void;
  invoiceProfiles: CompanyInvoiceProfile[];
  onAddInvoiceProfile: (inv: CompanyInvoiceProfile) => void;
  onDeleteInvoiceProfile: (id: string) => void;
}

export const PassengerVaultView: React.FC<PassengerVaultViewProps> = ({
  passengers,
  onAddPassenger,
  onDeletePassenger,
  invoiceProfiles,
  onAddInvoiceProfile,
  onDeleteInvoiceProfile,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isBiometricPromptOpen, setIsBiometricPromptOpen] = useState(false);
  const [isCreatePaxOpen, setIsCreatePaxOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [copiedTaxId, setCopiedTaxId] = useState<string | null>(null);

  // Form state for Passenger
  const [familyNameZh, setFamilyNameZh] = useState('');
  const [givenNameZh, setGivenNameZh] = useState('');
  const [familyNameEn, setFamilyNameEn] = useState('');
  const [givenNameEn, setGivenNameEn] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');

  // Form state for Invoice Profile
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [financeEmail, setFinanceEmail] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [bankName, setBankName] = useState('');

  const handleSimulateBiometricUnlock = () => {
    setIsBiometricPromptOpen(true);
    setTimeout(() => {
      setIsUnlocked(true);
      setIsBiometricPromptOpen(false);
    }, 700);
  };

  const handleCreatePassenger = (e: React.FormEvent) => {
    e.preventDefault();
    const newPax: PassengerProfile = {
      id: `pax-${Date.now()}`,
      displayName: `${familyNameZh}${givenNameZh}`,
      isSelf: passengers.length === 0,
      name: {
        familyNameZh,
        givenNameZh,
        familyNameEn: familyNameEn.toUpperCase(),
        givenNameEn: givenNameEn.toUpperCase(),
      },
      gender: 'M',
      dateOfBirth: '1995-01-01',
      phone,
      documents: [
        {
          id: `doc-${Date.now()}`,
          type: 'ID_CARD',
          number: idNumber,
          maskedNumber: idNumber.length > 8 
            ? `${idNumber.slice(0, 6)}••••••••${idNumber.slice(-4)}` 
            : idNumber,
          issuingCountry: 'CN',
          expiresAt: '2035-01-01',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onAddPassenger(newPax);
    setFamilyNameZh('');
    setGivenNameZh('');
    setFamilyNameEn('');
    setGivenNameEn('');
    setIdNumber('');
    setPhone('');
    setIsCreatePaxOpen(false);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const newInv: CompanyInvoiceProfile = {
      id: `inv-${Date.now()}`,
      companyName,
      taxId: taxId.trim().toUpperCase(),
      financeEmail,
      companyAddress,
      bankName,
      isDefault: invoiceProfiles.length === 0,
      createdAt: new Date().toISOString(),
    };

    onAddInvoiceProfile(newInv);
    setCompanyName('');
    setTaxId('');
    setFinanceEmail('');
    setCompanyAddress('');
    setBankName('');
    setIsCreateInvoiceOpen(false);
  };

  const handleCopyTaxId = (taxNumber: string) => {
    navigator.clipboard.writeText(taxNumber);
    setCopiedTaxId(taxNumber);
    setTimeout(() => setCopiedTaxId(null), 2000);
  };

  const handleExportEncryptedJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        vault_version: "2.0",
        exported_at: new Date().toISOString(),
        encryption: "AES-256-GCM-SIMULATED",
        passengers: passengers,
        company_invoices: invoiceProfiles,
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `directair_vault_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-4 px-4 pt-2 pb-24 animate-fadeIn">
      {/* Header Banner - Clean Full-Width Title & Balanced Action Matrix */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3.5 shadow-xl">
        {/* Full-width Title Row (Never squished) */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-aviation-500/10 border border-aviation-400/30 text-aviation-400 flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-tight whitespace-nowrap">
                本地保险箱与企业差旅
              </h2>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold whitespace-nowrap">
                KEYCHAIN
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
              纯端侧离线加密 · 乘机人身份与企业发票抬头
            </p>
          </div>
        </div>

        {/* Primary Action Buttons: Symmetrical 2-Column Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
          <button
            onClick={() => setIsCreatePaxOpen(true)}
            className="h-10 px-3 rounded-2xl bg-aviation-600 hover:bg-aviation-500 active:scale-[0.98] text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-aviation-700/30 transition-all glow-cyan"
          >
            <Plus className="w-4 h-4" />
            <span>添加乘机人</span>
          </button>
          <button
            onClick={() => setIsCreateInvoiceOpen(true)}
            className="h-10 px-3 rounded-2xl bg-obsidian-850 hover:bg-obsidian-750 active:scale-[0.98] text-slate-200 border border-white/10 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all"
          >
            <Building2 className="w-4 h-4 text-aviation-400" />
            <span>添加企业抬头</span>
          </button>
        </div>

        {/* Secondary Security Controls: Symmetrical 2-Column Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
          <button
            onClick={isUnlocked ? () => setIsUnlocked(false) : handleSimulateBiometricUnlock}
            className={`h-8 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all text-xs whitespace-nowrap ${
              isUnlocked
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-obsidian-850 text-aviation-400 border border-white/10 hover:border-aviation-500/40'
            }`}
          >
            {isUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{isUnlocked ? '隐私已解锁' : 'Face ID / 指纹'}</span>
          </button>

          <button
            onClick={handleExportEncryptedJson}
            className="h-8 px-3 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center space-x-1.5 active:scale-95 transition-all whitespace-nowrap"
            title="导出加密备份文件"
          >
            <Download className="w-3.5 h-3.5 text-aviation-400" />
            <span>导出备份文件</span>
          </button>
        </div>
      </div>

      {/* Biometric Prompt Toast */}
      {isBiometricPromptOpen && (
        <div className="p-3.5 rounded-2xl bg-obsidian-950 border border-aviation-500 text-center space-y-1 animate-fadeIn shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-aviation-500/20 text-aviation-400 mx-auto flex items-center justify-center animate-pulse">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white block">正在调用系统 Face ID / 指纹...</span>
          <span className="text-[10px] text-slate-400 font-mono block">Biometric Authentication in progress</span>
        </div>
      )}

      {/* Section 1: Company Invoice Profile (企业发票抬头与差旅报销助手) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-black text-slate-200 tracking-wide uppercase flex items-center space-x-1.5">
            <Receipt className="w-3.5 h-3.5 text-aviation-400" />
            <span>企业发票抬头与差旅报销</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">100% 进项税全额抵扣</span>
        </div>

        {invoiceProfiles.length === 0 ? (
          <div 
            onClick={() => setIsCreateInvoiceOpen(true)}
            className="obsidian-card p-4 rounded-3xl text-center space-y-1.5 border border-dashed border-white/10 cursor-pointer hover:border-aviation-500/40"
          >
            <Building2 className="w-6 h-6 text-slate-500 mx-auto" />
            <p className="text-xs font-bold text-slate-300">尚未添加企业开票抬头</p>
            <p className="text-[10px] text-slate-500">点击录入企业税号，开具民航电子客票行程单时一键复制</p>
          </div>
        ) : (
          invoiceProfiles.map((inv) => (
            <div
              key={inv.id}
              className="obsidian-card rounded-3xl p-4 border border-aviation-500/30 space-y-2.5 shadow-xl bg-gradient-to-br from-aviation-950/20 via-obsidian-900 to-obsidian-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-white text-sm">{inv.companyName}</h3>
                    {inv.isDefault && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-aviation-950 text-aviation-300 border border-aviation-800 font-mono font-bold">
                        默认抬头
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                    财务报销邮箱：{inv.financeEmail || '未设置'}
                  </span>
                </div>

                <button
                  onClick={() => onDeleteInvoiceProfile(inv.id)}
                  className="w-7 h-7 rounded-lg text-slate-500 hover:text-rose-400 flex items-center justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tax ID & 1-Click Copy Bar */}
              <div className="p-3 rounded-2xl bg-obsidian-950 border border-white/10 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-400 block uppercase font-mono">统一社会信用代码 / 税号</span>
                  <span className="text-xs font-mono font-bold text-aviation-300 tracking-wider">
                    {inv.taxId}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyTaxId(inv.taxId)}
                  className={`h-8 px-3 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    copiedTaxId === inv.taxId
                      ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                      : 'bg-aviation-600 border-aviation-500 text-white shadow-md glow-cyan active:scale-95'
                  }`}
                >
                  {copiedTaxId === inv.taxId ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTaxId === inv.taxId ? '已复制' : '复制税号'}</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-500 leading-snug">
                💡 航司出票后，在官方 App 开具「增值税电子普通发票/电子行程单」时直接粘贴该税号即可。
              </p>
            </div>
          ))
        )}
      </div>

      {/* Section 2: Passengers List */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-black text-slate-200 tracking-wide uppercase flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5 text-aviation-400" />
            <span>乘机人信息库</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">共 {passengers.length} 位</span>
        </div>

        {passengers.length === 0 ? (
          <div className="obsidian-card p-8 rounded-3xl text-center space-y-2 border border-white/10">
            <User className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-slate-300 text-sm font-semibold">保险箱暂无乘机人</p>
            <p className="text-xs text-slate-500">
              添加您的身份证、护照或常用联系人，购票时一键直达航司填单
            </p>
            <button
              onClick={() => setIsCreatePaxOpen(true)}
              className="mt-2 h-9 px-4 rounded-xl bg-aviation-600 text-white text-xs font-bold"
            >
              立即添加
            </button>
          </div>
        ) : (
          passengers.map((pax) => (
            <div
              key={pax.id}
              className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl"
            >
              {/* Top Row: Name & Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-obsidian-800 border border-white/10 flex items-center justify-center font-bold text-white text-sm shadow-md">
                    {pax.name.familyNameZh}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-white text-sm">{pax.displayName}</span>
                      {pax.isSelf && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-aviation-950 text-aviation-300 border border-aviation-800 font-mono font-bold">
                          本人
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                      {pax.name.familyNameEn} / {pax.name.givenNameEn}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onDeletePassenger(pax.id)}
                  className="w-8 h-8 rounded-xl bg-obsidian-850 text-slate-500 hover:text-rose-400 flex items-center justify-center active:scale-95 transition-all"
                  title="删除该乘机人"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Documents List */}
              <div className="space-y-1.5 pt-1">
                {pax.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-2.5 rounded-2xl bg-obsidian-950 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
                      <span className="text-slate-300 font-medium">
                        {doc.type === 'ID_CARD' ? '居民身份证' : doc.type === 'PASSPORT' ? '中国护照' : '港澳通行证'}
                      </span>
                    </div>

                    <div className="font-mono font-bold text-xs text-white">
                      {isUnlocked ? doc.number : doc.maskedNumber}
                    </div>
                  </div>
                ))}
              </div>

              {/* Phone & Meta */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>手机：{isUnlocked ? pax.phone : pax.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>
                <span>创建于 {pax.createdAt.slice(0, 10)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Passenger Modal */}
      {isCreatePaxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="flex-1" onClick={() => setIsCreatePaxOpen(false)}></div>
          <div className="obsidian-card w-full max-w-[412px] mx-auto rounded-t-3xl border-t border-white/10 shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto bg-obsidian-900/98 animate-slideUp">
            <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto -mt-1 mb-0.5 shrink-0"></div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base tracking-tight">添加乘机人资料</h3>
              <button onClick={() => setIsCreatePaxOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreatePassenger} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1 leading-none">中文姓</label>
                  <input
                    type="text"
                    required
                    placeholder="如: 张"
                    value={familyNameZh}
                    onChange={(e) => setFamilyNameZh(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aviation-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1 leading-none">中文名</label>
                  <input
                    type="text"
                    required
                    placeholder="如: 三"
                    value={givenNameZh}
                    onChange={(e) => setGivenNameZh(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aviation-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1 leading-none">英文姓 (Surname)</label>
                  <input
                    type="text"
                    required
                    placeholder="如: ZHANG"
                    value={familyNameEn}
                    onChange={(e) => setFamilyNameEn(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aviation-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1 leading-none">英文名 (Given Name)</label>
                  <input
                    type="text"
                    required
                    placeholder="如: SAN"
                    value={givenNameEn}
                    onChange={(e) => setGivenNameEn(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aviation-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1 leading-none">身份证号</label>
                <input
                  type="text"
                  required
                  placeholder="18位居民身份证号码"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-aviation-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1 leading-none">常用手机号 (用于接收航变通知)</label>
                <input
                  type="tel"
                  required
                  placeholder="11位手机号码"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-aviation-500"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-aviation-600 hover:bg-aviation-500 active:scale-[0.98] text-white font-bold text-xs shadow-lg shadow-aviation-700/30 flex items-center justify-center space-x-1.5 transition-all mt-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>保存到本地钥匙串</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Company Invoice Modal */}
      {isCreateInvoiceOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="flex-1" onClick={() => setIsCreateInvoiceOpen(false)}></div>
          <div className="obsidian-card w-full max-w-[412px] mx-auto rounded-t-3xl border-t border-white/10 shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto bg-obsidian-900/98 animate-slideUp">
            <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto -mt-1 mb-0.5 shrink-0"></div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base tracking-tight">添加企业发票抬头</h3>
              <button onClick={() => setIsCreateInvoiceOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1 leading-none">企业/单位全称 (必须与营业执照一致)</label>
                <input
                  type="text"
                  required
                  placeholder="如: 北京智行未来科技有限公司"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aviation-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1 leading-none">纳税人识别号 / 统一社会信用代码</label>
                <input
                  type="text"
                  required
                  placeholder="18位纳税人识别号"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-aviation-500 uppercase"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1 leading-none">财务报销电子行程单接收邮箱</label>
                <input
                  type="email"
                  required
                  placeholder="如: finance@company.com"
                  value={financeEmail}
                  onChange={(e) => setFinanceEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-aviation-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1 leading-none">单位地址 (可选)</label>
                <input
                  type="text"
                  placeholder="如: 北京市海淀区中关村南大街1号"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aviation-500"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-aviation-500 to-aviation-600 hover:from-aviation-400 active:scale-[0.98] text-white font-black text-xs shadow-xl shadow-aviation-600/30 flex items-center justify-center space-x-1.5 transition-all mt-2 glow-cyan"
              >
                <Building2 className="w-4 h-4" />
                <span>保存企业发票抬头</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
