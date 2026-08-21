'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How does user login and registration work?',
    answer:
      'Pulse uses a streamlined phone number login system. If your phone number is new, the server automatically registers you as a new user with your specified name. No separate registration forms are required!',
  },
  {
    question: 'How do group conversations and admin controls work?',
    answer:
      'You can create a group by selecting at least 2 participants (total 3 members including creator). Group creators automatically become admins and can rename the group, promote other members to admins, add new participants, or remove members.',
  },
  {
    question: 'Are messages delivered in real time without refreshing?',
    answer:
      'Yes! Pulse establishes a bi-directional Socket.io WebSocket connection during login. Incoming messages appear instantly in your active chat and conversation list without manual page refreshes.',
  },
  {
    question: 'What happens if I type a message and switch conversations before sending?',
    answer:
      'Pulse features automatic draft preservation. If you switch to another chat while typing, your unsent text is saved in Redux state and automatically restored when you return to that conversation.',
  },
  {
    question: 'How does smart auto-scroll work during active messaging?',
    answer:
      'When you are viewing the newest messages near the bottom, incoming messages automatically scroll down smoothly. If you scroll up to review older history, auto-scroll is disabled so your reading position is preserved, and a floating badge alerts you to new incoming messages.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#88E788]/20 border border-[#88E788]/50 text-slate-900 text-xs font-extrabold uppercase tracking-wide shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#2d8a2d]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Everything you need to know about Pulse messaging features and architecture.
          </p>
        </div>

        {/* Clean Divider Accordion Rows Without Card Boxes */}
        <div className="max-w-6xl mx-auto divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5 transition-colors group">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#2d8a2d] transition-colors gap-4"
                >
                  <span>{faq.question}</span>
                  <div className={`p-1.5 rounded-full transition-transform duration-300 ${isOpen ? 'bg-[#88E788] text-slate-900 rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl animate-in fade-in duration-200 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

