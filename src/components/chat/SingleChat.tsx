import type { ChatMessageType } from '@/types/types';
import { useSelectedChatStore } from '../../states/chats';

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
        {/* {chat.fragments.map((fragment: ChatFragment) => (
          <SingleChatFragment fragment={fragment} />
        ))} */}
      </span>
    </div>
  );
}
