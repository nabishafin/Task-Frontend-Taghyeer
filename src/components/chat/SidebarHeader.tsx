'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/authSlice';
import { setIsSearchOpen, setIsGroupModalOpen } from '@/redux/chatSlice';
import { Avatar } from '@/components/ui/Avatar';
import { Logo } from '@/components/ui/Logo';
import { UserPlus, Users, LogOut, Wifi, WifiOff } from 'lucide-react';

export function SidebarHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const socketConnected = useSelector((state: RootState) => state.chat.socketConnected);

  return (
    <div className="border-b border-slate-200 bg-white shrink-0">
      {/* App Branding Strip */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <Logo size="sm" variant="light" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Messenger
        </span>
      </div>

      {/* User Info & Actions */}
      <div className="p-3 px-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={user?.name} seed={user?._id} size="md" isOnline={socketConnected} />
          <div className="min-w-0 flex-1">
            <h2 className="text-xs font-bold text-slate-900 truncate">{user?.name || 'User'}</h2>
            <p className="text-[11px] text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
              <span className="truncate">{user?.phone}</span>
              {socketConnected ? (
                <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-[#00897b] bg-[#00897b]/15 px-1.5 py-0.2 rounded border border-[#00897b]/30">
                  <Wifi className="w-2.5 h-2.5" /> Live
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[9px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  <WifiOff className="w-2.5 h-2.5" /> Offline
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => dispatch(setIsSearchOpen(true))}
            title="New Direct Chat"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
          </button>

          <button
            onClick={() => dispatch(setIsGroupModalOpen(true))}
            title="Create Group"
            className="p-2 rounded-xl text-slate-600 hover:text-[#00897b] hover:bg-[#00897b]/15 transition-colors"
          >
            <Users className="w-4 h-4" />
          </button>

          <button
            onClick={() => dispatch(logout())}
            title="Sign Out"
            className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
