import React, { useState, useEffect } from 'react';
import { usePatientAuth } from '../../features/auth/patient/context';
import { Doctor, Patient } from '../../types';
import { FaUserCircle } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Dummy data for now
const dummyDoctors = [
  {
    id: '1',
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    hospital: 'City Hospital'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    specialization: 'Pediatrics',
    hospital: 'Children\'s Hospital'
  }
];

// Map of hospital IDs to names
const hospitalNames: Record<string, string> = {
  'h1': 'City Hospital',
  'h2': 'Children\'s Hospital'
};

interface HealthRecord {
  id: string;
  date: string;
  diagnosis: string;
  prescription: string;
  doctor: string;
  hospital: string;
}

interface PatientAppointment {
  id: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  time: string;
  status: string;
  type: string;
}

interface MedicalReport {
  id: string;
  patientId: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  summary: string;
  status: string;
  hospital?: string;
}

// Assuming the user object from useAuth has a structure compatible with this simplified Patient type for dashboard display
interface DashboardPatientData {
  id: string;
  name: string;
  email: string;
  bloodGroup?: string;
  contactNumber?: string;
  address?: string | { street: string; city: string; state: string; pincode: string };
  healthRecords?: HealthRecord[];
  appointments?: PatientAppointment[];
  medicalReports?: MedicalReport[];
  age?: number;
  gender?: string;
}

interface ReportModalProps {
  report: MedicalReport;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ report, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-bold mb-4">{report.title}</h2>
        <p><strong>Type:</strong> {report.type}</p>
        <p><strong>Date:</strong> {report.date}</p>
        <p><strong>Doctor:</strong> {report.doctor}</p>
        <p><strong>Summary:</strong> {report.summary}</p>
        {/* Add more report details here */}
        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

interface ProfileModalProps {
  patient: DashboardPatientData;
  onClose: () => void;
}

interface QRModalProps {
  data: { // Define the structure of data passed to QRModal
    id: string;
    name: string;
    email: string;
    bloodGroup?: string;
    contactNumber?: string;
  };
  onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Your Patient QR Code</h2>
        <div className="flex justify-center mb-4">
          <QRCodeSVG value={JSON.stringify(data)} size={256} level="H" />
        </div>
        <p className="text-sm text-gray-600">Scan this QR code to quickly share your basic information.</p>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

const ProfileModal: React.FC<ProfileModalProps> = ({ patient, onClose }) => {
  const [showQRModal, setShowQRModal] = useState(false);

  const patientBasicData = {
    id: patient.id,
    name: patient.name,
    email: patient.email,
    bloodGroup: patient.bloodGroup,
    contactNumber: patient.contactNumber,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-bold mb-4">Patient Profile</h2>
        <div className="space-y-4">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Patient ID:</strong> {patient.id}</p>
          {patient.age && <p><strong>Age:</strong> {patient.age}</p>}
          {patient.gender && <p><strong>Gender:</strong> {patient.gender}</p>}
          {patient.bloodGroup && <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>}
          {patient.contactNumber && <p><strong>Contact:</strong> {patient.contactNumber}</p>}
          {patient.address && (
            typeof patient.address === 'string' ? (
              <p><strong>Address:</strong> {patient.address}</p>
            ) : (
              patient.address.street && <p><strong>Address:</strong> {`${patient.address.street}, ${patient.address.city}, ${patient.address.state}, ${patient.address.pincode}`}</p>
            )
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
           <button
            onClick={() => setShowQRModal(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Show QR Code
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button>
        </div>
      </div>
      {showQRModal && <QRModal data={patientBasicData} onClose={() => setShowQRModal(false)} />}
    </div>
  );
};

const PatientDashboard: React.FC = () => {
  const { user: patientUser, logout: authLogout } = usePatientAuth();
  // Cast to DashboardPatientData based on assumed structure from useAuth
  const userData: DashboardPatientData = patientUser as DashboardPatientData; 
  
  const [activeTab, setActiveTab] = useState('appointments');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  
  // State for appointments - Keep local state for now
  const [appointments, setAppointments] = useState<PatientAppointment[]>(userData.appointments || []);

  // State for medical reports - Keep local state for now
  const [medicalReports, setMedicalReports] = useState<MedicalReport[]>(userData.medicalReports || []);

  const [showLocationPrompt, setShowLocationPrompt] = useState(true);

  // Check for location permission on component mount
  useEffect(() => {
    const locationPermission = localStorage.getItem('locationPermission');
    const locationPromptShown = localStorage.getItem('locationPromptShown');

    if (locationPermission === 'granted') {
      setShowLocationPrompt(false);
    } else if (locationPromptShown === 'true') {
       setShowLocationPrompt(false); // Don't show if user has already declined
    } else {
      setShowLocationPrompt(true);
    }
  }, []);


  const tabs = [
    { id: 'health-records', label: 'Health Records' },
    { id: 'location', label: 'Location & Air Quality' }, // Combined location and air quality
    { id: 'appointments', label: 'Appointments' },
    { id: 'medical-reports', label: 'Medical Reports' },
    { id: 'upload-reports', label: 'Upload Reports' }, // Assuming this is for patients to upload
    { id: 'device-connection', label: 'Device Connection' }, // New tab for device connection
    { id: 'contact-us', label: 'Contact Us' }, // New tab for contact us
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false); // Close mobile menu on tab click
  };

  const handleLogout = async () => {
    await authLogout();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Uploading file:', file.name);
      // Implement file upload logic here (e.g., to Firebase Storage)
      alert('File uploaded successfully (simulated)!');
    } else {
      alert('No file selected.');
    }
  };

  const handleAppointmentBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const doctorId = formData.get('doctorId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;

    const selectedDoctor = dummyDoctors.find((doc) => doc.id === doctorId);
    
    if (!selectedDoctor) {
      alert('Please select a doctor');
      return;
    }

    const newAppointment: PatientAppointment = {
      id: `app-${Date.now()}`,
      type: 'Regular Checkup',
      doctorName: selectedDoctor.name,
      date: date,
      time: time,
      hospitalName: selectedDoctor.hospital,
      status: 'Scheduled'
    };

    setAppointments(prev => [...prev, newAppointment]);
    
    // Reset form
    event.currentTarget.reset();
    alert('Appointment booked successfully!');
  };

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setShowLocationPrompt(false);
          localStorage.setItem('locationPermission', 'granted');
        },
        (error) => {
          console.error('Error getting location:', error);
          setShowLocationPrompt(false);
          localStorage.setItem('locationPermission', 'denied');
        }
      );
    }
  };

  // Add this new function
  const handleDeclineLocation = () => {
    setShowLocationPrompt(false);
    localStorage.setItem('locationPermission', 'denied');
    localStorage.setItem('locationPromptShown', 'true');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {showLocationPrompt && (
        <div className="fixed inset-x-0 top-0 p-4 bg-green-500 text-white z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <p>Allow HealthTrack to access your location for better service?</p>
            <div className="flex space-x-4">
              <button
                onClick={handleLocationPermission}
                className="px-4 py-2 bg-white text-green-500 rounded hover:bg-green-50"
              >
                Allow
              </button>
              <button
                onClick={handleDeclineLocation}
                className="px-4 py-2 border border-white rounded hover:bg-green-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <FaUserCircle 
                className="w-10 h-10 text-green-500 cursor-pointer hover:text-green-600"
                onClick={() => setShowProfile(true)}
              />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                View your profile
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">Welcome, {userData.name}</h1>
          </div>
          {/* Show patient ID and logout only on desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <p className="text-sm md:text-base text-gray-600">Patient ID: {userData.id}</p>
            <button
              onClick={handleLogout}
              className="px-3 py-1 md:px-4 md:py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu Button - Moved to right */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center px-3 py-2 rounded-lg bg-white shadow-sm"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-gray-600 border-b pb-2">Patient ID: {userData.id}</p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 rounded mb-2 ${
                activeTab === tab.id ? 'bg-green-500 text-white' : 'bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mb-4`}>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full px-4 py-3 text-left ${
                  activeTab === tab.id 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                } border-b border-gray-100 last:border-b-0`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'health-records' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Health Records</h2>
              <div className="space-y-4">
                {userData.healthRecords?.map((record: HealthRecord) => (
                  <div key={record.id} className="border p-4 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">Date: {record.date}</p>
                        <p>Diagnosis: {record.diagnosis}</p>
                        <p>Prescription: {record.prescription}</p>
                        <p>Doctor: {record.doctor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-600">{record.hospital}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {userData.healthRecords?.length === 0 && (
                  <p className="text-gray-500">No health records found.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Location & Air Quality</h2>
              {/* Add location and air quality widgets here */}
              <p>Location and Air Quality information will be displayed here.</p>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Book New Appointment</h3>
                  <form onSubmit={handleAppointmentBooking} className="space-y-4">
                    <div>
                      <label className="block mb-2">Select Doctor</label>
                      <select name="doctorId" className="w-full p-2 border rounded">
                        <option value="">Select a doctor</option>
                        {dummyDoctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialization} ({doctor.hospital})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2">Date</label>
                      <input
                        type="date"
                        name="date"
                        className="w-full p-2 border rounded"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Time</label>
                      <input
                        type="time"
                        name="time"
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </form>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Appointment History</h3>
                  <div className="space-y-4">
                    {appointments.map((appointment: PatientAppointment) => (
                      <div key={appointment.id} className="border p-4 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{appointment.type}</p>
                            <p>Doctor: {appointment.doctorName}</p>
                            <p>Date: {appointment.date}</p>
                            <p>Time: {appointment.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-600">{appointment.hospitalName}</p>
                            <p className={`mt-2 inline-block px-2 py-1 rounded text-sm ${
                              appointment.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {appointments.length === 0 && (
                      <p className="text-gray-500">No appointment history.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical-reports' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Medical Reports</h2>
              <div className="space-y-4">
                {medicalReports.map((report: MedicalReport, index) => (
                   <div key={index} className="border p-4 rounded cursor-pointer hover:bg-gray-50" onClick={() => { setSelectedReport(report); setShowReportModal(true); }}>
                     <div className="flex justify-between items-start">
                       <div>
                         <p className="font-semibold">{report.title}</p>
                         <p>Date: {report.date}</p>
                         <p>Doctor: {report.doctor}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-green-600">{report.hospital}</p>
                       </div>
                     </div>
                   </div>
                ))}
                {medicalReports.length === 0 && (
                  <p className="text-gray-500">No medical reports found.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'upload-reports' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upload Medical Report</h2>
              <div className="border p-4 rounded">
                <input type="file" onChange={handleFileUpload} />
                <p className="mt-2 text-sm text-gray-600">Select a PDF or image file to upload.</p>
              </div>
            </div>
          )}

           {activeTab === 'device-connection' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Device Connection</h2>
              {/* Add device connection components/info here */}
              <p>Connect and manage your health devices here.</p>
            </div>
          )}

           {activeTab === 'contact-us' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              {/* Add contact form or info here */}
              <p>Contact information and form will be available here.</p>
            </div>
          )}

        </div>

        {/* Show patient ID and logout on mobile */}
        <div className="md:hidden flex justify-center mt-6">
           <p className="text-sm text-gray-600 mr-4">Patient ID: {userData.id}</p>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Logout
            </button>
        </div>

      </div>
      {showProfile && <ProfileModal patient={userData} onClose={() => setShowProfile(false)} />}
      {showReportModal && selectedReport && <ReportModal report={selectedReport} onClose={() => setShowReportModal(false)} />}
    </div>
  );
};

export default PatientDashboard;
