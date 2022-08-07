import create from 'zustand';

import type { FollowInfoType } from '@/types/types';

function compareFollowInfo(a: FollowInfoType, b: FollowInfoType) {
  const timestampCompare = a.timestamp
    .valueOf()
    .localeCompare(b.timestamp.valueOf());
  if (timestampCompare !== 0) {
    return -timestampCompare; // Descending order
  }
  // Just for tie-breaking when two people followed at the same nanosecond
  return a.followerId.localeCompare(b.followerId);
}

export interface FollowListState {
  followInfos: FollowInfoType[];
  maxSize: number;
  addFollows: (followInfos: FollowInfoType[]) => void;
}

export const useFollowInfoStore = create<FollowListState>((set, get) => ({
  followInfos: [],
  maxSize: 100,
  addFollows: (newFollowInfos: FollowInfoType[]) => {
    const { followInfos, maxSize } = get();

    /**
     * This step is necessary to remove duplicate, because Twitch sends webhook
     * notifications again if the same person unfollows and follows again
     */
    const followInfoMap = new Map<string, FollowInfoType>();
    followInfos.forEach((followInfo) =>
      followInfoMap.set(followInfo.followerId, followInfo)
    );
    newFollowInfos.forEach((followInfo) =>
      followInfoMap.set(followInfo.followerId, followInfo)
    );

    // Sort by timestamp in descending order
    let newList = Array.from(followInfoMap.values()).sort(compareFollowInfo);

    // Keep the list under the max size
    if (newList.length > maxSize) {
      newList = newList.slice(0, maxSize);
    }

    set({ followInfos: newList });
  },
}));

export interface SelectedFollowInfoState {
  followInfo?: FollowInfoType;
  selectFollow: (followInfo: FollowInfoType) => void;
}

export const useSelectedFollowInfoStore = create<SelectedFollowInfoState>((set) => ({
  selectFollow: (followInfo: FollowInfoType) => set({ followInfo }),
}));
