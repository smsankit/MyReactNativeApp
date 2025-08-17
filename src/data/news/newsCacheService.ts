import AsyncStorage from '@react-native-async-storage/async-storage';

type CacheItem<T> = { ts: number; value: T };

export async function setCache<T>(key: string, value: T) {
  const data: CacheItem<T> = { ts: Date.now(), value };
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function getCache<T>(
  key: string,
  ttlMs: number,
): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  try {
    const parsed: CacheItem<T> = JSON.parse(raw);
    if (Date.now() - parsed.ts <= ttlMs) return parsed.value;
    return null;
  } catch {
    return null;
  }
}

export const clearCache = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};
