'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '@/redux/apiSlice';
import { setCredentials } from '@/redux/authSlice';
import { RootState } from '@/redux/store';
import { ApiError } from '@/types/chat';
import { Logo } from '@/components/ui/Logo';
import { Phone, User as UserIcon, ArrowRight, Loader2, AlertCircle, Sparkles, ShieldCheck, ChevronDown } from 'lucide-react';

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
  { name: 'Ada Lovelace', phone: '+15551111111' },
  { name: 'Alan Turing', phone: '+15552222222' },
  { name: 'Grace Hopper', phone: '+15553333333' },
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

    // If starts with 0 (like 01712345678 in BD), strip leading zero
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 selection:bg-[#88E788] selection:text-slate-900 relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#88E788]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#88E788]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Branding Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="xl" variant="light" />
          </div>
          <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
            Sign in to start instant 1-to-1 & group conversations in real time.
          </p>
        </div>

        {/* Crisp White Card */}
        <div className="bg-white/90 border border-slate-200/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-6">
          {errorMessage && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div className="leading-relaxed font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Quick Demo Login Presets */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
              <span>Quick 1-Click Demo Login</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {QUICK_DEMO_USERS.map((demo) => (
                <button
                  key={demo.phone}
                  type="button"
                  onClick={() => handleQuickDemoLogin(demo.phone, demo.name)}
                  disabled={isLoading}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#88E788]/20 border border-slate-200 hover:border-[#88E788] text-left transition-all group disabled:opacity-50 shadow-2xs"
                >
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#2d8a2d] truncate">
                    {demo.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">Demo User</p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative px-3 bg-white text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Or sign in manually
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
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
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-7 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88E788] cursor-pointer"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#88E788] focus:border-[#88E788] transition-all font-mono"
                    required
                  />
                </div>
              </div>

              {/* Formatted Number Preview */}
              {phoneNumber.trim() && (
                <p className="text-[10px] text-slate-400 mt-1 pl-1 font-mono">
                  Full Number: <span className="text-[#2d8a2d] font-bold">{getFullPhone(phoneNumber, selectedCountry)}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#88E788] focus:border-[#88E788] transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#88E788] hover:bg-[#73db73] text-slate-900 px-4 py-3 font-extrabold text-xs sm:text-sm shadow-md shadow-[#88E788]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <span>Enter Chat Application</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Automatic registration for new phone numbers.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
