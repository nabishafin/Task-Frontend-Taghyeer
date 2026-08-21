'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setIsSearchOpen, setActiveConversationId } from '@/redux/chatSlice';
import { useLazySearchUsersQuery, useStartDirectConversationMutation } from '@/redux/apiSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { ApiError } from '@/types/chat';
import { Search, Loader2, UserX, MessageSquarePlus, AlertCircle } from 'lucide-react';

export function SearchModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.chat.isSearchOpen);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const [triggerSearch, { data: users, isLoading, isError, error }] = useLazySearchUsersQuery();
  const [startDirectConversation, { isLoading: isStarting }] = useStartDirectConversationMutation();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      triggerSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery, triggerSearch]);

  const handleSelectUser = async (targetUserId: string) => {
    try {
      const conv = await startDirectConversation({ userId: targetUserId }).unwrap();
      dispatch(setActiveConversationId(conv._id));
      dispatch(setIsSearchOpen(false));
      setQuery('');
    } catch {
      // Error handled
    }
  };

  const handleClose = () => {
    dispatch(setIsSearchOpen(false));
    setQuery('');
  };

  const filteredUsers = users?.filter((u) => u._id !== currentUser?._id) || [];
  const typedError = error && 'data' in error ? (error.data as ApiError) : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Start New Conversation"
      subtitle="Search users by name or phone number"
    >
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Type name or phone (e.g. +15552222222 or Alan)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00897b]"
          />
          {isLoading && (
            <Loader2 className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-slate-600" />
          )}
        </div>

        <div className="min-h-[220px] max-h-[340px] overflow-y-auto custom-scrollbar space-y-1.5 pt-1">
          {!query.trim() ? (
            <div className="h-44 flex flex-col items-center justify-center text-center p-4 text-slate-400 space-y-2">
              <Search className="w-7 h-7 stroke-[1.5]" />
              <p className="text-xs">Type a phone number or name to search for users.</p>
            </div>
          ) : isLoading ? (
            <div className="h-44 flex items-center justify-center text-slate-500 gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs">Searching users...</span>
            </div>
          ) : isError ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center flex items-center justify-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{typedError?.error?.message || 'Search failed. Please try again.'}</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="h-44 flex flex-col items-center justify-center text-center p-4 text-slate-400 space-y-1.5">
              <UserX className="w-7 h-7 text-slate-300" />
              <div>
                <h4 className="text-xs font-bold text-slate-700">No users found</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Try searching by another name or phone number.</p>
              </div>
            </div>
          ) : (
            filteredUsers.map((u) => (
              <button
                key={u._id}
                onClick={() => handleSelectUser(u._id)}
                disabled={isStarting}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} seed={u._id} size="md" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#00897b] transition-colors">
                      {u.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">{u.phone}</p>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-[#00897b] text-white font-bold group-hover:bg-[#00796b] transition-all">
                  <MessageSquarePlus className="w-4 h-4" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
