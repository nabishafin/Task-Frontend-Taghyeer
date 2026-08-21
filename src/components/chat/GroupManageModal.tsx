'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setIsGroupManageOpen } from '@/store/chatSlice';
import {
  useGetConversationsQuery,
  useRenameGroupMutation,
  useAddParticipantsMutation,
  useRemoveParticipantMutation,
  usePromoteAdminMutation,
  useLazySearchUsersQuery,
} from '@/store/apiSlice';
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
  AlertCircle,
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
    } catch (e) {}
  };

  const handleAddMember = async (userId: string) => {
    try {
      await addParticipants({ id: currentGroup._id, userIds: [userId] }).unwrap();
      setSearchQuery('');
    } catch (e) {}
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      await removeParticipant({ id: currentGroup._id, userId }).unwrap();
      if (userId === currentUser?._id) {
        handleClose();
      }
    } catch (e) {}
  };

  const handlePromoteAdmin = async (userId: string) => {
    try {
      await promoteAdmin({ id: currentGroup._id, userId }).unwrap();
    } catch (e) {}
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
      <div className="space-y-6">
        {/* Group Name & Header */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <Avatar name={currentGroup.name} seed={currentGroup._id} size="lg" isGroup />
          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <form onSubmit={handleRename} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-sm text-slate-100 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isRenaming}
                  className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
                >
                  {isRenaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100 truncate">{currentGroup.name}</h3>
                  <p className="text-xs text-slate-400">Created group</p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setNewGroupName(currentGroup.name || '');
                      setIsEditingName(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                    title="Rename Group"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Member List Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Group Members
            </h4>
            {isAdmin && (
              <button
                onClick={() => setIsAddMemberOpen(!isAddMemberOpen)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <UserPlus className="w-3.5 h-3.5" />
                {isAddMemberOpen ? 'Close Search' : 'Add Member'}
              </button>
            )}
          </div>

          {/* Add Member Search Panel */}
          {isAddMemberOpen && (
            <div className="p-3 mb-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search user to add..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none"
                />
              </div>
              <div className="max-h-32 overflow-y-auto custom-scrollbar space-y-1">
                {isSearching ? (
                  <div className="p-2 text-center text-xs text-slate-500">Searching...</div>
                ) : availableUsers.length === 0 ? (
                  <div className="p-2 text-center text-xs text-slate-500">No users found to add.</div>
                ) : (
                  availableUsers.map((u) => (
                    <div
                      key={u._id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar name={u.name} seed={u._id} size="sm" className="w-6 h-6 text-[10px]" />
                        <span className="text-xs font-medium text-slate-200">{u.name}</span>
                      </div>
                      <button
                        onClick={() => handleAddMember(u._id)}
                        disabled={isAdding}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        + Add
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Participant Rows */}
          <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
            {currentGroup.participants?.map((member) => {
              const isMemberAdmin = currentGroup.admins?.includes(member._id);
              const isSelf = member._id === currentUser?._id;

              return (
                <div
                  key={member._id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/40"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} seed={member._id} size="sm" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-200">
                          {member.name} {isSelf && '(You)'}
                        </span>
                        {isMemberAdmin && (
                          <Badge variant="primary" size="sm">
                            <ShieldCheck className="w-2.5 h-2.5 mr-0.5" /> Admin
                          </Badge>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500">{member.phone}</span>
                    </div>
                  </div>

                  {isAdmin && !isSelf && (
                    <div className="flex items-center gap-1">
                      {!isMemberAdmin && (
                        <button
                          onClick={() => handlePromoteAdmin(member._id)}
                          disabled={isPromoting}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                          title="Promote to Admin"
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveMember(member._id)}
                        disabled={isRemoving}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                        title="Remove Member"
                      >
                        <UserMinus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Leave Group Action */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={() => currentUser && handleRemoveMember(currentUser._id)}
            disabled={isRemoving}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-2 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Leave Group</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
