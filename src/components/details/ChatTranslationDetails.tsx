import { useEffect, useState } from 'react';
import SingleChatToken from '../chat/SingleChatToken';
import {
  ChatToken,
  TranslateChatResponse,
  TranslateChatRequest,
} from '@twtts/shared';
import apiclient from '../../libs/apiclient';
import { ChatMessageType } from '../../types/types';
import ISO6391 from 'iso-639-1';

interface PropType {
  chat: ChatMessageType;
}

function ChatTranslationDetails({ chat }: PropType) {
  const [translatedTokens, setTranslatedTokens] = useState<ChatToken[]>();
  const [chatSrcLang, setChatSrcLang] = useState<string>();
  const [chatPinyin, setChatPinyin] = useState<string>();
  const [chatRomaji, setChatRomaji] = useState<string>();

  const [translatedName, setTranslatedName] = useState<string>();
  const [nameSrcLang, setNameSrcLang] = useState<string>();
  const [namePinyin, setNamePinyin] = useState<string>();
  const [nameRomaji, setNameRomaji] = useState<string>();

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
      setTranslatedTokens(result.translated);
      setChatSrcLang(ISO6391.getName(result.srcLang));

      const displayName = result.displayName;
      if (!displayName) {
        return;
      }
      setTranslatedName(displayName.translated);
      setNameSrcLang(ISO6391.getName(displayName.srcLang));
      
      // TODO: Handle this in backend
      if (displayName.srcLang.startsWith('zh')) {
        setNamePinyin(displayName.pronunciation?.pinyin);
      }
      else {
        setNamePinyin(undefined);
      }
      
      // TODO: Handle this in backend
      if (displayName.srcLang === 'ja') {
        setNameRomaji(displayName.pronunciation?.romaji);
      }
      else {
        setNameRomaji(undefined);
      }
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
      {chatSrcLang && chatSrcLang !== 'auto' && (
        <div className="py-2">
          <span className="font-medium pl-3 pr-4">Language</span>
          <span className="text-left">{chatSrcLang}</span>
        </div>
      )}
      {translatedTokens && (
        <div className="py-2">
          <span className="font-medium pl-3 pr-4">Translation</span>
          <span className="text-left">
            {translatedTokens.map((token) => 
              <SingleChatToken token={token} />
            )}
          </span>
        </div>
      )}

      <div className="divider divider-vertical"/>
      
      {translatedName && (
        <>
          <div className="py-2">
            <span className="font-medium pl-3 pr-4">Chatter</span>
            <span className="text-left">{chat.displayName}</span>
          </div>
          {nameSrcLang && (
            <div className="py-2">
              <span className="font-medium pl-3 pr-4">Language</span>
              <span className="text-left">{nameSrcLang}</span>
            </div>
          )}
          <div className="py-2">
            <span className="font-medium pl-3 pr-4">Translation</span>
            <span className="text-left">{translatedName}</span>
          </div>
          {namePinyin && (
            <div className="py-2">
              <span className="font-medium pl-3 pr-4">Pinyin</span>
              <span className="text-left">{namePinyin}</span>
            </div>
          )}
          {nameRomaji && (
            <div className="py-2">
              <span className="font-medium pl-3 pr-4">Romaji</span>
              <span className="text-left">{nameRomaji}</span>
            </div>
          )}
        </>
      )}

    </div>
  );
}

export default ChatTranslationDetails;
