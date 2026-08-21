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
        'w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border',
        isActive
          ? 'bg-[#00897b]/15 border-[#00897b]/50 text-slate-900 font-semibold shadow-2xs'
          : 'bg-white border-transparent hover:bg-slate-100/80 text-slate-800'
      )}
    >
      <Avatar
        name={displayName}
        seed={seed}
        size="md"
        isGroup={isGroup}
      />

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <h3 className="text-xs font-bold truncate text-slate-900 flex items-center gap-1.5">
            <span className="truncate">{displayName}</span>
            {isGroup ? (
              <Badge variant="accent" size="sm" className="shrink-0 text-[9px] py-0 px-1">
                <Users className="w-2.5 h-2.5 mr-0.5" /> Group
              </Badge>
            ) : null}
          </h3>
          {conversation.updatedAt && (
            <span className="text-[10px] text-slate-400 shrink-0 ml-2">
              {formatConversationTime(conversation.updatedAt)}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p
            className={cn(
              'text-xs truncate max-w-[180px]',
              draftText ? 'text-amber-600 font-medium italic' : unreadCount > 0 ? 'text-slate-900 font-bold' : 'text-slate-500'
            )}
          >
            {lastMsgSender && !draftText ? `${lastMsgSender}: ${lastMsgText}` : lastMsgText}
          </p>

          {unreadCount > 0 && (
            <span className="shrink-0 ml-2 bg-[#00897b] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-[#00796b]">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
