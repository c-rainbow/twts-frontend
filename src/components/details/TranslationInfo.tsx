import { getFullname } from '@/libs/username';
import { useSelectedFollowInfoStore } from '@/states/follows';
import { useEffect, useState } from 'react';
import { TranslateNameRequest, TranslateNameResponse } from '@twtts/shared';
import apiclient from '../../libs/apiclient';

function TranslationInfo() {
  const [followInfo] = useSelectedFollowInfoStore((state) => [
    state.followInfo,
  ]);
  const [translation, setTranslation] = useState<string>();
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
      setTranslation(response.data.translated || response.data.original);
      setPinyin(response.data.pronunciation?.pinyin);
      setRomaji(response.data.pronunciation?.romaji);
    };
    func();
  }, [followInfo]);

  if (!followInfo) {
    return null;
  }

  return (
    <div className="content">
      <div className="">
        <h1 className="text-2xl py-3 text-center">Translation</h1>
        <div className="text-xl font-medium py-3 text-center">
          {getFullname(
            followInfo.followerLogin,
            followInfo.followerDisplayName
          )}
        </div>
        <div className="py-2">
          <span className="font-medium pl-3 pr-4">Translation</span>
          <span className="text-left">{translation}</span>
        </div>
        <div className="py-2">
          <span className="font-medium pl-3 pr-4">Pinyin</span>
          <span className="text-left">{pinyin}</span>
        </div>
        <div className="py-2">
          <span className="font-medium pl-3 pr-4">Romaji</span>
          <span className="text-left">{romaji}</span>
        </div>
      </div>
    </div>
  );
}

export default TranslationInfo;
