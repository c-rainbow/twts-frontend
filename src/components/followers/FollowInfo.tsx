import { getFullname } from '@/libs/username';
import { FollowInfoType } from '../../types/types';

interface PropType {
  followInfo: FollowInfoType;
  index: number;
  selectFollow: (followInfo: FollowInfoType) => void;
}

function FollowInfo({ followInfo, index, selectFollow }: PropType) {
  return (
    <div
      className="grid grid-cols-10 gap-4 py-1 hover:bg-gray-200 cursor-pointer"
      onClick={() => selectFollow(followInfo)}
    >
      <div className="col-span-1 font-semibold text-emerald-600">
        {index + 1}
      </div>
      <div className="col-span-9">
        <div className="font-medium">
          {getFullname(
            followInfo.followerLogin,
            followInfo.followerDisplayName
          )}
        </div>
        <div className="font-light text-sm">
          {new Date(followInfo.timestamp.seconds * 1000).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default FollowInfo;
