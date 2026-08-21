'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetConversationsQuery } from '@/store/apiSlice';
import { setActiveConversationId, setIsSearchOpen, setIsGroupModalOpen } from '@/store/chatSlice';
import { ConversationItem } from './ConversationItem';
import { ConversationSkeleton } from '@/components/ui/Skeleton';
import { Search, UserPlus, Users, MessageSquare, RefreshCw, AlertCircle } from 'lucide-react';

export function ConversationList() {
  const dispatch = useDispatch();
  const activeId = useSelector((state: RootState) => state.chat.activeConversationId);
  const unreadCounts = useSelector((state: RootState) => state.chat.unreadCounts);
  const drafts = useSelector((state: RootState) => state.chat.drafts);

  const [filter, setFilter] = useState<'all' | 'direct' | 'group'>('all');
  const [localSearch, setLocalSearch] = useState('');

  const { data, isLoading, isError, error, refetch } = useGetConversationsQuery();

  const conversations = data?.data || [];

  const filteredConversations = conversations.filter((c) => {
    // Type filter
    if (filter === 'direct' && c.type !== 'direct') return false;
    if (filter === 'group' && c.type !== 'group') return false;

    // Search query filter
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      if (c.type === 'group') {
        return c.name?.toLowerCase().includes(q);
      } else {
        return (
          c.participant?.name?.toLowerCase().includes(q) ||
          c.participant?.phone?.includes(q)
        );
      }
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-slate-950/40">
      {/* Search & Filter Header */}
      <div className="p-4 space-y-3 border-b border-slate-800/60">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800/80">
          {(['all', 'direct', 'group'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                filter === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'direct' ? 'Direct' : 'Groups'}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Items List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
        {isLoading ? (
          <>
            <ConversationSkeleton />
            <ConversationSkeleton />
            <ConversationSkeleton />
            <ConversationSkeleton />
          </>
        ) : isError ? (
          <div className="p-6 text-center space-y-3 text-rose-400">
            <AlertCircle className="w-8 h-8 mx-auto" />
            <p className="text-xs">
              {(error as any)?.data?.error?.message || 'Failed to load conversations.'}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-slate-200">No conversations yet</h4>
              <p className="text-xs text-slate-400 max-w-[220px]">
                Start a 1-to-1 chat or create a group conversation to begin messaging.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => dispatch(setIsSearchOpen(true))}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl transition-all shadow-md shadow-indigo-600/20"
              >
                <UserPlus className="w-4 h-4" /> Start Chat
              </button>
              <button
                onClick={() => dispatch(setIsGroupModalOpen(true))}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl border border-slate-700 transition-all"
              >
                <Users className="w-4 h-4" /> Create Group
              </button>
            </div>
          </div>
        ) : (
          filteredConversations.map((c) => (
            <ConversationItem
              key={c._id}
              conversation={c}
              isActive={c._id === activeId}
              unreadCount={unreadCounts[c._id] || 0}
              draftText={drafts[c._id]}
              onClick={() => dispatch(setActiveConversationId(c._id))}
            />
          ))
        )}
      </div>
    </div>
  );
}
