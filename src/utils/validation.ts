import { VALIDATION } from '../constants';

export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return (
    password.length >= VALIDATION.PASSWORD_MIN_LENGTH &&
    VALIDATION.PASSWORD_REGEX.test(password)
  );
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateFileSize = (file: File): boolean => {
  return file.size <= VALIDATION.FILE_UPLOAD.MAX_SIZE;
};

export const validateFileType = (file: File): boolean => {
  return VALIDATION.FILE_UPLOAD.ALLOWED_TYPES.includes(file.type);
};

export const validateForm = (values: Record<string, any>, rules: Record<string, (value: any) => boolean>): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const value = values[field];
    const isValid = rules[field](value);

    if (!isValid) {
      errors[field] = `${field} is invalid`;
    }
  });

  return errors;
}; 