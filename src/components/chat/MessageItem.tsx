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
      {!isSelf && (
        <div className="shrink-0 w-7 h-7 flex items-center justify-center">
          {showSenderHeader ? (
            <Avatar name={senderName} seed={senderSeed} size="sm" className="w-6 h-6 text-[10px]" />
          ) : (
            <div className="w-6 h-6" />
          )}
        </div>
      )}

      <div
        className={cn(
          'flex flex-col max-w-[82%] sm:max-w-[70%]',
          isSelf ? 'items-end' : 'items-start'
        )}
      >
        {!isSelf && isGroup && showSenderHeader && (
          <span className="text-[11px] font-semibold text-slate-500 ml-1 mb-0.5">
            {senderName}
          </span>
        )}

        <div
          className={cn(
            'px-3.5 py-2 rounded-2xl text-xs sm:text-sm leading-relaxed break-words shadow-2xs relative border',
            isSelf
              ? 'bg-[#88E788] border-[#6cd86c] text-slate-900 font-medium rounded-br-xs'
              : 'bg-slate-100 border-slate-200 text-slate-900 rounded-bl-xs'
          )}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>

          <div
            className={cn(
              'text-[9px] mt-1 font-semibold tracking-tight text-right opacity-70',
              isSelf ? 'text-slate-900' : 'text-slate-500'
            )}
          >
            {formatMessageTime(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
