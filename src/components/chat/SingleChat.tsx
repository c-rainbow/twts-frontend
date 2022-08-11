import type { ChatMessageType } from '@/types/types';
import { ChatToken } from '@twtts/shared';
import { useSelectedChatStore } from '../../states/chats';
import SingleChatToken from './SingleChatFragment';

type SingleChatPropType = {
  chat: ChatMessageType;
};

export default function SingleChat({ chat }: SingleChatPropType) {
  const [selectChat] = useSelectedChatStore(state => [state.selectChat])

  return (
    <div className="mt-1 ">
      <span
        className="mr-1 font-bold"
        style={{ color: chat.color ?? '#b22222' }}
      >
        {chat.fullName}
      </span>
      :
      <span className="mr-1" onClick={() => selectChat(chat)}>
        {chat.message}
        {chat.tokens.map((fragment: ChatToken) => (
          <SingleChatToken fragment={fragment} />
        ))}
      </span>
    </div>
  );
}
