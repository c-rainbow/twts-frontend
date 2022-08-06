import type { ChatMessageType } from '../../types/types';
import SingleChat from './SingleChat';

type PropType = {
  chatList: ChatMessageType[];
};

export default function ChatList({ chatList }: PropType) {
  return (
    <div className="w-full overflow-y-scroll">
      {chatList.map((singleChat: ChatMessageType) => {
        return <SingleChat key={singleChat.uuid} chat={singleChat} />;
      })}
    </div>
  );
}
