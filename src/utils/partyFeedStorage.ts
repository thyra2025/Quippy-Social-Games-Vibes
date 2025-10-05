import { GameRecap } from '@/types/partyFeed';

const STORAGE_KEY_PREFIX = 'quippy-recaps-';
const MAX_RECAPS = 20;

export const saveRecap = (roomId: string, recap: GameRecap): void => {
  try {
    const storageKey = `${STORAGE_KEY_PREFIX}${roomId}`;
    const existing = getRecaps(roomId);
    const updated = [recap, ...existing].slice(0, MAX_RECAPS);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save recap:', error);
  }
};

export const getRecaps = (roomId: string): GameRecap[] => {
  try {
    const storageKey = `${STORAGE_KEY_PREFIX}${roomId}`;
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load recaps:', error);
    return [];
  }
};

export const getRecapById = (roomId: string, recapId: string): GameRecap | null => {
  const recaps = getRecaps(roomId);
  return recaps.find(r => r.id === recapId) || null;
};

export const clearRecaps = (roomId: string): void => {
  try {
    const storageKey = `${STORAGE_KEY_PREFIX}${roomId}`;
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Failed to clear recaps:', error);
  }
};
