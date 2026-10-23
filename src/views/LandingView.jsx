import React from 'react';
import { 
  Building2, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Leaf, 
  Clock, 
  Truck, 
  Award, 
  ThermometerSnowflake, 
  FileCheck,
  LogIn,
  UserPlus
} from 'lucide-react';
import FeedbackSection from '../components/FeedbackSection';

export default function LandingView({ 
  setCurrentRole, 
  onOpenAuth, 
  feedbacks, 
  setFeedbacks, 
  showNotification 
}) {
  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-900 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 border-b border-forest-800">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-brand-orange/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-7">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-forest-800/90 border border-forest-700/80 shadow-md">
            <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-ping"></span>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-200 font-heading">
              FOOD FOR A BETTER TOMORROW
            </span>
          </div>

          {/* Hero Branding & Logo */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-forest-500 rounded-3xl blur-md opacity-30 group-hover:opacity-70 transition duration-300"></div>
              <div className="relative bg-white p-3 rounded-3xl shadow-xl border-2 border-forest-700/40 max-w-[240px] sm:max-w-xs flex items-center justify-center">
                <img 
                  src="/feedall-logo.png" 
                  alt="Feedall Official Logo" 
                  className="h-24 sm:h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white max-w-4xl mx-auto leading-tight">
              Surplus Food Redistribution for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-yellow-400">Corporate Hospitality</span>
            </h1>

            <p className="text-sm sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
              Connect banquet kitchens and corporate hotels with FSSAI-verified food rescue fleets in under <span className="font-bold text-brand-orange">45 minutes</span> with cold-chain audit tracking and digital handover verification.
            </p>
          </div>

          {/* Direct Authentication CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenAuth('signin', 'provider')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Dashboard</span>
            </button>

            <button
              onClick={() => onOpenAuth('signup', 'provider')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-sm border border-forest-600 flex items-center justify-center gap-2 transition-all"
            >
              <UserPlus className="w-4 h-4 text-emerald-300" />
              <span>Register New Hotel or NGO</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
            <div className="p-3.5 rounded-2xl bg-forest-900/80 border border-forest-700/60 shadow-md">
              <div className="text-[11px] font-bold text-brand-orange uppercase flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" /> Rescued Food
              </div>
              <div className="text-xl font-black font-heading text-white mt-0.5">142,850+ kg</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-forest-900/80 border border-forest-700/60 shadow-md">
              <div className="text-[11px] font-bold text-yellow-400 uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Meals Delivered
              </div>
              <div className="text-xl font-black font-heading text-white mt-0.5">314,200+</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-forest-900/80 border border-forest-700/60 shadow-md">
              <div className="text-[11px] font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Dispatch Time
              </div>
              <div className="text-xl font-black font-heading text-white mt-0.5">&lt; 14 Mins</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-forest-900/80 border border-forest-700/60 shadow-md">
              <div className="text-[11px] font-bold text-brand-orange uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> FSSAI Compliance
              </div>
              <div className="text-xl font-black font-heading text-white mt-0.5">100% Audited</div>
            </div>
          </div>

          {/* 3 Distinct Role Dashboards: 1-Click Entry Cards */}
          <div className="pt-6">
            <div className="text-center mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-forest-800/80 px-3 py-1 rounded-full">
                Interactive Persona Demo
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mt-2">
                Explore Dedicated Role Portals
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
              
              {/* Card 1: Provider */}
              <div 
                onClick={() => setCurrentRole('provider')}
                className="bg-white text-slate-800 rounded-3xl p-5 shadow-lg border-2 border-transparent hover:border-brand-orange transition-all duration-200 cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-2xl bg-forest-900 text-white">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded-full">
                      Hotels & Caterers
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-forest-900 font-heading">
                    Login as Provider
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Log surplus banquets, track refrigerated pickups in real-time, and manage digital handover verification manifests.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-orange">
                  <span>Enter Oberoi Hotel Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 2: NGO */}
              <div 
                onClick={() => setCurrentRole('ngo')}
                className="bg-white text-slate-800 rounded-3xl p-5 shadow-lg border-2 border-transparent hover:border-forest-700 transition-all duration-200 cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-2xl bg-brand-orange text-white">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-orange bg-orange-50 px-2.5 py-0.5 rounded-full">
                      Food Rescue Fleets
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-forest-900 font-heading">
                    Login as NGO
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    View geofenced surplus matches with ticking urgency countdowns, one-click dispatch, and 3-step telematics tracker.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-forest-900">
                  <span>Enter Robin Hood Army Fleet</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 3: Admin */}
              <div 
                onClick={() => setCurrentRole('admin')}
                className="bg-white text-slate-800 rounded-3xl p-5 shadow-lg border-2 border-transparent hover:border-slate-800 transition-all duration-200 cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-2xl bg-slate-900 text-white">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      Oversight & Compliance
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-forest-900 font-heading">
                    Login as Admin
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Approve/Reject pending NGO FSSAI licenses, review vehicle health audits, and monitor platform impact.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Enter Compliance Command</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS PIPELINE */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
            Automated Redistribution
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 font-heading">
            How Feedall Works in 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-900 text-white font-heading font-black text-lg flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-bold text-forest-900 font-heading">
              Hotel Logs Banquet Surplus
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kitchen staff logs surplus quantity, prep time, cold storage criteria, and service dock in 30 seconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-orange text-white font-heading font-black text-lg flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-bold text-forest-900 font-heading">
              Smart Geofenced Match
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nearby certified NGOs receive an urgent 45-minute countdown alert and dispatch temperature-controlled vans.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-900 text-white font-heading font-black text-lg flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-bold text-forest-900 font-heading">
              Temperature Handover & Digital Audit
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Driver audits core temperature (&lt; 4°C), scans digital OTP, and delivers food safely to verified shelters with live audit manifests.
            </p>
          </div>
        </div>
      </section>

      {/* REQUESTED: UNIQUE QUALITY FEEDBACK SECTION */}
      <FeedbackSection 
        feedbacks={feedbacks}
        setFeedbacks={setFeedbacks}
        showNotification={showNotification}
      />

    </div>
  );
}
