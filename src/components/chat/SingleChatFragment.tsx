import type { ChatFragment } from '@/types/types';

interface PropType {
  fragment: ChatFragment;
}

export default function SingleChatFragment({ fragment }: PropType) {
  return <>{` ${fragment.text} `}</>;
}
