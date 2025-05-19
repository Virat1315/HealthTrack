export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'hospital';
}

export interface Patient extends User {
  role: 'patient';
  medicalHistory?: string[];
  appointments?: Appointment[];
}

export interface Hospital extends User {
  role: 'hospital';
  address: string;
  specialization: string[];
  doctors: Doctor[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospitalId: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  hospitalId: string;
  date: Date;
  diagnosis: string;
  prescription?: string;
  attachments?: string[];
} 