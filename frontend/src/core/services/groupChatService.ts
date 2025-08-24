import { httpClient } from './httpClient';

export interface GroupMember {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  is_online: boolean;
  last_seen?: string;
  role: 'admin' | 'member';
}

export interface GroupInfo {
  id: string;
  name: string;
  description?: string;
  avatar_url?: string;
  member_count: number;
  online_count: number;
  online_members: GroupMember[];
  created_at: string;
  updated_at: string;
}

export interface GroupMessage {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  group_id: string;
  message_type: 'text' | 'image' | 'file' | 'audio' | 'video' | 'link';
  timestamp: string;
  is_read: boolean;
  reply_to?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  images?: string[];
  video_url?: string;
}

export interface SendGroupMessageRequest {
  group_id: string;
  content: string;
  message_type?: 'text' | 'image' | 'file' | 'audio' | 'video' | 'link';
  reply_to?: string;
  file?: File;
}

export interface GroupChatResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export class GroupChatService {
  // Get group information
  async getGroupInfo(groupId: string): Promise<GroupInfo> {
    return httpClient.get<GroupInfo>(`/groups/${groupId}`);
  }

  // Get messages for a specific group
  async getGroupMessages(groupId: string, page: number = 1, limit: number = 50): Promise<GroupMessage[]> {
    return httpClient.get<GroupMessage[]>(`/groups/${groupId}/messages?page=${page}&limit=${limit}`);
  }

  // Send a new message to group
  async sendGroupMessage(request: SendGroupMessageRequest): Promise<GroupMessage> {
    const formData = new FormData();
    formData.append('group_id', request.group_id);
    formData.append('content', request.content);
    formData.append('message_type', request.message_type || 'text');
    
    if (request.reply_to) {
      formData.append('reply_to', request.reply_to);
    }
    
    if (request.file) {
      formData.append('file', request.file);
    }

    return httpClient.post<GroupMessage>('/groups/messages', formData);
  }

  // Delete a group message
  async deleteGroupMessage(messageId: string): Promise<void> {
    return httpClient.delete<void>(`/groups/messages/${messageId}`);
  }

  // Mark group messages as read
  async markGroupAsRead(groupId: string): Promise<void> {
    return httpClient.put<void>(`/groups/${groupId}/read`);
  }

  // Search group messages
  async searchGroupMessages(groupId: string, query: string): Promise<GroupMessage[]> {
    return httpClient.get<GroupMessage[]>(`/groups/${groupId}/messages/search?q=${encodeURIComponent(query)}`);
  }

  // Get all groups for current user
  async getGroups(): Promise<GroupInfo[]> {
    return httpClient.get<GroupInfo[]>('/groups');
  }

  // Create a new group
  async createGroup(name: string, description?: string, memberIds?: string[]): Promise<GroupInfo> {
    return httpClient.post<GroupInfo>('/groups', {
      name,
      description,
      member_ids: memberIds
    });
  }

  // Update group information
  async updateGroup(groupId: string, updates: Partial<GroupInfo>): Promise<GroupInfo> {
    return httpClient.put<GroupInfo>(`/groups/${groupId}`, updates);
  }

  // Add members to group
  async addGroupMembers(groupId: string, memberIds: string[]): Promise<void> {
    return httpClient.post<void>(`/groups/${groupId}/members`, { member_ids: memberIds });
  }

  // Remove members from group
  async removeGroupMembers(groupId: string, memberIds: string[]): Promise<void> {
    return httpClient.delete<void>(`/groups/${groupId}/members`, { 
      data: { member_ids: memberIds } 
    });
  }

  // Leave group
  async leaveGroup(groupId: string): Promise<void> {
    return httpClient.delete<void>(`/groups/${groupId}/leave`);
  }

  // Delete group (admin only)
  async deleteGroup(groupId: string): Promise<void> {
    return httpClient.delete<void>(`/groups/${groupId}`);
  }

  // Upload file for group
  async uploadGroupFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    
    return httpClient.post<{ url: string; filename: string }>('/groups/upload', formData);
  }
}

export const groupChatService = new GroupChatService();
