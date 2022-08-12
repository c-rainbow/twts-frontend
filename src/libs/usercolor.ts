import LruCache from 'lru-cache';

// List of default colors available for usernames.
const AVAILABLE_COLORS = [
  '#FF0000',
  '#00FF00',
  '#008000',
  '#B22222',
  '#FF7F50',
  '#9ACD32',
  '#FF4500',
  '#2E8B57',
  '#DAA520',
  '#D2691E',
  '#5F9EA0',
  '#1E90FF',
  '#FF69B4',
  '#8A2BE2',
  '#00FF7F',
];

function getNewUserColor(): string {
  const index = Math.floor(Math.random() * AVAILABLE_COLORS.length);
  return AVAILABLE_COLORS[index]!;
}

export class UserColorCache {
  private _lruCache: LruCache<string, string>;

  constructor() {
    this._lruCache = new LruCache<string, string>({
      max: 5000, // The value is color code. No need to limit the size to a small number
    });
  }

  getColor(userId: string): string {
    const cachedColor = this._lruCache.get(userId);
    if (cachedColor) {
      return cachedColor;
    }

    const userColor = getNewUserColor();
    this._lruCache.set(userId, userColor);
    return userColor;
  }
}

export default new UserColorCache();
