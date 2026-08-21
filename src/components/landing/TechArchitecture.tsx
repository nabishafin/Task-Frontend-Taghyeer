'use client';

import React, { useState } from 'react';
import { Cpu, Zap, Database, ShieldCheck, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';

const ARCH_STEPS = [
  {
    id: 'socket',
    title: 'Socket.io Bidirectional Stream',
    badge: 'WebSocket Protocol',
    icon: Zap,
    desc: 'Establishes persistent full-duplex WebSocket connections to backend (https://frontend-task-chatapp.onrender.com) with automatic HTTP long-polling fallback.',
    metrics: '< 10ms Latency',
    codeSnippet: `// Singleton Socket Service Connection
socketService.connect(userToken);
socket.on('message:new', (payload) => {
  dispatch(apiSlice.util.updateQueryData('getMessages', convId, draft => {
    draft.messages.push(payload);
  }));
});`,
  },
  {
    id: 'rtk',
    title: 'RTK Query Cache Hydration',
    badge: 'State Management',
    icon: Database,
    desc: 'Utilizes Redux Toolkit Query with onCacheEntryAdded streaming listeners to update cached message streams in real-time without trigger page re-renders.',
    metrics: '0ms Page Re-render',
    codeSnippet: `// RTK Query Streaming Listener
async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
  const socket = socketService.getSocket();
  socket.on('message:new', (msg) => {
    updateCachedData((draft) => { draft.push(msg); });
  });
}`,
  },
  {
    id: 'draft',
    title: 'Per-Conversation Draft Preservation',
    badge: 'Redux Memory State',
    icon: Cpu,
    desc: 'Automatically records unsent input text indexed by conversation ID in chatSlice state. Never lose an unsent message when switching rooms.',
    metrics: '100% Zero Draft Loss',
    codeSnippet: `// chatSlice Draft Reducer
setDraft(state, action: PayloadAction<{ conversationId: string; text: string }>) {
  const { conversationId, text } = action.payload;
  state.drafts[conversationId] = text;
}`,
  },
  {
    id: 'validation',
    title: 'Strict Group Validation Engine',
    badge: 'Backend Rules',
    icon: ShieldCheck,
    desc: 'Enforces group chat integrity (Creator + Participants >= 3). Disables submit triggers until valid selection criteria are satisfied.',
    metrics: 'Group Size >= 3 Members',
    codeSnippet: `// Group Creation Rule
const isGroupValid = selectedUserIds.length >= 2;
if (!isGroupValid) {
  showError('Selecting at least 2 members is required for groups');
}`,
  },
];

export function TechArchitecture() {
  const [activeTab, setActiveTab] = useState(0);
  const activeStep = ARCH_STEPS[activeTab];
  const IconComponent = activeStep.icon;

  return (
    <section id="architecture" className="py-12 md:py-16 bg-slate-900 text-slate-100 border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#88E788]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#88E788]/20 border border-[#88E788]/40 text-[#88E788] text-xs font-mono font-bold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Engineered for high-performance messaging.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Discover how Pulse combines Socket.io, Redux Toolkit Query cache invalidation, and strict state management to deliver instant chat.
          </p>
        </div>

        {/* Card-Free Split Pipeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 space-y-3">
            {ARCH_STEPS.map((step, idx) => {
              const isActive = activeTab === idx;
              const StepIcon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3.5 cursor-pointer ${
                    isActive
                      ? 'bg-slate-800/90 border-l-4 border-[#88E788] text-white shadow-lg'
                      : 'bg-transparent border-l-2 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold ${
                      isActive ? 'bg-[#88E788] text-slate-900' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <StepIcon className="w-4 h-4" />
                  </div>

                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#88E788] uppercase tracking-wider">
                        {step.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{step.metrics}</span>
                    </div>
                    <h3 className="text-xs font-extrabold text-white truncate">{step.title}</h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Code Architecture Display */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#88E788]/20 border border-[#88E788]/50 flex items-center justify-center text-[#88E788]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">{activeStep.title}</h4>
                    <span className="text-[10px] font-mono text-[#88E788]">{activeStep.badge}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                  {activeStep.metrics}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStep.desc}
              </p>

              {/* Code Snippet Box */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#88E788]" /> Implementation Architecture
                  </span>
                  <span>TypeScript</span>
                </div>
                <pre className="text-[11px] leading-relaxed text-[#88E788]">
                  <code>{activeStep.codeSnippet}</code>
                </pre>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-2">
                <CheckCircle2 className="w-4 h-4 text-[#88E788]" />
                <span>Verified in production build • Next.js 16 App Router</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
