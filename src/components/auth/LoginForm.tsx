'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '@/redux/apiSlice';
import { setCredentials } from '@/redux/authSlice';
import { RootState } from '@/redux/store';
import { ApiError } from '@/types/chat';
import { Logo } from '@/components/ui/Logo';
import { Phone, User as UserIcon, ArrowRight, ArrowLeft, Loader2, AlertCircle, Sparkles, ShieldCheck, ChevronDown, Zap, Lock } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { code: 'AE', name: 'UAE', dialCode: '+971', flag: '🇦🇪' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
];

const QUICK_DEMO_USERS = [
  { name: 'Alex Smith', phone: '+15550192' },
  { name: 'Sarah Jenkins', phone: '+15550144' },
  { name: 'Michael Chen', phone: '+15550188' },
];

export function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/chat');
    }
  }, [isAuthenticated, router]);

  const getFullPhone = (rawInput: string, country: Country): string => {
    const trimmed = rawInput.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('+')) return trimmed;

    // Strip leading zeros
    const cleanNum = trimmed.replace(/^0+/, '');
    return `${country.dialCode}${cleanNum}`;
  };

  const handleLoginSubmit = async (phoneVal: string, nameVal: string) => {
    setValidationError(null);
    const trimmedPhone = phoneVal.trim();
    const trimmedName = nameVal.trim();

    if (!trimmedPhone) {
      setValidationError('Please enter your phone number.');
      return;
    }
    if (trimmedPhone.length < 5) {
      setValidationError('Phone number must be at least 5 characters long.');
      return;
    }
    if (!trimmedName) {
      setValidationError('Please enter your name.');
      return;
    }

    try {
      const res = await login({ phone: trimmedPhone, name: trimmedName }).unwrap();
      dispatch(setCredentials({ token: res.token, user: res.user }));
      router.push('/chat');
    } catch {
      // Handled via error state
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = getFullPhone(phoneNumber, selectedCountry);
    handleLoginSubmit(fullPhone, name);
  };

  const handleQuickDemoLogin = (demoPhone: string, demoName: string) => {
    setPhoneNumber(demoPhone);
    setName(demoName);
    handleLoginSubmit(demoPhone, demoName);
  };

  const typedError = error && 'data' in error ? (error.data as ApiError) : null;
  const errorMessage =
    validationError ||
    typedError?.error?.message ||
    (error ? 'Network error. Please check server connection.' : null);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-center items-center p-4 selection:bg-[#88E788] selection:text-slate-900 relative overflow-hidden font-sans">
      {/* Background glowing mesh lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#88E788]/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-emerald-400/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      {/* Top Left Back to Home Button */}
      <div className="absolute top-5 left-5 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-700 hover:text-slate-900 bg-white/90 hover:bg-white border border-slate-200/90 px-4 py-2 rounded-xl shadow-xs transition-all backdrop-blur-md hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 text-[#2d8a2d]" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10 pt-10 sm:pt-0">
        {/* Branding Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Link href="/" title="VibeWire Home" className="inline-block cursor-pointer hover:opacity-95 transition-opacity">
              <Logo size="xl" variant="light" />
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto font-medium leading-relaxed">
            Welcome back! Enter your details or try a quick demo user to access real-time chat.
          </p>
        </div>

        {/* Ultra-Glossy Glass Card */}
        <div className="bg-white/85 border border-slate-200/90 backdrop-blur-2xl rounded-2xl p-6 sm:p-7 shadow-2xl shadow-[#88E788]/15 space-y-5 relative overflow-hidden">
          {/* Top Sheen Highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#88E788] to-transparent" />

          {errorMessage && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs shadow-2xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div className="leading-relaxed font-semibold">{errorMessage}</div>
            </div>
          )}

          {/* Quick Demo Login Presets */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
                1-Click Quick Demo Users
              </span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                NO PASSWORD REQUIRED
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {QUICK_DEMO_USERS.map((demo) => (
                <button
                  key={demo.phone}
                  type="button"
                  onClick={() => handleQuickDemoLogin(demo.phone, demo.name)}
                  disabled={isLoading}
                  className="p-2.5 rounded-xl bg-slate-50/90 hover:bg-[#88E788]/20 border border-slate-200 hover:border-[#88E788] text-left transition-all group disabled:opacity-50 shadow-2xs hover:scale-102"
                >
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#2d8a2d] truncate">
                    {demo.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">Demo Account</p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative px-3 bg-white text-[10px] uppercase font-mono font-extrabold text-slate-400 tracking-wider">
              Or sign in with phone
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              
              <div className="flex items-center gap-2">
                {/* Country Code Selector */}
                <div className="relative shrink-0">
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const c = COUNTRIES.find((item) => item.code === e.target.value);
                      if (c) setSelectedCountry(c);
                    }}
                    className="appearance-none bg-slate-50/90 border border-slate-200 rounded-lg pl-3 pr-7 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88E788] cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.dialCode} ({c.code})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Phone Input Box */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="phone"
                    type="text"
                    placeholder="01712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-50/90 border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#88E788] focus:border-[#88E788] transition-all font-mono"
                    required
                  />
                </div>
              </div>

              {/* Formatted Number Preview */}
              {phoneNumber.trim() && (
                <p className="text-[10px] text-slate-400 mt-1 pl-1 font-mono">
                  Full Handshake Number: <span className="text-[#2d8a2d] font-bold">{getFullPhone(phoneNumber, selectedCountry)}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Alex Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50/90 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#88E788] focus:border-[#88E788] transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#88E788] via-[#7ae67a] to-[#88E788] hover:from-[#7ee47e] hover:to-[#88E788] text-slate-950 px-4 py-3 font-black text-xs sm:text-sm shadow-lg shadow-[#88E788]/30 hover:shadow-xl hover:shadow-[#88E788]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 border border-[#88E788]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                  <span>Establishing Socket Session...</span>
                </>
              ) : (
                <>
                  <span>Enter Real-Time Messenger</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security & Feature Badges */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-600 font-bold border-t border-slate-100">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#2d8a2d]" />
              <span>JWT Authenticated</span>
            </div>
            <div className="flex items-center gap-1 justify-end">
              <Zap className="w-3 h-3 text-[#2d8a2d]" />
              <span>Socket.io Stream</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
