import type { ChatToken, TwitchEmoteTags } from '@twtts/shared';
import type { ChatUserstate, CommonUserstate, UserNoticeState } from 'tmi.js';

import tokenizer from '@/libs/tokenizer';
import type { ChatMessageType } from '@/types/types';

import { getFullname } from './username';

class ChatMessage implements ChatMessageType {
  readonly channel: string;

  readonly userstate: CommonUserstate;

  readonly message: string;

  readonly tokens: ChatToken[];

  constructor(
    channel: string,
    userstate: CommonUserstate,
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

  get messageType(): string {
    return this.userstate['message-type'];
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

class NoticeMessage extends ChatMessage {
  private _username: string | undefined;

  constructor(
    channel: string,
    userstate: CommonUserstate,
    message: string,
    tokens: ChatToken[],
    username?: string
  ) {
    super(channel, userstate, message, tokens);
    this._username = username;
  }

  get username(): string {
    return this._username || '';
  }
}

export async function makeNoticeMessage(
  channel: string,
  userstate: UserNoticeState,
  message?: string,
  username?: string
): Promise<ChatMessageType> {
  const channelId = userstate['room-id']!; // This tag always exists.
  const finalMessage = message || userstate.message || '';
  const tokens = await tokenizer.tokenize(
    channelId,
    finalMessage,
    userstate.emotes || {}
  );
  return new NoticeMessage(channel, userstate, finalMessage, tokens, username);
}
