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
    const { chats, maxSize } = get();
    chats.push(chat);

    if (chats.length > maxSize) {
      set({ chats: chats.slice(-maxSize) });
    } else {
      set({ chats });
    }
  },
}));
