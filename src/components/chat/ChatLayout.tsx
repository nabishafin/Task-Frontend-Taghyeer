'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { SidebarHeader } from './SidebarHeader';
import { ConversationList } from './ConversationList';
import { MessageHeader } from './MessageHeader';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';
import { SearchModal } from './SearchModal';
import { GroupCreateModal } from './GroupCreateModal';
import { GroupManageModal } from './GroupManageModal';
import { cn } from '@/utils/cn';

export function ChatLayout() {
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
          <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3 bg-slate-50/50">
            <div className="w-16 h-16 rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-[#2d8a2d] shadow-xs">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
              </svg>
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-800">No chat selected</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Select a conversation from the sidebar or start a new direct chat to begin messaging.
              </p>
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
