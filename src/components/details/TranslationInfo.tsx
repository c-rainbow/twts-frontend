import { getFullname } from "@/libs/username";
import { useSelectedFollowInfoStore } from "@/states/follows";
import { useEffect, useState } from "react";
import { TranslateNameRequest, TranslateNameResponse } from '@twtts/shared';
import apiclient from '../../libs/apiclient';



function TranslationInfo() {
  const [followInfo] = useSelectedFollowInfoStore(state => [state.followInfo]);
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
      }
    }

    const func = async () => {
      const response = await apiclient.post<TranslateNameResponse>('/api/translate/name', request);
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
    <div className="bg-base-200">
      <div className="content">
        <div className="">
          <h1 className="text-3xl font-bold py-5 text-center">Follower Info</h1>
          <div className="text-xl font-medium py-5 text-center">{
            getFullname(followInfo.followerLogin, followInfo.followerDisplayName)}
          </div>
          <table className="table w-full">
            {/* head */}
            <tbody>
              <tr>
                <td className="font-medium bg-base-200">Translation</td>
                <td className='bg-base-200 text-left'>{translation}</td>
              </tr>
              <tr>
                <td className="font-medium bg-base-200">Pinyin</td>
                <td className='bg-base-200 text-left'>{pinyin}</td>
              </tr>
              <tr>
                <td className="font-medium bg-base-200">Romaji</td>
                <td className='bg-base-200 text-left'>{romaji}</td>
              </tr>
              <tr>
                <td className="font-medium bg-base-200">Hanja</td>
                <td className='bg-base-200 text-left'>trans</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



export default TranslationInfo;