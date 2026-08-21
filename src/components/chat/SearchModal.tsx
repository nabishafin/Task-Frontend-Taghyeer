'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setIsSearchOpen, setActiveConversationId } from '@/store/chatSlice';
import { useLazySearchUsersQuery, useStartDirectConversationMutation } from '@/store/apiSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
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
    } catch (err) {
      // Error handled
    }
  };

  const handleClose = () => {
    dispatch(setIsSearchOpen(false));
    setQuery('');
  };

  // Filter out current user from search results
  const filteredUsers = users?.filter((u) => u._id !== currentUser?._id) || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Start New Conversation"
      subtitle="Search users by name or phone number"
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Type name or phone (e.g. +15552222222 or Alan)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          {isLoading && (
            <Loader2 className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-indigo-400" />
          )}
        </div>

        {/* Results List */}
        <div className="min-h-[220px] max-h-[340px] overflow-y-auto custom-scrollbar space-y-2 pt-2">
          {!query.trim() ? (
            <div className="h-44 flex flex-col items-center justify-center text-center p-4 text-slate-500 space-y-2">
              <Search className="w-8 h-8 stroke-[1.5]" />
              <p className="text-xs">Type a phone number or name to search for users.</p>
            </div>
          ) : isLoading ? (
            <div className="h-44 flex items-center justify-center text-slate-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
              <span className="text-xs">Searching users...</span>
            </div>
          ) : isError ? (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{(error as any)?.data?.error?.message || 'Search failed. Please try again.'}</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="h-44 flex flex-col items-center justify-center text-center p-4 text-slate-400 space-y-2">
              <UserX className="w-8 h-8 text-slate-600" />
              <div>
                <h4 className="text-sm font-semibold text-slate-300">No users found</h4>
                <p className="text-xs text-slate-500 mt-0.5">Try searching by another name or phone number.</p>
              </div>
            </div>
          ) : (
            filteredUsers.map((u) => (
              <button
                key={u._id}
                onClick={() => handleSelectUser(u._id)}
                disabled={isStarting}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/60 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} seed={u._id} size="md" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {u.name}
                    </h4>
                    <p className="text-xs text-slate-400">{u.phone}</p>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
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
