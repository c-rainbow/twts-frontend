import type {
  TranslateNameRequest,
  TranslateNameResponse,
} from '@twtts/shared';
import ISO6391 from 'iso-639-1';
import { useEffect, useState } from 'react';

import { getFullname } from '@/libs/username';
import type { FollowInfoType } from '@/types/types';

import apiclient from '../../libs/apiclient';

interface PropType {
  followInfo: FollowInfoType;
}

function FollowerTranslationDetails({ followInfo }: PropType) {
  const [translation, setTranslation] = useState<string>();
  const [srcLang, setSrcLang] = useState<string>();
  const [pinyin, setPinyin] = useState<string>();
  const [romaji, setRomaji] = useState<string>();

  useEffect(() => {
    if (!followInfo) {
      return;
    }

    const request: TranslateNameRequest = {
      displayName: followInfo.followerDisplayName,
      configs: {
        defaultTargetLang: 'en',
      },
    };

    const func = async () => {
      const response = await apiclient.post<TranslateNameResponse>(
        '/api/translate/name',
        request
      );

      const result = response.data;
      setTranslation(result.translated || result.original);
      setSrcLang(ISO6391.getName(result.srcLang.slice(0, 2)));

      // TODO: Handle this in backend
      if (result.srcLang.startsWith('zh')) {
        setPinyin(result.pronunciation?.pinyin);
      } else {
        setPinyin(undefined);
      }

      // TODO: Handle this in backend
      if (result.srcLang === 'ja') {
        setRomaji(result.pronunciation?.romaji);
      } else {
        setRomaji(undefined);
      }
    };
    func();
  }, [followInfo]);

  if (!followInfo) {
    return null;
  }

  return (
    <div className="content">
      <div className="py-3 text-center text-xl font-medium">
        {getFullname(followInfo.followerLogin, followInfo.followerDisplayName)}
      </div>
      {srcLang && (
        <div className="py-2">
          <span className="pl-3 pr-4 font-medium">Language</span>
          <span className="text-left">{srcLang}</span>
        </div>
      )}
      <div className="py-2">
        <span className="pl-3 pr-4 font-medium">Translation</span>
        <span className="text-left">{translation}</span>
      </div>
      {pinyin && (
        <div className="py-2">
          <span className="pl-3 pr-4 font-medium">Pinyin</span>
          <span className="text-left">{pinyin}</span>
        </div>
      )}
      {romaji && (
        <div className="py-2">
          <span className="pl-3 pr-4 font-medium">Romaji</span>
          <span className="text-left">{romaji}</span>
        </div>
      )}
    </div>
  );
}

export default FollowerTranslationDetails;
