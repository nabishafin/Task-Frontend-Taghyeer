'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Send, Users, User, Sparkles, ExternalLink } from 'lucide-react';

export function Showcase() {
  const [activeTab, setActiveTab] = useState<'direct' | 'group'>('direct');

  return (
    <section id="showcase" className="py-12 md:py-16 bg-white text-slate-900 border-b border-slate-200/80 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#88E788]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#88E788]/20 border border-[#88E788]/50 text-slate-900 text-xs font-extrabold uppercase tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>High Fidelity Product Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Designed for clarity & high speed.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Switch between Direct and Group conversation modes to see the real UI layout.
          </p>

          <div className="inline-flex p-1 rounded bg-slate-100 border border-slate-200 gap-1 mt-4 shadow-2xs">
            <button
              onClick={() => setActiveTab('direct')}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${
                activeTab === 'direct'
                  ? 'bg-[#88E788] text-slate-950 shadow-2xs border border-[#6cd86c]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Direct Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('group')}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${
                activeTab === 'group'
                  ? 'bg-[#88E788] text-slate-950 shadow-2xs border border-[#6cd86c]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Group Chat</span>
            </button>
          </div>
        </div>

        {/* Integrated Showcase Device Frame - Flat Minimal Edges */}
        <div className="max-w-6xl mx-auto rounded bg-slate-900 p-1.5 sm:p-2 shadow-lg border border-slate-800">
          {/* Top Address Bar */}
          <div className="px-4 py-2 bg-slate-900 rounded-t-lg flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="px-3 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[10px] flex items-center gap-1.5">
              <span>https://vibewire.app/chat</span>
            </div>
            <Link href="/chat" className="text-xs text-[#88E788] hover:underline font-extrabold flex items-center gap-1">
              <span>Launch</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px] rounded-b-lg overflow-hidden bg-white">
            {/* Sidebar Mockup */}
            <div className="hidden md:block md:col-span-4 border-r border-slate-200 p-4 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Avatar name="Active Session" seed="user" size="sm" isOnline />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Authenticated User</h5>
                    <p className="text-[10px] text-[#2d8a2d] font-semibold">Online • Socket Synced</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${activeTab === 'direct' ? 'bg-[#88E788]/25 border-[#88E788] shadow-2xs' : 'bg-white border-slate-200'}`}>
                  <Avatar name="Alex Smith" seed="alex" size="sm" isOnline />
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold text-slate-900">Alex Smith</h6>
                    <p className="text-[10px] text-slate-500 truncate">+1 555-0192 • Direct Chat</p>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${activeTab === 'group' ? 'bg-[#88E788]/25 border-[#88E788] shadow-2xs' : 'bg-white border-slate-200'}`}>
                  <Avatar name="Dev Team Group" seed="group1" size="sm" isGroup />
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      Dev Team Group <Badge variant="accent" size="sm" className="bg-[#88E788]/30 text-slate-900 border-[#88E788]/60 text-[8px] py-0">Group</Badge>
                    </h6>
                    <p className="text-[10px] text-slate-500 truncate">3 Members • Admin Controls</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body Mockup */}
            <div className="md:col-span-8 p-6 flex flex-col justify-between bg-white">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={activeTab === 'direct' ? 'Alex Smith' : 'Dev Team Group'}
                    seed={activeTab === 'direct' ? 'alex' : 'group1'}
                    size="md"
                    isGroup={activeTab === 'group'}
                    isOnline={activeTab === 'direct'}
                  />
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-900">
                      {activeTab === 'direct' ? 'Alex Smith' : 'Dev Team Group'}
                    </h5>
                    <p className="text-[10px] text-slate-500">
                      {activeTab === 'direct' ? '+1 555-0192 • Direct 1-to-1' : '3 Members • Group Creator Admin'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 py-4 min-h-[220px]">
                {activeTab === 'direct' ? (
                  <>
                    <div className="flex flex-col items-start">
                      <div className="bg-slate-100 border border-slate-200 text-slate-800 px-4 py-2.5 rounded-lg text-xs">
                        Searching users by phone number and initiating a real-time 1-to-1 direct chat session.
                        <span className="block text-[9px] text-slate-400 mt-1">10:32 AM</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-[#88E788] border border-[#6cd86c] text-slate-900 font-semibold px-4 py-2.5 rounded-lg text-xs shadow-2xs">
                        Socket.io real-time streaming connected with zero UI flashes!
                        <span className="block text-[9px] text-slate-900 mt-1 opacity-80">10:33 AM</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-bold text-slate-500 ml-1 mb-0.5">Participant (+1 555-0144)</span>
                      <div className="bg-slate-100 border border-slate-200 text-slate-800 px-4 py-2.5 rounded-lg text-xs">
                        Group creation rule verified: Selected 2 participants (3 members total including creator).
                        <span className="block text-[9px] text-slate-400 mt-1">10:34 AM</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-[#88E788] border border-[#6cd86c] text-slate-900 font-semibold px-4 py-2.5 rounded-lg text-xs shadow-2xs">
                        Admin role promotion updated live via Socket.io broadcast! 🚀
                        <span className="block text-[9px] text-slate-900 mt-1 opacity-80">10:35 AM</span>
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
                <Link href="/chat" className="p-2.5 rounded-xl bg-[#88E788] hover:bg-[#73db73] text-slate-900 font-bold shadow-2xs transition-colors">
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

