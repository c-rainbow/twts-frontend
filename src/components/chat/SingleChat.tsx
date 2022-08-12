import type { ChatMessageType } from '@/types/types';
import { ChatToken } from '@twtts/shared';
import { useSelectedChatStore } from '../../states/chats';
import SingleChatToken from './SingleChatToken';
import userColorCache from '../../libs/usercolor';

type SingleChatPropType = {
  chat: ChatMessageType;
};

export default function SingleChat({ chat }: SingleChatPropType) {
  const [selectChat] = useSelectedChatStore((state) => [state.selectChat]);

  return (
    <div className="mt-1 ">
      <span
        className="mr-1 font-bold"
        style={{ color: chat.color || userColorCache.getColor(chat.userId) }}
      >
        {chat.fullName}
      </span>
      :{' '}
      <span className="mr-1" onClick={() => selectChat(chat)}>
        {chat.tokens.map((token: ChatToken) => (
          <SingleChatToken token={token} />
        ))}
      </span>
    </div>
  );
}
