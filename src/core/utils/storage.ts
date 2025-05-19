import { config } from '../config';
import { logger } from './logger';

class Storage {
  private static instance: Storage;

  private constructor() {}

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  private getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      logger.error('Error reading from localStorage:', error);
      return null;
    }
  }

  private setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      logger.error('Error writing to localStorage:', error);
    }
  }

  private removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      logger.error('Error removing from localStorage:', error);
    }
  }

  // Auth storage methods
  public getToken(): string | null {
    return this.getItem(config.auth.tokenKey);
  }

  public setToken(token: string): void {
    this.setItem(config.auth.tokenKey, token);
  }

  public getRefreshToken(): string | null {
    return this.getItem(config.auth.refreshTokenKey);
  }

  public setRefreshToken(token: string): void {
    this.setItem(config.auth.refreshTokenKey, token);
  }

  public clearAuth(): void {
    this.removeItem(config.auth.tokenKey);
    this.removeItem(config.auth.refreshTokenKey);
  }

  // User data storage methods
  public getUserData(): any {
    const data = this.getItem('user_data');
    return data ? JSON.parse(data) : null;
  }

  public setUserData(data: any): void {
    this.setItem('user_data', JSON.stringify(data));
  }

  public clearUserData(): void {
    this.removeItem('user_data');
  }

  // Clear all storage
  public clearAll(): void {
    try {
      localStorage.clear();
      logger.info('All storage cleared');
    } catch (error) {
      logger.error('Error clearing storage:', error);
    }
  }
}

export const storage = Storage.getInstance(); 