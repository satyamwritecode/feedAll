import React, { useState } from 'react';
import { 
  Building2, 
  HeartHandshake, 
  ShieldCheck, 
  Bell, 
  ChevronDown, 
  Home, 
  LogIn,
  UserPlus,
  LogOut,
  User,
  Sparkles,
  MessageSquareHeart
} from 'lucide-react';

export default function Navbar({ 
  currentRole, 
  setCurrentRole, 
  currentUser, 
  onOpenAuth, 
  onSignOut,
  unreadAlerts = 1 
}) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showAlertsMenu, setShowAlertsMenu] = useState(false);

  const roles = [
    { id: 'landing', label: 'Public Home', icon: Home, desc: 'Overview & Story' },
    { id: 'provider', label: 'Hotel Portal', icon: Building2, desc: 'Banquet Surplus Logistics' },
    { id: 'ngo', label: 'NGO Rescue', icon: HeartHandshake, desc: 'Live Rescue Matches & Fleet' },
    { id: 'admin', label: 'Platform Admin', icon: ShieldCheck, desc: 'FSSAI Approvals & Audit' },
  ];

  const currentRoleObj = roles.find(r => r.id === currentRole) || roles[0];

  const scrollToSection = (id) => {
    if (currentRole !== 'landing') {
      setCurrentRole('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-forest-900 border-b border-forest-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setCurrentRole('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative bg-white p-1 rounded-xl shadow-md border border-forest-700 group-hover:scale-105 transition-transform">
              <img 
                src="/feedall-logo.png" 
                alt="Feedall Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                  Feed<span className="text-brand-orange">all</span>
                </span>
              </div>
              <span className="text-[10px] tracking-[0.16em] uppercase text-emerald-200/80 font-semibold font-heading">
                Food For A Better Tomorrow
              </span>
            </div>
          </div>

          {/* Clean Main Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-emerald-100">
            <button 
              onClick={() => setCurrentRole('landing')}
              className={`hover:text-white transition-colors ${currentRole === 'landing' ? 'text-brand-orange font-bold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('feedback-section')}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-brand-orange" />
              Quality Feedback
            </button>

            {/* Quick Portals dropdown for testers */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-950/60 border border-forest-700 hover:border-forest-500 text-xs text-white"
              >
                <currentRoleObj.icon className="w-3.5 h-3.5 text-brand-orange" />
                <span>Portal: <strong>{currentRoleObj.label}</strong></span>
                <ChevronDown className="w-3 h-3 text-emerald-300" />
              </button>

              {showRoleMenu && (
                <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-200 p-2 z-50">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Active Dashboard
                  </div>
                  {roles.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setCurrentRole(r.id);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 text-xs transition-colors ${
                        currentRole === r.id 
                          ? 'bg-forest-50 text-forest-900 font-bold border border-forest-200' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <r.icon className="w-4 h-4 text-brand-orange" />
                      <div>
                        <div>{r.label}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls: Login / Sign Up / User Profile */}
          <div className="flex items-center gap-3">
            
            {/* Live Backend Status Badge */}
            <div 
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300 shadow-inner" 
              title="Cloud Active & Synchronized"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-[10px] tracking-wide">Live</span>
            </div>

            {/* Live Alerts Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowAlertsMenu(!showAlertsMenu)}
                className="relative p-2.5 rounded-xl bg-forest-800/80 hover:bg-forest-700 text-emerald-100 hover:text-white border border-forest-700 transition-colors"
                title="Live Surplus & Cold-Chain Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white shadow-sm ring-2 ring-forest-900 animate-pulse">
                    {unreadAlerts}
                  </span>
                )}
              </button>

              {showAlertsMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-200 overflow-hidden z-50">
                  <div className="p-3 bg-forest-900 text-white flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">Live Platform Activity</span>
                    <span className="text-[10px] bg-forest-800 text-emerald-200 px-2 py-0.5 rounded-full font-mono">Real-time</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto text-xs p-1">
                    <div className="p-3 hover:bg-slate-50">
                      <p className="font-bold text-forest-900">Oberoi Palace Surplus Match</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">65kg Banquet Dal & Rice broadcasted to local NGO fleets.</p>
                      <span className="text-[10px] text-brand-orange font-bold">Expires in 42 mins</span>
                    </div>
                    <div className="p-3 hover:bg-slate-50">
                      <p className="font-bold text-forest-900">Cold Chain Temperature Verified</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Le Méridien pickup logged at 3.6°C (Compliant &lt; 4°C).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Authentication Buttons: If Not Logged In vs If Logged In */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-forest-700">
                <div className="flex items-center gap-2 bg-forest-800/80 px-3 py-1.5 rounded-2xl border border-forest-700">
                  <span className="text-base">{currentUser.avatar || '👤'}</span>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold text-white leading-tight truncate max-w-[130px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider">
                      {currentUser.role === 'provider' ? 'Hotel Partner' : currentUser.role === 'ngo' ? 'NGO Fleet' : 'Admin'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onSignOut}
                  className="p-2 rounded-xl bg-forest-800 hover:bg-rose-900/60 text-slate-300 hover:text-white border border-forest-700 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('signin', 'provider')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white hover:bg-forest-800 transition-all border border-transparent hover:border-forest-700"
                >
                  <LogIn className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => onOpenAuth('signup', 'provider')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-orange hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
