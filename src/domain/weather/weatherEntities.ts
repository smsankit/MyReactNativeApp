// src/domain/entities/weatherEntities.ts
export interface WeatherEntity {
  temperature: number;
  condition: string;
  humidity: number;
  locationName: string;
  icon: string;
}
