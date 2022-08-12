import { getFullname } from '@/libs/username';
import { useEffect, useState } from 'react';
import { TranslateNameRequest, TranslateNameResponse } from '@twtts/shared';
import apiclient from '../../libs/apiclient';
import { FollowInfoType } from '@/types/types';
import ISO6391 from 'iso-639-1';

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
      }
      else {
        setPinyin(undefined);
      }
      
      // TODO: Handle this in backend
      if (result.srcLang === 'ja') {
        setRomaji(result.pronunciation?.romaji);
      }
      else {
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
      <div className="text-xl font-medium py-3 text-center">
        {getFullname(followInfo.followerLogin, followInfo.followerDisplayName)}
      </div>
      {srcLang && (
        <div className="py-2">
          <span className="font-medium pl-3 pr-4">Language</span>
          <span className="text-left">{srcLang}</span>
        </div>
      )}
      <div className="py-2">
        <span className="font-medium pl-3 pr-4">Translation</span>
        <span className="text-left">{translation}</span>
      </div>
      {pinyin && (
        <div className="py-2">
          <span className="font-medium pl-3 pr-4">Pinyin</span>
          <span className="text-left">{pinyin}</span>
        </div>
      )}
      {romaji && (
        <div className="py-2">
          <span className="font-medium pl-3 pr-4">Romaji</span>
          <span className="text-left">{romaji}</span>
        </div>
      )}
      
    </div>
  );
}

export default FollowerTranslationDetails;
