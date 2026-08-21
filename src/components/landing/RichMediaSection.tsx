'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Sparkles,
  Heart,
  ThumbsUp,
  Flame,
  CheckCircle2,
  Maximize2,
  FileText,
  Play,
  Volume2,
  Share2,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function RichMediaSection() {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const [likes, setLikes] = useState({ heart: 8, fire: 5, thumbs: 12 });
  const [userReacted, setUserReacted] = useState<{ [key: string]: boolean }>({});

  const toggleReaction = (key: 'heart' | 'fire' | 'thumbs') => {
    setUserReacted((prev) => {
      const isReacted = !!prev[key];
      setLikes((curr) => ({
        ...curr,
        [key]: isReacted ? curr[key] - 1 : curr[key] + 1,
      }));
      return { ...prev, [key]: !isReacted };
    });
  };

  return (
    <section className="py-12 md:py-16 bg-white text-slate-900 border-b border-slate-200/80 relative">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#88E788]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#88E788]/20 border border-[#88E788]/50 text-slate-900 text-xs font-mono font-bold uppercase tracking-wider shadow-2xs">
            <ImageIcon className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Rich Media & Photo Sharing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Share moments, photos & design mockups instantly.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            VibeWire isn&apos;t just text—share high-resolution images, voice notes, and project mockups with zero compression delay.
          </p>
        </div>

        {/* Split Grid Layout: Interactive Chat Stream vs Features (50/50 Equal Width Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Live Rich Media Conversation Feed (50% Width) */}
          <div className="bg-slate-950 border border-slate-800 rounded p-4 sm:p-5 text-slate-100 shadow-lg space-y-4 flex flex-col justify-between">
            
            {/* Header Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Avatar name="Design & Product Team" seed="product" size="sm" isGroup />
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Design & Product Group</span>
                    <span className="text-[8px] font-mono bg-[#88E788]/20 text-[#88E788] px-1.5 py-0.5 rounded border border-[#88E788]/40">
                      MEDIA ACTIVE
                    </span>
                  </h4>
                  <p className="text-[9px] text-slate-400">4 Members Online • Live Socket Stream</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                HD Media Stream Active
              </div>
            </div>

            {/* Conversation Feed with Images & Voice Notes */}
            <div className="space-y-4 font-sans text-xs flex-1 flex flex-col justify-center">
              
              {/* Friend Message 1: Text + High-Res Image Preview */}
              <div className="flex items-start gap-3">
                <Avatar name="Alex Smith" seed="alex" size="sm" isOnline />
                <div className="space-y-2 max-w-[88%] sm:max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">Alex Smith</span>
                    <span className="text-[9px] text-slate-500 font-mono">10:45 AM</span>
                  </div>
                  
                  <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl space-y-2.5 shadow-lg">
                    <p className="text-slate-200 leading-relaxed">
                      Hey friends! Here is our team photo from today&apos;s live sprint collaboration meeting! 📸✨
                    </p>

                    {/* Image Attachment Thumbnail with Lightbox trigger */}
                    <div
                      onClick={() => setActiveImageModal('/images/group_collaboration.jpg')}
                      className="relative rounded-lg overflow-hidden border border-slate-700/80 group/img cursor-pointer bg-slate-950 aspect-video shadow-md"
                    >
                      <Image
                        src="/images/group_collaboration.jpg"
                        alt="Friends & Team Photo"
                        fill
                        className="object-cover transition-transform duration-300 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                          <Maximize2 className="w-3.5 h-3.5 text-[#88E788]" /> Click to View Full Photo
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-slate-300 border border-slate-700">
                        team_friends_photo.jpg • 603 KB
                      </div>
                    </div>

                    {/* Interactive Emoji Reactions */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => toggleReaction('heart')}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all ${
                          userReacted.heart
                            ? 'bg-rose-950/80 border-rose-500 text-rose-400 shadow-sm scale-105'
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                        <span>{likes.heart}</span>
                      </button>

                      <button
                        onClick={() => toggleReaction('fire')}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all ${
                          userReacted.fire
                            ? 'bg-amber-950/80 border-amber-500 text-amber-400 shadow-sm scale-105'
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{likes.fire}</span>
                      </button>

                      <button
                        onClick={() => toggleReaction('thumbs')}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all ${
                          userReacted.thumbs
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-sm scale-105'
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                        <span>{likes.thumbs}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Friend Message 2: Clean Text Reply */}
              <div className="flex items-start gap-3 pt-1">
                <Avatar name="Sarah Jenkins" seed="sarah" size="sm" isOnline />
                <div className="space-y-1 max-w-[88%] sm:max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">Sarah Jenkins</span>
                    <span className="text-[9px] text-slate-500 font-mono">10:46 AM</span>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-[#88E788] font-medium leading-relaxed">
                    Looks incredible! The high-res team photo and live stream came out super sharp! 🔥
                  </div>
                </div>
              </div>

              {/* Friend Message 3: Voice Note Waveform */}
              <div className="flex items-start gap-3 pt-1">
                <Avatar name="Michael Chen" seed="michael" size="sm" isOnline />
                <div className="space-y-1.5 max-w-[88%] sm:max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">Michael Chen</span>
                    <span className="text-[9px] text-slate-500 font-mono">10:47 AM</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg flex items-center gap-3">
                    <button className="w-8 h-8 rounded-full bg-[#88E788] text-slate-950 flex items-center justify-center shrink-0 font-bold hover:scale-105 transition-transform shadow-md">
                      <Play className="w-4 h-4 text-slate-950 fill-slate-950 ml-0.5" />
                    </button>

                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                        <span className="text-[#88E788] font-bold flex items-center gap-1">
                          <Volume2 className="w-3 h-3" /> Voice Memo
                        </span>
                        <span>0:28 / 0:45</span>
                      </div>
                      
                      {/* Waveform graphic */}
                      <div className="flex items-center gap-0.5 h-4 overflow-hidden">
                        {[40, 70, 30, 90, 60, 100, 45, 80, 55, 90, 75, 40, 85, 95, 60, 30, 70, 85, 40, 60].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`w-1 shrink-0 rounded-full ${i < 8 ? 'bg-[#88E788]' : 'bg-slate-700'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Key Feature Highlights (50% Width) */}
          <div className="flex flex-col justify-between space-y-4">
            
            <div className="space-y-3.5 flex-1 flex flex-col justify-center">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#88E788]/30 border border-[#88E788]/60 text-[#2d8a2d] flex items-center justify-center font-bold shrink-0">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900">High-Res Image Attachments</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Share photos, infographics, and UI mockups with instant inline previews and expandable Lightbox view.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#88E788]/30 border border-[#88E788]/60 text-[#2d8a2d] flex items-center justify-center font-bold shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900">Live Emoji Reactions</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    React to friends&apos; photos and updates in real-time with instant Socket.io state synchronization across all members.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#88E788]/30 border border-[#88E788]/60 text-[#2d8a2d] flex items-center justify-center font-bold shrink-0">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900">Voice Notes & Files</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Record voice messages or drop PDF/ZIP documents directly into your 1-to-1 or group chat channels.
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-badge summary */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#2d8a2d] shrink-0" />
              <span>Zero compression loss • WebSocket binary attachment streaming</span>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {activeImageModal && (
        <div
          onClick={() => setActiveImageModal(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-in fade-in duration-200"
        >
          <div className="relative max-w-4xl w-full aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
            <Image
              src={activeImageModal}
              alt="Fullscreen Preview"
              fill
              className="object-contain"
            />
            <div className="absolute top-4 right-4 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 shadow-md">
              Click anywhere to close ✕
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
