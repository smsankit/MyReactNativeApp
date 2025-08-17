import { login as apiLogin } from '../../../data/auth/AuthApi';
import {
  clearAuthToken,
  getAuthToken,
  saveAuthToken,
} from '../../../data/auth/storage/tokenStorage';
import { UserCredentials, AuthToken } from '../entities/authEntities';

export interface IAuthRepository {
  login(credentials: UserCredentials): Promise<AuthToken>;
  saveToken(token: AuthToken): Promise<void>;
  getToken(): Promise<AuthToken | null>;
  clearToken(): Promise<void>;
}

export class AuthRepositoryImpl implements IAuthRepository {
  async login(credentials: UserCredentials): Promise<AuthToken> {
    const data = await apiLogin(credentials);
    return { value: data.token };
  }

  async saveToken(token: AuthToken): Promise<void> {
    await saveAuthToken(token.value);
  }

  async getToken(): Promise<AuthToken | null> {
    const tokenString = await getAuthToken();
    return tokenString ? { value: tokenString } : null;
  }

  async clearToken(): Promise<void> {
    await clearAuthToken();
  }
}
