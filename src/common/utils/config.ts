export const SPLASH_SCREEN_DURATION = 3000; // 3 seconds
export const NEWS_API_KEY = '';
export const BASE_URL = 'https://newsdata.io/api/1/news';

export const LOGIN_API_BASE_URL = 'https://reqres.in/api';
export const AUTH_TOKEN_KEY = 'jwt_auth_token';
// Endpoints
export const LOGIN_ENDPOINT = '/login';

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
