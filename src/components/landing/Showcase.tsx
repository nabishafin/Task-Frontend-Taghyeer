'use client';

import React, { useState } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { MessageSquare, Users, Check, ShieldCheck, Send } from 'lucide-react';

export function Showcase() {
  const [activeTab, setActiveTab] = useState<'direct' | 'group'>('direct');

  return (
    <section id="showcase" className="py-24 bg-slate-950/80 relative border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Product Experience
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed to feel like home.
          </p>
          <p className="text-sm sm:text-base text-slate-400">
            Clean, distraction-free desktop & mobile chat interface built for daily productivity.
          </p>

          {/* Interactive Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-2 mt-4">
            <button
              onClick={() => setActiveTab('direct')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'direct'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Direct Chat
            </button>
            <button
              onClick={() => setActiveTab('group')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'group'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Group Chat
            </button>
          </div>
        </div>

        {/* Browser Mockup Window */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-2xl">
          {/* Top Window Bar */}
          <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="px-4 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
              https://pulse-chat.app/chat
            </div>
            <div className="w-12" />
          </div>

          {/* Chat Mockup Inside */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
            {/* Sidebar Mock */}
            <div className="hidden md:block md:col-span-4 border-r border-slate-800/80 p-4 bg-slate-950/40 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Avatar name="Ada Lovelace" seed="ada" size="sm" isOnline />
                  <div>
                    <h5 className="text-xs font-bold text-slate-100">Ada Lovelace</h5>
                    <p className="text-[10px] text-emerald-400 font-medium">Online</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className={`p-3 rounded-xl border flex items-center gap-3 ${activeTab === 'direct' ? 'bg-indigo-600/20 border-indigo-500/30' : 'bg-slate-900/60 border-slate-800/60'}`}>
                  <Avatar name="Alan Turing" seed="alan" size="sm" isOnline />
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold text-slate-100">Alan Turing</h6>
                    <p className="text-[11px] text-slate-400 truncate">Let’s run the test suite!</p>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex items-center gap-3 ${activeTab === 'group' ? 'bg-indigo-600/20 border-indigo-500/30' : 'bg-slate-900/60 border-slate-800/60'}`}>
                  <Avatar name="Pioneers Team" seed="pioneers" size="sm" isGroup />
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold text-slate-100 flex items-center gap-1">
                      Pioneers Team <Badge variant="accent" size="sm">Group</Badge>
                    </h6>
                    <p className="text-[11px] text-slate-400 truncate">Grace: Sprint meeting at 3 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body Mock */}
            <div className="md:col-span-8 p-6 flex flex-col justify-between bg-slate-950/20">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={activeTab === 'direct' ? 'Alan Turing' : 'Pioneers Team'}
                    seed={activeTab === 'direct' ? 'alan' : 'pioneers'}
                    size="md"
                    isGroup={activeTab === 'group'}
                    isOnline={activeTab === 'direct'}
                  />
                  <div>
                    <h5 className="text-sm font-bold text-slate-100">
                      {activeTab === 'direct' ? 'Alan Turing' : 'Pioneers Team'}
                    </h5>
                    <p className="text-xs text-slate-400">
                      {activeTab === 'direct' ? '+1 555-222-2222' : '3 Members • Admin: Ada Lovelace'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message bubbles */}
              <div className="space-y-3 py-6">
                {activeTab === 'direct' ? (
                  <>
                    <div className="flex flex-col items-start">
                      <div className="bg-slate-900 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-xs text-xs">
                        Hey Ada, did you check the real-time websocket endpoint?
                        <span className="block text-[9px] text-slate-500 mt-1">10:32 AM</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-indigo-600 text-white px-4 py-2.5 rounded-2xl rounded-br-xs text-xs">
                        Yes! Socket.io events stream instantly with zero latency.
                        <span className="block text-[9px] text-indigo-200 mt-1">10:33 AM</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-semibold text-slate-400 ml-1">Grace Hopper</span>
                      <div className="bg-slate-900 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-xs text-xs">
                        Team, the group management feature is working seamlessly!
                        <span className="block text-[9px] text-slate-500 mt-1">10:34 AM</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-indigo-600 text-white px-4 py-2.5 rounded-2xl rounded-br-xs text-xs">
                        Promoted Alan to admin as well! 🚀
                        <span className="block text-[9px] text-indigo-200 mt-1">10:35 AM</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Composer */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                <input
                  type="text"
                  readOnly
                  value="Type a message..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-500 focus:outline-none"
                />
                <button className="p-2 rounded-xl bg-indigo-600 text-white">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
