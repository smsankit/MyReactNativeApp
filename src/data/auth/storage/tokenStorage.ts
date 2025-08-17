// src/data/storage/tokenStorage.ts
import EncryptedStorage from 'react-native-encrypted-storage';
import { AUTH_TOKEN_KEY } from '../../../common/utils/config';

export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await EncryptedStorage.setItem(AUTH_TOKEN_KEY, token);
    console.log('Token saved securely.');
  } catch (error) {
    console.error('Error saving token:', error);
    throw new Error('Failed to save authentication token.');
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const token = await EncryptedStorage.getItem(AUTH_TOKEN_KEY);
    console.log('Token retrieved:', token ? 'Exists' : 'None');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null; // Or throw error based on strictness
  }
};

export const clearAuthToken = async (): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(AUTH_TOKEN_KEY);
    console.log('Token cleared.');
  } catch (error) {
    console.error('Error clearing token:', error);
    throw new Error('Failed to clear authentication token.');
  }
};
