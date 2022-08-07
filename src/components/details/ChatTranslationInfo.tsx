import { getFullname } from "@/libs/username";
import { useSelectedFollowInfoStore } from "@/states/follows";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelectedChatStore } from "@/states/chats";
import { ChatFragment } from '../../types/types';
import SingleChatFragment from "../chat/SingleChatFragment";


interface ChatTranslationOutput {
	original: ChatFragment[];  // Fragments of the original chat message.
  translated: ChatFragment[];  // Translated chat message. Undefined if not translated
  srcLang: string;  // Source language
  destLang: string;  // Target language
	//displayName?: NameTranslationOutput;  // Translated display name, if translated
}

function ChatTranslationInfo() {
  const [selectedChat] = useSelectedChatStore(state => [state.chat]);
  const [translation, setTranslation] = useState<ChatFragment[]>([]);
  //const [pinyin, setPinyin] = useState<string>();
  //const [romaji, setRomaji] = useState<string>();

  useEffect(() => {
    if (!selectedChat) {
      return;
    }
    const func = async () => {
      const response = await axios.post<ChatTranslationOutput>('http://localhost:3001/chats/translate/test', {
        channelId: selectedChat.channelId,
        message: selectedChat.message,
        emotes: selectedChat.emotes
      });
      // response.data
      setTranslation(response.data.translated);
      //setPinyin(response.data.pronunciation.pinyin);
      //setRomaji(response.data.pronunciation.romaji || '');

    };
    func();
  }, [selectedChat]);

  if (!selectedChat) {
    return null;
  }

  return (
    <div className="bg-base-200">
      <div className="content">
        <div className="">
          <h1 className="text-3xl font-bold py-5 text-center">Chat Info</h1>
          <div className="font-medium py-5 text-center">
            {selectedChat.message}
          </div>
          <table className="table w-full">
            {/* head */}
            <tbody>
              <tr>
                <td className="font-medium bg-base-200">Translation</td>
                <td className='bg-base-200 text-left'>
                  {translation.map(
                    fragment => <SingleChatFragment fragment={fragment} />
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-medium bg-base-200">Pinyin</td>
                <td className='bg-base-200 text-left'>{''}</td>
              </tr>
              <tr>
                <td className="font-medium bg-base-200">Romaji</td>
                <td className='bg-base-200 text-left'>{''}</td>
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



export default ChatTranslationInfo;