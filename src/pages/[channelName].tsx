import Head from 'next/head';
import React, { useEffect } from 'react';
import { Client } from 'tmi.js';

import { makeChatMessage } from '@/libs/message';

import TranslationInfo from '@/components/details/TranslationInfo';
import ChatTranslationInfo from '@/components/details/ChatTranslationInfo';
import ChatList from '@/components/chat/ChatList';
import RecentFollowerList from '@/components/followers/RecentFollowerList';
import { useRouter } from 'next/router';
import { useChatListStore } from '@/states/chats';

// TODO: remove hardcoded channel name
let client: Client | null = null;

function Home() {
  const router = useRouter();
  const { channelName } = router.query;
  const channel = Array.isArray(channelName) ? channelName[0] : channelName;

  const [chatList, addChat] = useChatListStore((state) => [
    state.chats,
    state.addChat,
  ]);

  useEffect(() => {
    if (!channel) {
      return;
    }

    if (!client) {
      client = new Client({
        channels: [channel],
      });
      client.connect();
      console.log('connected to client');

      client.on('message', async (channel, userstate, message) => {
        const chatMessage = await makeChatMessage(channel, userstate, message);
        addChat(chatMessage);
      });
    }
  }, [channel]);

  return (
    <>
      <Head>
        <title>HyperChat</title>
      </Head>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar w-full bg-base-300">
            {/*
            <div className="flex-none md:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-ghost btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            */}
            <div className="mx-2 flex-1 px-2 text-2xl text-center justify-center">Translator</div>
            {/*
            <div className="hidden flex-none md:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here. Separate definition for sidebar content
                <li>
                  <a onClick={() => alert('config')}>Config</a>
                </li>
              </ul>
            </div>
            */}
          </div>
          {/* Page content here */}
          <div className="content px-2 grid grid-cols-3 gap-3 min-w-[1075px]">
            {/* Left pane */}
            <div className="left-pane min-w-[350px]">
              <h1 className="text-xl py-3 text-center">Recent Followers</h1>
              <RecentFollowerList />
            </div>
            {/* Middle pane */}
            <div className="middle-pane min-w-[350px]">
              <h1 className="text-xl py-3 text-center">Chats</h1>
              <ChatList chatList={chatList} />
            </div>
            {/* Right pane */}
            <div className="right-pane min-w-[350px]">
              <h1 className="text-xl py-3 text-center">Translation</h1>
              <TranslationInfo />
              <ChatTranslationInfo />
            </div>
          </div>
        </div>
        {/*
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu w-80 overflow-y-auto bg-base-100 p-4">
            <li>
              <a onClick={() => alert('test 1')}>Do something 1</a>
            </li>
            <li>
              <a onClick={() => alert('test 2')}>Do something 2</a>
            </li>
          </ul>
        </div>
        */}
      </div>
    </>
  );
}

export default Home;
