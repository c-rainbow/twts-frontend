import create from 'zustand';

import type { ChatMessageType, FollowInfoType } from '@/types/types';

export interface SelectedInfoState {
  chat?: ChatMessageType;
  followInfo?: FollowInfoType;
  selectChat: (chat: ChatMessageType) => void;
  selectFollow: (followInfo: FollowInfoType) => void;
}

export const useSelectedInfoStore = create<SelectedInfoState>((set) => ({
  selectChat: (chat: ChatMessageType) => set({ chat, followInfo: undefined }),
  selectFollow: (followInfo: FollowInfoType) =>
    set({ followInfo, chat: undefined }),
}));
