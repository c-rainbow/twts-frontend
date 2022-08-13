import type {
  ChatToken,
  TranslateChatRequest,
  TranslateChatResponse,
  TranslateNameResponse,
} from '@twtts/shared';
import ISO6391 from 'iso-639-1';
import { useEffect, useState } from 'react';

import apiclient from '../../libs/apiclient';
import type { ChatMessageType } from '../../types/types';
import SingleChatToken from '../chat/SingleChatToken';
import SingleChatTokenPinyin from '../chat/SingleChatTokenPinyin';
import SingleChatTokenRomaji from '../chat/SingleChatTokenRomaji';

interface PropType {
  chat: ChatMessageType;
}

function pinyinExists(tokens: ChatToken[]): boolean {
  for (const token of tokens) {
    if (token.type === 'text' && token.language?.startsWith('zh')) {
      return true;
    }
  }
  return false;
}

function romajiExists(tokens: ChatToken[]): boolean {
  for (const token of tokens) {
    if (token.type === 'text' && token.language === 'ja') {
      return true;
    }
  }
  return false;
}

function ChatTranslationDetails({ chat }: PropType) {
  const [originalTokens, setOriginalTokens] = useState<ChatToken[]>();
  const [translatedTokens, setTranslatedTokens] = useState<ChatToken[]>();
  const [chatSrcLang, setChatSrcLang] = useState<string>();
  const [hasPinyin, setHasPinyin] = useState<boolean>();
  const [hasRomaji, setHasRomaji] = useState<boolean>();

  const [translatedName, setTranslatedName] = useState<string>();
  const [nameSrcLang, setNameSrcLang] = useState<string>();
  const [namePinyin, setNamePinyin] = useState<string>();
  const [nameRomaji, setNameRomaji] = useState<string>();

  const setDisplayName = (response?: TranslateNameResponse) => {
    if (!response) {
      return;
    }
    setTranslatedName(response.translated);
    setNameSrcLang(ISO6391.getName(response.srcLang));

    // TODO: Handle this in backend
    if (response.srcLang.startsWith('zh')) {
      setNamePinyin(response.pronunciation?.pinyin);
    } else {
      setNamePinyin(undefined);
    }

    // TODO: Handle this in backend
    if (response.srcLang === 'ja') {
      setNameRomaji(response.pronunciation?.romaji);
    } else {
      setNameRomaji(undefined);
    }
  };

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

      const result = response.data;
      setOriginalTokens(result.original);
      setTranslatedTokens(result.translated);
      setChatSrcLang(ISO6391.getName(result.srcLang));
      setHasPinyin(pinyinExists(result.original));
      setHasRomaji(romajiExists(result.original));

      setDisplayName(result.displayName);
    };
    func();
  }, [chat]);

  if (!chat) {
    return null;
  }

  return (
    <div className="content">
      <div className="py-3 text-center font-medium">
        {chat.tokens.map((token, index) => (
          <SingleChatToken key={index} token={token} />
        ))}
      </div>
      {chatSrcLang && (
        <div className="py-2">
          <span className="pl-3 pr-4 font-medium">Language</span>
          <span className="text-left">{chatSrcLang}</span>
        </div>
      )}
      {translatedTokens && (
        <div className="py-2">
          <span className="pl-3 pr-4 font-medium">Translation</span>
          <span className="text-left">
            {translatedTokens.map((token, index) => (
              <SingleChatToken key={index} token={token} />
            ))}
          </span>
        </div>
      )}
      {hasPinyin && (
        <div className="py-2">
          <span className="pl-3 pr-4 font-medium">Pinyin</span>
          <span className="text-left">
            {originalTokens?.map((token, index) => (
              <SingleChatTokenPinyin key={index} token={token} />
            ))}
          </span>
        </div>
      )}
      {hasRomaji && (
        <div className="py-2">
          <span className="pl-3 pr-4 font-medium">Romaji</span>
          <span className="text-left">
            {originalTokens?.map((token, index) => (
              <SingleChatTokenRomaji key={index} token={token} />
            ))}
          </span>
        </div>
      )}

      <div className="divider divider-vertical" />

      {translatedName && (
        <>
          <div className="py-2">
            <span className="pl-3 pr-4 font-medium">Chatter</span>
            <span className="text-left">{chat.displayName}</span>
          </div>
          {nameSrcLang && (
            <div className="py-2">
              <span className="pl-3 pr-4 font-medium">Language</span>
              <span className="text-left">{nameSrcLang}</span>
            </div>
          )}
          <div className="py-2">
            <span className="pl-3 pr-4 font-medium">Translation</span>
            <span className="text-left">{translatedName}</span>
          </div>
          {namePinyin && (
            <div className="py-2">
              <span className="pl-3 pr-4 font-medium">Pinyin</span>
              <span className="text-left">{namePinyin}</span>
            </div>
          )}
          {nameRomaji && (
            <div className="py-2">
              <span className="pl-3 pr-4 font-medium">Romaji</span>
              <span className="text-left">{nameRomaji}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChatTranslationDetails;
