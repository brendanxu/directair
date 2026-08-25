import { FlightOffer, PassengerProfile, LoyaltyMembership, WishlistItem, CompanyInvoiceProfile, TripItinerary, LifetimeFlightStats, CreditCardBenefit, InsuranceProduct } from '../types';

export const MOCK_TRIP_ITINERARIES: TripItinerary[] = [
  {
    id: 'trip-mu5101-today',
    flightNumber: 'MU5101',
    airlineCode: 'MU',
    airlineName: '中国东方航空',
    departureAirportCode: 'PEK',
    departureAirportName: '北京首都',
    departureCity: '北京',
    departureTerminal: 'T2',
    arrivalAirportCode: 'SHA',
    arrivalAirportName: '上海虹桥',
    arrivalCity: '上海',
    arrivalTerminal: 'T2',
    departureTime: '08:00',
    arrivalTime: '10:15',
    departureDate: '2026-10-01',
    aircraftModel: '波音 777-300ER (宽体)',
    seatNumber: '12F (靠窗)',
    gate: 'C42',
    baggageCarousel: '04号转盘',
    cabinClass: 'BUSINESS',
    ticketNumber: '781-2491823901',
    pnrCode: 'J8KQ2M',
    passengerName: '张三 (ZHANG/SAN)',
    status: 'BOARDING_READY',
    isCurrentActive: true,
    officialCheckinUrl: 'https://m.ceair.com',
    inboundAircraft: {
      tailNumber: 'B-2079',
      aircraftModel: 'Boeing 777-300ER',
      previousFlightNumber: 'MU5302',
      previousLeg: '广州白云 CAN → 北京首都 PEK',
      touchdownTime: '06:45',
      statusText: '前序飞机已于 06:45 准点落地首都机场并滑入 C42 机位，过站准备就绪',
      isOnTime: true,
    }
  },
  {
    id: 'trip-mu5124-upcoming',
    flightNumber: 'MU5124',
    airlineCode: 'MU',
    airlineName: '中国东方航空',
    departureAirportCode: 'SHA',
    departureAirportName: '上海虹桥',
    departureCity: '上海',
    departureTerminal: 'T2',
    arrivalAirportCode: 'PEK',
    arrivalAirportName: '北京首都',
    arrivalCity: '北京',
    arrivalTerminal: 'T2',
    departureTime: '17:00',
    arrivalTime: '19:20',
    departureDate: '2026-10-03',
    aircraftModel: '空客 A350-900 (宽体)',
    seatNumber: '15A (靠窗)',
    gate: '待分配 (起飞前2h更新)',
    baggageCarousel: '待分配',
    cabinClass: 'ECONOMY',
    ticketNumber: '781-2491823902',
    pnrCode: 'J8KQ2M',
    passengerName: '张三 (ZHANG/SAN)',
    status: 'CONFIRMED',
    isCurrentActive: false,
    officialCheckinUrl: 'https://m.ceair.com',
  },
  {
    id: 'trip-ca1502-upcoming',
    flightNumber: 'CA1502',
    airlineCode: 'CA',
    airlineName: '中国国际航空',
    departureAirportCode: 'SZX',
    departureAirportName: '深圳宝安',
    departureCity: '深圳',
    departureTerminal: 'T3',
    arrivalAirportCode: 'PEK',
    arrivalAirportName: '北京首都',
    arrivalCity: '北京',
    arrivalTerminal: 'T3',
    departureTime: '14:30',
    arrivalTime: '17:45',
    departureDate: '2026-11-15',
    aircraftModel: '波音 787-9 (宽体大飞机)',
    seatNumber: '22J (靠过道)',
    gate: '待分配',
    baggageCarousel: '待分配',
    cabinClass: 'ECONOMY',
    ticketNumber: '999-3829104812',
    pnrCode: 'HQ927A',
    passengerName: '张三 (ZHANG/SAN)',
    status: 'CONFIRMED',
    isCurrentActive: false,
    officialCheckinUrl: 'https://m.airchina.com.cn',
  }
];

export const MOCK_LIFETIME_STATS: LifetimeFlightStats = {
  totalFlights: 38,
  totalDistanceKm: 54200,
  onTimeRatePercentage: 96.2,
  topAirline: '中国东航 (MU) · 24次',
  topRoute: '北京 ⇄ 上海 (京沪快线 · 18次)',
  carbonOffsetKg: 6420,
};

export const MOCK_PASSENGERS: PassengerProfile[] = [
  {
    id: 'p-01',
    displayName: '张三 (本人)',
    name: {
      familyNameZh: '张',
      givenNameZh: '三',
      familyNameEn: 'ZHANG',
      givenNameEn: 'SAN'
    },
    idCardNumber: '110101199003072314',
    passportNumber: 'E92819203',
    phone: '13800138000',
    documents: [
      {
        id: 'doc-01',
        type: 'ID_CARD',
        number: '110101199003072314',
        maskedNumber: '110101********2314'
      },
      {
        id: 'doc-02',
        type: 'PASSPORT',
        number: 'E92819203',
        maskedNumber: 'E928****03'
      }
    ],
    frequentFlyerPrograms: [
      { airlineCode: 'MU', membershipNumber: '610298374612' },
      { airlineCode: 'CA', membershipNumber: '992817293812' }
    ],
    isSelf: true,
    isEncryptedInLocalVault: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'p-02',
    displayName: '李四',
    name: {
      familyNameZh: '李',
      givenNameZh: '四',
      familyNameEn: 'LI',
      givenNameEn: 'SI'
    },
    idCardNumber: '310104199208154129',
    phone: '13911223344',
    documents: [
      {
        id: 'doc-03',
        type: 'ID_CARD',
        number: '310104199208154129',
        maskedNumber: '310104********4129'
      }
    ],
    frequentFlyerPrograms: [
      { airlineCode: 'CZ', membershipNumber: '772819203912' }
    ],
    isSelf: false,
    isEncryptedInLocalVault: true,
    createdAt: '2026-08-22'
  }
];

export const MOCK_INVOICE_PROFILES: CompanyInvoiceProfile[] = [
  {
    id: 'inv-01',
    companyName: '北京智行未来科技有限公司',
    taxId: '91110108MA01XXXX7G',
    taxNumber: '91110108MA01XXXX7G',
    financeEmail: 'finance@zhixing.com',
    registeredAddress: '北京市海淀区中关村南大街1号院8号楼',
    phoneNumber: '010-88291000',
    bankName: '招商银行股份有限公司北京分行营业部',
    bankAccount: '110908291002910',
    isDefault: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'inv-02',
    companyName: '上海创领无限数字互联有限责任公司',
    taxId: '91310000MA1FLXXX2P',
    taxNumber: '91310000MA1FLXXX2P',
    financeEmail: 'tax@chuangling.com',
    registeredAddress: '上海市浦东新区张江高科技园区科苑路88号',
    phoneNumber: '021-61029800',
    bankName: '中国工商银行上海市张江支行',
    bankAccount: '100128910920192',
    isDefault: false,
    createdAt: '2026-08-23'
  }
];

export const MOCK_LOYALTY_CARDS: LoyaltyMembership[] = [
  {
    id: 'loyalty-mu-gold',
    airlineCode: 'MU',
    airlineName: '中国东方航空',
    programName: '东方万里行',
    memberNumber: '610298374612',
    maskedNumber: '6102 •••• •••• 4612',
    passengerName: '张三',
    alliance: 'SKYTEAM',
    tier: 'GOLD',
    tierLabel: '金卡会员',
    tierExpiresAt: '2027-12-31',
    balance: {
      value: 48500,
      unit: 'POINTS',
      updatedAt: '2026-08-24 10:30'
    },
    officialLinks: {
      missingMilesUrl: 'https://m.ceair.com/pages/mileage-retro/index.html',
      accountUrl: 'https://m.ceair.com'
    }
  },
  {
    id: 'loyalty-ca-silver',
    airlineCode: 'CA',
    airlineName: '中国国际航空',
    programName: '凤凰知音',
    memberNumber: '992817293812',
    maskedNumber: '9928 •••• •••• 3812',
    passengerName: '张三',
    alliance: 'STAR_ALLIANCE',
    tier: 'SILVER',
    tierLabel: '银卡会员',
    tierExpiresAt: '2027-06-30',
    balance: {
      value: 23200,
      unit: 'MILES',
      updatedAt: '2026-08-20 18:00'
    },
    officialLinks: {
      missingMilesUrl: 'https://ffp.airchina.com.cn/retro/index.html',
      accountUrl: 'https://ffp.airchina.com.cn'
    }
  },
  {
    id: 'loyalty-cz-classic',
    airlineCode: 'CZ',
    airlineName: '中国南方航空',
    programName: '南航明珠俱乐部',
    memberNumber: '772819203912',
    maskedNumber: '7728 •••• •••• 3912',
    passengerName: '李四',
    alliance: 'NONE',
    tier: 'REGULAR',
    tierLabel: '经典会员',
    balance: {
      value: 8600,
      unit: 'MILES',
      updatedAt: '2026-08-15 09:12'
    },
    officialLinks: {
      missingMilesUrl: 'https://skypearl.csair.com/retro',
      accountUrl: 'https://skypearl.csair.com'
    }
  }
];

export const MOCK_WISHLISTS: WishlistItem[] = [
  {
    id: 'wish-01',
    title: '国庆避堵捡漏 · 京津 ⇄ 沪杭',
    mode: 'FLIGHT_PASS_RADAR',
    origins: [
      { code: 'PEK', name: '北京首都' },
      { code: 'PKX', name: '北京大兴' },
      { code: 'TSN', name: '天津滨海' }
    ],
    destinations: [
      { code: 'SHA', name: '上海虹桥' },
      { code: 'PVG', name: '上海浦东' },
      { code: 'HGH', name: '杭州萧山' }
    ],
    dateRange: {
      start: '2026-10-01',
      end: '2026-10-07',
      startDate: '2026-10-01',
      endDate: '2026-10-07',
      label: '10-01 至 10-07 (国庆假期)'
    },
    targetPrice: 600,
    cabinClass: 'ECONOMY',
    isAirlinePassEligibleOnly: true,
    radarStatus: 'MATCHED_ACTIVE',
    notifyEnabled: true,
    createdAt: '2026-08-22',
    flightPassInfo: {
      passName: '东方航空·畅行次卡 (400元/段)',
      airlineCode: 'MU',
      airlineName: '中国东方航空',
      fixedCostPerLeg: 400,
      eligibleBookingClass: 'X/O舱'
    },
    matchedOffer: {
      flightNumber: 'MU5101',
      flightNo: 'MU5101',
      airlineName: '中国东航 (400元次卡适用)',
      origin: 'PEK 首都',
      destination: 'SHA 虹桥',
      depDate: '10-01 (国庆当天)',
      depTime: '08:00',
      totalPrice: 400,
      price: 400,
      seatsLeft: 2,
      foundAt: '2分钟前',
      airlineAppUrl: 'https://m.ceair.com'
    }
  },
  {
    id: 'wish-02',
    title: '11月大湾区商务监控',
    mode: 'LOW_PRICE_ALERT',
    origins: [
      { code: 'PEK', name: '北京首都' },
      { code: 'PKX', name: '北京大兴' }
    ],
    destinations: [
      { code: 'CAN', name: '广州白云' },
      { code: 'SZX', name: '深圳宝安' }
    ],
    dateRange: {
      start: '2026-11-15',
      end: '2026-11-20',
      startDate: '2026-11-15',
      endDate: '2026-11-20',
      label: '11-15 至 11-20'
    },
    targetPrice: 750,
    currentLowestPrice: 890,
    cabinClass: 'ECONOMY',
    isAirlinePassEligibleOnly: false,
    radarStatus: 'SCANNING_24H',
    notifyEnabled: true,
    createdAt: '2026-08-23'
  }
];

export const MOCK_FLIGHT_OFFERS: FlightOffer[] = [
  {
    id: 'flight-mu5101',
    direction: 'OUTBOUND',
    handoffCapabilities: {
      officialHttpsUrl: 'https://m.ceair.com',
      isDirectDeeplinkSupported: true,
      estimatedCheckoutTimeSeconds: 15
    },
    segment: {
      airlineCode: 'MU',
      airlineName: '中国东方航空',
      flightNumber: 'MU5101',
      aircraftModel: '波音 777-300ER (宽体双通道)',
      isWideBody: true,
      departureAirportCode: 'PEK',
      departureAirportName: '北京首都',
      departureTerminal: 'T2航站楼',
      arrivalAirportCode: 'SHA',
      arrivalAirportName: '上海虹桥',
      arrivalTerminal: 'T2航站楼',
      departureTime: '08:00',
      arrivalTime: '10:15',
      durationMinutes: 135,
      legroomCm: 84,
      hasWifi: true,
      hasPower: true,
      punctualityRate: '95.2%'
    },
    offers: [
      {
        id: 'offer-mu5101-eco-v',
        cabinClass: 'ECONOMY',
        bookingClass: 'V 舱 (官方特惠特价)',
        basePrice: 620,
        airportTax: 50,
        fuelSurcharge: 0,
        totalPrice: 670,
        baggageAllowance: '免费托运 20kg (1件) + 手提 8kg',
        mileageAccrual: '50% 东方万里行里程累积 (420积分)',
        changePolicyText: '航班起飞前4小时自愿改签收取 10% 费率',
        refundPolicyText: '航班起飞前4小时自愿退票收取 20% 费率',
        refundRules: [
          { timeRange: '起飞前 7 天以上', description: '自愿退票 5% / 免费自愿改期' },
          { timeRange: '起飞前 7 天至 4 小时', description: '自愿退票 20% / 改期 10%' },
          { timeRange: '起飞前 4 小时以内', description: '自愿退票 40% / 改期 20%' }
        ],
        seatsLeft: 4,
        officialHandoffUrl: 'https://m.ceair.com'
      },
      {
        id: 'offer-mu5101-eco-y',
        cabinClass: 'ECONOMY',
        bookingClass: 'Y 舱 (官方全价全退改)',
        basePrice: 1440,
        airportTax: 50,
        fuelSurcharge: 0,
        totalPrice: 1490,
        baggageAllowance: '免费托运 20kg + 优先行李',
        mileageAccrual: '100% 东方万里行里程累积 (840积分)',
        changePolicyText: '起飞前免费自愿改签多次',
        refundPolicyText: '起飞前免费自愿退票 (全额退款)',
        refundRules: [
          { timeRange: '起飞前 4 小时以上', description: '自愿退票 0% (免费) / 免费改签' },
          { timeRange: '起飞前 4 小时以内', description: '自愿退票 5% / 免费改签' }
        ],
        officialHandoffUrl: 'https://m.ceair.com'
      },
      {
        id: 'offer-mu5101-bus-j',
        cabinClass: 'BUSINESS',
        bookingClass: 'J 舱 (公务舱 180°平躺)',
        basePrice: 2800,
        airportTax: 50,
        fuelSurcharge: 0,
        totalPrice: 2850,
        baggageAllowance: '免费托运 30kg (2件) + 贵宾休息室',
        mileageAccrual: '150% 东方万里行里程累积 (1260积分)',
        changePolicyText: '全程免费自愿改签',
        refundPolicyText: '起飞前免费退票',
        refundRules: [
          { timeRange: '起飞前全程', description: '免费退票 / 免费改期 / 专享贵宾安检通道' }
        ],
        officialHandoffUrl: 'https://m.ceair.com'
      }
    ]
  },
  {
    id: 'flight-mu5124-return',
    direction: 'INBOUND',
    handoffCapabilities: {
      officialHttpsUrl: 'https://m.ceair.com',
      isDirectDeeplinkSupported: true,
      estimatedCheckoutTimeSeconds: 15
    },
    segment: {
      airlineCode: 'MU',
      airlineName: '中国东方航空',
      flightNumber: 'MU5124',
      aircraftModel: '空客 A350-900 (宽体大客机)',
      isWideBody: true,
      departureAirportCode: 'SHA',
      departureAirportName: '上海虹桥',
      departureTerminal: 'T2航站楼',
      arrivalAirportCode: 'PEK',
      arrivalAirportName: '北京首都',
      arrivalTerminal: 'T2航站楼',
      departureTime: '17:00',
      arrivalTime: '19:20',
      durationMinutes: 140,
      legroomCm: 84,
      hasWifi: true,
      hasPower: true,
      punctualityRate: '96.5%'
    },
    offers: [
      {
        id: 'offer-mu5124-eco-v',
        cabinClass: 'ECONOMY',
        bookingClass: 'V 舱 (官方特惠)',
        basePrice: 650,
        airportTax: 50,
        fuelSurcharge: 0,
        totalPrice: 700,
        baggageAllowance: '免费托运 20kg + 手提 8kg',
        mileageAccrual: '50% 里程累积',
        changePolicyText: '起飞前4小时改签 10%',
        refundPolicyText: '起飞前4小时退票 20%',
        refundRules: [
          { timeRange: '起飞前 7 天以上', description: '自愿退票 5% / 免费改期' },
          { timeRange: '起飞前 4 小时至7天', description: '自愿退票 20% / 改期 10%' }
        ],
        seatsLeft: 6,
        officialHandoffUrl: 'https://m.ceair.com'
      }
    ]
  },
  {
    id: 'flight-ca1502',
    direction: 'OUTBOUND',
    handoffCapabilities: {
      officialHttpsUrl: 'https://m.airchina.com.cn',
      isDirectDeeplinkSupported: true,
      estimatedCheckoutTimeSeconds: 18
    },
    segment: {
      airlineCode: 'CA',
      airlineName: '中国国际航空',
      flightNumber: 'CA1502',
      aircraftModel: '空客 A330-300 (宽体客机)',
      isWideBody: true,
      departureAirportCode: 'PEK',
      departureAirportName: '北京首都',
      departureTerminal: 'T3航站楼',
      arrivalAirportCode: 'SHA',
      arrivalAirportName: '上海虹桥',
      arrivalTerminal: 'T2航站楼',
      departureTime: '09:00',
      arrivalTime: '11:15',
      durationMinutes: 135,
      legroomCm: 83,
      hasWifi: true,
      hasPower: true,
      punctualityRate: '93.8%'
    },
    offers: [
      {
        id: 'offer-ca1502-eco-l',
        cabinClass: 'ECONOMY',
        bookingClass: 'L 舱 (官方特价)',
        basePrice: 660,
        airportTax: 50,
        fuelSurcharge: 0,
        totalPrice: 710,
        baggageAllowance: '免费托运 20kg',
        mileageAccrual: '50% 凤凰知音里程累积',
        changePolicyText: '起飞前改签收取 10%',
        refundPolicyText: '起飞前退票收取 20%',
        refundRules: [
          { timeRange: '起飞前 48 小时', description: '自愿退票 15% / 改期 10%' }
        ],
        seatsLeft: 3,
        officialHandoffUrl: 'https://m.airchina.com.cn'
      }
    ]
  },
  {
    id: 'flight-9c8888',
    direction: 'OUTBOUND',
    handoffCapabilities: {
      officialHttpsUrl: 'https://m.ch.com',
      isDirectDeeplinkSupported: true,
      estimatedCheckoutTimeSeconds: 20
    },
    segment: {
      airlineCode: '9C',
      airlineName: '春秋航空',
      flightNumber: '9C8888',
      aircraftModel: '空客 A320neo (窄体单通道)',
      isWideBody: false,
      departureAirportCode: 'PKX',
      departureAirportName: '北京大兴',
      arrivalAirportCode: 'SHA',
      arrivalAirportName: '上海虹桥',
      departureTime: '06:40',
      arrivalTime: '08:55',
      durationMinutes: 135,
      legroomCm: 74,
      hasWifi: false,
      hasPower: false,
      punctualityRate: '91.2%'
    },
    offers: [
      {
        id: 'offer-9c8888-eco-p',
        cabinClass: 'ECONOMY',
        bookingClass: 'P 舱 (会员专享特价)',
        basePrice: 380,
        airportTax: 50,
        fuelSurcharge: 0,
        totalPrice: 430,
        baggageAllowance: '无免费托运额 (仅手提7kg)',
        mileageAccrual: '无里程累积',
        changePolicyText: '特价票不予改签',
        refundPolicyText: '仅退还机建燃油费 50元',
        refundRules: [
          { timeRange: '起飞前任何时间', description: '客票不可自愿退款，仅退机场建设费' }
        ],
        officialHandoffUrl: 'https://m.ch.com'
      }
    ]
  }
];

export const MOCK_DATE_PRICE_STRIP = [
  { date: '10-01', day: '周四', price: 670, isLowest: false, isSelected: true },
  { date: '10-02', day: '周五', price: 580, isLowest: true, isSelected: false },
  { date: '10-03', day: '周六', price: 610, isLowest: false, isSelected: false },
  { date: '10-04', day: '周日', price: 740, isLowest: false, isSelected: false },
  { date: '10-05', day: '周一', price: 820, isLowest: false, isSelected: false },
  { date: '10-06', day: '周二', price: 950, isLowest: false, isSelected: false },
  { date: '10-07', day: '周三', price: 1120, isLowest: false, isSelected: false },
];

export const MOCK_CREDIT_CARDS: CreditCardBenefit[] = [
  {
    id: 'cc-cmb-classic',
    bankName: '招商银行',
    cardName: '经典白金信用卡',
    cardTier: 'PLATINUM',
    cardTierLabel: '经典白',
    cardBgGradient: 'from-[#8A151B] via-[#A82026] to-[#590C10]',
    cardSuffix: '8821',
    cardHolderName: '张三 (ZHANG SAN)',
    delayInsurance: {
      triggerHours: 3,
      payoutAmount: '¥600 定额赔付',
      annualLimit: '每年最高赔付 ¥4,000',
      terms: '需使用本卡支付 80% 以上机票款或全额航司税费',
      claimPhone: '400-820-5555',
      claimUrl: 'https://market.cmbchina.com',
      isActiveForCurrentFlight: true,
    },
    loungePasses: {
      total: 6,
      used: 2,
      provider: '机场 CIP 快速安检与贵宾厅',
    },
    mileageRate: {
      supportedAirlines: '东航/国航/南航/亚万',
      ratio: '1500积分 = 1000里程',
    },
    isBound: true,
  },
  {
    id: 'cc-ccb-dashan',
    bankName: '建设银行',
    cardName: '尊享白金信用卡 (大山白)',
    cardTier: 'DIAMOND',
    cardTierLabel: '大山白',
    cardBgGradient: 'from-[#1E3A8A] via-[#1E40AF] to-[#0F172A]',
    cardSuffix: '4902',
    cardHolderName: '张三 (ZHANG SAN)',
    delayInsurance: {
      triggerHours: 4,
      payoutAmount: '最高赔付 ¥1,000 (含机票+住宿)',
      annualLimit: '每年最高赔付 ¥5,000',
      terms: '无需使用本卡支付机票，持卡即享自动保障',
      claimPhone: '95533',
      isActiveForCurrentFlight: true,
    },
    loungePasses: {
      total: 5,
      used: 1,
      provider: '全球龙腾出行 + 3次接送机',
    },
    mileageRate: {
      supportedAirlines: '东航/国航/南航',
      ratio: '综合积分兑换',
    },
    isBound: true,
  },
  {
    id: 'cc-bocom-bailin',
    bankName: '交通银行',
    cardName: '标准白金卡 (白麒麟)',
    cardTier: 'PLATINUM',
    cardTierLabel: '白麒麟',
    cardBgGradient: 'from-[#065F46] via-[#047857] to-[#064E3B]',
    cardSuffix: '1109',
    cardHolderName: '张三 (ZHANG SAN)',
    delayInsurance: {
      triggerHours: 2,
      payoutAmount: '满2小时赔付 ¥500，满4小时 ¥1000',
      annualLimit: '每年最高赔付 ¥4,000',
      terms: '需使用本卡支付机票票款',
      claimPhone: '400-800-9888',
      isActiveForCurrentFlight: false,
    },
    loungePasses: {
      total: 6,
      used: 3,
      provider: '沃德机场自营 + 6次龙腾',
    },
    mileageRate: {
      supportedAirlines: '东航/国航/海航',
      ratio: '18积分 = 1里程',
    },
    isBound: true,
  },
  {
    id: 'cc-boc-dingzhi',
    bankName: '中国银行',
    cardName: '长城鼎致白金卡',
    cardTier: 'PLATINUM',
    cardTierLabel: '鼎致白',
    cardBgGradient: 'from-[#1F2937] via-[#374151] to-[#111827]',
    cardSuffix: '6633',
    cardHolderName: '张三 (ZHANG SAN)',
    delayInsurance: {
      triggerHours: 2,
      payoutAmount: '起延2小时定额 ¥300，4小时 ¥1000',
      annualLimit: '每年最高赔付 ¥3,000',
      terms: '需本卡支付机票或税费',
      claimPhone: '95566',
      isActiveForCurrentFlight: false,
    },
    loungePasses: {
      total: 6,
      used: 0,
      provider: '龙腾贵宾厅 + 3次境内接送机',
    },
    mileageRate: {
      supportedAirlines: '东航/国航/南航/海航',
      ratio: '自动累积',
    },
    isBound: false,
  },
];

export const MOCK_INSURANCE_PRODUCTS: InsuranceProduct[] = [
  {
    id: 'ins-delay-parametric',
    name: '极客参数化 · 自动闪赔延误险',
    category: 'PARAMETRIC_DELAY',
    underwriter: '中国太平洋财产保险 (CPIC)',
    price: 18,
    originalOtaPrice: 48,
    coverageHeadline: '延误满 120 分钟自动直赔 ¥300 (零材料审核)',
    coverageDetails: [
      '依托 ADS-B 雷达数据自动核验实际起飞时间',
      '延误达标系统 10 秒自动向微信/支付宝零钱转账',
      '免开机场延误证明、免拍登机牌、免人工审核',
      '因天气、空管、机械故障等任何原因延误均赔'
    ],
    parametricTriggerMinutes: 120,
    isAutoPayoutEnabled: true,
    tags: ['自动直赔', '零免赔', 'OTA半价'],
  },
  {
    id: 'ins-accident-500w',
    name: '航空全航程 500 万高额意外身故残疾险',
    category: 'ACCIDENT_LIFE',
    underwriter: '中国人民财产保险 (PICC)',
    price: 9.9,
    originalOtaPrice: 38,
    coverageHeadline: '500万意外保障 + 30万意外医疗 + 5万随身行李失窃',
    coverageDetails: [
      '涵盖登机、滑行、飞行至出舱全流程',
      '国家级央企人保官方承保出单，可查电子保单',
      '包含突发急性病紧急医疗及转运保障',
      '透明裸价直销，无任何中介附加费'
    ],
    isAutoPayoutEnabled: false,
    tags: ['官方裸价', '500万保额', '支持验真'],
  },
  {
    id: 'ins-refund-protect',
    name: '退改无忧险 · 突发取消补偿',
    category: 'REFUND_PROTECTION',
    underwriter: '平安财产保险 (Ping An)',
    price: 15,
    originalOtaPrice: 45,
    coverageHeadline: '因突发急性病/不可抗力退票，补偿 80% 航司退票手续费',
    coverageDetails: [
      '因自身突发疾病无法成行补偿退票损失',
      '目的地发生突发自然灾害导致取消补偿',
      '最高补偿额度高达 ¥2,000 元/人',
      '支持与航司官网无损退改政策组合叠加'
    ],
    isAutoPayoutEnabled: false,
    tags: ['退票兜底', '最高赔付2000元'],
  }
];

