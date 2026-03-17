// ============================================================
// hooks/useChat.js — Chat State Management Hook
// ============================================================
// Custom hook that manages all chat-related state and logic.
// Keeps the main component cleaner by extracting chat logic.
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { sendMessage, fetchChats } from '../services/chatService';
import { useAuth } from '../context/AuthContext';

export function useChat() {
    // Chat sessions (history)
  const [chats, setChats] = useState(() => [
    {
      id: String(Date.now()),
      title: 'New chat',
      messages: [],
      lastMessage: '',
    },
  ]);
  const [activeChatId, setActiveChatId] = useState(chats[0].id);

  // Input state
  const [inputValue, setInputValue] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Error state
  const [error, setError] = useState(null);

  // Remember the most recent user message for retrying
  const [lastUserMessage, setLastUserMessage] = useState('');

  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId) || chats[0];
  const messages = activeChat?.messages ?? [];

  const { user, logout } = useAuth();

  // Fetch chats for authenticated user
  useEffect(() => {
    async function loadChats() {
      if (!user?.id) return;
      try {
        const persistedChats = await fetchChats(user.id);
        if (persistedChats && persistedChats.length > 0) {
          setChats(
            persistedChats.map((item) => ({
              id: item._id,
              title: item.title || 'New chat',
              messages: item.messages || [],
              lastMessage: item.messages?.length ? item.messages[item.messages.length - 1].content : '',
            }))
          );
          setActiveChatId(persistedChats[0]._id);
        }
      } catch (err) {
        console.error('Failed to load chats:', err);
      }
    }

    loadChats();
  }, [user]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Send message function
  const sendChatMessage = async (textOverride = null) => {
    const text = (textOverride || inputValue || lastUserMessage).trim();
    if (!text || isLoading) return;

    // Remember last user message for retry
    setLastUserMessage(text);

    // Clear input and error
    setInputValue('');
    setError(null);

    // Add user's message to chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              lastMessage: text,
              title:
                chat.title === 'New chat'
                  ? text.length > 40
                    ? `${text.slice(0, 40)}...`
                    : text
                  : chat.title,
            }
          : chat
      )
    );

    // Show loading state
    setIsLoading(true);

    try {
      // Build history for API
      const history = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call API
      const data = await sendMessage(text, history, activeChatId);

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
    } catch (err) {
      const message = err.message || 'Something went wrong. Please try again.';
      setError(message);

      if (message.toLowerCase().includes('unauthorized')) {
        // Force logout if token is invalid / expired
        logout();
      }
    } finally {
      setIsLoading(false);
      // Re-focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Start a new chat session
  const startNewChat = () => {
    const id = String(Date.now());
    setChats((prev) => [
      ...prev,
      {
        id,
        title: 'New chat',
        messages: [],
        lastMessage: '',
      },
    ]);
    setActiveChatId(id);
    setError(null);
    setInputValue('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Switch between chat sessions
  const selectChat = (chatId) => {
    setActiveChatId(chatId);
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return {
    // State
    chats,
    activeChatId,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    error,
    setError,

    // Refs
    messagesEndRef,
    inputRef,

    // Actions
    sendChatMessage,
    startNewChat,
    selectChat,
    handleKeyDown,
  };
}