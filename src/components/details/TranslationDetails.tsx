import { useSelectedInfoStore } from '@/states/selectInfo';
import ChatTranslationDetails from './ChatTranslationDetails';
import FollowerTranslationDetails from './FollowerTranslationDetails';

function TranslationDetails() {
  const [chat, followInfo] = useSelectedInfoStore((state) => [
    state.chat,
    state.followInfo,
  ]);

  if (chat) {
    return <ChatTranslationDetails chat={chat} />;
  }

  if (followInfo) {
    return <FollowerTranslationDetails followInfo={followInfo} />;
  }

  console.log('none');

  return null;
  {
    /*
  const [translatedName, setTranslatedName] = useState<string>();
  const [translatedChat, setTranslatedChat] = useState<ChatToken[]>();
  const [pinyin, setPinyin] = useState<string>();
  const [romaji, setRomaji] = useState<string>();

  // Fetch display name translation from follow info
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
      setTranslatedName(response.data.translated);
      setPinyin(response.data.pronunciation?.pinyin);
      setRomaji(response.data.pronunciation?.romaji);
    };
    func();
  }, [followInfo]);

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
      setTranslatedChat(response.data.translated || response.data.original);
      setTranslatedName(response.data.displayName?.translated);
      setPinyin(response.data.displayName?.pronunciation?.pinyin);
      setRomaji(response.data.displayName?.pronunciation?.romaji);
    };
    func();
  }, [chat]);

  if (!followInfo && !chat) {
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
        {translatedChat && (
          <div className="py-2">
            <span className="font-medium pl-3 pr-4">Translation</span>
            <span className="text-left">
              <SingleChat chat={chat} />
              </span>
          </div>
        )}
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
    </div>
  );*/
  }
}

export default TranslationDetails;
