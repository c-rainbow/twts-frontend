import type { ChatMessageType } from '@/types/types';

type SingleChatPropType = {
  chat: ChatMessageType;
};

export default function SingleChat({ chat }: SingleChatPropType) {
  return (
    <div className="mt-1 ">
      <span
        className="mr-1 font-bold"
        style={{ color: chat.color ?? '#b22222' }}
      >
        {chat.fullName}
      </span>
      :
      <span className="mr-1">
        {chat.message}
        {/* {chat.fragments.map((fragment: ChatFragment) => (
          <SingleChatFragment fragment={fragment} />
        ))} */}
      </span>
    </div>
  );
}
