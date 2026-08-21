'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Bot, Sparkles, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const PRESET_QUESTIONS = [
  'How fast is real-time messaging?',
  'Can I create group chats with admins?',
  'Does Pulse preserve unsent drafts?',
];

export function InteractiveDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi there! 👋 I am the Pulse Interactive Assistant. Ask me anything about Pulse features or try a preset question below!',
      time: '10:00 AM',
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (userText: string) => {
    if (!userText.trim() || isTyping) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${messages.length + 1}-${time}`,
      sender: 'user',
      text: userText,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'Pulse features real-time Socket.io updates, instant user search, and group admin controls!';

      const lower = userText.toLowerCase();
      if (lower.includes('fast') || lower.includes('speed')) {
        replyText = 'Pulse uses Socket.io WebSocket connections so messages arrive instantly with zero delay! ⚡';
      } else if (lower.includes('group') || lower.includes('admin')) {
        replyText = 'Yes! You can select multiple participants, give your group a name, promote members to admin, and manage participants effortlessly.';
      } else if (lower.includes('draft')) {
        replyText = 'Absolutely! If you type a message and switch conversations before sending, your text draft is preserved automatically per conversation!';
      }

      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${messages.length + 2}-${botTime}`,
          sender: 'bot',
          text: replyText,
          time: botTime,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <section id="interactive" className="py-24 bg-slate-50/80 text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle ambient lighting behind sandbox */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#88E788]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#88E788]/20 border border-[#88E788]/50 text-slate-900 text-xs font-extrabold uppercase tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Interactive Live Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Try Pulse right here in your browser.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Click a prompt or type your message below to experience simulated instant replies.
          </p>
        </div>

        {/* Integrated Sandbox Display */}
        <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/10 space-y-5">
          <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs font-bold text-slate-800 bg-slate-100 hover:bg-[#88E788] hover:text-slate-900 px-3.5 py-2 rounded-xl transition-all shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="h-64 overflow-y-auto custom-scrollbar space-y-3 p-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-[#88E788] text-slate-900 flex items-center justify-center text-xs shrink-0 font-bold shadow-2xs">
                    <Bot className="w-4 h-4 text-[#2d8a2d]" />
                  </div>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#88E788] text-slate-900 font-semibold rounded-br-xs shadow-2xs'
                      : 'bg-slate-100 text-slate-900 rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className={`block text-[9px] text-right mt-1 opacity-70 ${m.sender === 'user' ? 'text-slate-900' : 'text-slate-500'}`}>{m.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs pl-1">
                <Bot className="w-4 h-4 text-[#2d8a2d] animate-spin" />
                <span className="font-semibold">Pulse Assistant is typing...</span>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 pt-4 border-t border-slate-100"
          >
            <input
              type="text"
              placeholder="Ask something about Pulse..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#88E788] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-xl bg-[#88E788] hover:bg-[#73db73] text-slate-900 font-extrabold disabled:opacity-40 transition-all shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2d8a2d] hover:text-slate-900 group transition-colors"
            >
              <span>Ready for the real app? Launch Full Pulse Chat</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

