// src/data/api/weatherApi.ts
import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_BASE_URL } from '../../common/utils/config';

export const fetchWeatherData = async (
  lat: number,
  lon: number,
): Promise<any> => {
  if (!WEATHER_API_KEY) {
    throw new Error('OpenWeatherMap API key not configured.');
  }
  let url = `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
  console.log('url', url);
  const response = await axios.get(url);

  console.log('error', response);
  return response.data;
};
