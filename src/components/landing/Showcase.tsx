'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Send, Users, User, Sparkles, ExternalLink } from 'lucide-react';

export function Showcase() {
  const [activeTab, setActiveTab] = useState<'direct' | 'group'>('direct');

  return (
    <section id="showcase" className="py-24 bg-white text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00897b]/15 border border-[#00897b]/40 text-[#00897b] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00897b]" />
            <span>High Fidelity Product Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clean & intuitive chat interface.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Switch between Direct and Group conversation modes to see the real UI layout.
          </p>

          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 gap-1.5 mt-4">
            <button
              onClick={() => setActiveTab('direct')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'direct'
                  ? 'bg-[#00897b] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Direct Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('group')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'group'
                  ? 'bg-[#00897b] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Group Chat</span>
            </button>
          </div>
        </div>

        {/* Mockup Frame */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Address Bar */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="w-3 h-3 rounded-full bg-slate-300" />
            </div>
            <div className="px-4 py-1 rounded-lg bg-white border border-slate-200 text-slate-500 font-mono text-[11px] flex items-center gap-2">
              <span>https://pulse-chat.app/chat</span>
            </div>
            <Link href="/chat" className="text-xs text-[#00897b] hover:underline font-bold flex items-center gap-1">
              <span>Launch</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
            {/* Sidebar Mockup */}
            <div className="hidden md:block md:col-span-4 border-r border-slate-200 p-4 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Avatar name="Ada Lovelace" seed="ada" size="sm" isOnline />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Ada Lovelace</h5>
                    <p className="text-[10px] text-[#00897b] font-semibold">Online</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${activeTab === 'direct' ? 'bg-[#00897b]/15 border-[#00897b] shadow-2xs' : 'bg-white border-slate-200'}`}>
                  <Avatar name="Alan Turing" seed="alan" size="sm" isOnline />
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold text-slate-900">Alan Turing</h6>
                    <p className="text-[10px] text-slate-500 truncate">Let’s run the test suite!</p>
                  </div>
                </div>

                <div className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${activeTab === 'group' ? 'bg-[#00897b]/15 border-[#00897b] shadow-2xs' : 'bg-white border-slate-200'}`}>
                  <Avatar name="Pioneers Team" seed="pioneers" size="sm" isGroup />
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      Pioneers Team <Badge variant="accent" size="sm" className="bg-[#00897b]/20 text-[#00897b] border-[#00897b]/40 text-[8px] py-0">Group</Badge>
                    </h6>
                    <p className="text-[10px] text-slate-500 truncate">Grace: Sprint meeting at 3 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body Mockup */}
            <div className="md:col-span-8 p-5 flex flex-col justify-between bg-white">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={activeTab === 'direct' ? 'Alan Turing' : 'Pioneers Team'}
                    seed={activeTab === 'direct' ? 'alan' : 'pioneers'}
                    size="md"
                    isGroup={activeTab === 'group'}
                    isOnline={activeTab === 'direct'}
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {activeTab === 'direct' ? 'Alan Turing' : 'Pioneers Team'}
                    </h5>
                    <p className="text-[10px] text-slate-500">
                      {activeTab === 'direct' ? '+1 555-222-2222' : '3 Members • Admin: Ada Lovelace'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 py-4 min-h-[220px]">
                {activeTab === 'direct' ? (
                  <>
                    <div className="flex flex-col items-start">
                      <div className="bg-slate-100 border border-slate-200 text-slate-800 px-4 py-2.5 rounded-2xl rounded-bl-xs text-xs">
                        Hey Ada, did you check the real-time websocket endpoint?
                        <span className="block text-[9px] text-slate-400 mt-1">10:32 AM</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-[#00897b] text-white font-medium px-4 py-2.5 rounded-2xl rounded-br-xs text-xs shadow-2xs">
                        Yes! Socket.io events stream instantly with zero latency.
                        <span className="block text-[9px] text-white mt-1 opacity-80">10:33 AM</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-bold text-slate-500 ml-1 mb-0.5">Grace Hopper</span>
                      <div className="bg-slate-100 border border-slate-200 text-slate-800 px-4 py-2.5 rounded-2xl rounded-bl-xs text-xs">
                        Team, the group management feature is working seamlessly!
                        <span className="block text-[9px] text-slate-400 mt-1">10:34 AM</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-[#00897b] text-white font-medium px-4 py-2.5 rounded-2xl rounded-br-xs text-xs shadow-2xs">
                        Promoted Alan to admin as well! 🚀
                        <span className="block text-[9px] text-white mt-1 opacity-80">10:35 AM</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
                <input
                  type="text"
                  readOnly
                  value="Write a message..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-400 focus:outline-none"
                />
                <Link href="/chat" className="p-2.5 rounded-xl bg-[#00897b] hover:bg-[#00796b] text-white font-bold shadow-2xs transition-colors">
                  <Send className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
