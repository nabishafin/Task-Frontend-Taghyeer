'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setIsGroupManageOpen } from '@/redux/chatSlice';
import {
  useGetConversationsQuery,
  useRenameGroupMutation,
  useAddParticipantsMutation,
  useRemoveParticipantMutation,
  usePromoteAdminMutation,
  useLazySearchUsersQuery,
} from '@/redux/apiSlice';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useDebounce } from '@/hooks/useDebounce';
import {
  ShieldCheck,
  UserPlus,
  UserMinus,
  Edit2,
  Check,
  LogOut,
  Loader2,
  Search,
} from 'lucide-react';

export function GroupManageModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.chat.isGroupManageOpen);
  const activeId = useSelector((state: RootState) => state.chat.activeConversationId);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const { data: convData } = useGetConversationsQuery();
  const currentGroup = convData?.data.find((c) => c._id === activeId && c.type === 'group');

  const isAdmin = Boolean(
    currentGroup?.admins?.includes(currentUser?._id || '')
  );

  const [isEditingName, setIsEditingName] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const [renameGroup, { isLoading: isRenaming }] = useRenameGroupMutation();
  const [addParticipants, { isLoading: isAdding }] = useAddParticipantsMutation();
  const [removeParticipant, { isLoading: isRemoving }] = useRemoveParticipantMutation();
  const [promoteAdmin, { isLoading: isPromoting }] = usePromoteAdminMutation();
  const [triggerSearch, { data: searchResults, isLoading: isSearching }] = useLazySearchUsersQuery();

  React.useEffect(() => {
    if (debouncedQuery.trim()) {
      triggerSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery, triggerSearch]);

  if (!currentGroup) return null;

  const handleClose = () => {
    dispatch(setIsGroupManageOpen(false));
    setIsEditingName(false);
    setIsAddMemberOpen(false);
    setSearchQuery('');
  };

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    try {
      await renameGroup({ id: currentGroup._id, name: newGroupName.trim() }).unwrap();
      setIsEditingName(false);
    } catch {
      // Error handled
    }
  };

  const handleAddMember = async (userId: string) => {
    try {
      await addParticipants({ id: currentGroup._id, userIds: [userId] }).unwrap();
      setSearchQuery('');
    } catch {
      // Error handled
    }
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      await removeParticipant({ id: currentGroup._id, userId }).unwrap();
      if (userId === currentUser?._id) {
        handleClose();
      }
    } catch {
      // Error handled
    }
  };

  const handlePromoteAdmin = async (userId: string) => {
    try {
      await promoteAdmin({ id: currentGroup._id, userId }).unwrap();
    } catch {
      // Error handled
    }
  };

  const existingParticipantIds = new Set(currentGroup.participants?.map((p) => p._id) || []);
  const availableUsers = searchResults?.filter((u) => !existingParticipantIds.has(u._id)) || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Group Info & Settings"
      subtitle={`${currentGroup.participants?.length || 0} Members`}
      maxWidth="md"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <Avatar name={currentGroup.name} seed={currentGroup._id} size="lg" isGroup />
          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <form onSubmit={handleRename} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isRenaming}
                  className="p-1 rounded-lg bg-[#88E788] text-slate-900 hover:bg-[#73db73]"
                >
                  {isRenaming ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 truncate">{currentGroup.name}</h3>
                  <p className="text-[11px] text-slate-500">Created group</p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setNewGroupName(currentGroup.name || '');
                      setIsEditingName(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                    title="Rename Group"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Group Members
            </h4>
            {isAdmin && (
              <button
                onClick={() => setIsAddMemberOpen(!isAddMemberOpen)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#2d8a2d] hover:underline"
              >
                <UserPlus className="w-3.5 h-3.5" />
                {isAddMemberOpen ? 'Close Search' : 'Add Member'}
              </button>
            )}
          </div>

          {isAddMemberOpen && (
            <div className="p-3 mb-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search user to add..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-900 focus:outline-none"
                />
              </div>
              <div className="max-h-28 overflow-y-auto custom-scrollbar space-y-1">
                {isSearching ? (
                  <div className="p-2 text-center text-xs text-slate-500">Searching...</div>
                ) : availableUsers.length === 0 ? (
                  <div className="p-2 text-center text-xs text-slate-400">No users found to add.</div>
                ) : (
                  availableUsers.map((u) => (
                    <div
                      key={u._id}
                      className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar name={u.name} seed={u._id} size="sm" className="w-5 h-5 text-[9px]" />
                        <span className="text-xs font-semibold text-slate-800">{u.name}</span>
                      </div>
                      <button
                        onClick={() => handleAddMember(u._id)}
                        disabled={isAdding}
                        className="text-xs font-bold text-[#2d8a2d] hover:underline"
                      >
                        + Add
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="space-y-1.5 max-h-56 overflow-y-auto custom-scrollbar">
            {currentGroup.participants?.map((member) => {
              const isMemberAdmin = currentGroup.admins?.includes(member._id);
              const isSelf = member._id === currentUser?._id;

              return (
                <div
                  key={member._id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar name={member.name} seed={member._id} size="sm" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          {member.name} {isSelf && '(You)'}
                        </span>
                        {isMemberAdmin && (
                          <Badge variant="accent" size="sm" className="text-[9px] py-0 px-1">
                            <ShieldCheck className="w-2.5 h-2.5 mr-0.5" /> Admin
                          </Badge>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">{member.phone}</span>
                    </div>
                  </div>

                  {isAdmin && !isSelf && (
                    <div className="flex items-center gap-1">
                      {!isMemberAdmin && (
                        <button
                          onClick={() => handlePromoteAdmin(member._id)}
                          disabled={isPromoting}
                          className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                          title="Promote to Admin"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveMember(member._id)}
                        disabled={isRemoving}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                        title="Remove Member"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
          <button
            onClick={() => currentUser && handleRemoveMember(currentUser._id)}
            disabled={isRemoving}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-all border border-rose-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Leave Group</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
