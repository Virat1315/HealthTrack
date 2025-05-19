import { v4 as uuidv4 } from 'uuid';
import { mockPatients, mockDoctors } from './mockPatients';

export interface VitalSigns {
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  oxygenLevel: number;
  temperature: number;
  respiratoryRate: number;
}

export interface DeviceStatus {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  batteryLevel: number;
  lastCalibration: string;
  lastMaintenance: string;
}

export interface TreatmentPlan {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  procedures: string[];
  notes: string;
}

export interface PatientMonitoring {
  id: string;
  patientId: string;
  patientName: string;
  assignedDoctor: string;
  admissionDate: string;
  diagnosis: string;
  vitalSigns: VitalSigns;
  devices: DeviceStatus[];
  treatmentPlan: TreatmentPlan;
  alerts: {
    id: string;
    timestamp: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    parameter: string;
    value: number;
    threshold: number;
    acknowledged: boolean;
  }[];
  annotations: {
    id: string;
    timestamp: string;
    doctorName: string;
    note: string;
    relatedParameter?: string;
  }[];
}

// Mock data for testing
export const mockMonitoringData: PatientMonitoring[] = mockPatients.map(patient => ({
  id: uuidv4(),
  patientId: patient.id,
  patientName: patient.name,
  assignedDoctor: mockDoctors[Math.floor(Math.random() * mockDoctors.length)].name,
  admissionDate: patient.lastVisit,
  diagnosis: patient.medicalHistory[0] || 'Under Observation',
  vitalSigns: {
    heartRate: Math.floor(60 + Math.random() * 40),
    bloodPressure: {
      systolic: Math.floor(110 + Math.random() * 30),
      diastolic: Math.floor(70 + Math.random() * 20)
    },
    oxygenLevel: Math.floor(94 + Math.random() * 6),
    temperature: 36.5 + Math.random() * 1.5,
    respiratoryRate: Math.floor(12 + Math.random() * 8)
  },
  devices: [
    {
      id: uuidv4(),
      name: 'Ventilator XR-2000',
      type: 'ventilator',
      status: Math.random() > 0.9 ? 'error' : Math.random() > 0.8 ? 'disconnected' : 'connected',
      batteryLevel: Math.floor(70 + Math.random() * 30),
      lastCalibration: '2025-02-01',
      lastMaintenance: '2025-02-01'
    },
    {
      id: uuidv4(),
      name: 'ECG Monitor Pro',
      type: 'ecg',
      status: Math.random() > 0.9 ? 'error' : Math.random() > 0.8 ? 'disconnected' : 'connected',
      batteryLevel: Math.floor(70 + Math.random() * 30),
      lastCalibration: '2025-02-05',
      lastMaintenance: '2025-02-05'
    },
    {
      id: uuidv4(),
      name: 'Pulse Oximeter',
      type: 'pulseOx',
      status: Math.random() > 0.9 ? 'error' : Math.random() > 0.8 ? 'disconnected' : 'connected',
      batteryLevel: Math.floor(70 + Math.random() * 30),
      lastCalibration: '2025-02-03',
      lastMaintenance: '2025-02-03'
    }
  ],
  treatmentPlan: {
    id: uuidv4(),
    name: patient.medicalHistory[0] ? `${patient.medicalHistory[0]} Treatment Protocol` : 'General Care Protocol',
    startDate: patient.lastVisit,
    medications: [
      {
        name: 'Medication A',
        dosage: '50mg',
        frequency: 'Every 8 hours'
      },
      {
        name: 'Medication B',
        dosage: '100mg',
        frequency: 'Once daily'
      }
    ],
    procedures: [
      'Regular vitals monitoring',
      'Daily blood tests',
      'Physical therapy'
    ],
    notes: 'Patient is responding well to the current treatment plan.'
  },
  alerts: [
    ...(Math.random() > 0.7 ? [{
      id: uuidv4(),
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      type: 'warning',
      message: 'Heart rate elevated',
      parameter: 'heartRate',
      value: 110,
      threshold: 100,
      acknowledged: false
    }] : []),
    ...(Math.random() > 0.8 ? [{
      id: uuidv4(),
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      type: 'critical',
      message: 'Low oxygen saturation',
      parameter: 'oxygenLevel',
      value: 89,
      threshold: 92,
      acknowledged: false
    }] : [])
  ],
  annotations: [
    {
      id: uuidv4(),
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      doctorName: mockDoctors[Math.floor(Math.random() * mockDoctors.length)].name,
      note: 'Patient showing improvement in respiratory function',
      relatedParameter: 'oxygenLevel'
    },
    {
      id: uuidv4(),
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      doctorName: mockDoctors[Math.floor(Math.random() * mockDoctors.length)].name,
      note: 'Adjusted medication dosage',
      relatedParameter: 'heartRate'
    }
  ]
}));

// Historical data generation helper
export const generateHistoricalData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      timestamp: date.toISOString(),
      heartRate: 60 + Math.random() * 40,
      oxygenLevel: 94 + Math.random() * 6,
      systolic: 110 + Math.random() * 30,
      diastolic: 70 + Math.random() * 20,
      respiratoryRate: 12 + Math.random() * 8,
      temperature: 36.5 + Math.random() * 1.5
    });
  }
  
  return data;
};
