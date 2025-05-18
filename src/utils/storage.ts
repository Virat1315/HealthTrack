import { AUTH_CONFIG } from '../constants';

export const storage = {
  set: (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  get: <T>(key: string): T | null => {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

export const authStorage = {
  setToken: (token: string): void => {
    storage.set(AUTH_CONFIG.TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return storage.get<string>(AUTH_CONFIG.TOKEN_KEY);
  },

  setRefreshToken: (token: string): void => {
    storage.set(AUTH_CONFIG.REFRESH_TOKEN_KEY, token);
  },

  getRefreshToken: (): string | null => {
    return storage.get<string>(AUTH_CONFIG.REFRESH_TOKEN_KEY);
  },

  clearAuth: (): void => {
    storage.remove(AUTH_CONFIG.TOKEN_KEY);
    storage.remove(AUTH_CONFIG.REFRESH_TOKEN_KEY);
  },
}; 