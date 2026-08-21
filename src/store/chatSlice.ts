import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  activeConversationId: string | null;
  activeFilter: 'all' | 'direct' | 'group';
  mobileView: 'list' | 'chat';
  searchQuery: string;
  isSearchOpen: boolean;
  isGroupModalOpen: boolean;
  isGroupManageOpen: boolean;
  drafts: Record<string, string>;
  unreadCounts: Record<string, number>;
  socketConnected: boolean;
}

const initialState: ChatState = {
  activeConversationId: null,
  activeFilter: 'all',
  mobileView: 'list',
  searchQuery: '',
  isSearchOpen: false,
  isGroupModalOpen: false,
  isGroupManageOpen: false,
  drafts: {},
  unreadCounts: {},
  socketConnected: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversationId: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
      if (action.payload) {
        state.mobileView = 'chat';
        // Clear unread count when conversation is opened
        state.unreadCounts[action.payload] = 0;
      }
    },
    setActiveFilter: (state, action: PayloadAction<'all' | 'direct' | 'group'>) => {
      state.activeFilter = action.payload;
    },
    setMobileView: (state, action: PayloadAction<'list' | 'chat'>) => {
      state.mobileView = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload;
    },
    setIsGroupModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isGroupModalOpen = action.payload;
    },
    setIsGroupManageOpen: (state, action: PayloadAction<boolean>) => {
      state.isGroupManageOpen = action.payload;
    },
    setDraft: (state, action: PayloadAction<{ conversationId: string; text: string }>) => {
      if (action.payload.text.trim()) {
        state.drafts[action.payload.conversationId] = action.payload.text;
      } else {
        delete state.drafts[action.payload.conversationId];
      }
    },
    clearDraft: (state, action: PayloadAction<string>) => {
      delete state.drafts[action.payload];
    },
    incrementUnread: (state, action: PayloadAction<string>) => {
      const convId = action.payload;
      if (state.activeConversationId !== convId) {
        state.unreadCounts[convId] = (state.unreadCounts[convId] || 0) + 1;
      }
    },
    clearUnread: (state, action: PayloadAction<string>) => {
      state.unreadCounts[action.payload] = 0;
    },
    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.socketConnected = action.payload;
    },
  },
});

export const {
  setActiveConversationId,
  setActiveFilter,
  setMobileView,
  setSearchQuery,
  setIsSearchOpen,
  setIsGroupModalOpen,
  setIsGroupManageOpen,
  setDraft,
  clearDraft,
  incrementUnread,
  clearUnread,
  setSocketConnected,
} = chatSlice.actions;

export default chatSlice.reducer;
