'use client';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetMessagesQuery, useGetConversationsQuery } from '@/redux/apiSlice';
import { MessageItem } from './MessageItem';
import { SmartScrollButton } from './SmartScrollButton';
import { MessageSkeleton } from '@/components/ui/Skeleton';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { formatDateSeparator, isSameDay, isWithinMinutes } from '@/utils/formatters';
import { ApiError } from '@/types/chat';
import { MessageSquare, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export function MessageList() {
  const activeId = useSelector((state: RootState) => state.chat.activeConversationId);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const { data: convData } = useGetConversationsQuery();
  const currentConv = convData?.data.find((c) => c._id === activeId);
  const isGroup = currentConv?.type === 'group';

  const { data, isLoading, isError, error, refetch } = useGetMessagesQuery(
    { id: activeId || '' },
    { skip: !activeId }
  );

  const messages = useMemo(() => {
    const raw = data?.messages || [];
    return [...raw].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [data?.messages]);

  const {
    containerRef,
    isNearBottom,
    unreadNewCount,
    scrollToBottom,
    handleScroll,
  } = useAutoScroll({ messages });

  if (!activeId) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3 bg-slate-50/30">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#2d8a2d] shadow-2xs">
          <MessageSquare className="w-7 h-7" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-800">Select a conversation</h3>
          <p className="text-xs text-slate-500 max-w-xs">
            Choose a direct chat or group from the sidebar to view messages.
          </p>
        </div>
      </div>
    );
  }

  const typedError = error && 'data' in error ? (error.data as ApiError) : null;

  return (
    <div className="relative flex-1 flex flex-col h-full overflow-hidden bg-slate-50/40">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar space-y-1"
      >
        {isLoading ? (
          <div className="space-y-3">
            <MessageSkeleton isSelf={false} />
            <MessageSkeleton isSelf={true} />
            <MessageSkeleton isSelf={false} />
            <MessageSkeleton isSelf={true} />
          </div>
        ) : isError ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-rose-600">
            <AlertCircle className="w-8 h-8" />
            <p className="text-xs font-medium">
              {typedError?.error?.message || 'Failed to load messages.'}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-400">
            <div className="w-10 h-10 rounded-xl bg-[#00897b]/15 text-[#00897b] border border-[#00897b]/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-800">No messages yet</h4>
              <p className="text-xs text-slate-500">
                Send a message below to start the conversation.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const prevMsg = index > 0 ? messages[index - 1] : null;

            const showDateSeparator =
              !prevMsg || !isSameDay(prevMsg.createdAt, msg.createdAt);

            const getSenderId = (m: typeof msg) =>
              typeof m.sender === 'object' ? m.sender._id : m.sender;

            const isSameSender =
              prevMsg && getSenderId(prevMsg) === getSenderId(msg);

            const isCloseTime =
              prevMsg && isWithinMinutes(prevMsg.createdAt, msg.createdAt, 5);

            const showSenderHeader = !isSameSender || !isCloseTime || showDateSeparator;

            const isSelf = getSenderId(msg) === currentUser?._id;

            return (
              <React.Fragment key={msg._id || `msg-${index}-${msg.createdAt}`}>
                {showDateSeparator && (
                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-slate-200" />
                    <span className="px-3 text-[10px] font-bold tracking-wider uppercase text-slate-500 bg-white py-0.5 rounded-full border border-slate-200 shadow-2xs">
                      {formatDateSeparator(msg.createdAt)}
                    </span>
                    <div className="flex-1 border-t border-slate-200" />
                  </div>
                )}

                <MessageItem
                  message={msg}
                  isSelf={isSelf}
                  isGroup={isGroup}
                  showSenderHeader={showSenderHeader}
                />
              </React.Fragment>
            );
          })
        )}
      </div>

      <SmartScrollButton
        isVisible={!isNearBottom || unreadNewCount > 0}
        unreadCount={unreadNewCount}
        onClick={() => scrollToBottom(true)}
      />
    </div>
  );
}
