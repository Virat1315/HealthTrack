import { firebaseConfig } from './firebase.config';

export const config = {
  firebase: firebaseConfig,
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 30000,
  },
  auth: {
    tokenKey: 'health_sync_token',
    refreshTokenKey: 'health_sync_refresh_token',
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
  },
  app: {
    name: 'HealthTrack',
    version: '1.0.0',
    environment: import.meta.env.MODE || 'development',
  },
  validation: {
    password: {
      minLength: 8,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    email: {
      regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    phone: {
      regex: /^\+?[\d\s-]{10,}$/,
    },
  },
  fileUpload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFiles: 5,
  },
} as const; 