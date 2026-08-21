import { io, Socket } from 'socket.io-client';
import { Message, Conversation } from '@/types/chat';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://frontend-task-chatapp.onrender.com';

class SocketService {
  private socket: Socket | null = null;
  private currentToken: string | null = null;

  connect(token: string) {
    if (this.socket && this.currentToken === token && this.socket.connected) {
      return this.socket;
    }

    if (this.socket) {
      this.socket.disconnect();
    }

    this.currentToken = token;
    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.currentToken = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  sendMessage(conversationId: string, text: string, callback?: (response: unknown) => void) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('message:send', { conversationId, text }, callback);
    }
  }

  onNewMessage(callback: (message: Message) => void) {
    if (!this.socket) return () => {};
    this.socket.on('message:new', callback);
    return () => {
      this.socket?.off('message:new', callback);
    };
  }

  onConversationUpdated(callback: (conversation: Conversation) => void) {
    if (!this.socket) return () => {};
    this.socket.on('conversation:updated', callback);
    return () => {
      this.socket?.off('conversation:updated', callback);
    };
  }
}

export const socketService = new SocketService();
