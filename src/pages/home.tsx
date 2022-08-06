import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import type { ChatUserstate } from 'tmi.js';
import { Client } from 'tmi.js';

import { ChatMessage } from '@/libs/message';
import type { ChatFragment, ChatMessageType } from '@/types/types';

import ChatList from '../components/chat/ChatList';

// TODO: remove hardcoded channel name
const currentChannel = 'c_rainbow';
let client: Client | null = null;

function Home() {
  const [chatList, setChatList] = useState<ChatMessageType[]>([]);
  const chatListRef = useRef(chatList);

  useEffect(() => {
    if (!client) {
      client = new Client({
        channels: [currentChannel],
      });
      client.connect();
      console.log('connected to client');

      client.on(
        'message',
        async (channel, userstate: ChatUserstate, message, self) => {
          console.log('channel:', channel);
          console.log('userstate:', userstate);
          console.log('message:', message);
          console.log('self:', self);

          const fragments: ChatFragment[] = [];

          let newList = [
            ...chatListRef.current,
            new ChatMessage(channel, userstate, message, fragments),
          ];

          // Keeps only the last 30 chats
          if (newList.length > 30) {
            newList = newList.slice(-30);
          }
          setChatList(newList);
          chatListRef.current = newList;
        }
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>HyperChat</title>
      </Head>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none md:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
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
            <div className="mx-2 flex-1 px-2 text-3xl">HyperChat</div>
            <div className="hidden flex-none md:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here. Separate definition for sidebar content */}
                <li>
                  <a onClick={() => alert('config')}>Config</a>
                </li>
                <li>
                  <a onClick={() => {}}>Login</a>
                </li>
                <li>
                  <a onClick={() => {}}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <div className="tabs">
            <a className="tab tab-lifted">Channel 1</a>
            <a className="tab tab-lifted tab-active">
              Channel Channel Channel 2
            </a>
            <a className="tab tab-lifted">Channel 3</a>
            <a className="tab tab-lifted">Channel 4</a>
            <a className="tab tab-lifted">Channel 5</a>
            <a className="tab tab-lifted">Channel 6</a>
            <a className="tab tab-lifted">Channel 7</a>
          </div>
          <div className="content flex">
            <div className="flex-1 p-1 ">
              <div className="w-full text-center text-2xl">
                Enter the channel name
              </div>
              <div className="divider my-2">
                {currentChannel
                  ? `Current in channel ${currentChannel}`
                  : 'Chat not activated'}
              </div>
              <ChatList chatList={chatList} />
            </div>
            <div className="flex-1 p-1">
              <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content text-center">
                  <div className="max-w-md">
                    <h1 className="text-5xl font-bold">
                      {/* {selectedChat?.displayName} */}
                    </h1>
                    <p className="pt-6 pb-2">
                      {/* {selectedChat?.fragments.map((fragment) => (
                        <SingleChatFragment fragment={fragment} />
                      ))} */}
                    </p>
                    <p className="pt-2 pb-6">
                      Translation: {/* {selectedChat?.translation?.text} */}
                    </p>
                    <button className="btn btn-primary">Learn more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu bg-base-100 w-80 overflow-y-auto p-4">
            {/* Sidebar content here. Separate menu content for navbar */}
            <li>
              <a onClick={() => alert('test 1')}>Do something 1</a>
            </li>
            <li>
              <a onClick={() => alert('test 2')}>Do something 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
