import type { ChatUserstate } from 'tmi.js';

import type { ChatMessageType } from '@/types/types';
import { ChatToken, TwitchEmoteTags } from '@twtts/shared';
import tokenizer from '@/libs/tokenizer';
import { getFullname } from './username';

export async function makeChatMessage(
  channel: string,
  userstate: ChatUserstate,
  message: string
): Promise<ChatMessageType> {
  const channelId = userstate['room-id']!; // This tag always exists.
  const tokens = await tokenizer.tokenize(
    channelId,
    message,
    userstate.emotes || {}
  );
  return new ChatMessage(channel, userstate, message, tokens);
}

class ChatMessage implements ChatMessageType {
  readonly channel: string;
  readonly userstate: ChatUserstate;
  readonly message: string;
  readonly tokens: ChatToken[];

  constructor(
    channel: string,
    userstate: ChatUserstate,
    message: string,
    tokens: ChatToken[]
  ) {
    this.channel = channel;
    this.userstate = userstate;
    this.message = message;
    this.tokens = tokens;
  }

  get uuid() {
    return this.userstate.id!;
  }

  get userId() {
    return this.userstate['user-id']!;
  }

  get username() {
    return this.userstate.username!;
  }

  get displayName() {
    return this.userstate['display-name']!;
  }

  get color() {
    return this.userstate.color;
  }

  get fullName() {
    return getFullname(this.username, this.displayName);
  }

  get channelId() {
    return this.userstate['room-id']!;
  }

  get emotes(): TwitchEmoteTags {
    return this.userstate.emotes || {};
  }

  get textMessage() {
    const textTokens = this.tokens
      .filter((token) => token.type === 'text')
      .map((token) => token.text.trim());
    return textTokens.join(' ');
  }

  get isEmoteOnly() {
    return this.tokens.filter((token) => token.type !== 'emote') === [];
  }
}
