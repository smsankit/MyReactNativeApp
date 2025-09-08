// src/data/storage/weatherStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherCache } from './weatherModels';

const WEATHER_CACHE_KEY = '@weather_cache';

export const saveWeatherCache = async (data: WeatherCache): Promise<void> => {
  try {
    await AsyncStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save weather cache:', e);
  }
};

export const getWeatherCache = async (): Promise<WeatherCache | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(WEATHER_CACHE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to retrieve weather cache:', e);
    return null;
  }
};
