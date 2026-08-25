// Core Data Models for DirectAir

export type TripType = 'ONE_WAY' | 'ROUND_TRIP' | 'DAY_RETURN';

export type CabinClass = 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';

export type WishlistMode = 'LOW_PRICE_ALERT' | 'FLIGHT_PASS_RADAR' | 'AWARD_SEAT_RADAR';

export type RadarStatus = 'SCANNING' | 'SCANNING_24H' | 'MATCHED_ACTIVE' | 'PAUSED' | 'ALERT_TRIGGERED';

export interface FlightSegment {
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
  aircraftModel: string;
  isWideBody: boolean;
  departureAirportCode: string;
  departureAirportName: string;
  departureTerminal?: string;
  arrivalAirportCode: string;
  arrivalAirportName: string;
  arrivalTerminal?: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  legroomCm: number;
  hasWifi: boolean;
  hasPower: boolean;
  punctualityRate: string;
}

export interface RefundRuleItem {
  timeRange: string;
  description: string;
}

export interface CabinOffer {
  id: string;
  cabinClass: CabinClass;
  bookingClass: string;
  basePrice: number;
  airportTax: number;
  fuelSurcharge: number;
  totalPrice: number;
  baggageAllowance: string;
  mileageAccrual: string;
  changePolicyText: string;
  refundPolicyText: string;
  refundRules: RefundRuleItem[];
  seatsLeft?: number;
  officialHandoffUrl: string;
}

export interface FlightOffer {
  id: string;
  segment: FlightSegment;
  offers: CabinOffer[];
  direction?: 'OUTBOUND' | 'INBOUND';
  handoffCapabilities: {
    officialHttpsUrl: string;
    isDirectDeeplinkSupported: boolean;
    estimatedCheckoutTimeSeconds: number;
  };
}

export interface PassengerName {
  familyNameZh: string;
  givenNameZh: string;
  familyNameEn: string;
  givenNameEn: string;
}

export interface PassengerDocument {
  id?: string;
  type: 'ID_CARD' | 'PASSPORT';
  number: string;
  maskedNumber: string;
  issuingCountry?: string;
  expiresAt?: string;
}

export interface PassengerProfile {
  id: string;
  displayName?: string;
  name: PassengerName;
  idCardNumber?: string;
  passportNumber?: string;
  phone: string;
  gender?: 'M' | 'F' | 'OTHER';
  dateOfBirth?: string;
  documents: PassengerDocument[];
  frequentFlyerPrograms?: {
    airlineCode: string;
    membershipNumber: string;
  }[];
  isSelf?: boolean;
  isEncryptedInLocalVault?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CompanyInvoiceProfile {
  id: string;
  companyName: string;
  taxId: string;
  taxNumber?: string;
  financeEmail?: string;
  registeredAddress?: string;
  companyAddress?: string;
  phoneNumber?: string;
  bankName?: string;
  bankAccount?: string;
  isDefault?: boolean;
  createdAt?: string;
}

export interface LoyaltyMembership {
  id: string;
  airlineCode: string;
  airlineName: string;
  programName: string;
  memberNumber: string;
  maskedNumber: string;
  passengerName: string;
  alliance: 'STAR_ALLIANCE' | 'SKYTEAM' | 'ONEWORLD' | 'NONE';
  tier: 'REGULAR' | 'SILVER' | 'GOLD' | 'PLATINUM';
  tierLabel: string;
  tierExpiresAt?: string;
  balance: {
    value: number;
    unit: 'MILES' | 'POINTS';
    updatedAt: string;
  };
  officialLinks: {
    missingMilesUrl: string;
    accountUrl: string;
  };
}

export interface CreditCardBenefit {
  id: string;
  bankName: string;
  cardName: string;
  cardTier: 'PLATINUM' | 'DIAMOND' | 'CENTURION' | 'GOLD';
  cardTierLabel: string;
  cardBgGradient: string;
  cardSuffix: string;
  cardHolderName: string;
  delayInsurance: {
    triggerHours: number;
    payoutAmount: string;
    annualLimit: string;
    terms: string;
    claimPhone: string;
    claimUrl?: string;
    isActiveForCurrentFlight: boolean;
  };
  loungePasses: {
    total: number;
    used: number;
    provider: string;
  };
  mileageRate: {
    supportedAirlines: string;
    ratio: string;
  };
  isBound: boolean;
}

export interface InsuranceProduct {
  id: string;
  name: string;
  category: 'PARAMETRIC_DELAY' | 'ACCIDENT_LIFE' | 'REFUND_PROTECTION';
  underwriter: string;
  price: number;
  originalOtaPrice: number;
  coverageHeadline: string;
  coverageDetails: string[];
  parametricTriggerMinutes?: number;
  isAutoPayoutEnabled: boolean;
  tags: string[];
}

export interface WishlistCity {
  code: string;
  name: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  mode: WishlistMode;
  origins: WishlistCity[];
  destinations: WishlistCity[];
  dateRange: {
    start?: string;
    end?: string;
    startDate?: string;
    endDate?: string;
    label: string;
  };
  targetPrice?: number;
  currentLowestPrice?: number;
  cabinClass?: CabinClass;
  isAirlinePassEligibleOnly?: boolean;
  flightPassInfo?: {
    passName: string;
    airlineCode: string;
    airlineName: string;
    fixedCostPerLeg: number;
    eligibleBookingClass: string;
  };
  radarStatus: RadarStatus;
  notifyEnabled: boolean;
  createdAt: string;
  matchedOffer?: {
    flightNumber?: string;
    flightNo?: string;
    airlineName: string;
    origin: string;
    destination: string;
    depDate: string;
    depTime?: string;
    totalPrice?: number;
    price?: number;
    seatsLeft?: number;
    foundAt?: string;
    airlineAppUrl?: string;
  };
}

export interface InboundAircraftTracking {
  tailNumber: string;
  aircraftModel: string;
  previousFlightNumber: string;
  previousLeg: string;
  touchdownTime: string;
  statusText: string;
  isOnTime: boolean;
}

export interface TripItinerary {
  id: string;
  flightNumber: string;
  airlineCode: string;
  airlineName: string;
  departureAirportCode: string;
  departureAirportName: string;
  departureCity: string;
  departureTerminal: string;
  arrivalAirportCode: string;
  arrivalAirportName: string;
  arrivalCity: string;
  arrivalTerminal: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  aircraftModel: string;
  seatNumber: string;
  gate: string;
  baggageCarousel: string;
  cabinClass: CabinClass;
  ticketNumber: string;
  pnrCode: string;
  passengerName: string;
  status: 'BOARDING_READY' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  inboundAircraft?: InboundAircraftTracking;
  isCurrentActive: boolean;
  officialCheckinUrl: string;
}

export interface LifetimeFlightStats {
  totalFlights: number;
  totalDistanceKm: number;
  onTimeRatePercentage: number;
  topAirline: string;
  topRoute: string;
  carbonOffsetKg: number;
}

export interface AirlineDirectoryItem {
  airlineCode: string;
  airlineName: string;
  alliance?: string;
  logoColor?: string;
  hotline: string;
  hotlineOverseas?: string;
  officialWebsite?: string;
  refundPolicyUrl?: string;
  onlineCheckinUrl?: string;
  missingMilesUrl?: string;
  baggagePolicyUrl?: string;
}
