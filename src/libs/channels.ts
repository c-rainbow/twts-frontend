const supportedChannelIds =
  process.env.TRANSLATION_ENABLED_CHANNEL_IDS?.split(',') || [];

/**
 * Since a call for translation is expensive,
 * only support translations for some channels.
 * @param channelId
 * @returns
 */
export function isTranslationSupported(channelId: string): boolean {
  // Translation is allowed for all channels.
  if (!supportedChannelIds.length) {
    return true;
  }
  return supportedChannelIds.includes(channelId);
}
