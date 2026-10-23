import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  HeartHandshake, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Building, 
  User, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  FileBadge
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { demoAccounts } from '../data/mockData';
import { BackendService } from '../services/backendService';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialTab = 'signin', initialRole = 'provider' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'signin' | 'signup'
  const [selectedRole, setSelectedRole] = useState(initialRole); // 'provider' | 'ngo' | 'admin'

  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [fssaiNo, setFssaiNo] = useState('');
  const [location, setLocation] = useState('New Delhi');
  const [contactName, setContactName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Auto-fill demo credentials
  const autofillDemo = (roleKey) => {
    setSelectedRole(roleKey);
    const demo = demoAccounts[roleKey];
    setEmail(demo.email);
    setPassword('Feedall@2026!');
    setOrgName(demo.name);
    setFssaiNo(demo.fssai);
    setLocation(demo.location);
    setContactName(demo.contactPerson);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await BackendService.loginOrRegisterUser({
        name: orgName || (selectedRole === 'provider' ? 'The Grand Oberoi Palace' : selectedRole === 'ngo' ? 'Robin Hood Army Fleet' : 'Feedall Compliance Admin'),
        email: email || `${selectedRole}@feedall.org`,
        password: password || 'Feedall@2026!',
        role: selectedRole,
        fssai: fssaiNo || (selectedRole === 'provider' ? 'FSSAI-10020011004523' : 'FSSAI-21419550000312'),
        location: location || 'New Delhi',
        contactPerson: contactName || 'Authorized Officer',
        avatar: selectedRole === 'provider' ? '🏨' : selectedRole === 'ngo' ? '🤝' : '🛡️'
      });

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });

      onLoginSuccess(userData);
      onClose();
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        
        {/* Header with Feedall Branding */}
        <div className="bg-gradient-to-r from-forest-950 to-forest-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-xl shadow-md">
              <img 
                src="/feedall-logo.png" 
                alt="Feedall" 
                className="h-9 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  Feed<span className="text-brand-orange">all</span>
                </span>
                <span className="text-[10px] bg-brand-orange text-white font-bold px-1.5 py-0.5 rounded uppercase">
                  Auth Portal
                </span>
              </div>
              <p className="text-[10px] tracking-wider uppercase text-emerald-200 font-semibold">
                FOOD FOR A BETTER TOMORROW
              </p>
            </div>
          </div>

          {/* Tab Switcher: Sign In vs Sign Up */}
          <div className="mt-6 flex rounded-2xl bg-forest-950/80 p-1 border border-forest-800">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'signin'
                  ? 'bg-brand-orange text-white shadow-md'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              Sign In to Account
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'signup'
                  ? 'bg-brand-orange text-white shadow-md'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              Register New Organization
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Demo Autofill Helpers */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
              <span className="flex items-center gap-1 text-forest-900">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" /> Quick Demo Autofill
              </span>
              <span className="text-slate-400">Click to test instant login</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => autofillDemo('provider')}
                className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border text-left flex items-center gap-1.5 transition-all ${
                  selectedRole === 'provider' 
                    ? 'bg-forest-900 text-white border-forest-900' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>🏨</span>
                <span className="truncate">Hotel Provider</span>
              </button>

              <button
                type="button"
                onClick={() => autofillDemo('ngo')}
                className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border text-left flex items-center gap-1.5 transition-all ${
                  selectedRole === 'ngo' 
                    ? 'bg-brand-orange text-white border-brand-orange' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>🤝</span>
                <span className="truncate">NGO Fleet</span>
              </button>

              <button
                type="button"
                onClick={() => autofillDemo('admin')}
                className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border text-left flex items-center gap-1.5 transition-all ${
                  selectedRole === 'admin' 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>🛡️</span>
                <span className="truncate">Admin Portal</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Radio Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Select Your Entity Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('provider')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    selectedRole === 'provider'
                      ? 'border-forest-900 bg-forest-50/80 text-forest-900 font-bold ring-2 ring-forest-900/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-forest-800" />
                  <span className="text-[11px]">Hotel / Food Partner</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('ngo')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    selectedRole === 'ngo'
                      ? 'border-brand-orange bg-orange-50/80 text-brand-orange font-bold ring-2 ring-brand-orange/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4 text-brand-orange" />
                  <span className="text-[11px]">Rescue NGO</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    selectedRole === 'admin'
                      ? 'border-slate-900 bg-slate-100 text-slate-900 font-bold ring-2 ring-slate-900/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-slate-700" />
                  <span className="text-[11px]">Compliance Admin</span>
                </button>
              </div>
            </div>

            {/* If Sign Up: Extra Organization & Verification Fields */}
            {activeTab === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Organization / Entity Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder={selectedRole === 'provider' ? 'e.g., ITC Maurya Luxury Hotel' : 'e.g., Robin Hood Army Delhi'}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      FSSAI License / Darpan ID *
                    </label>
                    <div className="relative">
                      <FileBadge className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fssaiNo}
                        onChange={(e) => setFssaiNo(e.target.value)}
                        placeholder="FSSAI-1002001100..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      City / Hub Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Connaught Place, New Delhi"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Official Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@hotel.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password *
                </label>
                {activeTab === 'signin' && (
                  <span className="text-[11px] text-brand-orange cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900"
                />
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3.5 px-4 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-forest-900/25 transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>{activeTab === 'signin' ? 'Sign In to Dashboard' : 'Complete Verification & Register'}</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <span className="text-[11px] text-slate-400">
                {activeTab === 'signin' ? "Don't have an enterprise account? " : "Already registered? "}
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
                  className="text-brand-orange font-bold hover:underline"
                >
                  {activeTab === 'signin' ? 'Register Now' : 'Sign In'}
                </button>
              </span>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
