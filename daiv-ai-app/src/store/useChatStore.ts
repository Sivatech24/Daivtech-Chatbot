import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  input: string;
  isSidebarOpen: boolean;
  setInput: (input: string) => void;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  toggleSidebar: () => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  input: '',
  isSidebarOpen: false,
  setInput: (input) => set({ input }),
  addMessage: (content, role) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Math.random().toString(36).substring(7),
          role,
          content,
          timestamp: Date.now(),
        },
      ],
    })),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  clearMessages: () => set({ messages: [] }),
}));
