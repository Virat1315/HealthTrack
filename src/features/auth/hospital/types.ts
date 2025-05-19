export interface HospitalLoginCredentials {
  email: string;
  password: string;
}

export interface HospitalSignupData {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  specialization: string[];
  licenseNumber: string;
}

export interface HospitalAuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'hospital';
    address: string;
    specialization: string[];
  };
} 