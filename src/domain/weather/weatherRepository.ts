// src/domain/repositories/weatherRepository.ts

import { fetchWeatherData } from '../../data/weather/weatherApi';
import {
  getWeatherCache,
  saveWeatherCache,
} from '../../data/weather/weatherStorage';
import { WeatherEntity } from './weatherEntities';

export interface IWeatherRepository {
  getWeather(lat: number, lon: number): Promise<WeatherEntity>;
}

export class WeatherRepositoryImpl implements IWeatherRepository {
  private readonly CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

  async getWeather(lat: number, lon: number): Promise<WeatherEntity> {
    const cachedData = await getWeatherCache();
    if (
      cachedData &&
      Date.now() - cachedData.timestamp < this.CACHE_DURATION_MS
    ) {
      return this.mapToEntity(cachedData.data);
    }

    const apiData = await fetchWeatherData(lat, lon);
    console.log('apiData', apiData);
    await saveWeatherCache({ data: apiData, timestamp: Date.now() });

    return this.mapToEntity(apiData);
  }

  private mapToEntity(apiResponse: any): WeatherEntity {
    return {
      temperature: apiResponse.main.temp,
      condition: apiResponse.weather[0].description,
      humidity: apiResponse.main.humidity,
      locationName: apiResponse.name,
      icon: apiResponse.weather[0].icon,
    };
  }
}
