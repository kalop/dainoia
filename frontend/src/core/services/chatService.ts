import { httpClient } from './httpClient';

// Types for chat functionality
export interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  message_type: 'text' | 'image' | 'file' | 'audio' | 'video' | 'link';
  timestamp: string;
  is_read: boolean;
  reply_to?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
}

export interface Conversation {
  id: string;
  participant_ids: string[];
  last_message?: Message;
  unread_count: number;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  is_online: boolean;
  last_seen?: string;
}

export interface SendMessageRequest {
  receiver_id: string;
  content: string;
  message_type?: 'text' | 'image' | 'file' | 'audio' | 'video' | 'link';
  reply_to?: string;
  file?: File;
}

export interface ChatResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export class ChatService {
  // Get all conversations for current user
  async getConversations(): Promise<Conversation[]> {
    return httpClient.get<Conversation[]>('/conversations');
  }

  // Get messages for a specific conversation
  async getMessages(conversationId: string, page: number = 1, limit: number = 50): Promise<Message[]> {
    return httpClient.get<Message[]>(`/conversations/${conversationId}/messages?page=${page}&limit=${limit}`);
  }

  // Send a new message
  async sendMessage(request: SendMessageRequest): Promise<Message> {
    const formData = new FormData();
    formData.append('receiver_id', request.receiver_id);
    formData.append('content', request.content);
    formData.append('message_type', request.message_type || 'text');
    
    if (request.reply_to) {
      formData.append('reply_to', request.reply_to);
    }
    
    if (request.file) {
      formData.append('file', request.file);
    }

    return httpClient.post<Message>('/messages', formData);
  }

  // Mark messages as read
  async markAsRead(conversationId: string): Promise<void> {
    return httpClient.put<void>(`/conversations/${conversationId}/read`);
  }

  // Delete a message
  async deleteMessage(messageId: string): Promise<void> {
    return httpClient.delete<void>(`/messages/${messageId}`);
  }

  // Forward a message
  async forwardMessage(messageId: string, receiverIds: string[]): Promise<void> {
    return httpClient.post<void>(`/messages/${messageId}/forward`, { receiver_ids: receiverIds });
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<User> {
    return httpClient.get<User>(`/users/${userId}`);
  }

  // Search conversations
  async searchConversations(query: string): Promise<Conversation[]> {
    return httpClient.get<Conversation[]>(`/conversations/search?q=${encodeURIComponent(query)}`);
  }

  // Upload file
  async uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    
    return httpClient.post<{ url: string; filename: string }>('/upload', formData);
  }

  // Get online users
  async getOnlineUsers(): Promise<User[]> {
    return httpClient.get<User[]>('/users/online');
  }

  // Block/Unblock user
  async toggleBlockUser(userId: string, block: boolean): Promise<void> {
    return httpClient.put<void>(`/users/${userId}/block`, { block });
  }

  // Report user
  async reportUser(userId: string, reason: string): Promise<void> {
    return httpClient.post<void>(`/users/${userId}/report`, { reason });
  }
}

export const chatService = new ChatService();
