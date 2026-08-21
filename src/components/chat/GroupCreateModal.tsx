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
      <form onSubmit={handleCreateGroup} className="space-y-4">
        {errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Group Name
          </label>
          <input
            type="text"
            placeholder="e.g. Project Team..."
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
              setValidationError(null);
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#88E788]"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Selected Participants ({selectedUsers.length})
            </label>
            <span className="text-[11px] text-slate-500 font-medium">Min 2 required</span>
          </div>

          {selectedUsers.length === 0 ? (
            <div className="p-3 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400 bg-slate-50">
              No participants selected yet. Search below to add members.
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl max-h-28 overflow-y-auto custom-scrollbar">
              {selectedUsers.map((u) => (
                <div
                  key={u._id}
                  className="inline-flex items-center gap-1.5 bg-[#88E788]/30 text-slate-900 border border-[#88E788] px-2 py-0.5 rounded-lg text-xs font-bold"
                >
                  <Avatar name={u.name} seed={u._id} size="sm" className="w-4 h-4 text-[8px]" />
                  <span>{u.name}</span>
                  <button
                    type="button"
                    onClick={() => removeUser(u._id)}
                    className="p-0.5 hover:bg-[#88E788]/60 rounded transition-colors text-slate-700 hover:text-slate-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Add Members
          </label>
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#88E788]"
            />
          </div>

          <div className="max-h-36 overflow-y-auto custom-scrollbar space-y-1">
            {isSearching ? (
              <div className="p-3 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-slate-700" />
                <span>Searching users...</span>
              </div>
            ) : availableUsers.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-400">
                {searchQuery ? 'No matching users found.' : 'Search for users to add.'}
              </div>
            ) : (
              availableUsers.map((u) => (
                <div
                  key={u._id}
                  onClick={() => toggleSelectUser(u)}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Avatar name={u.name} seed={u._id} size="sm" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{u.name}</p>
                      <p className="text-[10px] text-slate-500">{u.phone}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-1 rounded-lg bg-[#88E788] text-slate-900 hover:bg-[#73db73] transition-all text-xs font-bold px-2 flex items-center gap-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClose}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreating || selectedUsers.length < 2 || !groupName.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#88E788] hover:bg-[#73db73] text-slate-900 text-xs font-bold shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <Users className="w-3.5 h-3.5" />
                <span>Create Group</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
