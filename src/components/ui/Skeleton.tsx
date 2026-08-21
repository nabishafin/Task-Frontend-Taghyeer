'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-slate-200/80 border border-slate-200/40',
        className
      )}
    />
  );
}

export function ConversationSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent">
      <Skeleton className="w-12 h-12 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-12 h-3" />
        </div>
        <Skeleton className="w-3/4 h-3" />
      </div>
    </div>
  );
}

export function MessageSkeleton({ isSelf = false }: { isSelf?: boolean }) {
  return (
    <div className={cn('flex items-end gap-2 my-3', isSelf ? 'justify-end' : 'justify-start')}>
      {!isSelf && <Skeleton className="w-8 h-8 rounded-full shrink-0" />}
      <div className="space-y-1 max-w-[70%]">
        <Skeleton className={cn('h-10 rounded-2xl', isSelf ? 'w-48 rounded-br-xs' : 'w-56 rounded-bl-xs')} />
      </div>
    </div>
  );
}
