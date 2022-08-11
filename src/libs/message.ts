import type { ChatUserstate } from 'tmi.js';

import type { ChatMessageType } from '@/types/types';
import { ChatToken, TwitchEmoteTags } from '@twtts/shared';
import tokenizer from '@/libs/tokenizer';


export async function makeChatMessage(
  channel: string,
  userstate: ChatUserstate,
  message: string
): Promise<ChatMessageType> {
  const channelId = userstate['room-id']!;
  const tokens = await tokenizer.tokenize(channelId, message, userstate.emotes || {});
  return new ChatMessage(channel, userstate, message, tokens);
}


class ChatMessage implements ChatMessageType {
  channel: string;
  userstate: ChatUserstate;
  message: string;
  tokens: ChatToken[];

  constructor(
    channel: string,
    userstate: ChatUserstate,
    message: string,
    tokens: ChatToken[]
  ) {
    this.channel = channel;
    this.userstate = userstate;
    this.message = message;

    tokenizer.tokenize(this.channelId, message, this.emotes)
    this.tokens = tokens;
  }

  get uuid() {
    return this.userstate.id!;
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
    const usernameUpper = this.username.toLocaleUpperCase();
    const displayNameUpper = this.displayName.toLocaleUpperCase();
    if (usernameUpper === displayNameUpper) {
      return this.displayName;
    }
    return `${this.displayName}(${this.username})`;
  }

  get channelId() {
    return this.userstate['room-id']!;
  }

  get emotes(): TwitchEmoteTags {
    return this.userstate.emotes || {};
  }

  get textMessage() {
    const textTokens = this.tokens.map((token) => token.text.trim());
    return textTokens.join(' ');
  }

  get isEmoteOnly() {
    return this.emotes === {};
  }
}
