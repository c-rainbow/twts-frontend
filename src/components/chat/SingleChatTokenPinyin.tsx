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
    case 'text':
      if (token.language?.startsWith('zh')) {
        return <>{token.pronunciation?.pinyin}</>;
      }
      return <>{token.text}</>;
    default:
      return <>{token.text}</>;
  }
}

/**
 * TODO: Refactor three very similar components:
 * SingleChatToken, SingleChatTokenPinyin, SingleChatTokenRomaji
 */
/**
 * Render a single chat token, pinyin if applicable
 */
export default function SingleChatTokenPinyin({ token }: PropType) {
  return <>{renderToken(token)} </>;
}
