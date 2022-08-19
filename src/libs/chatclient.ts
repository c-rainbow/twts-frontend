import type { SubGiftUserstate } from 'tmi.js';
import { Client } from 'tmi.js';

import type { ChatMessageType } from '@/types/types';

import { makeChatMessage, makeNoticeMessage } from './message';

export function getChatClient(
  channels: string[],
  addChat: (chat: ChatMessageType) => void
): Client {
  const client = new Client({
    channels,
  });

  // Listen to normal chat messages
  client.on('message', async (channel, userstate, message) => {
    const chatMessage = await makeChatMessage(channel, userstate, message);
    addChat(chatMessage);
  });

  // Listen to bit messages
  client.on('cheer', async (channel, userstate, message) => {
    try {
      const chatMessage = await makeChatMessage(channel, userstate, message);
      addChat(chatMessage);
    } catch (e: any) {
      // TODO: do nothing for now. Make sure that this works.
    }
  });

  // Listen to subscription notifications
  client.on(
    'subscription',
    async (channel, username, _methods, message, userstate) => {
      const subMessage = await makeNoticeMessage(
        channel,
        userstate,
        message,
        username
      );
      addChat(subMessage);
    }
  );

  // Listen to re-subscription notifications
  client.on(
    'resub',
    async (channel, username, _months, message, userstate, _methods) => {
      const resubMessage = await makeNoticeMessage(
        channel,
        userstate,
        message,
        username
      );
      addChat(resubMessage);
    }
  );

  // Listen to subscription gift notifications
  client.on(
    'subgift',
    async (
      channel,
      username,
      _streakMonths,
      recipient,
      _methods,
      userstate: SubGiftUserstate
    ) => {
      try {
        const noticeMessage = await makeNoticeMessage(
          channel,
          userstate,
          `sub gift to ${recipient}`,
          username
        );
        addChat(noticeMessage);
      } catch (e: any) {
        // TODO: do nothing for now. Make sure that this works.
      }
    }
  );

  // Listen to mystery subscription gift messages
  client.on(
    'submysterygift',
    async (channel, username, numberOfSubs, _methods, userstate) => {
      try {
        const noticeMessage = await makeNoticeMessage(
          channel,
          userstate,
          `mystery sub gift to ${numberOfSubs} people`,
          username
        );
        addChat(noticeMessage);
      } catch (e: any) {
        // TODO: do nothing for now. Make sure that this works.
      }
    }
  );

  // Listen to anonymous subscription gift notifications
  client.on(
    'anonsubgift',
    async (channel, _streakMonths, recipient, _methods, userstate) => {
      try {
        const noticeMessage = await makeNoticeMessage(
          channel,
          userstate,
          `anonymous sub gift to ${recipient}`
        );
        addChat(noticeMessage);
      } catch (e: any) {
        // TODO: do nothing for now. Make sure that this works.
      }
    }
  );

  // Listen to anonymous mystery subscription gift messages
  client.on(
    'anonsubmysterygift',
    async (channel, numOfSubs, _methods, userstate) => {
      try {
        const noticeMessage = await makeNoticeMessage(
          channel,
          userstate,
          `anonymous sub gift to ${numOfSubs} people`
        );
        addChat(noticeMessage);
      } catch (e: any) {
        // TODO: do nothing for now. Make sure that this works.
      }
    }
  );

  return client;
}
