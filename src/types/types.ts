import type { Timestamp } from 'firebase/firestore';
import type { ChatUserstate } from 'tmi.js';


// TODO: Support unicode emotes
export type EmoteProvider = 'twitch' | 'bttv' | 'ffz' | '7tv';

export interface Emote {
  provider: EmoteProvider; // From which emote provider?
  id: string; // provider-specific unique ID
  name: string; //  name of the emote (ex: "BibleThump")
  url: string; // Default URL of the emote pic
}

export interface TwitchEmote extends Emote {
  provider: 'twitch';
}

export interface BttvEmote extends Emote {
  provider: 'bttv';
}

export interface FfzEmote extends Emote {
  provider: 'ffz';
}

export interface SevenTvEmote extends Emote {
  provider: '7tv';
}

export interface TwitchEmoteTags {
  [emoteId: string]: string[];
}


export interface Pronunciation {
  text: string; // Original text
  pinyin?: string; // Pinyin if the original is in Chinese language
  romaji?: string; // Romaji if the original is in Japanese language
  hanja?: string; // Hanja pronunciation if the original has Chinese characters
}


export type ChatFragmentType =
  | 'text'
  | 'emote'
  | 'link'
  | 'mention'
  | 'number'
  | 'special_characters';


export interface ChatFragment {
  type: ChatFragmentType; // Type of the fragment
  text: string; // Text of the fragment
  emote?: Emote; // If emote, emote detail.
  language?: string; // Language of the text, if applicable
  pronunciation?: Pronunciation; // Pronunciation of the fragment, if applicable
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
