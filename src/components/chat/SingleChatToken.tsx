import type { ChatToken } from '@twtts/shared';

interface PropType {
  token: ChatToken;
}

function renderToken(token: ChatToken) {
  switch (token.type) {
    case 'mention':
      return <span className="inline font-semibold">{token.text}</span>;
    case 'emote':
      return (
        <img
          className="inline"
          src={token.emote?.url}
          alt={token.emote?.name}
        />
      );
    case 'link':
      return (
        <a href={token.text} target="_blank" rel="noreferrer">
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
