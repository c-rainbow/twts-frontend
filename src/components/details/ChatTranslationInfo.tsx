
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelectedChatStore } from "@/states/chats";
import SingleChatToken from "../chat/SingleChatFragment";
import { ChatToken, TranslateChatResponse } from "@twtts/shared";


function ChatTranslationInfo() {
  const [selectedChat] = useSelectedChatStore(state => [state.chat]);
  const [translation, setTranslation] = useState<ChatToken[]>([]);
  //const [pinyin, setPinyin] = useState<string>();
  //const [romaji, setRomaji] = useState<string>();

  useEffect(() => {
    if (!selectedChat) {
      return;
    }
    const func = async () => {
      const response = await axios.post<TranslateChatResponse>('http://localhost:3001/chats/translate/test', {
        channelId: selectedChat.channelId,
        message: selectedChat.message,
        emotes: selectedChat.emotes
      });
      // response.data
      setTranslation(response.data.translated || response.data.original);
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
                    fragment => <SingleChatToken fragment={fragment} />
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