'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setIsSearchOpen, setIsGroupModalOpen } from '@/redux/chatSlice';
import { SidebarHeader } from './SidebarHeader';
import { ConversationList } from './ConversationList';
import { MessageHeader } from './MessageHeader';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';
import { SearchModal } from './SearchModal';
import { GroupCreateModal } from './GroupCreateModal';
import { GroupManageModal } from './GroupManageModal';
import { Logo } from '@/components/ui/Logo';
import { UserPlus, Users, MessageSquare } from 'lucide-react';
import { cn } from '@/utils/cn';

export function ChatLayout() {
  const dispatch = useDispatch();
  const mobileView = useSelector((state: RootState) => state.chat.mobileView);
  const activeId = useSelector((state: RootState) => state.chat.activeConversationId);

  return (
    <div className="h-screen w-screen bg-slate-100 text-slate-900 flex overflow-hidden selection:bg-[#88E788] selection:text-slate-900">
      <div
        className={cn(
          'w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col h-full shrink-0 bg-white transition-all duration-300',
          mobileView === 'chat' && activeId ? 'hidden md:flex' : 'flex'
        )}
      >
        <SidebarHeader />
        <div className="flex-1 overflow-hidden">
          <ConversationList />
        </div>
      </div>

      <div
        className={cn(
          'flex-1 flex flex-col h-full overflow-hidden bg-white relative',
          mobileView === 'list' && !activeId ? 'hidden md:flex' : 'flex'
        )}
      >
        {activeId ? (
          <>
            <MessageHeader />
            <MessageList />
            <MessageComposer key={activeId} />
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-4 bg-slate-50/50">
            <Logo size="lg" variant="light" />
            <div className="space-y-1 max-w-sm">
              <h3 className="text-base font-extrabold text-slate-900">Welcome to Pulse Messenger</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Select a conversation from the sidebar or click below to start a new chat or group.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => dispatch(setIsSearchOpen(true))}
                className="inline-flex items-center gap-2 text-xs font-bold bg-[#88E788] hover:bg-[#73db73] text-slate-900 px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Start Direct Chat</span>
              </button>
              <button
                onClick={() => dispatch(setIsGroupModalOpen(true))}
                className="inline-flex items-center gap-2 text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <Users className="w-4 h-4 text-[#2d8a2d]" />
                <span>Create Group</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <SearchModal />
      <GroupCreateModal />
      <GroupManageModal />
    </div>
  );
}
