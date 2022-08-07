import create from 'zustand';

import type { ChatMessageType } from '../types/types';

export interface ChatListState {
  chats: ChatMessageType[];
  maxSize: number;
  addChat: (chat: ChatMessageType) => void;
}

export const useChatListStore = create<ChatListState>((set, get) => ({
  chats: [],
  maxSize: 200,
  addChat: (chat: ChatMessageType) => {
    const { chats } = get();
    chats.push(chat);
    set({ chats });
  },
}));

export interface SelectedChatState {
  chat?: ChatMessageType;
  selectChat: (chat: ChatMessageType) => void;
}

export const useSelectedChatStore = create<SelectedChatState>((set) => ({
  selectChat: (chat: ChatMessageType) => set({ chat }),
}));