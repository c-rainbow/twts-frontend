import type { ChatMessageType } from '../../types/types';
import SingleChat from './SingleChat';

type PropType = {
  chatList: ChatMessageType[];
};

export default function ChatList({ chatList }: PropType) {
  return (
    <div className="max-h-[600px] min-w-[350px] overflow-y-auto px-2 text-base">
      {chatList.map((singleChat: ChatMessageType) => {
        return <SingleChat key={singleChat.uuid} chat={singleChat} />;
      })}
    </div>
  );
}
