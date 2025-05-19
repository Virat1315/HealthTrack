import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  FileText, 
  Settings, 
  Bell,
  Search,
  Plus,
  Upload,
  ArrowRight,
  X,
  Check,
  Filter,
  ClipboardList,
  Download,
  Trash2,
  ArrowLeft,
  LogOut,
  FileX,
  Clock,
  Heart,
  Clipboard,
  MapPin,
  Wind,
  Thermometer,
  Droplets,
  Menu
} from 'lucide-react';
import { Patient, mockPatients, MedicalReport, mockDoctors } from '../../data/mockPatients';
import MedicalReportModal from '../patient/MedicalReportModal';
import ContactForm from '../contact/ContactForm';
import PatientLogin from '../patient/PatientLogin';

interface DashboardCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
}

interface UploadReportFormData {
  patientId: string;
  type: string;
  description: string;
  doctor: string;
  hospital: string;
  findings: string;
  recommendations: string;
  file?: File;
}

const reportTypes = [
  'Blood Test',
  'X-Ray',
  'MRI',
  'CT Scan',
  'Ultrasound',
  'ECG',
  'Pathology',
  'Dental',
  'Eye Test',
  'Other'
];

const tabs = [
  { id: 'patients', label: 'Patients' },
  { id: 'reports', label: 'Medical Reports' },
  { id: 'patientLogin', label: 'Patient Access' },
  { id: 'settings', label: 'Settings' },
  { id: 'contact', label: 'Contact Us' },
];

const dummyReports: MedicalReport[] = [
  {
    id: '1',
    title: 'Annual Health Checkup',
    type: 'General',
    date: '2024-03-15',
    doctor: 'Dr. Sarah Smith',
    hospital: 'City General Hospital',
    status: 'completed',
    description: 'Regular annual health examination with routine blood work and physical assessment.',
    findings: {
      mainFindings: 'Overall health is good. Blood pressure slightly elevated.',
      vitalSigns: {
        bloodPressure: '130/85',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        oxygenSaturation: '98%'
      },
      interpretation: 'Patient is in good health with minor concerns about blood pressure.'
    },
    recommendations: {
      treatment: 'Maintain current health regimen with added focus on blood pressure monitoring.',
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '3 months'
        }
      ],
      followUp: '3 months',
      lifestyle: [
        'Reduce salt intake',
        'Regular exercise',
        'Stress management'
      ]
    },
    fileUrl: '/reports/annual-checkup-2024.pdf'
  },
  {
    id: '2',
    title: 'Blood Test Results',
    type: 'Laboratory',
    date: '2024-03-10',
    doctor: 'Dr. Michael Chen',
    hospital: 'City General Hospital',
    status: 'completed',
    description: 'Comprehensive blood panel including CBC, lipid profile, and metabolic panel.',
    findings: {
      mainFindings: 'Cholesterol levels slightly elevated, other parameters within normal range.',
      testResults: {
        'Total Cholesterol': '210 mg/dL',
        'HDL': '45 mg/dL',
        'LDL': '140 mg/dL',
        'Triglycerides': '150 mg/dL'
      }
    },
    recommendations: {
      treatment: 'Dietary modifications and lifestyle changes recommended.',
      lifestyle: [
        'Low cholesterol diet',
        'Regular exercise',
        'Weight management'
      ]
    },
    fileUrl: '/reports/blood-test-2024.pdf'
  },
  {
    id: '3',
    title: 'Chest X-Ray',
    type: 'Radiology',
    date: '2024-02-28',
    doctor: 'Dr. Emily Johnson',
    hospital: 'City General Hospital',
    status: 'completed',
    description: 'Routine chest X-ray examination.',
    findings: {
      mainFindings: 'Clear lung fields. No abnormalities detected.',
      interpretation: 'Normal chest X-ray with no significant findings.'
    },
    recommendations: {
      treatment: 'No specific treatment required.',
      followUp: 'Routine follow-up in 1 year'
    },
    fileUrl: '/reports/xray-2024.pdf'
  },
  {
    id: '4',
    title: 'Dental Examination',
    type: 'Dental',
    date: '2024-02-15',
    doctor: 'Dr. Robert White',
    hospital: 'City Dental Clinic',
    status: 'completed',
    description: 'Regular dental checkup and cleaning.',
    findings: {
      mainFindings: 'Minor cavity in lower right molar. Gums healthy.',
      interpretation: 'Overall dental health is good with one area requiring attention.'
    },
    recommendations: {
      treatment: 'Schedule filling for cavity in tooth #31.',
      medications: [
        {
          name: 'Fluoride Rinse',
          dosage: '10ml',
          frequency: 'Once daily',
          duration: 'Ongoing'
        }
      ],
      followUp: '6 months'
    },
    fileUrl: '/reports/dental-2024.pdf'
  },
  {
    id: '5',
    title: 'Eye Examination',
    type: 'Ophthalmology',
    date: '2024-01-20',
    doctor: 'Dr. Lisa Park',
    hospital: 'Vision Care Center',
    status: 'completed',
    description: 'Comprehensive eye examination and vision test.',
    findings: {
      mainFindings: 'Slight change in prescription. No signs of eye disease.',
      testResults: {
        'Right Eye': '-2.25',
        'Left Eye': '-2.00',
        'Eye Pressure': 'Normal',
        'Color Vision': 'Normal'
      }
    },
    recommendations: {
      treatment: 'Updated prescription for corrective lenses.',
      followUp: '1 year',
      precautions: [
        'Use computer glasses for extended screen time',
        'Take regular breaks during screen work'
      ]
    },
    fileUrl: '/reports/eye-exam-2024.pdf'
  }
];

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchQuery, setSearchQuery] = useState('');
  const updatedMockPatients = mockPatients.map(patient => ({
    ...patient,
    medicalReports: dummyReports
  }));
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(updatedMockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>({
    id: '12345',
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    bloodGroup: 'O+',
    contactNumber: '+1 234 567 8900',
    email: 'john.doe@example.com',
    address: '123 Main St, New York, NY',
    medicalHistory: ['Hypertension', 'Seasonal Allergies'],
    lastVisit: '2024-03-15',
    medicalReports: dummyReports
  });
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportsListOpen, setIsReportsListOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<MedicalReport | null>(null);
  const [uploadFormData, setUploadFormData] = useState<UploadReportFormData>({
    patientId: '',
    type: '',
    description: '',
    doctor: '',
    hospital: '',
    findings: '',
    recommendations: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showDeletePatientConfirm, setShowDeletePatientConfirm] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [newPatientData, setNewPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    contactNumber: '',
    email: '',
    address: '',
    medicalHistory: [''],
  });
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);
  const [showAllReportsModal, setShowAllReportsModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileTabsOpen, setIsMobileTabsOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    bloodGroup: '',
    ageRange: '',
    lastVisit: ''
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = updatedMockPatients.filter(patient =>
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.email.toLowerCase().includes(query.toLowerCase()) ||
        patient.contactNumber.includes(query)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(updatedMockPatients);
    }
  };

  const applyFilters = () => {
    let filtered = [...updatedMockPatients];

    if (filters.gender) {
      filtered = filtered.filter(patient => patient.gender === filters.gender);
    }

    if (filters.bloodGroup) {
      filtered = filtered.filter(patient => patient.bloodGroup === filters.bloodGroup);
    }

    if (filters.ageRange) {
      const [min, max] = filters.ageRange.split('-').map(Number);
      filtered = filtered.filter(patient => patient.age >= min && patient.age <= max);
    }

    if (filters.lastVisit) {
      const today = new Date();
      const days = parseInt(filters.lastVisit);
      const targetDate = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));
      
      filtered = filtered.filter(patient => {
        const visitDate = new Date(patient.lastVisit);
        return visitDate >= targetDate;
      });
    }

    setFilteredPatients(filtered);
    setShowFilterModal(false);
  };

  const handleViewReports = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowAllReportsModal(true);
  };

  const handleDeleteReport = (report: MedicalReport) => {
    setReportToDelete(report);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteReport = () => {
    if (reportToDelete && selectedPatient) {
      const updatedPatient = {
        ...selectedPatient,
        medicalReports: selectedPatient.medicalReports.filter(r => r.id !== reportToDelete.id)
      };
      
      const updatedPatients = filteredPatients.map(p => 
        p.id === selectedPatient.id ? updatedPatient : p
      );
      
      setSelectedPatient(updatedPatient);
      setFilteredPatients(updatedPatients);
      setShowDeleteConfirm(false);
      setReportToDelete(null);
    }
  };

  const handleDeletePatient = (patient: Patient) => {
    setPatientToDelete(patient);
    setShowDeletePatientConfirm(true);
  };

  const confirmDeletePatient = () => {
    if (patientToDelete) {
      const updatedPatients = filteredPatients.filter(p => p.id !== patientToDelete.id);
      setFilteredPatients(updatedPatients);
      setShowDeletePatientConfirm(false);
      setPatientToDelete(null);
    }
  };

  const handleAddPatient = () => {
    const newPatient: Patient = {
      id: crypto.randomUUID(),
      ...newPatientData,
      age: parseInt(newPatientData.age),
      medicalReports: [],
      lastVisit: new Date().toISOString().split('T')[0],
    };

    setFilteredPatients([...filteredPatients, newPatient]);
    setShowAddPatientModal(false);
    setNewPatientData({
      name: '',
      age: '',
      gender: '',
      bloodGroup: '',
      contactNumber: '',
      email: '',
      address: '',
      medicalHistory: [''],
    });
  };

  const dashboardCards: DashboardCard[] = [];

  return (
    <div className="p-4 sm:p-6">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          {activeTab !== 'patients' && (
            <button
              onClick={() => setActiveTab('patients')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} className="mr-1" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileTabsOpen(!isMobileTabsOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
        >
          {isMobileTabsOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center text-red-600 hover:text-red-700"
        >
          <LogOut size={20} className="mr-1" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Tabs Section */}
      <div className="mb-6">
        {/* Desktop Tabs */}
        <div className="hidden md:flex space-x-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                if (activeTab === 'patientLogin' && isPatientLoggedIn) {
                  setIsPatientLoggedIn(false);
                }
                setActiveTab(tab.id);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Tabs Menu */}
        <div className={`md:hidden ${isMobileTabsOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow-lg border mt-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  if (activeTab === 'patientLogin' && isPatientLoggedIn) {
                    setIsPatientLoggedIn(false);
                  }
                  setActiveTab(tab.id);
                  setIsMobileTabsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm font-medium border-b last:border-b-0 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        {/* Content sections remain the same but update their responsive classes */}
        {activeTab === 'patients' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto sm:flex-1 max-w-md flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <button
                  onClick={() => setShowFilterModal(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
                >
                  <Filter size={20} className="mr-2" />
                  Filter
                </button>
              </div>
              <button
                onClick={() => setShowAddPatientModal(true)}
                className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" />
                Add New Patient
              </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medical History</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.age} years, {patient.gender}</div>
                          <div className="text-sm text-gray-500">Blood Group: {patient.bloodGroup}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{patient.contactNumber}</div>
                          <div className="text-sm text-gray-500">{patient.email}</div>
                          <div className="text-sm text-gray-500">{patient.address}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {patient.medicalHistory.join(', ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {patient.lastVisit}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-3">
                          <button
                            onClick={() => handleViewReports(patient)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            View Reports ({patient.medicalReports?.length || 0})
                          </button>
                          <button
                            onClick={() => handleDeletePatient(patient)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold">Medical Reports</h2>
              </div>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Upload New Report
              </button>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.flatMap(patient => 
                    patient.medicalReports.map(report => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          <div className="text-sm text-gray-500">Patient: {patient.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {report.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(report.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{report.doctor}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-3">
                          <button
                            onClick={() => {
                              setSelectedPatient(patient);
                              setSelectedReport(report);
                              setIsReportsListOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDeleteReport(report)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'patientLogin' && (
          <div className="space-y-4">
            {!isPatientLoggedIn ? (
              <PatientLogin onLoginSuccess={() => setIsPatientLoggedIn(true)} />
            ) : (
              <div className="space-y-6">
                {/* Header with logout */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">Patient Dashboard</h2>
                  <button
                    onClick={() => setIsPatientLoggedIn(false)}
                    className="text-red-600 hover:text-red-700 flex items-center"
                  >
                    <LogOut size={20} className="mr-2" />
                    Logout
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 text-blue-500" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Next Appointment</p>
                        <p className="text-lg font-semibold">April 04, 2025</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <Activity className="h-8 w-8 text-green-500" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Health Status</p>
                        <p className="text-lg font-semibold">Good</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <Clipboard className="h-8 w-8 text-purple-500" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Recent Reports</p>
                        <p className="text-lg font-semibold">3</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Personal Information Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">Sumit Kumar</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Patient ID</p>
                        <p className="font-medium">SUM-20060128-002</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">10 April 2006</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Blood Group</p>
                        <p className="font-medium">O+</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium">+912345678900</p>
                      </div>
                    </div>
                  </div>

                  {/* Location and Air Quality Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Environment</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        <div className="ml-3">
                          <p className="text-sm text-gray-500">Current Location</p>
                          <p className="font-medium">Bhilai Durg Chhattishgarh</p>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Air Quality Index</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Wind className="h-5 w-5 text-green-500" />
                            <div className="ml-2">
                              <p className="text-xs text-gray-500">AQI</p>
                              <p className="font-medium">42 - Good</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Thermometer className="h-5 w-5 text-orange-500" />
                            <div className="ml-2">
                              <p className="text-xs text-gray-500">Temperature</p>
                              <p className="font-medium">24°C</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Droplets className="h-5 w-5 text-blue-500" />
                            <div className="ml-2">
                              <p className="text-xs text-gray-500">Humidity</p>
                              <p className="font-medium">65%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medical Reports List */}
                  <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Medical Reports</h3>
                      <button
                        onClick={() => handleViewReports(selectedPatient)}
                        className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        View Reports ({selectedPatient?.medicalReports?.length || 0})
                      </button>
                    </div>
                    <div className="space-y-4">
                      {selectedPatient?.medicalReports.map((report, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{report.title}</h4>
                              <p className="text-sm text-gray-500">{report.date}</p>
                              <p className="text-sm text-gray-600 mt-1">Doctor: {report.doctor}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                report.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                              </span>
                              <button
                                onClick={() => {
                                  handleViewReports(selectedPatient);
                                }}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">{report.description}</p>
                          </div>
                          {report.findings && (
                            <div className="mt-3 pt-3 border-t">
                              <p className="text-sm font-medium text-gray-700">Key Findings:</p>
                              <p className="text-sm text-gray-600 mt-1">{report.findings.mainFindings}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Appointments */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <span className="ml-2 font-medium">General Checkup</span>
                          </div>
                          <span className="text-sm text-gray-500">Tomorrow</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Dr. Sarah Smith</p>
                      </div>
                    </div>
                  </div>

                  {/* Medical History */}
                  <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Medical History</h3>
                    <div className="space-y-4">
                      {selectedPatient?.medicalHistory.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Heart className="h-5 w-5 text-red-500" />
                          <span className="text-gray-600">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Patient Profile</h2>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Next Appointment</p>
                    <p className="text-lg font-semibold">Mar 28, 2024</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Health Status</p>
                    <p className="text-lg font-semibold">Good</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Clipboard className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Recent Reports</p>
                    <p className="text-lg font-semibold">3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">John Doe</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient ID</p>
                    <p className="font-medium">#12345</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">15 Jan 1990</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-medium">O+</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">+1 234 567 8900</p>
                  </div>
                </div>
              </div>

              {/* Location and Air Quality Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Environment</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Current Location</p>
                      <p className="font-medium">Bhilai, Durg, Chhattisgarh</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Air Quality Index</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Wind className="h-5 w-5 text-green-500" />
                        <div className="ml-2">
                          <p className="text-xs text-gray-500">AQI</p>
                          <p className="font-medium">42 - Good</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Thermometer className="h-5 w-5 text-orange-500" />
                        <div className="ml-2">
                          <p className="text-xs text-gray-500">Temperature</p>
                          <p className="font-medium">24°C</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Droplets className="h-5 w-5 text-blue-500" />
                        <div className="ml-2">
                          <p className="text-xs text-gray-500">Humidity</p>
                          <p className="font-medium">65%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Reports List */}
              <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Medical Reports</h3>
                  <button
                    onClick={() => handleViewReports(selectedPatient)}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View All Reports
                  </button>
                </div>
                <div className="space-y-4">
                  {selectedPatient?.medicalReports.map((report, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{report.title}</h4>
                          <p className="text-sm text-gray-500">{report.date}</p>
                          <p className="text-sm text-gray-600 mt-1">Doctor: {report.doctor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </span>
                          <button
                            onClick={() => {
                              handleViewReports(selectedPatient);
                            }}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                      {report.findings && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium text-gray-700">Key Findings:</p>
                          <p className="text-sm text-gray-600 mt-1">{report.findings.mainFindings}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span className="ml-2 font-medium">General Checkup</span>
                      </div>
                      <span className="text-sm text-gray-500">Tomorrow</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Dr. Sarah Smith</p>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical History</h3>
                <div className="space-y-4">
                  {selectedPatient?.medicalHistory.map((condition, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-gray-600">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button
                onClick={() => setShowAddPatientModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add New Patient
              </button>
            </div>

            {/* Patient Management Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Patient Management</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medical History</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.age} years, {patient.gender}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{patient.contactNumber}</div>
                          <div className="text-sm text-gray-500">{patient.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {patient.medicalHistory.join(', ')}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeletePatient(patient)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <ContactForm userType="hospital" />
        )}
      </div>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Patient</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newPatientData.name}
                  onChange={(e) => setNewPatientData({...newPatientData, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    value={newPatientData.age}
                    onChange={(e) => setNewPatientData({...newPatientData, age: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    value={newPatientData.gender}
                    onChange={(e) => setNewPatientData({...newPatientData, gender: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                <select
                  value={newPatientData.bloodGroup}
                  onChange={(e) => setNewPatientData({...newPatientData, bloodGroup: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  value={newPatientData.contactNumber}
                  onChange={(e) => setNewPatientData({...newPatientData, contactNumber: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newPatientData.email}
                  onChange={(e) => setNewPatientData({...newPatientData, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={newPatientData.address}
                  onChange={(e) => setNewPatientData({...newPatientData, address: e.target.value})}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Medical History</label>
                <input
                  type="text"
                  value={newPatientData.medicalHistory[0]}
                  onChange={(e) => setNewPatientData({...newPatientData, medicalHistory: [e.target.value]})}
                  placeholder="Separate conditions with commas"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddPatientModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Patient Confirmation Modal */}
      {showDeletePatientConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Patient</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {patientToDelete?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeletePatientConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePatient}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedPatient && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isReportsModalOpen ? '' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsReportsModalOpen(false)}></div>
          <div className="relative bg-white rounded-lg w-4/5 max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h2 className="text-2xl font-semibold">Medical Reports</h2>
                <div className="mt-2 text-gray-600">
                  <p className="font-medium">Patient: {selectedPatient.name}</p>
                  <p className="text-sm">ID: {selectedPatient.id}</p>
                </div>
              </div>
              <button
                onClick={() => setIsReportsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {selectedPatient.medicalReports && selectedPatient.medicalReports.length > 0 ? (
                selectedPatient.medicalReports.map((report, index) => (
                  <div key={index} className="border rounded-lg p-6 bg-gray-50">
                    {/* Report Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-600">{report.title}</h3>
                        <p className="text-gray-600 mt-1">Type: {report.type}</p>
                        <p className="text-gray-600">Date: {report.date}</p>
                      </div>
                      {report.fileUrl && (
                        <a
                          href={report.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Download size={16} className="mr-2" />
                          Download Report
                        </a>
                      )}
                    </div>

                    {/* Hospital Information */}
                    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Hospital Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Hospital Name</p>
                          <p className="text-gray-800">{report.hospital.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Department</p>
                          <p className="text-gray-800">{report.hospital.department}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Location</p>
                          <p className="text-gray-800">{report.hospital.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Contact</p>
                          <p className="text-gray-800">{report.hospital.contactInfo}</p>
                        </div>
                      </div>
                    </div>

                    {/* Findings Section */}
                    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Findings</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Main Findings</p>
                          <p className="text-gray-800 mt-1">{report.findings.mainFindings}</p>
                        </div>

                        {report.findings.vitalSigns && (
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Vital Signs</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {report.findings.vitalSigns.bloodPressure && (
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-500">Blood Pressure</p>
                                  <p className="font-medium">{report.findings.vitalSigns.bloodPressure}</p>
                                </div>
                              )}
                              {report.findings.vitalSigns.heartRate && (
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-500">Heart Rate</p>
                                  <p className="font-medium">{report.findings.vitalSigns.heartRate}</p>
                                </div>
                              )}
                              {report.findings.vitalSigns.temperature && (
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-500">Temperature</p>
                                  <p className="font-medium">{report.findings.vitalSigns.temperature}</p>
                                </div>
                              )}
                              {report.findings.vitalSigns.oxygenSaturation && (
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-500">O2 Saturation</p>
                                  <p className="font-medium">{report.findings.vitalSigns.oxygenSaturation}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {report.findings.testResults && (
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Test Results</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {Object.entries(report.findings.testResults).map(([key, value]) => (
                                <div key={key} className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-500">{key}</p>
                                  <p className="font-medium">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-gray-600">Interpretation</p>
                          <p className="text-gray-800 mt-1">{report.findings.interpretation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations Section */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Treatment Plan</p>
                          <p className="text-gray-800 mt-1">{report.recommendations.treatment}</p>
                        </div>

                        {report.recommendations.medications && report.recommendations.medications.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Medications</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {report.recommendations.medications.map((med, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-blue-600">{med.name}</p>
                                  <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                                  <p className="text-sm text-gray-600">Frequency: {med.frequency}</p>
                                  <p className="text-sm text-gray-600">Duration: {med.duration}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {report.recommendations.followUp && (
                          <div>
                            <p className="text-sm font-medium text-gray-600">Follow-up</p>
                            <p className="text-gray-800 mt-1">{report.recommendations.followUp}</p>
                          </div>
                        )}

                        {report.recommendations.lifestyle && report.recommendations.lifestyle.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Lifestyle Recommendations</p>
                            <ul className="list-disc list-inside space-y-1">
                              {report.recommendations.lifestyle.map((item, idx) => (
                                <li key={idx} className="text-gray-800">{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {report.recommendations.precautions && report.recommendations.precautions.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Precautions</p>
                            <ul className="list-disc list-inside space-y-1">
                              {report.recommendations.precautions.map((item, idx) => (
                                <li key={idx} className="text-gray-800">{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <FileX size={48} className="mx-auto" />
                  </div>
                  <p className="text-gray-600 font-medium">No medical reports available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showAllReportsModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">All Medical Reports</h2>
                <p className="text-sm text-gray-600 mt-1">Patient: {selectedPatient.name}</p>
              </div>
              <button
                onClick={() => setShowAllReportsModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
              <div className="space-y-4 sm:space-y-6">
                {selectedPatient.medicalReports.map((report, index) => (
                  <div key={index} className="border rounded-lg p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-500">Date: {report.date}</p>
                        <p className="text-sm text-gray-600">Doctor: {report.doctor}</p>
                        <p className="text-sm text-gray-600">Hospital: {report.hospital}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        report.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>

                    {/* Report Content */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>

                      {report.findings && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Findings</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {/* Vital Signs */}
                            {report.findings.vitalSigns && Object.entries(report.findings.vitalSigns).map(([key, value]) => (
                              <div key={key} className="bg-gray-50 p-3 rounded">
                                <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                <p className="font-medium text-sm">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      {report.recommendations && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                          <div className="space-y-3">
                            <p className="text-sm text-gray-600">{report.recommendations.treatment}</p>
                            
                            {report.recommendations.medications && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                {report.recommendations.medications.map((med, idx) => (
                                  <div key={idx} className="bg-gray-50 p-3 rounded">
                                    <p className="font-medium text-blue-600 text-sm">{med.name}</p>
                                    <p className="text-xs text-gray-600">Dosage: {med.dosage}</p>
                                    <p className="text-xs text-gray-600">Frequency: {med.frequency}</p>
                                    <p className="text-xs text-gray-600">Duration: {med.duration}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Filter Patients</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  value={filters.bloodGroup}
                  onChange={(e) => setFilters(prev => ({ ...prev, bloodGroup: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">All</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                <select
                  value={filters.ageRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, ageRange: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">All</option>
                  <option value="0-18">0-18 years</option>
                  <option value="19-30">19-30 years</option>
                  <option value="31-50">31-50 years</option>
                  <option value="51-70">51-70 years</option>
                  <option value="71-100">Above 70 years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Visit</label>
                <select
                  value={filters.lastVisit}
                  onChange={(e) => setFilters(prev => ({ ...prev, lastVisit: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">All Time</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 3 months</option>
                  <option value="180">Last 6 months</option>
                  <option value="365">Last 1 year</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setFilters({ gender: '', bloodGroup: '', ageRange: '', lastVisit: '' });
                  setFilteredPatients(updatedMockPatients);
                  setShowFilterModal(false);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
