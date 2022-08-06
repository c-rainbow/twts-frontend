import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';

import { useFollowInfoStore } from '@/states';
import type { FollowInfoType } from '@/types/types';

function RecentFollowerList() {
  const [followInfos, addFollowInfos] = useFollowInfoStore((state) => [
    state.followInfos,
    state.addFollowInfos,
  ]);

  const updateFollowerList = (newFollowInfos: FollowInfoType[]) => {
    console.log('newFollowInfos:', newFollowInfos);
    console.log('followInfos:', followInfos);
    /*
    const followInfoMap = new Map<string, FollowInfoType>();
    followInfos.forEach((followInfo) =>
      followInfoMap.set(followInfo.followerId, followInfo)
    );
    newFollowInfos.forEach((followInfo) =>
      followInfoMap.set(followInfo.followerId, followInfo)
    );

    let newList = Array.from(followInfoMap.values());
    console.log('newList:', newFollowInfos);
    /*
    newList.sort((a, b) => {
      if (a.timestamp.seconds > b.timestamp.seconds) return -1;
      if (a.timestamp.seconds < b.timestamp.seconds) return 1;
      // Just for tie-breaking in rare cases
      return a.followerId.localeCompare(b.followerId);
    });
    */
    /*
    if (newList.length > MAX_SIZE) {
      newList = newList.slice(0, MAX_SIZE);
    }
    */
    console.log('newlist final:', newFollowInfos);
    addFollowInfos(newFollowInfos);
  };

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
    // const analytics = getAnalytics(app);
    const db = getFirestore(app);

    const now = new Date();
    const func = async () => {
      // TODO: remove hardcoded value
      const q2 = query(
        collection(db, 'followers'),
        where('streamerId', '==', '403883450'),
        where('timestamp', '>', now),
        orderBy('timestamp', 'desc')
      );
      onSnapshot(q2, (snapshot) => {
        // console.log("Current data: ", doc.data());
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('New: ', change.doc.data());
            updateFollowerList([{ ...(change.doc.data() as FollowInfoType) }]);
          }
          if (change.type === 'modified') {
            console.log('Modified: ', change.doc.data());
            updateFollowerList([{ ...(change.doc.data() as FollowInfoType) }]);
          }
          if (change.type === 'removed') {
            console.log('Removed: ', change.doc.data());
          }
        });
      });

      const q1 = query(
        collection(db, 'followers'),
        where('streamerId', '==', '403883450'),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q1);
      const initialFollowerList = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as FollowInfoType),
      }));
      updateFollowerList(initialFollowerList as FollowInfoType[]);
    };
    func();
  }, []);

  return (
    <>
      <div>
        {followInfos.map((followInfo) => {
          return (
            <div key={followInfo.followerId}>
              <>
                {followInfo.followerDisplayName},{' '}
                {new Date(followInfo.timestamp.seconds * 1000).toISOString()}
              </>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RecentFollowerList;
