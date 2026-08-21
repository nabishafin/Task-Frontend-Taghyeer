'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetConversationsQuery } from '@/redux/apiSlice';
import { setActiveConversationId, setIsSearchOpen, setIsGroupModalOpen } from '@/redux/chatSlice';
import { ConversationItem } from './ConversationItem';
import { ConversationSkeleton } from '@/components/ui/Skeleton';
import { ApiError } from '@/types/chat';
import { Search, UserPlus, Users, MessageSquare, RefreshCw, AlertCircle } from 'lucide-react';

export function ConversationList() {
  const dispatch = useDispatch();
  const activeId = useSelector((state: RootState) => state.chat.activeConversationId);
  const unreadCounts = useSelector((state: RootState) => state.chat.unreadCounts);
  const drafts = useSelector((state: RootState) => state.chat.drafts);

  const [filter, setFilter] = useState<'all' | 'direct' | 'group'>('all');
  const [localSearch, setLocalSearch] = useState('');

  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isLoading, isError, error, refetch } = useGetConversationsQuery(undefined, {
    skip: !token,
  });

  const conversations = data?.data || [];

  const filteredConversations = conversations.filter((c) => {
    if (filter === 'direct' && c.type !== 'direct') return false;
    if (filter === 'group' && c.type !== 'group') return false;

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

  const typedError = error && 'data' in error ? (error.data as ApiError) : null;

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <div className="p-3 space-y-2 border-b border-slate-200 bg-white">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#88E788]"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
          {(['all', 'direct', 'group'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 py-1 text-[11px] font-bold rounded-md capitalize transition-all ${
                filter === tab
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'direct' ? 'Direct' : 'Groups'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {isLoading ? (
          <>
            <ConversationSkeleton />
            <ConversationSkeleton />
            <ConversationSkeleton />
          </>
        ) : isError ? (
          <div className="p-6 text-center space-y-2 text-rose-600">
            <AlertCircle className="w-6 h-6 mx-auto" />
            <p className="text-xs">
              {typedError?.error?.message || 'Failed to load conversations.'}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 px-3 py-1 rounded-lg border border-slate-200 transition-colors shadow-2xs"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-800">No conversations yet</h4>
              <p className="text-[11px] text-slate-500 max-w-[200px]">
                Start a chat or create a group conversation to begin.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => dispatch(setIsSearchOpen(true))}
                className="inline-flex items-center gap-1 text-xs font-bold bg-[#88E788] hover:bg-[#73db73] text-slate-900 px-3 py-1.5 rounded-lg transition-all shadow-2xs"
              >
                <UserPlus className="w-3.5 h-3.5" /> Start Chat
              </button>
              <button
                onClick={() => dispatch(setIsGroupModalOpen(true))}
                className="inline-flex items-center gap-1 text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-all shadow-2xs"
              >
                <Users className="w-3.5 h-3.5" /> Create Group
              </button>
            </div>
          </div>
        ) : (
          filteredConversations.map((c, index) => (
            <ConversationItem
              key={c._id || `conv-${index}`}
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
