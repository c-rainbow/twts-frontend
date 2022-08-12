import { ChatToken } from '@twtts/shared';

interface PropType {
  token: ChatToken;
}

function renderToken(token: ChatToken) {
  switch (token.type) {
    case 'mention':
      return <span className="font-semibold inline">{token.text}</span>;
    case 'emote':
      return <img className="inline" src={token.emote?.url} />;
    case 'link':
      return (
        <a href={token.text} target="_blank">
          {token.text}
        </a>
      );
    default:
      return <>{token.text}</>;
  }
}

/**
 * TODO: Refactor three very similar components:
 * SingleChatToken, SingleChatTokenPinyin, SingleChatTokenRomaji
 */
/**
 * Render a single chat token
 */
export default function SingleChatToken({ token }: PropType) {
  return <>{renderToken(token)} </>;
}
