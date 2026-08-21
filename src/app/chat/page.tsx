'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetMeQuery } from '@/store/apiSlice';
import { setCredentials } from '@/store/authSlice';
import { useSocket } from '@/hooks/useSocket';
import { ChatLayout } from '@/components/chat/ChatLayout';
import { Loader2 } from 'lucide-react';

export default function ChatPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);

  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize socket connection
  useSocket();

  // Try fetching current user session if token exists
  const { data: meData, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (meData && token) {
      dispatch(setCredentials({ token, user: meData }));
    }
  }, [meData, token, dispatch]);

  useEffect(() => {
    const storedToken = localStorage.getItem('pulse_auth_token');
    if (!storedToken && !isAuthenticated) {
      router.push('/login');
    } else {
      setIsInitializing(false);
    }
  }, [isAuthenticated, router]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-xs text-slate-400 font-medium">Loading Pulse Chat...</p>
      </div>
    );
  }

  return <ChatLayout />;
}
