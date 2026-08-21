'use client';

import React from 'react';
import { Conversation } from '@/types/chat';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { formatConversationTime } from '@/utils/formatters';
import { cn } from '@/utils/cn';
import { Users } from 'lucide-react';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  unreadCount?: number;
  draftText?: string;
  onClick: () => void;
}

export function ConversationItem({
  conversation,
  isActive,
  unreadCount = 0,
  draftText,
  onClick,
}: ConversationItemProps) {
  const isGroup = conversation.type === 'group';

  const displayName = isGroup
    ? conversation.name || 'Group Conversation'
    : conversation.participant?.name || 'User';

  const seed = isGroup ? conversation._id : conversation.participant?._id;

  const lastMsg = conversation.lastMessage;
  const lastMsgText = draftText
    ? `Draft: ${draftText}`
    : lastMsg?.text || 'No messages yet';

  const lastMsgSender =
    isGroup && lastMsg?.sender
      ? typeof lastMsg.sender === 'object'
        ? lastMsg.sender.name.split(' ')[0]
        : 'Member'
      : null;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-150 border',
        isActive
          ? 'bg-indigo-600/15 border-indigo-500/30 text-white shadow-md'
          : 'bg-slate-900/40 border-transparent hover:bg-slate-800/60 hover:border-slate-800 text-slate-300'
      )}
    >
      <Avatar
        name={displayName}
        seed={seed}
        size="md"
        isGroup={isGroup}
      />

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-semibold truncate text-slate-100 flex items-center gap-1.5">
            <span className="truncate">{displayName}</span>
            {isGroup ? (
              <Badge variant="accent" size="sm" className="shrink-0">
                <Users className="w-2.5 h-2.5 mr-0.5" /> Group
              </Badge>
            ) : null}
          </h3>
          {conversation.updatedAt && (
            <span className="text-[11px] text-slate-400 shrink-0 ml-2">
              {formatConversationTime(conversation.updatedAt)}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p
            className={cn(
              'text-xs truncate max-w-[180px] sm:max-w-[200px]',
              draftText ? 'text-amber-400 font-medium italic' : unreadCount > 0 ? 'text-slate-100 font-semibold' : 'text-slate-400'
            )}
          >
            {lastMsgSender && !draftText ? `${lastMsgSender}: ${lastMsgText}` : lastMsgText}
          </p>

          {unreadCount > 0 && (
            <span className="shrink-0 ml-2 bg-indigo-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm shadow-indigo-500/50">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
