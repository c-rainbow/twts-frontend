import { ApiClient } from '@twurple/api';
import { ClientCredentialsAuthProvider } from '@twurple/auth';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import type { Client } from 'tmi.js';

import ChatList from '@/components/chat/ChatList';
import RecentFollowerList from '@/components/followers/RecentFollowerList';
import { useChatListStore } from '@/states/chats';

import TranslationDetails from '../components/details/TranslationDetails';
import { isTranslationSupported } from '../libs/channels';
import { getChatClient } from '../libs/chatclient';
import { getFullname } from '../libs/username';

function getChannelName(
  params: ParsedUrlQuery | undefined
): string | undefined {
  if (!params) {
    return undefined;
  }
  const { channelName } = params;
  if (typeof channelName === 'string') {
    return channelName;
  }
  if (Array.isArray(channelName) && channelName.length > 0) {
    return channelName[0];
  }
  return undefined;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const channelName = getChannelName(context.params);
  if (!channelName) {
    console.log('Channel name is empty');
    return { notFound: true };
  }

  // Twitch credentials to get channel ID
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.log('Twitch client ID or secret is empty');
    // TODO: Is "notFound" the right answer here?
    return { notFound: true };
  }

  try {
    const authProvider = new ClientCredentialsAuthProvider(
      clientId!,
      clientSecret!
    );
    const apiClient = new ApiClient({ authProvider });
    const user = await apiClient.users.getUserByName(channelName);
    if (!user) {
      return { notFound: true };
    }

    const isSupportedChannel = isTranslationSupported(user.id);
    if (!isSupportedChannel) {
      return { notFound: true };
    }

    return {
      props: {
        channelName: user.name,
        channelDisplayName: user.displayName,
        channelId: user.id,
      },
    };
  } catch (e: any) {
    console.log('Error while fetching user ID from Twitch', e);
    // TODO: Is "notFound" the right answer here?
    return { notFound: true };
  }
};

interface PropType {
  channelName: string;
  channelDisplayName: string;
  channelId: string;
}

let client: Client;

function Home({ channelName, channelDisplayName, channelId }: PropType) {
  const [chatList, addChat] = useChatListStore((state) => [
    state.chats,
    state.addChat,
  ]);

  useEffect(() => {
    if (!channelName) {
      return;
    }

    if (!client) {
      client = getChatClient([channelName], addChat);
      client.connect();
      console.log('connected to client');
    }
  }, [channelName]);

  return (
    <>
      <Head>
        <title>Hello2</title>
      </Head>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar w-full bg-sky-100">
            <div className="mx-2 flex-1 justify-center px-2 text-center text-2xl">
              {getFullname(channelName, channelDisplayName)}
            </div>
          </div>
          {/* Page content here */}
          <div className="content grid min-w-[1075px] grid-cols-3 gap-3 break-words px-2">
            {/* Left pane */}
            <div className="min-w-[350px]">
              <h1 className="py-3 text-center text-xl">Recent Followers</h1>
              <RecentFollowerList channelId={channelId} />
            </div>
            {/* Middle pane */}
            <div className="min-w-[350px]">
              <h1 className="py-3 text-center text-xl">Chats</h1>
              <ChatList chatList={chatList} />
            </div>
            {/* Right pane */}
            <div className="min-w-[350px]">
              <h1 className="py-3 text-center text-xl">Translation</h1>
              <TranslationDetails />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
