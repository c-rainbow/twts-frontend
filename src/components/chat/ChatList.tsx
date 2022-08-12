import type { ChatMessageType } from '../../types/types';
import SingleChat from './SingleChat';

type PropType = {
  chatList: ChatMessageType[];
};

export default function ChatList({ chatList }: PropType) {
  return (
    <div className="min-w-[350px] overflow-y-auto max-h-[600px] text-base px-2">
      {chatList.map((singleChat: ChatMessageType) => {
        return <SingleChat key={singleChat.uuid} chat={singleChat} />;
      })}
    </div>
  );
}
