import type { ChatMessageType } from '@/types/types';
import { ChatToken } from '@twtts/shared';
import SingleChatToken from './SingleChatToken';
import userColorCache from '../../libs/usercolor';
import { useSelectedInfoStore } from '@/states/selectInfo';

type SingleChatPropType = {
  chat: ChatMessageType;
};

export default function SingleChat({ chat }: SingleChatPropType) {
  const [selectChat] = useSelectedInfoStore((state) => [state.selectChat]);

  return (
    <div
      className="py-1 cursor-pointer hover:bg-gray-200"
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
        {chat.tokens.map((token: ChatToken) => (
          <SingleChatToken token={token} />
        ))}
      </span>
    </div>
  );
}
