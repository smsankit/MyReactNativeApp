import { API } from '../../../common/utils/config';
import axios, { AxiosError } from 'axios';

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
  ) {
    super(`${status} ${statusText}`);
  }
}

// Preconfigured Axios instance
export const client = axios.create({
  baseURL: API.BASE_URL,
  timeout: API.TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
  },
});

export async function httpGet<T>(
  path: string,
  { signal }: { signal?: AbortSignal } = {},
): Promise<T> {
  try {
    console.log(path);
    const res = await client.get<T>(path, { signal });
    console.log(res.data);
    return res.data;
  } catch (error) {
    // 👇 Explicitly type-cast to AxiosError
    const err = error as AxiosError;

    if (axios.isCancel(err)) {
      throw new Error('Request cancelled');
    }

    if (err.response) {
      throw new HttpError(
        err.response.status,
        err.response.statusText,
        err.config?.url ?? path,
      );
    }

    throw err;
  }
}

// export async function httpGet<T>(
//   path: string,
//   { signal }: { signal?: AbortSignal } = {},
// ): Promise<T> {
//   try {
//     const res = await createHttpClient.get<T>(path, { signal });
//     return res.data;
//   } catch (err: unknown) {
//     if (axios.isCancel(err)) {
//       throw new Error('Request cancelled');
//     }

//     if (axios.isAxiosError(err) && err.response) {
//       throw new HttpError(
//         err.response.status,
//         err.response.statusText,
//         err.config?.url ?? path,
//       );
//     }

//     throw err;
//   }
// }
