import type { ChatFragment } from '@/types/types';

interface PropType {
  fragment: ChatFragment;
}

export default function SingleChatFragment({ fragment }: PropType) {

  switch(fragment.type) {
    case 'emote':
      return <img src={fragment.emote?.url}/>;
    case 'link':
      return <a href={fragment.text}>{fragment.text}</a>;
    default:
      return <>{` ${fragment.text} `}</>
  }
}
