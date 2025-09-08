// src/domain/usecases/weather/GetWeatherUseCase.ts
import Geolocation from 'react-native-geolocation-service';
// import { Platform } from 'react-native';
import { IWeatherRepository } from './weatherRepository';
import { WeatherEntity } from './weatherEntities';

export class GetWeatherUseCase {
  constructor(private weatherRepository: IWeatherRepository) {}

  async execute(): Promise<WeatherEntity> {
    return new Promise((resolve, reject) => {
      // Request location permission
      Geolocation.getCurrentPosition(
        async position => {
          try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log('usecase', lat, lon);
            const weatherData = await this.weatherRepository.getWeather(
              lat,
              lon,
            );
            resolve(weatherData);
          } catch (error) {
            reject(error);
          }
        },
        error => {
          // Handle geolocation error
          console.error('Geolocation Error:', error);
          reject(
            new Error(
              'Failed to get current location. Please enable location services.',
            ),
          );
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  }
}
