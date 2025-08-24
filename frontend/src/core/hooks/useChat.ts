import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { chatService, type Message, type Conversation, type SendMessageRequest } from '../services/chatService';
import { useApi } from './useApi';

export const useChat = (conversationId?: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<Message | null>(null);

  // Get conversations
  const { data: conversationsData, loading: conversationsLoading } = useApi(
    () => chatService.getConversations(),
    []
  );

  useEffect(() => {
    if (conversationsData) {
      setConversations(conversationsData);
    }
  }, [conversationsData]);

  // Get messages for current conversation
  const { data: messagesData, loading: messagesLoading } = useApi(
    () => conversationId ? chatService.getMessages(conversationId) : Promise.resolve([]),
    [conversationId]
  );

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  // Send message
  const sendMessage = useCallback(async (content: string, file?: File) => {
    if (!conversationId || !user) return;

    try {
      setLoading(true);
      setError(null);

      const request: SendMessageRequest = {
        receiver_id: conversationId,
        content,
        message_type: file ? 'file' : 'text',
        file,
        reply_to: replyTo?.id
      };

      const newMessage = await chatService.sendMessage(request);
      
      setMessages(prev => [...prev, newMessage]);
      setReplyTo(null); // Clear reply after sending
      
      // Mark as read
      await chatService.markAsRead(conversationId);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  }, [conversationId, user, replyTo]);

  // Delete message
  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      await chatService.deleteMessage(messageId);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete message');
    }
  }, []);

  // Forward message
  const forwardMessage = useCallback(async (messageId: string, receiverIds: string[]) => {
    try {
      await chatService.forwardMessage(messageId, receiverIds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to forward message');
    }
  }, []);

  // Mark conversation as read
  const markAsRead = useCallback(async (convId: string) => {
    try {
      await chatService.markAsRead(convId);
      // Update conversations list to reflect read status
      setConversations(prev => 
        prev.map(conv => 
          conv.id === convId 
            ? { ...conv, unread_count: 0 }
            : conv
        )
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  }, []);

  // Search conversations
  const searchConversations = useCallback(async (query: string) => {
    try {
      const results = await chatService.searchConversations(query);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search conversations');
      return [];
    }
  }, []);

  // Upload file
  const uploadFile = useCallback(async (file: File) => {
    try {
      const result = await chatService.uploadFile(file);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      return null;
    }
  }, []);

  return {
    // Data
    messages,
    conversations,
    currentConversation,
    
    // Loading states
    loading: loading || conversationsLoading || messagesLoading,
    error,
    
    // Actions
    sendMessage,
    deleteMessage,
    forwardMessage,
    markAsRead,
    searchConversations,
    uploadFile,
    
    // Reply functionality
    replyTo,
    setReplyTo,
    
    // Conversation management
    setCurrentConversation
  };
};
