export interface Patient {
  id: string;
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  healthRecords: HealthRecord[];
  appointments: Appointment[];
  medicalReports: MedicalReport[];
}

export interface HealthRecord {
  id: string;
  date: string;
  diagnosis: string;
  prescription: string;
  doctor: string;
  hospital: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  time: string;
  status: string;
  type: string;
}

export interface MedicalReport {
  id: string;
  name: string;
  type: string;
  date: string;
  hospital: string;
  url: string;
  description: string;
}

export const dummyDoctors = [
  { id: 'doc1', name: 'Dr. John Smith', specialization: 'Cardiologist', hospital: 'City General Hospital' },
  { id: 'doc2', name: 'Dr. Sarah Johnson', specialization: 'Pediatrician', hospital: 'Children\'s Medical Center' },
  { id: 'doc3', name: 'Dr. Michael Brown', specialization: 'Neurologist', hospital: 'Neuroscience Institute' },
];

export const dummyPatients: Patient[] = [
  {
    id: 'SUM-20060410-001',
    name: 'Sumit kumar',
    email: 'sumitkumar042006@gmail.com',
    password: 'sumit@10042006',
    address: {
      street: 'Kokha',
      city: 'Bhilai',
      state: 'chhattishgarh',
      pincode: '490011'
    },
    healthRecords: [
      {
        id: 'HR001',
        date: '2025-01-15',
        diagnosis: 'Common Cold',
        prescription: 'Paracetamol 500mg',
        doctor: 'Dr. Sarah Johnson',
        hospital: 'Children\'s Medical Center'
      },
      {
        id: 'HR002',
        date: '2025-01-30',
        diagnosis: 'Hypertension',
        prescription: 'Amlodipine 5mg',
        doctor: 'Dr. John Smith',
        hospital: 'City General Hospital'
      }
    ],
    appointments: [
      {
        id: 'APP001',
        doctorName: 'Dr. John Smith',
        hospitalName: 'City General Hospital',
        date: '2025-04-04',
        time: '10:00 AM',
        status: 'Scheduled',
        type: 'Follow-up'
      },
      {
        id: 'APP002',
        doctorName: 'Dr. Sarah Johnson',
        hospitalName: 'Children\'s Medical Center',
        date: '2025-01-20',
        time: '11:30 AM',
        status: 'Completed',
        type: 'Regular Checkup'
      },
      {
        id: 'APP003',
        doctorName: 'Dr. Michael Brown',
        hospitalName: 'Neuroscience Institute',
        date: '2025-01-10',
        time: '09:15 AM',
        status: 'Completed',
        type: 'Consultation'
      }
    ],
    medicalReports: [
      {
        id: 'REP001',
        name: 'Blood Test Report',
        type: 'Laboratory',
        date: '2025-01-15',
        hospital: 'City General Hospital',
        url: '/reports/blood-test.pdf',
        description: 'Complete Blood Count and Lipid Profile'
      },
      {
        id: 'REP002',
        name: 'Chest X-Ray',
        type: 'Radiology',
        date: '2025-01-30',
        hospital: 'City General Hospital',
        url: '/reports/chest-xray.pdf',
        description: 'Annual chest examination'
      },
      {
        id: 'REP003',
        name: 'ECG Report',
        type: 'Cardiology',
        date: '2025-02-01',
        hospital: 'Heart Care Center',
        url: '/reports/ecg.pdf',
        description: 'Routine ECG examination'
      }
    ]
  },
  {
    id: 'SUM-20060128-002',
    name: 'Kumari shambhavi',
    email: 'kumarisham.2006@gmail.com',
    password: 'sham@10042006',
    address: {
      street: 'Kokha',
      city: 'Bhilai',
      state: 'Chhattisgarh',
      pincode: '490011'
    },
    healthRecords: [
      {
        id: 'HR003',
        date: '2025-02-01',
        diagnosis: 'Migraine',
        prescription: 'Sumatriptan 50mg',
        doctor: 'Dr. Michael Brown',
        hospital: 'Neuroscience Institute'
      }
    ],
    appointments: [],
    medicalReports: []
  }
];

export const dummyAirQualityData = {
  aqi: 75,
  mainPollutant: 'PM2.5',
  quality: 'Moderate',
  location: {
    city: 'Bhilai',
    state: 'Chhattisgarh'
  }
};
