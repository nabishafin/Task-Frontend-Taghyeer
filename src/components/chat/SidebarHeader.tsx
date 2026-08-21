'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/authSlice';
import { setIsSearchOpen, setIsGroupModalOpen } from '@/redux/chatSlice';
import { Avatar } from '@/components/ui/Avatar';
import { UserPlus, Users, LogOut, Wifi, WifiOff } from 'lucide-react';

export function SidebarHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const socketConnected = useSelector((state: RootState) => state.chat.socketConnected);

  return (
    <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <Avatar name={user?.name} seed={user?._id} size="md" isOnline={socketConnected} />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-slate-100 truncate">{user?.name || 'User'}</h2>
          <p className="text-xs text-slate-400 truncate flex items-center gap-1">
            <span className="truncate">{user?.phone}</span>
            {socketConnected ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                <Wifi className="w-2.5 h-2.5" /> Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded">
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
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
        </button>

        <button
          onClick={() => dispatch(setIsGroupModalOpen(true))}
          title="Create Group"
          className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
        >
          <Users className="w-5 h-5" />
        </button>

        <button
          onClick={() => dispatch(logout())}
          title="Sign Out"
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
