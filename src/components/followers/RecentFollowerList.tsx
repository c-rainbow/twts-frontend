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
import { useEffect, useState } from 'react';

const MAX_SIZE = 30;

interface FollowInfoType {
  followerDisplayName: string;
  followerId: string;
  followerLogin: string;

  streamerDisplayName: string;
  streamerId: string;
  streamerLogin: string;

  timestamp: Date;
}

function RecentFollowerList() {
  const [followers, setFollowers] = useState<FollowInfoType[]>([]);

  const updateFollowerList = (newFollowers: FollowInfoType[]) => {
    const followerMap = new Map<string, FollowInfoType>();
    followers.forEach((follower) =>
      followerMap.set(follower.followerId, follower)
    );
    newFollowers.forEach((follower) =>
      followerMap.set(follower.followerId, follower)
    );

    let newList = Array.from(followerMap.values());
    newList.sort((a, b) => {
      if (a.timestamp > b.timestamp) return -1;
      if (a.timestamp < b.timestamp) return 1;
      // Just for tie-breaking in rare cases
      return a.followerId.localeCompare(b.followerId);
    });

    if (newList.length > MAX_SIZE) {
      newList = newList.slice(0, MAX_SIZE);
    }
    setFollowers(newList);
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

    const func = async () => {
      // TODO: remove hardcoded value
      const q2 = query(
        collection(db, 'followers'),
        where('streamerId', '==', '403883450')
      );
      onSnapshot(q2, (snapshot) => {
        // console.log("Current data: ", doc.data());
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('New: ', change.doc.data());
            updateFollowerList([change.doc.data() as FollowInfoType]);
          }
          if (change.type === 'modified') {
            console.log('Modified: ', change.doc.data());
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
        limit(10)
      );
      const querySnapshot = await getDocs(q1);
      const initialFollowerList = querySnapshot.docs.map((doc) => doc.data());
      updateFollowerList(initialFollowerList as FollowInfoType[]);
    };
    func();
  }, []);

  return (
    <>
      <div>Hello</div>
    </>
  );
}

export default RecentFollowerList;
