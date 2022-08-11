import { ChatToken } from "@twtts/shared";

interface PropType {
  token: ChatToken;
}

export default function SingleChatToken({ token }: PropType) {

  // Render chat token
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
