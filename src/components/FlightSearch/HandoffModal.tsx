import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Smartphone, 
  Copy, 
  Check, 
  AlertCircle, 
  Lock,
  ArrowRight,
  Plane,
  X
} from 'lucide-react';
import { FlightOffer, CabinOffer, PassengerProfile } from '../../types';

interface HandoffModalProps {
  flight: FlightOffer;
  cabin: CabinOffer;
  passengers: PassengerProfile[];
  onClose: () => void;
}

export const HandoffModal: React.FC<HandoffModalProps> = ({
  flight,
  cabin,
  passengers,
  onClose,
}) => {
  const [selectedPaxIds, setSelectedPaxIds] = useState<string[]>(
    passengers.length > 0 ? [passengers[0].id] : []
  );
  const [isCopied, setIsCopied] = useState(false);
  const [repriceStep, setRepriceStep] = useState<'IDLE' | 'VERIFYING' | 'SUCCESS'>('IDLE');

  const togglePassenger = (id: string) => {
    setSelectedPaxIds(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(p => p !== id) : prev) 
        : [...prev, id]
    );
  };

  const handleSimulateHandoff = () => {
    setRepriceStep('VERIFYING');
    setTimeout(() => {
      setRepriceStep('SUCCESS');
    }, 600);
  };

  const selectedPaxList = passengers.filter(p => selectedPaxIds.includes(p.id));
  const paxClipboardText = selectedPaxList.map(p => 
    `${p.name.familyNameZh}${p.name.givenNameZh} (${p.name.familyNameEn}/${p.name.givenNameEn}) ` +
    `证件: ${p.documents[0]?.number || '无'} 电话: ${p.phone}`
  ).join('\n');

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(paxClipboardText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="flex-1" onClick={onClose}></div>

      {/* Action Sheet Container */}
      <div className="obsidian-card w-full max-w-[412px] mx-auto rounded-t-3xl border-t border-white/10 shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto bg-obsidian-900/98 animate-slideUp">
        <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto -mt-1 mb-0.5 shrink-0"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base tracking-tight">直达航司官网完成出票</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-obsidian-800 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center active:scale-90 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Flight & Total Summary */}
        <div className="p-3.5 rounded-2xl bg-obsidian-950/90 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-xs">
                {flight.segment.airlineName} {flight.segment.flightNumber}
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-aviation-950 text-aviation-300 border border-aviation-800">
                {cabin.bookingClass}舱
              </span>
            </div>
            <span className="text-sm font-black font-mono text-aviation-400">
              ¥{cabin.totalPrice * selectedPaxIds.length}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{flight.segment.departureTime} ({flight.segment.departureAirportName}) → {flight.segment.arrivalTime} ({flight.segment.arrivalAirportName})</span>
            <span>{selectedPaxIds.length}位乘客</span>
          </div>
        </div>

        {/* Local Passenger Vault Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">选择乘机人 (仅保存在本地)</span>
            <span className="text-[10px] text-emerald-400 flex items-center font-medium">
              <Lock className="w-3 h-3 mr-1" />
              本地钥匙串保护
            </span>
          </div>

          <div className="space-y-2">
            {passengers.map(pax => {
              const isSelected = selectedPaxIds.includes(pax.id);
              return (
                <div
                  key={pax.id}
                  onClick={() => togglePassenger(pax.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-aviation-950/80 border-aviation-500/80 text-white'
                      : 'bg-obsidian-950/60 border-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-white">{pax.displayName}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {pax.name.familyNameEn}/{pax.name.givenNameEn}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {pax.documents[0]?.type === 'ID_CARD' ? '身份证' : '护照'}: {pax.documents[0]?.maskedNumber}
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'bg-aviation-500 border-aviation-400 text-white' : 'border-slate-700'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* One-Click Fast Copy Bar */}
        <div className="p-3 rounded-2xl bg-obsidian-950/80 border border-white/5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-semibold text-[11px]">乘机人信息一键填单卡</span>
            <button
              onClick={handleCopyClipboard}
              className={`h-7 px-2.5 rounded-lg border text-[10px] font-bold flex items-center space-x-1 transition-all ${
                isCopied 
                  ? 'bg-emerald-950 border-emerald-700 text-emerald-400' 
                  : 'bg-obsidian-800 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? '已复制到剪贴板' : '一键复制姓名/证件号'}</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            前往航司官方 App 或小程序结算时，可直接一键粘贴乘机人资料，告别手动输入失误。
          </p>
        </div>

        {/* Handoff Trigger Action Button: 48px Height */}
        <div className="space-y-2 pt-1">
          {repriceStep === 'IDLE' && (
            <button
              onClick={handleSimulateHandoff}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-aviation-500 via-aviation-600 to-indigo-600 hover:from-aviation-400 text-white font-black text-xs shadow-xl shadow-aviation-600/30 flex items-center justify-center space-x-2 transition-all glow-cyan"
            >
              <Smartphone className="w-4 h-4" />
              <span>立即直达 {flight.segment.airlineName} 官方 App 结算</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {repriceStep === 'VERIFYING' && (
            <div className="w-full h-12 rounded-2xl bg-obsidian-800 border border-aviation-500 text-aviation-400 font-bold text-xs flex items-center justify-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-aviation-400 animate-ping"></span>
              <span>正在验证官方实时验价 Token 与剩余座位...</span>
            </div>
          )}

          {repriceStep === 'SUCCESS' && (
            <div className="space-y-2 animate-fadeIn">
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>官方验价成功 · 价格与余位有效</span>
                </div>
                <p className="text-[10px] text-slate-300">
                  由于正在模拟演示，点击下方按钮将打开 {flight.segment.airlineName} 官方移动端入口：
                </p>
              </div>

              <a
                href={flight.handoffCapabilities.officialHttpsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-xs shadow-lg shadow-emerald-700/30 flex items-center justify-center space-x-1.5 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>打开 {flight.segment.airlineName} 官方结算页面</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
