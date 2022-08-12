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
    const firebaseConfig = {
      apiKey: 'AIzaSyDZmZmaoAf9q1FZY_OPWGWXJSkf1naxmH0',
      authDomain: 'twts-test-project.firebaseapp.com',
      projectId: 'twts-test-project',
      storageBucket: 'twts-test-project.appspot.com',
      messagingSenderId: '37259466365',
      appId: '1:37259466365:web:d000c96002f0aa16160314',
      measurementId: 'G-4X7RRF8KCE',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const func = async () => {
      // TODO: remove hardcoded value
      const q2 = query(
        collection(db, 'followers'),
        where('streamerId', '==', '403883450'),
        orderBy('timestamp', 'desc'),
        limit(20)
      );
      onSnapshot(q2, (snapshot) => {
        // console.log("Current data: ", doc.data());
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('New: ', change.doc.data());
            addFollows([change.doc.data() as FollowInfoType]);
          }
          /*
          if (change.type === 'modified') {
            console.log('Modified: ', change.doc.data());
            updateFollowerList([change.doc.data() as FollowInfoType]);
          }
          if (change.type === 'removed') {
            console.log('Removed: ', change.doc.data());
          }
          */
        });
      });
    };
    func();
  }, []);

  return (
    <div className="overflow-y-auto max-h-[600px]">
      {followInfos.map((followInfo, index) => (
        <FollowInfo
          key={followInfo.followerId}
          followInfo={followInfo}
          index={index}
          selectFollow={selectFollow}
        />
      ))}
    </div>
  );
}

export default RecentFollowerList;
