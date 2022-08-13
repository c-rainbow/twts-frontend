import type { ChatToken } from '@twtts/shared';

import { useSelectedInfoStore } from '@/states/selectInfo';
import type { ChatMessageType } from '@/types/types';

import userColorCache from '../../libs/usercolor';
import SingleChatToken from './SingleChatToken';

type SingleChatPropType = {
  chat: ChatMessageType;
};

export default function SingleChat({ chat }: SingleChatPropType) {
  const [selectChat] = useSelectedInfoStore((state) => [state.selectChat]);

  return (
    <div
      className="cursor-pointer py-1 hover:bg-gray-200"
      onClick={() => selectChat(chat)}
    >
      <span
        className="pr-1 font-bold"
        style={{ color: chat.color || userColorCache.getColor(chat.userId) }}
      >
        {chat.fullName}
      </span>
      :{' '}
      <span className="pr-1">
        {chat.tokens.map((token: ChatToken, index: number) => (
          <SingleChatToken key={index} token={token} />
        ))}
      </span>
    </div>
  );
}
