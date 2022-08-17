import { useEffect, useRef, useState } from 'react';

import type { ChatMessageType } from '../../types/types';
import SingleChat from './SingleChat';

function scrollToBottom(elem?: HTMLElement | null, behavior?: ScrollBehavior) {
  if (!elem) {
    return;
  }

  // TODO: Adding 1000px to the bottom of scroll height is an experiment.
  // There is a bug that autoscroll ia sometimes randomly disabled,
  // and adding some additional pixels seems to decrease the frequency.
  elem.scrollTo({
    top: elem.scrollHeight + 1000,
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

  // If the scroll is within 30px from the bottom of the element
  // 30px was decided after manual experiments with mouse wheels.
  // Additional pixels sometimes prevent disabled autoscroll issues.
  const scrollBottomPos = elem.scrollTop + elem.offsetHeight + 30;
  return scrollBottomPos >= elem.scrollHeight;
}

type PropType = {
  chatList: ChatMessageType[];
};

export default function ChatList({ chatList }: PropType) {
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const chatListRef = useRef<HTMLDivElement>(null);
  const lastChatId = chatList.length
    ? chatList[chatList.length - 1]?.uuid
    : null;

  const handleScroll = () => {
    const elem = chatListRef.current;
    if (!elem) {
      return;
    }

    setAutoScroll(isScrollAlmostAtBottom(elem));
  };

  const clickScrollToBottom = () => {
    setAutoScroll(true);
    scrollToBottom(chatListRef.current);
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom(chatListRef.current);
    }
  }, [chatListRef.current, lastChatId]);

  return (
    <div
      className="max-h-[600px] min-w-[350px] overflow-y-auto px-2 text-base"
      ref={chatListRef}
      onScroll={handleScroll}
    >
      {chatList.map((singleChat: ChatMessageType) => {
        return <SingleChat key={singleChat.uuid} chat={singleChat} />;
      })}
      {!autoScroll && (
        <div
          className="btn sticky bottom-4 w-full opacity-80"
          onClick={clickScrollToBottom}
        >
          Click to see recent messages
        </div>
      )}
    </div>
  );
}
