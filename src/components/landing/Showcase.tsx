'use client';

import React, { useState } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Send } from 'lucide-react';

export function Showcase() {
  const [activeTab, setActiveTab] = useState<'direct' | 'group'>('direct');

  return (
    <section id="showcase" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#2d8a2d]">
            Product Interface
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Clean & intuitive messaging experience.
          </p>

          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 gap-1 mt-3">
            <button
              onClick={() => setActiveTab('direct')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'direct'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Direct Chat
            </button>
            <button
              onClick={() => setActiveTab('group')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'group'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Group Chat
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-lg overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            </div>
            <div className="px-3 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-500 font-mono">
              https://pulse-chat.app/chat
            </div>
            <div className="w-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
            <div className="hidden md:block md:col-span-4 border-r border-slate-200 p-3 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Avatar name="Ada Lovelace" seed="ada" size="sm" isOnline />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Ada Lovelace</h5>
                    <p className="text-[10px] text-[#2d8a2d] font-semibold">Online</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${activeTab === 'direct' ? 'bg-[#88E788]/25 border-[#88E788]' : 'bg-white border-slate-200'}`}>
                  <Avatar name="Alan Turing" seed="alan" size="sm" isOnline />
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold text-slate-900">Alan Turing</h6>
                    <p className="text-[10px] text-slate-500 truncate">Let’s run the test suite!</p>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${activeTab === 'group' ? 'bg-[#88E788]/25 border-[#88E788]' : 'bg-white border-slate-200'}`}>
                  <Avatar name="Pioneers Team" seed="pioneers" size="sm" isGroup />
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      Pioneers Team <Badge variant="accent" size="sm">Group</Badge>
                    </h6>
                    <p className="text-[10px] text-slate-500 truncate">Grace: Sprint meeting at 3 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 p-5 flex flex-col justify-between bg-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
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

              <div className="space-y-2.5 py-4">
                {activeTab === 'direct' ? (
                  <>
                    <div className="flex flex-col items-start">
                      <div className="bg-slate-100 border border-slate-200 text-slate-900 px-3.5 py-2 rounded-xl rounded-bl-xs text-xs">
                        Hey Ada, did you check the real-time websocket endpoint?
                        <span className="block text-[9px] text-slate-400 mt-0.5">10:32 AM</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-[#88E788] border border-[#6cd86c] text-slate-900 px-3.5 py-2 rounded-xl rounded-br-xs text-xs font-medium">
                        Yes! Socket.io events stream instantly with zero latency.
                        <span className="block text-[9px] text-slate-800 mt-0.5">10:33 AM</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-semibold text-slate-500 ml-1">Grace Hopper</span>
                      <div className="bg-slate-100 border border-slate-200 text-slate-900 px-3.5 py-2 rounded-xl rounded-bl-xs text-xs">
                        Team, the group management feature is working seamlessly!
                        <span className="block text-[9px] text-slate-400 mt-0.5">10:34 AM</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-[#88E788] border border-[#6cd86c] text-slate-900 px-3.5 py-2 rounded-xl rounded-br-xs text-xs font-medium">
                        Promoted Alan to admin as well! 🚀
                        <span className="block text-[9px] text-slate-800 mt-0.5">10:35 AM</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  readOnly
                  value="Type a message..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-400 focus:outline-none"
                />
                <button className="p-1.5 rounded-xl bg-[#88E788] text-slate-900 font-bold">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
