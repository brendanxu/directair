import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HomeView } from './components/Home/HomeView';
import { FlightSearchView } from './components/FlightSearch/FlightSearchView';
import { WishlistView } from './components/Wishlist/WishlistView';
import { TripsHubView } from './components/Trips/TripsHubView';
import { WalletAndToolsView } from './components/WalletAndTools/WalletAndToolsView';
import { TransparencyView } from './components/Transparency/TransparencyView';

import { 
  MOCK_FLIGHT_OFFERS, 
  MOCK_PASSENGERS, 
  MOCK_LOYALTY_CARDS, 
  MOCK_WISHLISTS,
  MOCK_INVOICE_PROFILES,
  MOCK_TRIP_ITINERARIES,
  MOCK_LIFETIME_STATS
} from './data/mockData';
import { 
  FlightOffer, 
  PassengerProfile, 
  LoyaltyMembership, 
  WishlistItem, 
  CabinClass,
  TripType,
  CompanyInvoiceProfile,
  TripItinerary
} from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [origin, setOrigin] = useState('PEK');
  const [destination, setDestination] = useState('SHA');
  const [date, setDate] = useState('2026-10-01');
  const [returnDate, setReturnDate] = useState('2026-10-03');
  const [tripType, setTripType] = useState<TripType>('ONE_WAY');
  const [cabinClass, setCabinClass] = useState<CabinClass>('ECONOMY');

  // App State
  const [flights, setFlights] = useState<FlightOffer[]>(MOCK_FLIGHT_OFFERS);
  const [passengers, setPassengers] = useState<PassengerProfile[]>(MOCK_PASSENGERS);
  const [loyaltyCards, setLoyaltyCards] = useState<LoyaltyMembership[]>(MOCK_LOYALTY_CARDS);
  const [wishlists, setWishlists] = useState<WishlistItem[]>(MOCK_WISHLISTS);
  const [invoiceProfiles, setInvoiceProfiles] = useState<CompanyInvoiceProfile[]>(MOCK_INVOICE_PROFILES);
  const [trips, setTrips] = useState<TripItinerary[]>(MOCK_TRIP_ITINERARIES);

  // Sub-Navigation Deep Linking for Tools
  const [walletInitialTab, setWalletInitialTab] = useState<'ASSETS' | 'TOOLS'>('ASSETS');
  const [walletInitialTool, setWalletInitialTool] = useState<string>('name_correction');

  const handleSearchFlights = () => {
    setActiveTab('flight_results');
  };

  const handleAddPassenger = (newPassenger: PassengerProfile) => {
    setPassengers(prev => [newPassenger, ...prev]);
  };

  const handleDeletePassenger = (id: string) => {
    setPassengers(prev => prev.filter(p => p.id !== id));
  };

  const handleAddLoyaltyCard = (newCard: LoyaltyMembership) => {
    setLoyaltyCards(prev => [newCard, ...prev]);
  };

  const handleUpdateLoyaltyBalance = (cardId: string, newBalance: number) => {
    setLoyaltyCards(prev => prev.map(c => {
      if (c.id === cardId) {
        return {
          ...c,
          balance: {
            ...c.balance,
            value: newBalance,
            updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
          }
        };
      }
      return c;
    }));
  };

  const handleAddInvoiceProfile = (newProfile: CompanyInvoiceProfile) => {
    setInvoiceProfiles(prev => [newProfile, ...prev]);
  };

  const handleDeleteInvoiceProfile = (id: string) => {
    setInvoiceProfiles(prev => prev.filter(inv => inv.id !== id));
  };

  const handleAddWishlist = (newWish: WishlistItem) => {
    setWishlists(prev => [newWish, ...prev]);
  };

  const handleImportTicket = (ticketNum: string, flightNo: string, depDate: string) => {
    const newTrip: TripItinerary = {
      id: `trip-manual-${Date.now()}`,
      flightNumber: flightNo,
      airlineCode: flightNo.slice(0, 2),
      airlineName: flightNo.startsWith('MU') ? '中国东方航空' : flightNo.startsWith('CA') ? '中国国际航空' : '中国南方航空',
      departureAirportCode: 'PEK',
      departureAirportName: '北京首都',
      departureCity: '北京',
      departureTerminal: 'T2',
      arrivalAirportCode: 'SHA',
      arrivalAirportName: '上海虹桥',
      arrivalCity: '上海',
      arrivalTerminal: 'T2',
      departureTime: '11:00',
      arrivalTime: '13:15',
      departureDate: depDate,
      aircraftModel: '波音 787-9 (宽体大飞机)',
      seatNumber: '16A (靠窗)',
      gate: 'C38 (已分配)',
      baggageCarousel: '02号转盘',
      cabinClass: 'ECONOMY',
      ticketNumber: ticketNum,
      pnrCode: 'K8W91Z',
      passengerName: '张三 (ZHANG/SAN)',
      status: 'CONFIRMED',
      isCurrentActive: false,
      officialCheckinUrl: 'https://m.ceair.com',
    };
    setTrips(prev => [newTrip, ...prev]);
  };

  const handleOpenRightsTool = (subTab: string) => {
    setWalletInitialTab('TOOLS');
    setWalletInitialTool(subTab);
    setActiveTab('wallet_and_tools');
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col justify-between max-w-[412px] mx-auto border-x border-white/5 shadow-2xl relative">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tripCount={trips.length}
        wishlistCount={wishlists.length}
        assetCount={passengers.length + loyaltyCards.length + invoiceProfiles.length}
      />

      <main className="flex-1 overflow-x-hidden">
        {activeTab === 'home' && (
          <HomeView
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
            date={date}
            setDate={setDate}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
            tripType={tripType}
            setTripType={setTripType}
            cabinClass={cabinClass}
            setCabinClass={setCabinClass}
            onSearchFlights={handleSearchFlights}
            wishlists={wishlists}
            onOpenWishlist={() => setActiveTab('wishlist')}
            onOpenRightsTool={handleOpenRightsTool}
            onOpenTransparency={() => setActiveTab('transparency')}
            onNavigateToTrips={() => setActiveTab('trips')}
          />
        )}

        {activeTab === 'flight_results' && (
          <FlightSearchView
            flights={flights}
            passengers={passengers}
            loyaltyCards={loyaltyCards}
            wishlists={wishlists}
            tripType={tripType}
            date={date}
            returnDate={returnDate}
            onOpenWishlist={() => setActiveTab('wishlist')}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'wishlist' && (
          <WishlistView
            wishlists={wishlists}
            onAddWishlist={handleAddWishlist}
            onDeleteWishlist={(id) => setWishlists(prev => prev.filter(w => w.id !== id))}
            onToggleNotify={(id) => setWishlists(prev => prev.map(w => w.id === id ? { ...w, notifyEnabled: !w.notifyEnabled } : w))}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'trips' && (
          <TripsHubView
            trips={trips}
            stats={MOCK_LIFETIME_STATS}
            onImportTicket={handleImportTicket}
            onOpenCheckin={(url) => window.open(url, '_blank')}
            onVerifyTicket={(num) => handleOpenRightsTool('verification')}
          />
        )}

        {activeTab === 'wallet_and_tools' && (
          <WalletAndToolsView
            passengers={passengers}
            loyaltyCards={loyaltyCards}
            invoiceProfiles={invoiceProfiles}
            onAddPassenger={handleAddPassenger}
            onDeletePassenger={handleDeletePassenger}
            onAddLoyaltyCard={handleAddLoyaltyCard}
            onUpdateLoyaltyBalance={handleUpdateLoyaltyBalance}
            onAddInvoiceProfile={handleAddInvoiceProfile}
            onDeleteInvoiceProfile={handleDeleteInvoiceProfile}
            onBackToHome={() => setActiveTab('home')}
            initialSubTab={walletInitialTab}
            initialToolTab={walletInitialTool}
          />
        )}

        {activeTab === 'transparency' && (
          <TransparencyView onBackToHome={() => setActiveTab('home')} />
        )}
      </main>
    </div>
  );
}

export default App;
