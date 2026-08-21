'use client';

import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (userText: string) => {
    if (!userText.trim() || isTyping) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate automated response
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

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <section id="interactive" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Sandbox</span>
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Try Pulse right here in your browser.
          </p>
          <p className="text-sm text-slate-400">
            Click a question prompt or type your message below to experience simulated instant replies.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
          {/* Preset Prompts */}
          <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-800">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs font-medium text-indigo-300 bg-indigo-600/15 hover:bg-indigo-600/30 border border-indigo-500/30 px-3 py-1.5 rounded-xl transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Window */}
          <div className="h-64 overflow-y-auto custom-scrollbar space-y-3 p-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-xs shrink-0 shadow-md">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="block text-[9px] text-right mt-1 opacity-70">{m.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
                <span>Pulse Bot is typing...</span>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 pt-3 border-t border-slate-800"
          >
            <input
              type="text"
              placeholder="Ask something about Pulse..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-50 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
