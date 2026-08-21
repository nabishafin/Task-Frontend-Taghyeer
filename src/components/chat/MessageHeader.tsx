'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setMobileView, setIsGroupManageOpen } from '@/store/chatSlice';
import { useGetConversationsQuery } from '@/store/apiSlice';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Settings, Users, Phone } from 'lucide-react';

export function MessageHeader() {
  const dispatch = useDispatch();
  const activeId = useSelector((state: RootState) => state.chat.activeConversationId);
  const socketConnected = useSelector((state: RootState) => state.chat.socketConnected);

  const { data } = useGetConversationsQuery();
  const currentConv = data?.data.find((c) => c._id === activeId);

  if (!currentConv) return null;

  const isGroup = currentConv.type === 'group';
  const title = isGroup
    ? currentConv.name || 'Group Conversation'
    : currentConv.participant?.name || 'Direct Conversation';

  const seed = isGroup ? currentConv._id : currentConv.participant?._id;

  const subtitle = isGroup
    ? `${currentConv.participants?.length || 0} members`
    : currentConv.participant?.phone || '';

  return (
    <div className="p-3.5 px-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Back Button */}
        <button
          onClick={() => dispatch(setMobileView('list'))}
          className="md:hidden p-2 -ml-1 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          title="Back to conversations"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <Avatar
          name={title}
          seed={seed}
          size="md"
          isGroup={isGroup}
          isOnline={!isGroup ? socketConnected : undefined}
        />

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-slate-100 truncate flex items-center gap-2">
            <span className="truncate">{title}</span>
            {isGroup && (
              <Badge variant="accent" size="sm">
                <Users className="w-2.5 h-2.5 mr-0.5" /> Group
              </Badge>
            )}
          </h2>
          <p className="text-xs text-slate-400 truncate">{subtitle}</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {isGroup && (
          <button
            onClick={() => dispatch(setIsGroupManageOpen(true))}
            className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
            title="Group Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
