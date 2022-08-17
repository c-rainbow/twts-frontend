import { useEffect, useRef, useState } from 'react';
import type { ChatMessageType } from '../../types/types';
import SingleChat from './SingleChat';

function scrollToBottom(elem?: HTMLElement | null, behavior?: ScrollBehavior) {
  if (!elem) {
    return;
  }

  elem.scrollTo({
    top: elem.scrollHeight,
    behavior,
  });
}

function isScrollAlmostAtBottom(elem: HTMLElement): boolean {
  // Always return true if the element is not ready.
  // It means that the scrollbar is not present.
  if (!elem) {
    return true;
  }

  // Always true if scrollbar is not present
  if (elem.offsetHeight === elem.scrollHeight) {
    return true;
  }

  // If the scroll is within 5px from the bottom of the element
  const scrollBottomPos = elem.scrollTop + elem.offsetHeight + 5;
  return scrollBottomPos >= elem.scrollHeight;
}

type PropType = {
  chatList: ChatMessageType[];
};

export default function ChatList({ chatList }: PropType) {
  const [isScrollInMiddle, setIsScrollInMiddle] = useState<boolean>(false);
  const chatListRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const elem = chatListRef.current;
    if (!elem) {
      return;
    }

    setIsScrollInMiddle(!isScrollAlmostAtBottom(elem));
  };

  const clickScrollToBottom = () => {
    scrollToBottom(chatListRef.current);
  };

  useEffect(() => {
    // Only auto-scroll to the bottom if the scroll is already at the bottom
    if (isScrollInMiddle) {
      console.log('Scroll is not almost at the bottom');
      return;
    } else {
      console.log('Scroll is almost at the bottom');
    }

    scrollToBottom(chatListRef.current);
  }, [chatListRef.current, chatList.length]);

  return (
    <div
      className="max-h-[600px] min-w-[350px] overflow-y-auto px-2 text-base"
      ref={chatListRef}
      onScroll={handleScroll}
    >
      {chatList.map((singleChat: ChatMessageType) => {
        return <SingleChat key={singleChat.uuid} chat={singleChat} />;
      })}
      {isScrollInMiddle && (
        <div
          className="sticky bottom-4 w-full btn opacity-80"
          onClick={clickScrollToBottom}
        >
          Click to see recent messages
        </div>
      )}
    </div>
  );
}
