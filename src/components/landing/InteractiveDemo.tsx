'use client';

import React, { useState } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';

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
      text: 'Hi there! 👋 I am the Pulse Assistant. Ask me anything about Pulse chat app features!',
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
        replyText = 'Absolutly! If you type a message and switch conversations before sending, your text draft is preserved automatically!';
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
    }, 900);
  };

  return (
    <section id="interactive" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#88E788]/30 border border-[#88E788] text-slate-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Interactive Live Sandbox</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Try Pulse right here in your browser.
          </p>
          <p className="text-xs text-slate-500">
            Click a question prompt or type your message below to experience simulated instant replies.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-[#88E788]/30 border border-slate-200 px-3 py-1 rounded-lg transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="h-56 overflow-y-auto custom-scrollbar space-y-2.5 p-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#88E788] text-slate-900 flex items-center justify-center text-xs shrink-0 font-bold shadow-2xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`px-3 py-2 rounded-xl text-xs max-w-[80%] leading-relaxed border ${
                    m.sender === 'user'
                      ? 'bg-[#88E788] border-[#6cd86c] text-slate-900 font-medium rounded-br-xs'
                      : 'bg-slate-100 border-slate-200 text-slate-900 rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="block text-[9px] text-right mt-0.5 opacity-70">{m.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-500 text-xs pl-1">
                <Bot className="w-3.5 h-3.5 text-[#2d8a2d] animate-spin" />
                <span>Pulse Bot is typing...</span>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 pt-2 border-t border-slate-100"
          >
            <input
              type="text"
              placeholder="Ask something about Pulse..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#88E788]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl bg-[#88E788] text-slate-900 font-bold disabled:opacity-50 hover:bg-[#73db73] transition-all shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
