import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export type ModalType = 'edit-message' | 'delete-message' | 'delete-chat' | null;

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  input: string;
  isSidebarOpen: boolean;
  currentModel: string;
  modal: {
    type: ModalType;
    data?: any;
  };

  // Actions
  setInput: (input: string) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setCurrentModel: (model: string) => void;
  setModal: (type: ModalType, data?: any) => void;
  
  // Chat Actions
  createNewChat: () => void;
  setActiveChat: (id: string) => void;
  renameChat: (id: string, newTitle: string) => void;
  deleteChat: (id: string) => void;
  
  // Message Actions
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  updateMessage: (chatId: string, messageId: string, newContent: string) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChatId: null,
  input: '',
  isSidebarOpen: true,
  currentModel: 'Neural Nexus',
  modal: { type: null },

  setInput: (input) => set({ input }),
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setCurrentModel: (currentModel) => set({ currentModel }),
  setModal: (type, data) => set({ modal: { type, data } }),

  createNewChat: () => {
    const newChat: Chat = {
      id: Math.random().toString(36).substring(7),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
    };
    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChatId: newChat.id,
      input: '', // Clear input when creating new chat
    }));
  },

  setActiveChat: (id) => set({ activeChatId: id }),

  renameChat: (id, newTitle) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat
      ),
    })),

  deleteChat: (id) =>
    set((state) => {
      const newChats = state.chats.filter((chat) => chat.id !== id);
      return {
        chats: newChats,
        activeChatId: state.activeChatId === id ? (newChats[0]?.id || null) : state.activeChatId,
      };
    }),

  addMessage: (content, role) =>
    set((state) => {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const newMessage: Message = {
        id: Math.random().toString(36).substring(7),
        role,
        content,
        timestamp,
      };

      if (!state.activeChatId) {
        // Create a new chat if none exists
        const newChat: Chat = {
          id: Math.random().toString(36).substring(7),
          title: content.substring(0, 30) + (content.length > 30 ? '...' : ''),
          messages: [newMessage],
          createdAt: Date.now(),
        };
        return {
          chats: [newChat, ...state.chats],
          activeChatId: newChat.id,
        };
      }

      return {
        chats: state.chats.map((chat) =>
          chat.id === state.activeChatId
            ? {
                ...chat,
                messages: [...chat.messages, newMessage],
                title: chat.messages.length === 0 ? content.substring(0, 30) + (content.length > 30 ? '...' : '') : chat.title,
              }
            : chat
        ),
      };
    }),

  updateMessage: (chatId, messageId, newContent) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId ? { ...msg, content: newContent } : msg
              ),
            }
          : chat
      ),
    })),

  deleteMessage: (chatId, messageId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.filter((msg) => msg.id !== messageId),
            }
          : chat
      ),
    })),
}));
