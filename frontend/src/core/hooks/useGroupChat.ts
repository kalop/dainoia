import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { groupChatService, type GroupMessage, type GroupInfo, type SendGroupMessageRequest } from '../services/groupChatService';
import { useApi } from './useApi';

export const useGroupChat = (groupId?: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<GroupMessage | null>(null);

  // Get group info
  const { data: groupInfoData, loading: groupInfoLoading } = useApi(
    () => groupId ? groupChatService.getGroupInfo(groupId) : Promise.resolve(null),
    [groupId]
  );

  useEffect(() => {
    if (groupInfoData) {
      setGroupInfo(groupInfoData);
    }
  }, [groupInfoData]);

  // Get messages for current group
  const { data: messagesData, loading: messagesLoading } = useApi(
    () => groupId ? groupChatService.getGroupMessages(groupId) : Promise.resolve([]),
    [groupId]
  );

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  // Send message
  const sendMessage = useCallback(async (content: string, file?: File) => {
    if (!groupId || !user) return;

    try {
      setLoading(true);
      setError(null);

      const request: SendGroupMessageRequest = {
        group_id: groupId,
        content,
        message_type: file ? 'file' : 'text',
        file,
        reply_to: replyTo?.id
      };

      const newMessage = await groupChatService.sendGroupMessage(request);
      
      setMessages(prev => [...prev, newMessage]);
      setReplyTo(null); // Clear reply after sending
      
      // Mark as read
      await groupChatService.markGroupAsRead(groupId);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  }, [groupId, user, replyTo]);

  // Delete message
  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      await groupChatService.deleteGroupMessage(messageId);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete message');
    }
  }, []);

  // Search messages
  const searchMessages = useCallback(async (query: string) => {
    if (!groupId) return [];
    
    try {
      const results = await groupChatService.searchGroupMessages(groupId, query);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search messages');
      return [];
    }
  }, [groupId]);

  // Upload file
  const uploadFile = useCallback(async (file: File) => {
    try {
      const result = await groupChatService.uploadGroupFile(file);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      return null;
    }
  }, []);

  return {
    // Data
    messages,
    groupInfo,
    
    // Loading states
    loading: loading || groupInfoLoading || messagesLoading,
    error,
    
    // Actions
    sendMessage,
    deleteMessage,
    searchMessages,
    uploadFile,
    
    // Reply functionality
    replyTo,
    setReplyTo
  };
};
