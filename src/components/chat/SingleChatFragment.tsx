import { ChatToken } from "@twtts/shared";

interface PropType {
  fragment: ChatToken;
}

export default function SingleChatToken({ fragment: token }: PropType) {

  switch(token.type) {
    case 'mention':
      return (
        <>
          <span className="font-medium">{token.text}</span>{' '}
        </>
      );
    case 'emote':
      return (
        <>
          <img src={token.emote?.url}/>{' '}
        </>
      );
    case 'link':
      return (
        <>
          <a href={token.text}>{token.text}</a>{' '}
        </>
      );
    default:
      return <>{`${token.text} `}</>
  }
}
