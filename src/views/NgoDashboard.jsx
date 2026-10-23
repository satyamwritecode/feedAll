import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Truck, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  ThermometerSnowflake, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  PhoneCall, 
  ChevronRight,
  Sparkles,
  Check,
  User,
  Navigation,
  FileCheck2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BackendService } from '../services/backendService';

// Single Match Card with real-time ticking countdown timer
function MatchCard({ match, onAcceptAndDispatch }) {
  const [secondsLeft, setSecondsLeft] = useState(match.initialSeconds || 2700);

  // Technical Constraint: Use React useState and useEffect to ensure the NGO countdown timer visually ticks down every second
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  // Format mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isUrgent = minutes < 25;

  return (
    <div className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between ${
      isUrgent ? 'border-brand-orange ring-2 ring-brand-orange/20' : 'border-slate-200 hover:border-forest-700'
    }`}>
      
      {/* Card Header & Urgency Countdown UI */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <span className="font-bold text-slate-800">{match.distanceKm}</span> away
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              ~{match.driveTime}
            </span>
          </div>

          {/* Prominent Ticking Bright Orange Countdown Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-50 border border-brand-orange/40 text-brand-orange">
            <Clock className={`w-4 h-4 ${isUrgent ? 'animate-spin' : ''}`} />
            <div className="flex flex-col text-right">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-orange">
                Rescue Window
              </span>
              <span className="text-sm font-mono font-black tracking-tight text-brand-orange">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Hotel & Match Information */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-forest-900 font-heading">
              {match.hotelName}
            </h3>
            {match.fssaiVerified && (
              <span className="text-emerald-700 bg-emerald-50 p-1 rounded-full text-xs" title="FSSAI Verified 5-Star Kitchen">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-medium">
            {match.pickupLocation}
          </p>
        </div>

        {/* Food Details Pill Box */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-forest-900 bg-forest-50 px-2.5 py-1 rounded-lg border border-forest-100">
              {match.category}
            </span>
            <span className="text-xs font-extrabold text-brand-orange">
              {match.quantityKg} kg • ~{match.portions} Portions
            </span>
          </div>

          <p className="text-xs font-medium text-slate-700 line-clamp-2">
            {match.itemsSummary}
          </p>

          <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-forest-800" />
              {match.coldStorageRequired ? 'Insulated Van Required' : 'Ambient OK'}
            </span>
            <span className="font-semibold text-forest-900">
              Best Before {match.bestBefore}
            </span>
          </div>
        </div>

        {/* Dietary and Allergens */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {match.dietary.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-100">
              ✓ {tag}
            </span>
          ))}
          {match.allergens && (
            <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-100">
              ℹ {match.allergens}
            </span>
          )}
        </div>
      </div>

      {/* Bold Dark Green "Accept & Dispatch" Button */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <button
          onClick={() => onAcceptAndDispatch(match)}
          className="w-full py-3.5 px-4 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-forest-900/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Truck className="w-4 h-4 text-brand-orange" />
          <span>Accept & Dispatch</span>
          <ArrowRight className="w-4 h-4 text-emerald-300" />
        </button>
      </div>

    </div>
  );
}

export default function NgoDashboard({ 
  currentUser,
  ngoMatches, 
  setNgoMatches, 
  pickupTrackers, 
  setPickupTrackers, 
  showNotification 
}) {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' or 'tracker'
  const [selectedTracker, setSelectedTracker] = useState(pickupTrackers[0] || null);

  const handleAcceptAndDispatch = async (match) => {
    // Remove from incoming feed optimistically
    setNgoMatches(prev => prev.filter(m => m.id !== match.id));

    const driverName = currentUser?.contactPerson 
      ? `${currentUser.contactPerson} (${currentUser.name})` 
      : "Mohit Verma (DL-1T-9021)";

    // Persist claim in Supabase database & create tracker
    const newTracker = await BackendService.claimAndDispatchMatch(match, {
      driver: driverName
    });

    if (newTracker) {
      setPickupTrackers(prev => [newTracker, ...prev]);
      setSelectedTracker(newTracker);
    }
    setActiveTab('tracker');

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    showNotification(`Surplus batch claimed in Supabase! Van dispatched to ${match.hotelName}.`, 'success');
  };

  const advanceTrackerStep = async (trackerId) => {
    let nextStep = 0;
    let updatedSteps = [];

    setPickupTrackers(prev => prev.map(t => {
      if (t.id === trackerId) {
        nextStep = Math.min(t.currentStep + 1, 2);
        updatedSteps = t.steps.map((s, idx) => {
          if (idx < nextStep) return { ...s, status: 'completed' };
          if (idx === nextStep) return { ...s, status: 'active', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
          return s;
        });
        return {
          ...t,
          currentStep: nextStep,
          steps: updatedSteps
        };
      }
      return t;
    }));

    if (selectedTracker && selectedTracker.id === trackerId) {
      setSelectedTracker(prev => ({
        ...prev,
        currentStep: nextStep,
        steps: updatedSteps
      }));
    }

    // Persist tracker progression to Supabase
    await BackendService.updatePickupTrackerStep(trackerId, nextStep, updatedSteps);

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });

    showNotification('Pickup telemetry step updated in Supabase database!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. NGO PROFILE HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-forest-900 text-white rounded-2xl shadow-md">
              <HeartHandshake className="w-8 h-8 text-brand-orange" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
                  Certified Rescue Organization
                </span>
                
                {/* FSSAI Verification Badge */}
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {currentUser?.fssai ? `FSSAI: ${currentUser.fssai}` : 'FSSAI Verified: #21419550000312'}
                </span>
                
                <span className="text-xs text-slate-400 font-mono">
                  80G Certified
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 font-heading mt-1">
                {currentUser?.name || 'Robin Hood Army — Central Food Rescue Fleet'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser?.location ? `Fleet Division • ${currentUser.location}` : 'Central Operations Hub • Connaught Place & Chanakyapuri Division • New Delhi'}
              </p>
            </div>
          </div>

          {/* Current Vehicle Capacity & Radius Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-forest-50 border border-forest-100 p-3 rounded-2xl">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forest-700">
                Current Vehicle Capacity
              </div>
              <div className="text-sm font-extrabold text-forest-900 flex items-center gap-1.5 mt-0.5">
                <Truck className="w-4 h-4 text-brand-orange" />
                <span>2 Insulated Vans Available</span>
                <span className="text-xs text-forest-600 font-normal">• 650 kg Capacity</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Operating Radius
              </div>
              <div className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Navigation className="w-4 h-4 text-forest-700" />
                <span>12 km Radius</span>
              </div>
            </div>
          </div>

        </div>

        {/* View Switcher Tabs: Live Feed vs Pickup Tracker */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'feed'
                  ? 'bg-forest-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>Live Match Feed</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-orange text-white font-mono">
                {ngoMatches.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'tracker'
                  ? 'bg-forest-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-brand-orange" />
              <span>Active Pickup Tracker</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-forest-800 text-emerald-200 font-mono">
                {pickupTrackers.length}
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-brand-orange font-semibold">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>Timers synchronized in real time</span>
          </div>
        </div>
      </div>

      {/* 2. LIVE MATCH FEED TAB */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold font-heading text-forest-900">
                Incoming Geofenced Food Matches
              </h2>
              <p className="text-xs text-slate-500">
                Batches filtered to your 12km zone and refrigerated van capabilities.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              Showing <strong>{ngoMatches.length}</strong> available donations
            </span>
          </div>

          {ngoMatches.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">All Nearby Surplus Has Been Dispatched!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Great job! All active corporate surplus matches in your zone are currently assigned. Check back shortly as banquets conclude.
              </p>
              <button
                onClick={() => setActiveTab('tracker')}
                className="mt-3 px-5 py-2 rounded-xl bg-forest-900 text-white text-xs font-bold hover:bg-forest-950 transition-colors"
              >
                View Active Delivery Tracker
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ngoMatches.map(match => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  onAcceptAndDispatch={handleAcceptAndDispatch} 
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. PICKUP TRACKER TAB (Vertical Stepper) */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold font-heading text-forest-900">
                Live Cold-Chain Pickup & Delivery Tracker
              </h2>
              <p className="text-xs text-slate-500">
                End-to-end custody tracking from hotel kitchen dock to shelter dining hall.
              </p>
            </div>
          </div>

          {pickupTrackers.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Truck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">No Active Pickups in Progress</p>
              <p className="text-xs text-slate-400 mt-1">Accept an incoming match to launch the live telematics tracker.</p>
              <button
                onClick={() => setActiveTab('feed')}
                className="mt-4 px-5 py-2.5 bg-forest-900 text-white rounded-xl text-xs font-bold"
              >
                Go to Match Feed
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Tracker Selector List on Left */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active Rescue Runs ({pickupTrackers.length})
                </span>
                {pickupTrackers.map(tracker => (
                  <div
                    key={tracker.id}
                    onClick={() => setSelectedTracker(tracker)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedTracker?.id === tracker.id
                        ? 'bg-white border-forest-900 shadow-md ring-2 ring-forest-900/10'
                        : 'bg-white/70 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-forest-900">{tracker.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-brand-orange">
                        Step {tracker.currentStep + 1} of 3
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-800 mt-1">{tracker.hotelName}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {tracker.quantityKg} kg • {tracker.category}
                    </div>
                  </div>
                ))}
              </div>

              {/* Vertical Stepper Detail on Right */}
              {selectedTracker && (
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  
                  {/* Stepper Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-brand-orange">
                        MANIFEST #{selectedTracker.id}
                      </span>
                      <h3 className="text-xl font-bold font-heading text-forest-900">
                        {selectedTracker.hotelName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Batch: {selectedTracker.quantityKg} kg ({selectedTracker.portions} meals) • {selectedTracker.category}
                      </p>
                    </div>

                    {/* Step Advance Interactive Button */}
                    <div>
                      {selectedTracker.currentStep < 2 ? (
                        <button
                          onClick={() => advanceTrackerStep(selectedTracker.id)}
                          className="flex items-center gap-2 bg-forest-900 hover:bg-forest-950 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                          <span>Advance Step ({selectedTracker.currentStep === 0 ? 'Mark Arrived' : 'Mark Collected'})</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Delivery Completed & Handed Over
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vertical Stepper Container */}
                  <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                    
                    {/* STEP 1: DISPATCHED */}
                    <div className="relative">
                      <div className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm transition-all ${
                        selectedTracker.currentStep >= 0 ? 'bg-forest-900 ring-4 ring-forest-100' : 'bg-slate-300'
                      }`}>
                        {selectedTracker.currentStep > 0 ? <Check className="w-3.5 h-3.5" /> : '1'}
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-forest-900 flex items-center gap-2">
                            Step 1: Vehicle Dispatched
                            {selectedTracker.currentStep > 0 && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-normal">
                                Completed
                              </span>
                            )}
                          </h4>
                          <span className="text-xs font-mono text-slate-400">16:15</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Temperature-controlled van departed from Central Rescue Depot.
                        </p>
                        <div className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-forest-800" />
                            <span className="font-semibold">Driver: Suresh Patil</span>
                            <span className="text-slate-400">(DL-1V-8902)</span>
                          </div>
                          <span className="text-forest-700 font-bold flex items-center gap-1">
                            <PhoneCall className="w-3 h-3" /> +91 98101 22345
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* STEP 2: ARRIVED */}
                    <div className="relative">
                      <div className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm transition-all ${
                        selectedTracker.currentStep >= 1 ? 'bg-forest-900 ring-4 ring-forest-100' : 'bg-slate-300'
                      }`}>
                        {selectedTracker.currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : '2'}
                      </div>
                      <div className={`p-4 rounded-2xl border transition-all space-y-2 ${
                        selectedTracker.currentStep >= 1 ? 'bg-slate-50 border-slate-200' : 'bg-slate-50/50 border-dashed border-slate-200 opacity-60'
                      }`}>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-forest-900 flex items-center gap-2">
                            Step 2: Arrived at Hotel Loading Bay
                            {selectedTracker.currentStep === 1 && (
                              <span className="text-[10px] bg-brand-orange text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                                In Progress
                              </span>
                            )}
                            {selectedTracker.currentStep > 1 && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-normal">
                                Verified
                              </span>
                            )}
                          </h4>
                          <span className="text-xs font-mono text-slate-400">16:32</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Vehicle docked at Hotel Kitchen Service Bay 4. Cold-chain probe test performed.
                        </p>
                        <div className="bg-emerald-50 text-emerald-900 p-2.5 rounded-xl border border-emerald-200 text-xs font-medium flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <ThermometerSnowflake className="w-4 h-4 text-emerald-700" />
                            Core Temperature Audit: <strong>3.6°C</strong>
                          </span>
                          <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded">
                            FSSAI Safe Range (&lt; 4°C)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* STEP 3: COLLECTED */}
                    <div className="relative">
                      <div className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm transition-all ${
                        selectedTracker.currentStep === 2 ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-slate-300'
                      }`}>
                        {selectedTracker.currentStep === 2 ? <Check className="w-3.5 h-3.5" /> : '3'}
                      </div>
                      <div className={`p-4 rounded-2xl border transition-all space-y-2 ${
                        selectedTracker.currentStep === 2 ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50/50 border-dashed border-slate-200 opacity-60'
                      }`}>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-forest-900 flex items-center gap-2">
                            Step 3: Collected & En Route to Shelter
                            {selectedTracker.currentStep === 2 && (
                              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                                Handover Complete
                              </span>
                            )}
                          </h4>
                          <span className="text-xs font-mono text-slate-400">16:48</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Digital OTP handover verified by Sous Chef. Food sealed and departing for final distribution.
                        </p>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Destination:</span>
                            <span className="font-bold text-forest-900">Jeevan Jyoti Shelter Home</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Beneficiaries:</span>
                            <span className="font-bold text-brand-orange">180 Children & Senior Residents</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}
        </div>
      )}

    </div>
  );
}
