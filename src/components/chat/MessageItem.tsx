'use client';

import React from 'react';
import { Message } from '@/types/chat';
import { Avatar } from '@/components/ui/Avatar';
import { formatMessageTime } from '@/utils/formatters';
import { cn } from '@/utils/cn';

interface MessageItemProps {
  message: Message;
  isSelf: boolean;
  isGroup?: boolean;
  showSenderHeader?: boolean;
}

export function MessageItem({
  message,
  isSelf,
  isGroup,
  showSenderHeader = true,
}: MessageItemProps) {
  const senderObj = typeof message.sender === 'object' ? message.sender : null;
  const senderName = senderObj?.name || 'User';
  const senderSeed = senderObj?._id || (typeof message.sender === 'string' ? message.sender : undefined);

  return (
    <div
      className={cn(
        'flex items-end gap-2 my-1 transition-all group',
        isSelf ? 'justify-end' : 'justify-start',
        showSenderHeader ? 'mt-3' : 'mt-0.5'
      )}
    >
      {/* Sender Avatar for incoming messages */}
      {!isSelf && (
        <div className="shrink-0 w-8 h-8 flex items-center justify-center">
          {showSenderHeader ? (
            <Avatar name={senderName} seed={senderSeed} size="sm" className="w-7 h-7 text-[10px]" />
          ) : (
            <div className="w-7 h-7" />
          )}
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={cn(
          'flex flex-col max-w-[82%] sm:max-w-[70%]',
          isSelf ? 'items-end' : 'items-start'
        )}
      >
        {/* Sender Name in Group Chat */}
        {!isSelf && isGroup && showSenderHeader && (
          <span className="text-[11px] font-semibold text-slate-400 ml-1 mb-1">
            {senderName}
          </span>
        )}

        {/* Bubble Box */}
        <div
          className={cn(
            'px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-sm relative group',
            isSelf
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-br-xs'
              : 'bg-slate-900 border border-slate-800/90 text-slate-100 rounded-bl-xs'
          )}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>

          <div
            className={cn(
              'text-[10px] mt-1 font-medium tracking-tight text-right opacity-70',
              isSelf ? 'text-indigo-100' : 'text-slate-400'
            )}
          >
            {formatMessageTime(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
