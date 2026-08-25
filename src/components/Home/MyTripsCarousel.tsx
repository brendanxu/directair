import React from 'react';
import { Plane, ChevronRight, Calendar } from 'lucide-react';

interface TripPreviewCard {
  city: string;
  airportCode: string;
  flightNo: string;
  date: string;
  tag: string;
}

const PREVIEW_TRIPS: TripPreviewCard[] = [
  {
    city: 'Rome',
    airportCode: 'FCO',
    flightNo: 'AZ608',
    date: '12 NOV',
    tag: 'Upcoming Trip Summary',
  },
  {
    city: 'Dubai',
    airportCode: 'DXB',
    flightNo: 'EK202',
    date: '24 OCT',
    tag: 'Upcoming Trip Summary',
  },
  {
    city: 'Shanghai',
    airportCode: 'SHA',
    flightNo: 'MU5101',
    date: '01 NOV',
    tag: 'Confirmed Itinerary',
  },
  {
    city: 'Tokyo',
    airportCode: 'HND',
    flightNo: 'JL086',
    date: '18 DEC',
    tag: 'Upcoming Trip Summary',
  },
];

interface MyTripsCarouselProps {
  onNavigateToTrips?: () => void;
}

export const MyTripsCarousel: React.FC<MyTripsCarouselProps> = ({ onNavigateToTrips }) => {
  return (
    <div className="space-y-2.5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center space-x-2">
          <span>My Trips</span>
          <span className="text-xs font-normal text-slate-400 font-sans">我的行程</span>
        </h2>

        {onNavigateToTrips && (
          <button 
            onClick={onNavigateToTrips}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-0.5 active:scale-95 transition-all"
          >
            <span>全部行程</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Carousel Cards */}
      <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1 px-0.5">
        {PREVIEW_TRIPS.map((trip, idx) => (
          <div
            key={idx}
            onClick={onNavigateToTrips}
            className="min-w-[155px] max-w-[155px] rounded-2xl p-3.5 bg-gradient-to-b from-obsidian-850 to-obsidian-950 border border-white/10 hover:border-amber-500/40 transition-all duration-200 cursor-pointer shadow-lg space-y-2 shrink-0 group active:scale-98"
          >
            {/* City Title & Flight Arrow */}
            <div className="flex items-center justify-between">
              <span className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                {trip.city}
              </span>
              <Plane className="w-3.5 h-3.5 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Tag / Summary Text */}
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-medium block leading-tight">
                {trip.tag}
              </span>
              <div className="flex items-center space-x-1.5 text-[9px] font-mono text-slate-500 pt-1">
                <span className="font-bold text-amber-300">{trip.flightNo}</span>
                <span>·</span>
                <span>{trip.airportCode}</span>
                <span>·</span>
                <span>{trip.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
