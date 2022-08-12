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

  return null;
}

export default TranslationDetails;
