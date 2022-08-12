import { useEffect, useState } from 'react';
import { useSelectedChatStore } from '@/states/chats';
import SingleChatToken from '../chat/SingleChatToken';
import {
  ChatToken,
  TranslateChatResponse,
  TranslateChatRequest,
} from '@twtts/shared';
import apiclient from '../../libs/apiclient';

function ChatTranslationInfo() {
  const [selectedChat] = useSelectedChatStore((state) => [state.chat]);
  const [translation, setTranslation] = useState<ChatToken[]>([]);

  useEffect(() => {
    if (!selectedChat) {
      return;
    }

    const request: TranslateChatRequest = {
      tokens: selectedChat.tokens,
      displayName: selectedChat.displayName,
      configs: {
        defaultTargetLang: 'en',
      },
    };

    const func = async () => {
      const response = await apiclient.post<TranslateChatResponse>(
        '/api/translate/chat',
        request
      );
      setTranslation(response.data.translated || response.data.original);
    };
    func();
  }, [selectedChat]);

  if (!selectedChat) {
    return null;
  }

  return (
    <div className="bg-base-200">
      <div className="content">
        <h1 className="text-3xl font-bold py-3 text-center">Chat Info</h1>
        <div className="font-medium py-3 text-center">
          {selectedChat.tokens.map((token) => (
            <SingleChatToken token={token} />
          ))}
        </div>
        <div className="py-2">
          <span className="font-medium bg-base-200 pl-3 pr-4">Translation</span>
          <span className="bg-base-200 text-left">
            {translation.map((token) => (
              <SingleChatToken token={token} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatTranslationInfo;
