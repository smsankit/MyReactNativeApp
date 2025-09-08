import { useState, useEffect, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { WeatherRepositoryImpl } from '../../domain/weather/weatherRepository';
import { GetWeatherUseCase } from '../../domain/weather/GetWeatherUseCase';
import { WeatherEntity } from '../../domain/weather/weatherEntities';

const weatherRepository = new WeatherRepositoryImpl();
const getWeatherUseCase = new GetWeatherUseCase(weatherRepository);

export const useWeather = () => {
  const [data, setData] = useState<WeatherEntity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('hook');
      const weatherData = await getWeatherUseCase.execute();
      console.log('hook', weatherData);
      setData(weatherData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkPermissionsAndFetch = useCallback(async () => {
    try {
      let hasPermission = false;
      if (Platform.OS === 'ios') {
        const status = await Geolocation.requestAuthorization('whenInUse');
        if (status === 'granted') {
          hasPermission = true;
        }
      } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          hasPermission = true;
        }
      }

      if (hasPermission) {
        fetchWeatherData();
      } else {
        setError('Location permission denied.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Failed to check location permissions.');
      setIsLoading(false);
    }
  }, [fetchWeatherData]);

  useEffect(() => {
    checkPermissionsAndFetch();
  }, [checkPermissionsAndFetch]);

  return { data, isLoading, error, fetchWeatherData };
};
