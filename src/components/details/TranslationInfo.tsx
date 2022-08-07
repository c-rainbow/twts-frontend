import { getFullname } from "@/libs/username";
import { useSelectedFollowInfoStore } from "@/states/follows";
import { useEffect, useState } from "react";
import axios from 'axios';


interface TranslationResponse {
  translated: string;
  srcLang: string;
  destLang: string,
  pronunciation: {
    text: string,
    pinyin: string,
    romaji: string,
  }
}


function TranslationInfo() {
  const [followInfo] = useSelectedFollowInfoStore(state => [state.followInfo]);
  const [translation, setTranslation] = useState<string>();
  const [pinyin, setPinyin] = useState<string>();
  const [romaji, setRomaji] = useState<string>();

  useEffect(() => {
    if (!followInfo) {
      return;
    }
    const func = async () => {
      const response = await axios.post<TranslationResponse>('http://localhost:3001/translate', {
        displayName: followInfo.followerDisplayName
      });
      // response.data
      setTranslation(response.data.translated);
      setPinyin(response.data.pronunciation.pinyin);
      setRomaji(response.data.pronunciation.romaji || '');

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