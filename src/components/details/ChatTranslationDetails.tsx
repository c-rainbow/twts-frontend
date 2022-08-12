import { useEffect, useState } from 'react';
import SingleChatToken from '../chat/SingleChatToken';
import {
  ChatToken,
  TranslateChatResponse,
  TranslateChatRequest,
} from '@twtts/shared';
import apiclient from '../../libs/apiclient';
import { ChatMessageType } from '../../types/types';

interface PropType {
  chat: ChatMessageType;
}

function ChatTranslationDetails({ chat }: PropType) {
  const [translation, setTranslation] = useState<ChatToken[]>([]);

  useEffect(() => {
    if (!chat) {
      return;
    }

    const request: TranslateChatRequest = {
      tokens: chat.tokens,
      displayName: chat.displayName,
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
  }, [chat]);

  if (!chat) {
    return null;
  }

  return (
    <div className="content">
      <div className="font-medium py-3 text-center">
        {chat.tokens.map((token) => (
          <SingleChatToken token={token} />
        ))}
      </div>
      <div className="py-2">
        <span className="font-medium pl-3 pr-4">Translation</span>
        <span className="text-left">
          {translation.map((token) => (
            <SingleChatToken token={token} />
          ))}
        </span>
      </div>
    </div>
  );
}

export default ChatTranslationDetails;
