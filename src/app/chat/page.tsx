'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetMeQuery } from '@/redux/apiSlice';
import { setCredentials } from '@/redux/authSlice';
import { useSocket } from '@/hooks/useSocket';
import { ChatLayout } from '@/components/chat/ChatLayout';
import { Loader2 } from 'lucide-react';

export default function ChatPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);

  useSocket();

  const { data: meData, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (meData && token) {
      dispatch(setCredentials({ token, user: meData }));
    }
  }, [meData, token, dispatch]);

  useEffect(() => {
    if (!token && !isAuthenticated) {
      router.push('/login');
    }
  }, [token, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-xs text-slate-400 font-medium">Loading Pulse Chat...</p>
      </div>
    );
  }

  return <ChatLayout />;
}
