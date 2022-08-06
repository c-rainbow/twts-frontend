import create from 'zustand';

import type { ChatMessageType, FollowInfoType } from '@/types/types';

export interface ChatListState {
  followInfos: FollowInfoType[];
  maxSize: number;
  setFollowInfos: (followInfos: FollowInfoType[]) => void;
  addFollowInfos: (followInfos: FollowInfoType[]) => void;
}

export const useFollowInfoStore = create<ChatListState>((set, get) => ({
  followInfos: [],
  maxSize: 100,
  setFollowInfos: (followInfos: FollowInfoType[]) => {
    set({ followInfos });
  },
  addFollowInfos: (newFollowInfos: FollowInfoType[]) => {
    const { followInfos } = get();

    const followInfoMap = new Map<string, FollowInfoType>();
    followInfos.forEach((followInfo) =>
      followInfoMap.set(followInfo.followerId, followInfo)
    );
    newFollowInfos.forEach((followInfo) =>
      followInfoMap.set(followInfo.followerId, followInfo)
    );

    const newList = Array.from(followInfoMap.values());
    newList.sort((a, b) => {
      if (a.timestamp.seconds > b.timestamp.seconds) return -1;
      if (a.timestamp.seconds < b.timestamp.seconds) return 1;
      // Just for tie-breaking in rare cases
      return a.followerId.localeCompare(b.followerId);
    });
    // const newInfos = [...get().followInfos, ...followInfos];
    set({ followInfos: newList });
  },
}));

export interface SelectedChatState {
  chat?: ChatMessageType;
  selectChat: (chat: ChatMessageType) => void;
}

export const useSelectedChatStore = create<SelectedChatState>((set) => ({
  selectChat: (chat: ChatMessageType) => set({ chat }),
}));
