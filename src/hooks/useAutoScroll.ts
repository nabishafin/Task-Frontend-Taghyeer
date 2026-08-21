'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from '@/types/chat';

interface UseAutoScrollOptions {
  messages: Message[];
  threshold?: number;
}

export function useAutoScroll({ messages, threshold = 120 }: UseAutoScrollOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [unreadNewCount, setUnreadNewCount] = useState(0);
  const prevMessagesLengthRef = useRef(messages.length);

  const checkIfNearBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return true;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distanceToBottom <= threshold;
  }, [threshold]);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
    setUnreadNewCount(0);
    setIsNearBottom(true);
  }, []);

  const handleScroll = useCallback(() => {
    const near = checkIfNearBottom();
    setIsNearBottom(near);
    if (near) {
      setUnreadNewCount(0);
    }
  }, [checkIfNearBottom]);

  useEffect(() => {
    const prevLen = prevMessagesLengthRef.current;
    const currentLen = messages.length;
    prevMessagesLengthRef.current = currentLen;

    if (currentLen === 0) return;

    if (currentLen > prevLen) {
      if (isNearBottom) {
        scrollToBottom(true);
      } else {
        setUnreadNewCount((prev) => prev + (currentLen - prevLen));
      }
    }
  }, [messages, isNearBottom, scrollToBottom]);

  return {
    containerRef,
    isNearBottom,
    unreadNewCount,
    scrollToBottom,
    handleScroll,
  };
}
