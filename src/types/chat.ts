export interface User {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  phone: string;
  name: string;
}

export interface LastMessage {
  _id?: string;
  sender?: string | User;
  text?: string;
  createdAt?: string;
}

export interface Conversation {
  _id: string;
  type: 'direct' | 'group';
  name?: string;
  createdBy?: string;
  admins?: string[];
  participants?: User[];
  participant?: User; // For direct conversations in /conversations endpoint
  lastMessage?: LastMessage;
  updatedAt?: string;
  createdAt?: string;
}

export interface ConversationsResponse {
  data: Conversation[];
}

export interface Message {
  _id: string;
  conversation: string;
  sender: string | User;
  text: string;
  createdAt: string;
}

export interface MessagesResponse {
  messages: Message[];
  hasMore: boolean;
}

export interface SendMessageRequest {
  conversationId: string;
  text: string;
}

export interface StartConversationRequest {
  userId: string;
}

export interface CreateGroupRequest {
  name: string;
  participantIds: string[];
}

export interface AddParticipantsRequest {
  userIds: string[];
}

export interface PromoteAdminRequest {
  userId: string;
}

export interface RenameGroupRequest {
  name: string;
}

export interface ApiError {
  error?: {
    message?: string;
    code?: string;
    details?: Array<{
      path?: string;
      message?: string;
    }>;
  };
  message?: string;
}
