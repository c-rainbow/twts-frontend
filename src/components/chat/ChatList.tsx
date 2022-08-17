import { useEffect, useRef, useState } from 'react';
import type { ChatMessageType } from '../../types/types';
import SingleChat from './SingleChat';

/**
 * @param elem HTML element to check
 * @returns true if the scroll is within 5px from the bottom of the element
 */
function isScrollAlmostAtBottom(elem: HTMLElement): boolean {
  const scrollBottomPos = elem.scrollTop + elem.offsetHeight + 5;
  return scrollBottomPos >= elem.scrollHeight;
}

type PropType = {
  chatList: ChatMessageType[];
};

export default function ChatList({ chatList }: PropType) {
  const [showScrollPaused, setShowScrollPaused] = useState<boolean>(false);
  const chatListRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const objDiv = chatListRef.current;
    if (!objDiv) {
      return;
    }

    if (isScrollAlmostAtBottom(objDiv)) {
      console.log('scroll is at the bottom');
    } else {
      // TODO: show the floating notification
      console.log('scroll is not at the bottom', objDiv.scrollTop);
    }
  };

  useEffect(() => {
    const elem = chatListRef.current;
    if (!elem || !chatList.length) {
      return;
    }

    // Only auto-scroll to the bottom if the scroll is already at the bottom
    /*if (!isScrollAlmostAtBottom(elem)) {
      return;
    }*/

    elem.scrollTo({
      top: elem.scrollHeight,
      behavior: 'auto', // can be 'smooth'
    });
  }, [chatListRef.current, chatList.length]);

  return (
    <div
      className="max-h-[100px] min-w-[350px] overflow-y-auto px-2 text-base"
      ref={chatListRef}
      onScroll={handleScroll}
    >
      {chatList.map((singleChat: ChatMessageType) => {
        return <SingleChat key={singleChat.uuid} chat={singleChat} />;
      })}
      {showScrollPaused && (
        <div className="sticky bottom-4 align-center btn glass">
          test
        </div>
      )}
    </div>
  );
}
