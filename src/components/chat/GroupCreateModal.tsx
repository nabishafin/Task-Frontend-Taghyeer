'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setIsGroupModalOpen, setActiveConversationId } from '@/redux/chatSlice';
import { useLazySearchUsersQuery, useCreateGroupConversationMutation } from '@/redux/apiSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { User, ApiError } from '@/types/chat';
import { Search, X, Users, Loader2, Plus, AlertCircle } from 'lucide-react';

export function GroupCreateModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.chat.isGroupModalOpen);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [triggerSearch, { data: searchResults, isLoading: isSearching }] = useLazySearchUsersQuery();
  const [createGroup, { isLoading: isCreating, error: apiError }] = useCreateGroupConversationMutation();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      triggerSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery, triggerSearch]);

  const toggleSelectUser = (user: User) => {
    if (selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers((prev) => prev.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers((prev) => [...prev, user]);
    }
    setValidationError(null);
  };

  const removeUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedName = groupName.trim();
    if (!trimmedName) {
      setValidationError('Please enter a group name.');
      return;
    }
    if (selectedUsers.length < 2) {
      setValidationError('A group needs at least 3 total members (you + at least 2 other participants).');
      return;
    }

    try {
      const participantIds = selectedUsers.map((u) => u._id);
      const newGroup = await createGroup({ name: trimmedName, participantIds }).unwrap();
      dispatch(setActiveConversationId(newGroup._id));
      dispatch(setIsGroupModalOpen(false));
      resetForm();
    } catch {
      // Handled via state
    }
  };

  const resetForm = () => {
    setGroupName('');
    setSelectedUsers([]);
    setSearchQuery('');
    setValidationError(null);
  };

  const handleClose = () => {
    dispatch(setIsGroupModalOpen(false));
    resetForm();
  };

  const availableUsers = searchResults?.filter(
    (u) => u._id !== currentUser?._id && !selectedUsers.some((s) => s._id === u._id)
  ) || [];

  const typedError = apiError && 'data' in apiError ? (apiError.data as ApiError) : null;
  const errorMessage =
    validationError || typedError?.error?.message || null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Group Conversation"
      subtitle="Select at least 2 participants and give your group a name"
      maxWidth="lg"
    >
      <form onSubmit={handleCreateGroup} className="space-y-5">
        {errorMessage && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Group Name
          </label>
          <input
            type="text"
            placeholder="e.g. Project Pulse, Pioneers Team..."
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
              setValidationError(null);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Selected Participants ({selectedUsers.length})
            </label>
            <span className="text-[11px] text-slate-400">Min 2 required</span>
          </div>

          {selectedUsers.length === 0 ? (
            <div className="p-3.5 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
              No participants selected yet. Search below to add members.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 p-2 bg-slate-950/60 border border-slate-800 rounded-xl max-h-28 overflow-y-auto custom-scrollbar">
              {selectedUsers.map((u) => (
                <div
                  key={u._id}
                  className="inline-flex items-center gap-1.5 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-lg text-xs font-medium"
                >
                  <Avatar name={u.name} seed={u._id} size="sm" className="w-5 h-5 text-[9px]" />
                  <span>{u.name}</span>
                  <button
                    type="button"
                    onClick={() => removeUser(u._id)}
                    className="p-0.5 hover:bg-indigo-500/30 rounded transition-colors text-indigo-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Add Members
          </label>
          <div className="relative mb-2">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>

          <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-1.5">
            {isSearching ? (
              <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>Searching users...</span>
              </div>
            ) : availableUsers.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                {searchQuery ? 'No matching users found.' : 'Search for users to add to group.'}
              </div>
            ) : (
              availableUsers.map((u) => (
                <div
                  key={u._id}
                  onClick={() => toggleSelectUser(u)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 hover:bg-slate-800/60 border border-slate-800/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar name={u.name} seed={u._id} size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.phone}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-1 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all text-xs flex items-center gap-1 font-medium px-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreating || selectedUsers.length < 2 || !groupName.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <Users className="w-4 h-4" />
                <span>Create Group</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
