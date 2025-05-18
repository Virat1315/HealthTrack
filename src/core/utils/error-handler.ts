import { logger } from './logger';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public data?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = {
  handle: (error: unknown): AppError => {
    logger.error('Error occurred:', error);

    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      return new AppError(
        error.message,
        'UNKNOWN_ERROR',
        500,
        { originalError: error }
      );
    }

    return new AppError(
      'An unexpected error occurred',
      'UNKNOWN_ERROR',
      500,
      { originalError: error }
    );
  },

  isAppError: (error: unknown): error is AppError => {
    return error instanceof AppError;
  },

  createError: (
    message: string,
    code: string,
    statusCode: number = 500,
    data?: any
  ): AppError => {
    return new AppError(message, code, statusCode, data);
  }
};

export const errorCodes = {
  AUTH: {
    INVALID_CREDENTIALS: 'AUTH_001',
    TOKEN_EXPIRED: 'AUTH_002',
    UNAUTHORIZED: 'AUTH_003',
    INVALID_TOKEN: 'AUTH_004',
  },
  VALIDATION: {
    INVALID_INPUT: 'VAL_001',
    MISSING_REQUIRED_FIELD: 'VAL_002',
    INVALID_FORMAT: 'VAL_003',
  },
  DATABASE: {
    CONNECTION_ERROR: 'DB_001',
    QUERY_ERROR: 'DB_002',
    NOT_FOUND: 'DB_003',
  },
  FIREBASE: {
    AUTH_ERROR: 'FB_001',
    FIRESTORE_ERROR: 'FB_002',
    STORAGE_ERROR: 'FB_003',
  },
} as const; 