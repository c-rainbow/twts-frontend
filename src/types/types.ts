import type { ChatUserstate } from 'tmi.js';

export interface TwitchEmoteTags {
  [emoteId: string]: string[];
}

export interface ChatFragment {
  text: string;
  // emote?: Emote;
}

export interface ChatMessageType {
  channel: string; // Channel name (streamer's username)
  userstate: ChatUserstate;
  message: string;
  fragments: ChatFragment[];

  // Wrapper for userstate properties
  uuid: string;
  username: string;
  displayName: string;
  channelId: string;
  color?: string;
  emotes: TwitchEmoteTags;

  // Compound properties
  fullName: string;
  textMessage: string;
  isEmoteOnly: boolean;
}

export interface FollowInfoType {
  followerDisplayName: string;
  followerId: string;
  followerLogin: string;

  streamerDisplayName: string;
  streamerId: string;
  streamerLogin: string;

  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
}
