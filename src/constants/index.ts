// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
};

// Authentication
export const AUTH_CONFIG = {
  TOKEN_KEY: 'health_sync_token',
  REFRESH_TOKEN_KEY: 'health_sync_refresh_token',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOSPITAL_LOGIN: '/hospital-login',
  HOSPITAL_SIGNUP: '/hospital-signup',
  PATIENT_DASHBOARD: '/patient-dashboard',
  HOSPITAL_DASHBOARD: '/hospital/dashboard',
  PATIENTS: '/hospital/patients',
  APPOINTMENTS: '/hospital/appointments',
  ANALYTICS: '/hospital/analytics',
  PATIENT_RECORDS: '/patient-records',
  UPLOAD_REPORT: '/upload-report',
  LEARN_MORE: '/learn-more',
  HOW_IT_WORKS: '/how-it-works',
  ABOUT: '/about',
  CONTACT: '/contact',
  FEATURES: '/features',
};

// User Roles
export const USER_ROLES = {
  PATIENT: 'patient',
  HOSPITAL: 'hospital',
} as const;

// Appointment Status
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Form Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_REGEX: /^\+?[\d\s-]{10,}$/,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
  MAX_FILES: 5,
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to access this resource.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  SIGNUP_SUCCESS: 'Account created successfully',
  PROFILE_UPDATE: 'Profile updated successfully',
  APPOINTMENT_CREATED: 'Appointment scheduled successfully',
  RECORD_CREATED: 'Medical record created successfully',
}; 