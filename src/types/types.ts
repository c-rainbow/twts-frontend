import { ChatToken, TwitchEmoteTags } from '@twtts/shared';
import type { Timestamp } from 'firebase/firestore';
import type { ChatUserstate } from 'tmi.js';


export interface ChatMessageType {
  channel: string; // Channel name (streamer's username)
  userstate: ChatUserstate;
  message: string;
  tokens: ChatToken[];

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

  // Cache for translation
  translation?: ChatMessageType;
}

export interface FollowInfoType {
  followerDisplayName: string;
  followerId: string;
  followerLogin: string;

  streamerDisplayName: string;
  streamerId: string;
  streamerLogin: string;

  timestamp: Timestamp;
}
