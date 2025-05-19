import { v4 as uuidv4 } from 'uuid';

export interface MedicalReport {
  id: string;
  patientId: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  hospital: {
    name: string;
    department: string;
    location: string;
    contactInfo: string;
  };
  findings: {
    mainFindings: string;
    vitalSigns?: {
      bloodPressure?: string;
      heartRate?: string;
      temperature?: string;
      oxygenSaturation?: string;
    };
    testResults?: Record<string, string>;
    interpretation: string;
  };
  recommendations: {
    treatment: string;
    medications?: {
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }[];
    followUp?: string;
    lifestyle?: string[];
    precautions?: string[];
  };
  summary: string;
  fileUrl?: string;
  status: 'pending' | 'completed';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  contactNumber: string;
  email: string;
  address: string;
  medicalHistory: string[];
  medicalReports: MedicalReport[];
  lastVisit: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  availability: string[];
  timings: string;
}

export const mockDoctors: Doctor[] = [
  {
    id: uuidv4(),
    name: "Dr. Priya Mehta",
    specialization: "Cardiologist",
    availability: ["Monday", "Wednesday", "Friday"],
    timings: "9:00 AM - 5:00 PM"
  },
  {
    id: uuidv4(),
    name: "Dr. Suresh Patel",
    specialization: "Neurologist",
    availability: ["Tuesday", "Thursday", "Saturday"],
    timings: "10:00 AM - 6:00 PM"
  },
  {
    id: uuidv4(),
    name: "Dr. Anjali Gupta",
    specialization: "Pediatrician",
    availability: ["Monday", "Tuesday", "Friday"],
    timings: "9:00 AM - 4:00 PM"
  },
  {
    id: uuidv4(),
    name: "Dr. Rahul Verma",
    specialization: "Orthopedic",
    availability: ["Wednesday", "Thursday", "Saturday"],
    timings: "11:00 AM - 7:00 PM"
  },
  {
    id: uuidv4(),
    name: "Dr. Neha Singh",
    specialization: "Dermatologist",
    availability: ["Monday", "Wednesday", "Friday"],
    timings: "10:00 AM - 5:00 PM"
  }
];

// Helper function to generate mock reports
const generateReport = (date: string, type: string, doctor: string, description: string): MedicalReport => ({
  id: uuidv4(),
  patientId: uuidv4(),
  title: `${type} Report`,
  type,
  date,
  doctor,
  hospital: {
    name: 'City General Hospital',
    department: 'General Medicine',
    location: 'Block A, 3rd Floor',
    contactInfo: '+91 1234567890'
  },
  findings: {
    mainFindings: description,
    interpretation: 'Overall health status is good. All parameters are within normal range.'
  },
  recommendations: {
    treatment: 'No immediate treatment required',
    followUp: 'Schedule next checkup in 6 months',
    lifestyle: [
      'Maintain regular exercise routine',
      'Continue balanced diet',
      'Ensure 7-8 hours of sleep'
    ],
    precautions: [
      'Monitor blood pressure monthly',
      'Stay hydrated'
    ]
  },
  summary: description,
  status: 'completed'
});

const sampleReports: MedicalReport[] = [
  {
    id: '1',
    patientId: '1',
    title: 'Annual Health Checkup',
    type: 'General Health',
    date: '2024-01-15',
    doctor: 'Dr. Sarah Johnson',
    hospital: {
      name: 'City General Hospital',
      department: 'General Medicine',
      location: 'Block A, 3rd Floor',
      contactInfo: '+91 1234567890'
    },
    findings: {
      mainFindings: 'Regular health checkup shows all vital signs are normal.',
      vitalSigns: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        oxygenSaturation: '98%'
      },
      interpretation: 'Overall health status is good. All parameters are within normal range.'
    },
    recommendations: {
      treatment: 'No immediate treatment required',
      medications: [],
      followUp: 'Schedule next checkup in 6 months',
      lifestyle: [
        'Maintain regular exercise routine',
        'Continue balanced diet',
        'Ensure 7-8 hours of sleep'
      ],
      precautions: [
        'Monitor blood pressure monthly',
        'Stay hydrated'
      ]
    },
    summary: 'Annual health checkup completed with satisfactory results. All vital signs are normal.',
    status: 'completed'
  },
  {
    id: '2',
    patientId: '1',
    title: 'Blood Test Results',
    type: 'Laboratory',
    date: '2024-01-20',
    doctor: 'Dr. Michael Chen',
    hospital: {
      name: 'LifeCare Diagnostics',
      department: 'Clinical Laboratory',
      location: 'Ground Floor, Pathology Wing',
      contactInfo: '+91 9876543210'
    },
    findings: {
      mainFindings: 'Complete blood count shows normal ranges.',
      testResults: {
        'Hemoglobin': '14.2 g/dL',
        'WBC': '7.5k/µL',
        'RBC': '5.2M/µL',
        'Platelets': '250k/µL',
        'HbA1c': '5.4%'
      },
      interpretation: 'All blood parameters are within normal limits. No abnormalities detected.'
    },
    recommendations: {
      treatment: 'No specific treatment required',
      followUp: 'Repeat blood tests in 3 months',
      lifestyle: [
        'Maintain iron-rich diet',
        'Regular exercise'
      ]
    },
    summary: 'Complete blood count shows normal ranges. All parameters within normal limits.',
    status: 'completed'
  },
  {
    id: '3',
    patientId: '2',
    title: 'X-Ray Report',
    type: 'Radiology',
    date: '2024-01-25',
    doctor: 'Dr. Emily Williams',
    summary: 'Chest X-ray shows clear lungs with no abnormalities detected',
    status: 'completed'
  },
  {
    id: '4',
    patientId: '2',
    title: 'ECG Report',
    type: 'Cardiology',
    date: '2024-02-01',
    doctor: 'Dr. Sarah Johnson',
    summary: 'Normal sinus rhythm, no ST-T wave abnormalities',
    status: 'completed'
  },
  {
    id: '5',
    patientId: '3',
    title: 'MRI Scan',
    type: 'Radiology',
    date: '2024-02-03',
    doctor: 'Dr. Michael Chen',
    summary: 'Brain MRI shows no structural abnormalities or lesions',
    status: 'pending'
  }
];

export const mockPatients: Patient[] = [
  {
    id: uuidv4(),
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    contactNumber: "+91 9876543210",
    email: "rajesh.kumar@email.com",
    address: "123 Gandhi Road, Mumbai",
    medicalHistory: ["Hypertension", "Type 2 Diabetes"],
    lastVisit: "2024-12-01",
    upcomingAppointment: "2024-12-20",
    medicalReports: [
      generateReport("2024-12-01", "Blood Test", "Dr. Priya Mehta", "Comprehensive metabolic panel and HbA1c"),
      generateReport("2024-11-15", "ECG", "Dr. Suresh Patel", "Regular cardiac monitoring"),
      generateReport("2024-10-20", "Eye Test", "Dr. Anjali Gupta", "Diabetic retinopathy screening"),
      generateReport("2024-09-15", "Kidney Function", "Dr. Neha Singh", "Routine kidney function assessment")
    ]
  },
  {
    id: uuidv4(),
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    bloodGroup: "A+",
    contactNumber: "+91 9876543211",
    email: "priya.sharma@email.com",
    address: "456 Nehru Street, Delhi",
    medicalHistory: ["Asthma"],
    lastVisit: "2024-11-15",
    medicalReports: [
      generateReport("2024-11-15", "Pulmonary Function", "Dr. Rahul Verma", "Complete lung function assessment"),
      generateReport("2024-10-20", "Allergy Panel", "Dr. Anjali Gupta", "Comprehensive allergen testing"),
      generateReport("2024-09-10", "Chest X-Ray", "Dr. Suresh Patel", "Annual chest examination"),
      generateReport("2024-08-15", "Blood Test", "Dr. Priya Mehta", "Complete blood count and inflammation markers")
    ]
  },
  {
    id: uuidv4(),
    name: "Amit Patel",
    age: 28,
    gender: "Male",
    bloodGroup: "B+",
    contactNumber: "+91 9876543212",
    email: "amit.patel@email.com",
    address: "789 MG Road, Bangalore",
    medicalHistory: ["Migraine", "Allergic Rhinitis"],
    lastVisit: "2024-12-05",
    upcomingAppointment: "2024-12-25",
    medicalReports: [
      generateReport("2024-12-05", "MRI Brain", "Dr. Suresh Patel", "Detailed brain scan for migraine assessment"),
      generateReport("2024-11-20", "CT Scan", "Dr. Neha Singh", "Paranasal sinus examination"),
      generateReport("2024-10-15", "Allergy Test", "Dr. Anjali Gupta", "Specific allergen identification"),
      generateReport("2024-09-01", "Blood Test", "Dr. Priya Mehta", "Complete blood work with allergy markers")
    ]
  },
  {
    id: uuidv4(),
    name: "Meera Singh",
    age: 55,
    gender: "Female",
    bloodGroup: "AB+",
    contactNumber: "+91 9876543213",
    email: "meera.singh@email.com",
    address: "321 Tagore Lane, Kolkata",
    medicalHistory: ["Arthritis", "High Cholesterol"],
    lastVisit: "2024-12-02",
    upcomingAppointment: "2024-12-25",
    medicalReports: [
      {
        id: uuidv4(),
        patientId: uuidv4(),
        title: "Joint Assessment",
        type: "Orthopedic",
        date: "2024-12-02",
        doctor: "Dr. Amit Roy",
        summary: "Comprehensive joint examination and X-ray",
        status: 'completed'
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Arjun Reddy",
    age: 35,
    gender: "Male",
    bloodGroup: "O-",
    contactNumber: "+91 9876543214",
    email: "arjun.reddy@email.com",
    address: "567 Anna Nagar, Chennai",
    medicalHistory: ["Migraine"],
    lastVisit: "2024-11-20",
    medicalReports: [
      {
        id: uuidv4(),
        patientId: uuidv4(),
        title: "Neurological Assessment",
        type: "Neurology",
        date: "2024-11-20",
        doctor: "Dr. Sanjay Kapoor",
        summary: "Migraine evaluation and brain imaging",
        status: 'completed'
      },
      {
        id: uuidv4(),
        patientId: uuidv4(),
        title: "Vision Test",
        type: "Ophthalmology",
        date: "2024-10-05",
        doctor: "Dr. Maya Iyer",
        summary: "Comprehensive eye examination",
        status: 'completed'
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Ananya Das",
    age: 42,
    gender: "Female",
    bloodGroup: "B-",
    contactNumber: "+91 9876543215",
    email: "ananya.das@email.com",
    address: "890 Park Street, Pune",
    medicalHistory: ["Thyroid disorder"],
    lastVisit: "2024-12-04",
    upcomingAppointment: "2024-12-25",
    medicalReports: [
      {
        id: uuidv4(),
        patientId: uuidv4(),
        title: "Thyroid Function Test",
        type: "Endocrinology",
        date: "2024-12-04",
        doctor: "Dr. Ravi Kumar",
        summary: "Complete thyroid profile",
        status: 'completed'
      },
      {
        id: uuidv4(),
        patientId: uuidv4(),
        title: "Bone Density Scan",
        type: "Radiology",
        date: "2024-11-01",
        doctor: "Dr. Neha Shah",
        summary: "DEXA scan for bone health assessment",
        status: 'completed'
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Mohammed Khan",
    age: 50,
    gender: "Male",
    bloodGroup: "A-",
    contactNumber: "+91 9876543216",
    email: "mohammed.khan@email.com",
    address: "234 Civil Lines, Hyderabad",
    medicalHistory: ["Heart condition", "Diabetes"],
    lastVisit: "2024-08-16",
    medicalReports: [
      {
        id: uuidv4(),
        patientId: uuidv4(),
        title: "Cardiac Stress Test",
        type: "Cardiology",
        date: "2024-08-16",
        doctor: "Dr. Arun Sharma",
        summary: "Treadmill stress test with ECG monitoring",
        status: 'completed'
      },
      {
        id: uuidv4(),
        patientId: uuidv4(),
        title: "Blood Test",
        type: "Laboratory",
        date: "2024-08-15",
        doctor: "Dr. Priya Mehta",
        summary: "Comprehensive metabolic panel with HbA1c",
        status: 'completed'
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Sanjana Gupta",
    age: 29,
    gender: "Female",
    bloodGroup: "O+",
    contactNumber: "+91 9876543217",
    email: "sanjana.gupta@email.com",
    address: "432 Model Town, Lucknow",
    medicalHistory: ["Anemia"],
    lastVisit: "2024-12-02",
    medicalReports: [
      generateReport("2024-12-02", "Blood Test", "Dr. Priya Mehta", "Complete blood count and iron profile"),
      generateReport("2024-11-15", "Iron Deficiency Test", "Dr. Neha Singh", "Serum ferritin and transferrin saturation"),
      generateReport("2024-10-20", "Vitamin B12 Test", "Dr. Anjali Gupta", "Vitamin B12 deficiency screening"),
      generateReport("2024-09-10", "Folic Acid Test", "Dr. Suresh Patel", "Folic acid deficiency screening"),
      generateReport("2024-08-15", "Complete Blood Count", "Dr. Priya Mehta", "Complete blood count with differential count")
    ]
  },
  {
    id: uuidv4(),
    name: "Vikram Malhotra",
    age: 48,
    gender: "Male",
    bloodGroup: "AB-",
    contactNumber: "+91 9876543218",
    email: "vikram.malhotra@email.com",
    address: "765 Sector 17, Chandigarh",
    medicalHistory: ["Back pain", "Insomnia"],
    lastVisit: "2024-11-19",
    upcomingAppointment: "2024-12-28",
    medicalReports: [
      generateReport("2024-11-19", "X-Ray Spine", "Dr. Rahul Verma", "Spine X-ray for back pain assessment"),
      generateReport("2024-10-25", "Sleep Study", "Dr. Suresh Patel", "Polysomnography for sleep disorder diagnosis"),
      generateReport("2024-09-20", "Blood Test", "Dr. Priya Mehta", "Complete metabolic panel and inflammatory markers"),
      generateReport("2024-08-15", "Muscle Strength Test", "Dr. Neha Singh", "Muscle strength assessment for back pain"),
      generateReport("2024-07-20", "Spine MRI", "Dr. Rahul Verma", "Detailed spine examination")
    ]
  },
  {
    id: uuidv4(),
    name: "Riya Kapoor",
    age: 31,
    gender: "Female",
    bloodGroup: "B+",
    contactNumber: "+91 9876543219",
    email: "riya.kapoor@email.com",
    address: "543 Banjara Hills, Hyderabad",
    medicalHistory: ["PCOD"],
    lastVisit: "2024-10-21",
    medicalReports: [
      generateReport("2024-10-21", "Pelvic Ultrasound", "Dr. Anjali Gupta", "Comprehensive pelvic examination"),
      generateReport("2024-09-25", "Hormone Panel", "Dr. Priya Mehta", "Complete hormone profile"),
      generateReport("2024-08-20", "Blood Sugar", "Dr. Suresh Patel", "Fasting and post-prandial glucose"),
      generateReport("2024-07-15", "Lipid Profile", "Dr. Priya Mehta", "Complete lipid assessment"),
      generateReport("2024-06-20", "Thyroid Test", "Dr. Neha Singh", "Thyroid function screening")
    ]
  },
  {
    id: uuidv4(),
    name: "Karthik Iyer",
    age: 37,
    gender: "Male",
    bloodGroup: "A+",
    contactNumber: "+91 9876543220",
    email: "karthik.iyer@email.com",
    address: "876 Koramangala, Bangalore",
    medicalHistory: ["Gastritis"],
    lastVisit: "2024-12-07",
    upcomingAppointment: "2024-12-22",
    medicalReports: [
      generateReport("2024-12-07", "Endoscopy", "Dr. Rahul Verma", "Upper GI endoscopy for gastritis assessment"),
      generateReport("2024-11-20", "Blood Test", "Dr. Priya Mehta", "Complete blood count and liver function tests"),
      generateReport("2024-10-25", "Stool Test", "Dr. Anjali Gupta", "Stool examination for H. pylori infection"),
      generateReport("2024-09-15", "Abdominal Ultrasound", "Dr. Neha Singh", "Abdominal ultrasound for gallbladder assessment"),
      generateReport("2024-08-20", "Liver Function Test", "Dr. Suresh Patel", "Liver function tests for liver health assessment")
    ]
  },
  {
    id: uuidv4(),
    name: "Zara Sheikh",
    age: 26,
    gender: "Female",
    bloodGroup: "O-",
    contactNumber: "+91 9876543221",
    email: "zara.sheikh@email.com",
    address: "198 Salt Lake, Kolkata",
    medicalHistory: ["Eczema"],
    lastVisit: "2024-11-23",
    medicalReports: [
      generateReport("2024-11-23", "Skin Biopsy", "Dr. Neha Singh", "Skin patch assessment"),
      generateReport("2024-10-25", "Allergy Test", "Dr. Anjali Gupta", "Comprehensive allergy panel"),
      generateReport("2024-09-20", "Blood Test", "Dr. Priya Mehta", "IgE levels and complete blood count"),
      generateReport("2024-08-15", "Skin Analysis", "Dr. Neha Singh", "Digital skin mapping and analysis"),
      generateReport("2024-07-20", "Patch Test", "Dr. Neha Singh", "Contact dermatitis assessment")
    ]
  },
  {
    id: uuidv4(),
    name: "Rahul Verma",
    age: 52,
    gender: "Male",
    bloodGroup: "B-",
    contactNumber: "+91 9876543222",
    email: "rahul.verma@email.com",
    address: "654 Aundh, Pune",
    medicalHistory: ["High Blood Pressure", "Obesity"],
    lastVisit: "2024-09-18",
    upcomingAppointment: "2024-12-24",
    medicalReports: [
      generateReport("2024-09-18", "Blood Pressure Monitoring", "Dr. Priya Mehta", "Blood pressure monitoring and assessment"),
      generateReport("2024-08-20", "Blood Test", "Dr. Suresh Patel", "Complete metabolic panel and lipid profile"),
      generateReport("2024-07-15", "BMI Calculation", "Dr. Neha Singh", "Body mass index calculation"),
      generateReport("2024-06-20", "Waist Circumference Measurement", "Dr. Anjali Gupta", "Waist circumference measurement"),
      generateReport("2024-05-15", "Dietary Assessment", "Dr. Priya Mehta", "Dietary assessment and counseling")
    ]
  },
  {
    id: uuidv4(),
    name: "Neha Saxena",
    age: 33,
    gender: "Female",
    bloodGroup: "AB+",
    contactNumber: "+91 9876543223",
    email: "neha.saxena@email.com",
    address: "321 Gomti Nagar, Lucknow",
    medicalHistory: ["Vitamin D deficiency"],
    lastVisit: "2024-12-04",
    medicalReports: [
      generateReport("2024-12-04", "Vitamin D Test", "Dr. Neha Singh", "25-hydroxy vitamin D assessment"),
      generateReport("2024-11-15", "Bone Density Scan", "Dr. Rahul Verma", "DEXA scan for bone health assessment"),
      generateReport("2024-10-20", "Blood Test", "Dr. Priya Mehta", "Complete metabolic panel and calcium levels"),
      generateReport("2024-09-10", "Physical Examination", "Dr. Anjali Gupta", "Physical examination for muscle strength and bone health"),
      generateReport("2024-08-15", "Dietary Assessment", "Dr. Priya Mehta", "Dietary assessment and counseling")
    ]
  },
  {
    id: uuidv4(),
    name: "Amit Patel",
    age: 28,
    gender: "Male",
    bloodGroup: "B+",
    contactNumber: "+91 9876543212",
    email: "amit.patel@email.com",
    address: "789 MG Road, Bangalore",
    medicalHistory: ["Migraine", "Allergic Rhinitis"],
    lastVisit: "2024-12-05",
    upcomingAppointment: "2024-12-25",
    medicalReports: [
      generateReport("2024-12-05", "MRI Brain", "Dr. Suresh Patel", "Detailed brain scan for migraine assessment"),
      generateReport("2024-11-20", "CT Scan", "Dr. Neha Singh", "Paranasal sinus examination"),
      generateReport("2024-10-15", "Allergy Test", "Dr. Anjali Gupta", "Specific allergen identification"),
      generateReport("2024-09-01", "Blood Test", "Dr. Priya Mehta", "Complete blood work with allergy markers")
    ]
  },
  {
    id: uuidv4(),
    name: "Meera Reddy",
    age: 52,
    gender: "Female",
    bloodGroup: "AB+",
    contactNumber: "+91 9876543213",
    email: "meera.reddy@email.com",
    address: "321 Lake View Road, Chennai",
    medicalHistory: ["Osteoarthritis", "Hypothyroidism"],
    lastVisit: "2024-11-28",
    upcomingAppointment: "2024-12-22",
    medicalReports: [
      generateReport("2024-11-28", "X-Ray Knee", "Dr. Rahul Verma", "Bilateral knee joint assessment"),
      generateReport("2024-11-20", "Thyroid Profile", "Dr. Neha Singh", "Complete thyroid function assessment"),
      generateReport("2024-10-10", "Bone Density", "Dr. Rahul Verma", "DEXA scan for osteoporosis screening"),
      generateReport("2024-09-15", "MRI Knee", "Dr. Rahul Verma", "Detailed knee joint examination"),
      generateReport("2024-08-20", "Blood Test", "Dr. Priya Mehta", "Complete metabolic profile")
    ]
  },
  {
    id: uuidv4(),
    name: "Arjun Malhotra",
    age: 35,
    gender: "Male",
    bloodGroup: "O-",
    contactNumber: "+91 9876543214",
    email: "arjun.malhotra@email.com",
    address: "567 Park Street, Pune",
    medicalHistory: ["Eczema", "Seasonal Allergies"],
    lastVisit: "2024-12-10",
    upcomingAppointment: "2024-12-28",
    medicalReports: [
      generateReport("2024-12-10", "Skin Biopsy", "Dr. Neha Singh", "Patch test and skin assessment"),
      generateReport("2024-11-25", "Allergy Test", "Dr. Anjali Gupta", "Comprehensive allergy panel"),
      generateReport("2024-10-20", "Blood Test", "Dr. Priya Mehta", "IgE levels and complete blood count"),
      generateReport("2024-09-05", "Skin Analysis", "Dr. Neha Singh", "Digital skin mapping and analysis"),
      generateReport("2024-08-15", "Patch Test", "Dr. Neha Singh", "Contact dermatitis assessment")
    ]
  },
  {
    id: uuidv4(),
    name: "Kavita Singh",
    age: 41,
    gender: "Female",
    bloodGroup: "B-",
    contactNumber: "+91 9876543215",
    email: "kavita.singh@email.com",
    address: "890 Ring Road, Hyderabad",
    medicalHistory: ["PCOS", "Vitamin D deficiency"],
    lastVisit: "2024-12-04",
    medicalReports: [
      generateReport("2024-12-04", "Pelvic Ultrasound", "Dr. Anjali Gupta", "Comprehensive pelvic examination"),
      generateReport("2024-11-15", "Hormone Panel", "Dr. Priya Mehta", "Complete hormone profile"),
      generateReport("2024-10-20", "Vitamin D Test", "Dr. Neha Singh", "25-hydroxy vitamin D assessment"),
      generateReport("2024-09-10", "Blood Sugar", "Dr. Suresh Patel", "Fasting and post-prandial glucose"),
      generateReport("2024-08-25", "Lipid Profile", "Dr. Priya Mehta", "Complete lipid assessment"),
      generateReport("2024-07-15", "Thyroid Test", "Dr. Neha Singh", "Thyroid function screening")
    ]
  }
];
