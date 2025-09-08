// src/data/models/weatherModels.ts
export interface WeatherApiResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: [{ description: string; icon: string }];
  name: string;
}

export interface WeatherCache {
  data: WeatherApiResponse;
  timestamp: number;
}
