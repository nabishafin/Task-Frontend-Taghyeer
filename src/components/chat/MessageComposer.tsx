'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setDraft, clearDraft } from '@/store/chatSlice';
import { useSendMessageMutation } from '@/store/apiSlice';
import { Send, Loader2, AlertCircle } from 'lucide-react';

export function MessageComposer() {
  const dispatch = useDispatch();
  const activeId = useSelector((state: RootState) => state.chat.activeConversationId);
  const drafts = useSelector((state: RootState) => state.chat.drafts);

  const [text, setText] = useState('');
  const [sendError, setSendError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  // Restore draft when active conversation changes
  useEffect(() => {
    if (activeId && drafts[activeId]) {
      setText(drafts[activeId]);
    } else {
      setText('');
    }
    setSendError(null);
  }, [activeId, drafts]);

  // Update draft in Redux as user types
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    if (activeId) {
      dispatch(setDraft({ conversationId: activeId, text: val }));
    }
  };

  const handleSend = async () => {
    if (!activeId) return;
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setSendError(null);

    try {
      await sendMessage({ conversationId: activeId, text: trimmed }).unwrap();
      setText('');
      dispatch(clearDraft(activeId));
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (err: any) {
      setSendError(
        err?.data?.error?.message || 'Failed to send message. Click send to try again.'
      );
      // Keep user's text in composer so it is NOT lost on failure!
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea height
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }, [text]);

  if (!activeId) return null;

  const canSend = Boolean(text.trim()) && !isLoading;

  return (
    <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-900/80 backdrop-blur-md shrink-0 space-y-2">
      {sendError && (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{sendError}</span>
          </div>
          <button
            onClick={handleSend}
            className="text-[11px] font-bold text-rose-400 hover:text-white underline ml-2"
          >
            Retry
          </button>
        </div>
      )}

      <div className="flex items-end gap-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/40 focus-within:border-indigo-500/60 transition-all">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Write a message... (Shift + Enter for new line)"
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none max-h-32 custom-scrollbar"
        />

        <button
          onClick={handleSend}
          disabled={!canSend}
          title="Send message (Enter)"
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-600/20 shrink-0"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
