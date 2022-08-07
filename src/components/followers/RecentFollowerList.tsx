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
import { useSelectedFollowInfoStore } from '../../states/follows';
import { getFullname } from '@/libs/username';


function RecentFollowerList() {
  const [followInfos, addFollows] = useFollowInfoStore((state) => [
    state.followInfos,
    state.addFollows,
  ]);

  const [selectFollow] = useSelectedFollowInfoStore(state => [state.selectFollow]);

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
    <>
      <h1 className="text-2xl">Recent Followers</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {followInfos.map((followInfo, index) => {
              return (
                <tr key={followInfo.followerId} onClick={() => selectFollow(followInfo)}>
                  <th className="text-emerald-800">{index+1}</th>
                  <td className="font-medium">{getFullname(followInfo.followerLogin, followInfo.followerDisplayName)}</td>
                  <td>{new Date(followInfo.timestamp.seconds * 1000).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RecentFollowerList;
