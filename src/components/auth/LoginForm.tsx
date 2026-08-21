'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '@/redux/apiSlice';
import { setCredentials } from '@/redux/authSlice';
import { RootState } from '@/redux/store';
import { ApiError } from '@/types/chat';
import { Phone, User as UserIcon, MessageSquare, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/chat');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedPhone = phone.trim();
    const trimmedName = name.trim();

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

  const typedError = error && 'data' in error ? (error.data as ApiError) : null;
  const errorMessage =
    validationError ||
    typedError?.error?.message ||
    (error ? 'Network error. Please try again.' : null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 selection:bg-[#88E788] selection:text-slate-900">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#88E788] text-slate-900 shadow-md mb-1">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Sign in to <span className="text-[#2d8a2d]">Pulse</span>
          </h1>
          <p className="text-xs text-slate-500">
            Enter your phone number and name to access your chats.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          {errorMessage && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div className="leading-relaxed font-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="phone"
                  type="text"
                  placeholder="+15551234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#88E788] focus:border-[#88E788] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#88E788] focus:border-[#88E788] transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#88E788] hover:bg-[#73db73] text-slate-900 px-4 py-3 font-bold text-sm shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-500 pt-1">
            New phone numbers are registered automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
