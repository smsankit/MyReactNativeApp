// export const NEWS_API_KEY = '53688a9ac45b41fe86bed36b80f27843';
export const SPLASH_SCREEN_DURATION = 3000; // 3 seconds
// News================================================================
export const NEWS_API_KEY = 'pub_f773ed5963bd42c68cd8955ba3f1eb29';
export const BASE_URL = 'https://newsdata.io/api/1/news';

// Login===============================================================
export const LOGIN_API_BASE_URL = 'https://reqres.in/api';
export const AUTH_TOKEN_KEY = 'jwt_auth_token';
// Endpoints
export const LOGIN_ENDPOINT = '/login';

// Weather=============================================================
export const WEATHER_API_KEY = '69b797ce317926f80a925fa2a7c03d9e';
export const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Product List========================================================
export const API = {
  BASE_URL: 'https://dummyjson.com',
  DEFAULT_LIMIT: 20,
  TIMEOUT_MS: 12000,
} as const;

export const DEFAULT_PAGE_SIZE = 20;
export const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
export const DEFAULT_COUNTRY = 'us';
export const DEFAULT_CATEGORY: string | undefined = undefined;

export function isNullOrEmpty(str: string | null | undefined): boolean {
  return str === null || str === undefined || str.trim().length === 0;
}

export function isNotNullOrEmpty(str: string | null | undefined): boolean {
  return str !== null && str !== undefined && str.trim().length > 0;
}
// x-api-key: reqres-free-v1
