import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { socketService } from '@/services/socket';
import { incrementUnread } from './chatSlice';
import {
  AuthResponse,
  LoginRequest,
  User,
  ConversationsResponse,
  Conversation,
  StartConversationRequest,
  CreateGroupRequest,
  MessagesResponse,
  Message,
  SendMessageRequest,
} from '@/types/chat';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://frontend-task-chatapp.onrender.com/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      let token = (getState() as RootState).auth.token;
      if (!token && typeof window !== 'undefined') {
        token = localStorage.getItem('pulse_auth_token');
      }
      if (token && token !== 'null' && token !== 'undefined' && token.trim() !== '') {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Conversations', 'Messages', 'User'],
  endpoints: (builder) => ({
    // Auth Endpoints
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    // Users Endpoints
    searchUsers: builder.query<User[], string>({
      query: (q) => `/users/search?q=${encodeURIComponent(q)}`,
    }),

    // Conversations Endpoints
    getConversations: builder.query<ConversationsResponse, void>({
      query: () => '/conversations',
      providesTags: ['Conversations'],
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
        try {
          await cacheDataLoaded;
          const unsubscribeMsg = socketService.onNewMessage((newMsg: Message) => {
            updateCachedData((draft) => {
              if (!draft || !draft.data) return;
              const targetConv = draft.data.find((c) => c._id === newMsg.conversation);
              if (targetConv) {
                targetConv.lastMessage = {
                  _id: newMsg._id,
                  sender: newMsg.sender,
                  text: newMsg.text,
                  createdAt: newMsg.createdAt,
                };
                targetConv.updatedAt = newMsg.createdAt;
                draft.data.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
              }
            });
            dispatch(incrementUnread(newMsg.conversation));
          });

          const unsubscribeConv = socketService.onConversationUpdated((updatedConv: Conversation) => {
            updateCachedData((draft) => {
              if (!draft || !draft.data) return;
              const index = draft.data.findIndex((c) => c._id === updatedConv._id);
              if (index !== -1) {
                draft.data[index] = { ...draft.data[index], ...updatedConv };
              } else {
                draft.data.unshift(updatedConv);
              }
            });
          });

          await cacheEntryRemoved;
          unsubscribeMsg();
          unsubscribeConv();
        } catch {
          // Cache removed
        }
      },
    }),

    startDirectConversation: builder.mutation<Conversation, StartConversationRequest>({
      query: (body) => ({
        url: '/conversations',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Conversations'],
    }),

    createGroupConversation: builder.mutation<Conversation, CreateGroupRequest>({
      query: (body) => ({
        url: '/conversations/group',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Conversations'],
    }),

    renameGroup: builder.mutation<Conversation, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/conversations/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Conversations'],
    }),

    addParticipants: builder.mutation<Conversation, { id: string; userIds: string[] }>({
      query: ({ id, userIds }) => ({
        url: `/conversations/${id}/participants`,
        method: 'POST',
        body: { userIds },
      }),
      invalidatesTags: ['Conversations'],
    }),

    removeParticipant: builder.mutation<Conversation, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/conversations/${id}/participants/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Conversations'],
    }),

    promoteAdmin: builder.mutation<Conversation, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/conversations/${id}/admins`,
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: ['Conversations'],
    }),

    // Messages Endpoints
    getMessages: builder.query<MessagesResponse, { id: string; limit?: number; before?: string }>({
      query: ({ id, limit = 50, before }) => {
        let url = `/conversations/${id}/messages?limit=${limit}`;
        if (before) url += `&before=${before}`;
        return url;
      },
      providesTags: (result, error, { id }) => [{ type: 'Messages', id }],
      async onCacheEntryAdded({ id }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          const unsubscribe = socketService.onNewMessage((newMsg: Message) => {
            if (newMsg.conversation === id) {
              updateCachedData((draft) => {
                if (!draft || !draft.messages) return;
                const exists = draft.messages.some((m) => m._id === newMsg._id);
                if (!exists) {
                  draft.messages.push(newMsg);
                }
              });
            }
          });

          await cacheEntryRemoved;
          unsubscribe();
        } catch {
          // Cache removed
        }
      },
    }),

    sendMessage: builder.mutation<Message, SendMessageRequest>({
      query: (body) => ({
        url: '/messages',
        method: 'POST',
        body,
      }),
      async onQueryStarted({ conversationId, text }, { dispatch, queryFulfilled, getState }) {
        const currentUser = (getState() as RootState).auth.user;
        const tempId = `temp-${Date.now()}`;
        const tempMsg: Message = {
          _id: tempId,
          conversation: conversationId,
          sender: currentUser ? currentUser._id : 'me',
          text,
          createdAt: new Date().toISOString(),
        };

        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getMessages', { id: conversationId }, (draft) => {
            if (draft && draft.messages) {
              draft.messages.push(tempMsg);
            }
          })
        );

        try {
          const { data: realMsg } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData('getMessages', { id: conversationId }, (draft) => {
              if (draft && draft.messages) {
                const index = draft.messages.findIndex((m) => m._id === tempId);
                if (index !== -1) {
                  draft.messages[index] = realMsg;
                }
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: () => [{ type: 'Conversations' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useLazySearchUsersQuery,
  useSearchUsersQuery,
  useGetConversationsQuery,
  useStartDirectConversationMutation,
  useCreateGroupConversationMutation,
  useRenameGroupMutation,
  useAddParticipantsMutation,
  useRemoveParticipantMutation,
  usePromoteAdminMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = apiSlice;
