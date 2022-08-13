import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import {
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';

import { useFollowInfoStore } from '@/states/follows';
import type { FollowInfoType } from '@/types/types';
import FollowInfo from './FollowInfo';
import { useSelectedInfoStore } from '@/states/selectInfo';


function RecentFollowerList() {
  const [followInfos, addFollows] = useFollowInfoStore((state) => [
    state.followInfos,
    state.addFollows,
  ]);

  const [selectFollow] = useSelectedInfoStore((state) => [state.selectFollow]);

  useEffect(() => {
    const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
    if (!firebaseConfig) {
      return;
    }

    // Initialize Firebase
    const firebaseConfigJson = JSON.parse(firebaseConfig);
    const app = initializeApp(firebaseConfigJson);
    const db = getFirestore(app);

      // TODO: remove hardcoded value
      const recentFollowerQuery = query(
        collection(db, 'followers'),
        where('streamerId', '==', '403883450'),
        orderBy('timestamp', 'desc'),
        limit(15)
      );

      // Listen to the changes in recent followers
      onSnapshot(recentFollowerQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            addFollows([change.doc.data() as FollowInfoType]);
          }
        });
      });
  }, []);

  return (
    <div className="overflow-y-auto max-h-[600px]">
      {followInfos.length > 0 ? (
        followInfos.map((followInfo, index) => (
          <FollowInfo
            key={followInfo.followerId}
            followInfo={followInfo}
            index={index}
            selectFollow={selectFollow}
          />
        ))
      ) : (
        <div className="py-2 text-center text-gray-600">
          Cannot fetch recent followers
        </div>
      )}
    </div>
  );
}

export default RecentFollowerList;
