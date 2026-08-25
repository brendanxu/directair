import React, { useState } from 'react';
import { 
  FileEdit, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  DollarSign
} from 'lucide-react';

interface NamePolicy {
  airline: string;
  code: string;
  logoColor: string;
  officialFee: string;
  allowanceRules: string[];
  handlingProcedure: string;
  otaTrapWarning: string;
  hotline: string;
}

const NAME_POLICIES: NamePolicy[] = [
  {
    airline: '国泰航空 (Cathay Pacific)',
    code: 'CX',
    logoColor: 'from-emerald-700 to-teal-800',
    officialFee: '官方收费 $60 美元 (约 ¥430) / 部分小错免费',
    allowanceRules: [
      '姓/名拼音拼写错误 ≤ 3 个英文字符，官方客服可直接修改更正；',
      '颠倒姓名顺序（如 SAN/ZHANG 填反），官方核验护照后免费调换；',
      '增加或遗漏中间名（Middle Name），提供护照扫描件即可补全。'
    ],
    handlingProcedure: '直接致电国泰航空客服专线或联系航司官方 WhatsApp 客服，报 13 位票号与护照姓名，核验后在线支付 $60 官方更名费即可重新出票。',
    otaTrapWarning: '携程/飞猪等中介常借口“国际机票严禁更名，必须全额作废退票重买”，强行扣除数千元全额退票费！切勿听信，直接找国泰官方解决。',
    hotline: '+86-4008152888 / +852-27473333'
  },
  {
    airline: '中国东方航空',
    code: 'MU',
    logoColor: 'from-blue-600 to-indigo-700',
    officialFee: '官方收费 ¥0 ~ ¥50 元 / 同音字免费或小额更正',
    allowanceRules: [
      '中文姓名同音字/形似字错误 1 个汉字（如“张峰”误填为“张锋”），可申请更正；',
      '拼音漏填、重填不超过 3 个英文字母；',
      '生僻字无法输入导致的姓名不符，航司柜台可免费做同行备注。'
    ],
    handlingProcedure: '打开东航 App【服务大厅】→【错字更改】自助上传身份证照片申请，或致电 95530 提交工单。',
    otaTrapWarning: 'OTA 平台常以“国内航司系统锁定”为由拒绝协助，逼迫旅客退票并收取 20%~50% 阶梯退票费。',
    hotline: '95530'
  },
  {
    airline: '中国国际航空',
    code: 'CA',
    logoColor: 'from-red-600 to-rose-700',
    officialFee: '官方收费 ¥0 ~ ¥100 元 (出票24小时内可免费调整)',
    allowanceRules: [
      '中文姓名中错 1 个同音字，在起飞前提供身份证件核对后可免费修正；',
      '英文姓名拼写错误 ≤ 2 个字母，可在国航直属售票处进行备注更正。'
    ],
    handlingProcedure: '致电国航 95583 或前往机场国航直属售票柜台出示有效证件原件办理更改。',
    otaTrapWarning: '中介平台经常加收 200~500 元“代理更名服务费”，而实际国航官方收费低廉甚至免费。',
    hotline: '95583'
  },
  {
    airline: '中国南方航空',
    code: 'CZ',
    logoColor: 'from-sky-600 to-blue-800',
    officialFee: '官方收费 ¥0 ~ ¥50 元',
    allowanceRules: [
      '同音字错 1 字、形似字错 1 字、拼音错 ≤ 2 字母均在允许修改范围；',
      '姓名颠倒可在南航直属柜台进行免费旅客信息关联。'
    ],
    handlingProcedure: '在南航官方微信小程序搜索【客票姓名更正】或致电 95539 办理。',
    otaTrapWarning: 'OTA 常见推诿借口是“特价机票不可做任何信息修改”，实际民航局规定合理错字航司必须提供更正通道。',
    hotline: '95539'
  }
];

export const NameCorrectionGuide: React.FC = () => {
  const [selectedAirline, setSelectedAirline] = useState<string>('CX');

  const currentPolicy = NAME_POLICIES.find(p => p.code === selectedAirline) || NAME_POLICIES[0];

  return (
    <div className="space-y-3.5">
      {/* Policy Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {NAME_POLICIES.map((p) => (
          <button
            key={p.code}
            onClick={() => setSelectedAirline(p.code)}
            className={`h-8 px-3 rounded-xl font-bold shrink-0 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              selectedAirline === p.code
                ? 'bg-aviation-600 text-white shadow-md glow-cyan'
                : 'bg-obsidian-850 text-slate-400 border border-white/5 hover:text-white'
            }`}
          >
            <span>{p.code}</span>
            <span>{p.airline.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Selected Airline Policy Detail Card */}
      <div className="obsidian-card rounded-3xl p-4 border border-white/10 space-y-3.5 shadow-xl">
        {/* Header & Fee Alert */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center space-x-2.5 min-w-0 flex-1 pr-2">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${currentPolicy.logoColor} flex items-center justify-center font-bold font-mono text-white text-xs shadow-md shrink-0`}>
              {currentPolicy.code}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-white text-sm truncate">{currentPolicy.airline}</h3>
              <span className="text-[10px] text-emerald-400 font-mono font-bold block mt-0.5 whitespace-nowrap">
                官方标准核验政策
              </span>
            </div>
          </div>

          <a
            href={`tel:${currentPolicy.hotline.split(' ')[0]}`}
            className="h-8 px-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center space-x-1 active:scale-95 transition-all shrink-0 whitespace-nowrap"
          >
            <Phone className="w-3 h-3" />
            <span>直拨专线</span>
          </a>
        </div>

        {/* Real Fee Banner (Anti-Overflow / Multi-line Wrap) */}
        <div className="p-3.5 rounded-2xl bg-obsidian-950 border border-aviation-500/30 space-y-1 text-xs">
          <div className="flex items-center space-x-1.5 text-aviation-300">
            <DollarSign className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
            <span className="font-bold text-xs">航司真实官方费率</span>
          </div>
          <div className="font-bold font-mono text-white text-xs pl-5 leading-relaxed break-words">
            {currentPolicy.officialFee}
          </div>
        </div>

        {/* Allowance Rules */}
        <div className="space-y-1.5 text-xs">
          <h4 className="font-bold text-white text-xs flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>允许修改的错字/拼音范围：</span>
          </h4>
          <div className="space-y-2 bg-obsidian-950/80 p-3.5 rounded-2xl border border-white/5 text-[11px] text-slate-300">
            {currentPolicy.allowanceRules.map((rule, idx) => (
              <div key={idx} className="flex items-start space-x-2 leading-relaxed">
                <span className="text-aviation-400 font-mono font-bold shrink-0 mt-0.5">0{idx + 1}.</span>
                <span className="break-words flex-1">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to handle */}
        <div className="space-y-1.5 text-xs">
          <h4 className="font-bold text-white text-xs flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-aviation-400 shrink-0" />
            <span>官方标准更名流程：</span>
          </h4>
          <p className="p-3 rounded-2xl bg-obsidian-950/80 border border-white/5 text-[11px] text-slate-300 leading-relaxed">
            {currentPolicy.handlingProcedure}
          </p>
        </div>

        {/* OTA Trap Warning */}
        <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-800/60 space-y-1 text-xs">
          <div className="flex items-center space-x-1.5 text-rose-300 font-bold text-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>警惕 OTA 中介套路与欺诈：</span>
          </div>
          <p className="text-[11px] text-rose-200/90 leading-relaxed">
            {currentPolicy.otaTrapWarning}
          </p>
        </div>
      </div>
    </div>
  );
};
