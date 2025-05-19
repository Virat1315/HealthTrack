import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  Download,
  Plus,
  X
} from 'lucide-react';
import { Patient, mockPatients } from '../../data/mockPatients';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface PatientFormData {
  name: string;
  age: string; // Change from number to string
  gender: string;
  bloodGroup: string;
  contactNumber: string;
  email: string;
  address: string;
  medicalHistory: string[];
}

const initialFormData: PatientFormData = {
  name: '',
  age: '', // Change from 0 to empty string
  gender: '',
  bloodGroup: '',
  contactNumber: '',
  email: '',
  address: '',
  medicalHistory: [''],
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(mockPatients);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);

  // Add new state for filter functionality
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    bloodGroup: '',
    ageRange: '',
    lastVisit: ''
  });

  // Add new states for export functionality
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedPatientIds, setSelectedPatientIds] = useState<string[]>([]);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockPatients.filter(patient =>
      patient.name.toLowerCase().includes(query.toLowerCase()) ||
      patient.email.toLowerCase().includes(query.toLowerCase()) ||
      patient.contactNumber.includes(query)
    );
    setFilteredPatients(filtered);
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicalHistoryChange = (index: number, value: string) => {
    setFormData(prev => {
      const newHistory = [...prev.medicalHistory];
      newHistory[index] = value;
      return {
        ...prev,
        medicalHistory: newHistory
      };
    });
  };

  const addMedicalHistoryField = () => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: [...prev.medicalHistory, '']
    }));
  };

  const removeMedicalHistoryField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory.filter((_, i) => i !== index)
    }));
  };

  // Modal handlers
  const openAddModal = () => {
    setFormData(initialFormData);
    setIsAddModalOpen(true);
  };

  const openViewModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const openEditModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age.toString(), // Convert age to string
      gender: patient.gender,
      bloodGroup: patient.bloodGroup,
      contactNumber: patient.contactNumber,
      email: patient.email,
      address: patient.address,
      medicalHistory: patient.medicalHistory,
    });
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedPatient(null);
    setFormData(initialFormData);
  };

  // Submit handlers
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      age: parseInt(formData.age), // Parse string to number here
      medicalReports: [],
      lastVisit: new Date().toISOString().split('T')[0],
    };
    setPatients(prev => [newPatient, ...prev]);
    setFilteredPatients(prev => [newPatient, ...prev]);
    closeModals();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const updatedPatient: Patient = {
      ...selectedPatient,
      ...formData,
      age: parseInt(formData.age), // Parse string to number here
    };

    const updatedPatients = patients.map(p => 
      p.id === selectedPatient.id ? updatedPatient : p
    );

    setPatients(updatedPatients);
    setFilteredPatients(updatedPatients);
    closeModals();
  };

  // Add filter application function
  const applyFilters = () => {
    let filtered = [...patients];

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

  // Add export functions
  const exportToCSV = (data: any[], filename: string) => {
    const headers = ['Name', 'Age', 'Gender', 'Blood Group', 'Email', 'Contact', 'Address', 'Medical History', 'Last Visit'];
    const csvData = data.map(patient => [
      patient.name,
      patient.age,
      patient.gender,
      patient.bloodGroup,
      patient.email,
      patient.contactNumber,
      patient.address,
      patient.medicalHistory.join('; '),
      patient.lastVisit
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToPDF = (data: any[], filename: string) => {
    const headers = ['Name', 'Age', 'Gender', 'Blood Group', 'Email', 'Contact', 'Address'];
    const tableData = data.map(patient => [
      patient.name,
      patient.age.toString(),
      patient.gender,
      patient.bloodGroup,
      patient.email,
      patient.contactNumber,
      patient.address,
    ]);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Patient Data Export', 15, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 22);

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,
      margin: { top: 15 },
      styles: { fontSize: 8 },
      headStyles: { fillColor: [66, 139, 202] },
    });

    data.forEach((patient, index) => {
      doc.addPage();
      doc.setFontSize(14);
      doc.text(`Medical History - ${patient.name}`, 15, 15);
      doc.setFontSize(10);
      let yPos = 25;
      
      doc.text('Medical History:', 15, yPos);
      yPos += 7;
      patient.medicalHistory.forEach((history: string) => {
        doc.text(`• ${history}`, 20, yPos);
        yPos += 7;
      });

      yPos += 5;
      doc.text(`Last Visit: ${patient.lastVisit}`, 15, yPos);

      yPos += 7;
      doc.text(`Total Reports: ${patient.medicalReports.length}`, 15, yPos);
    });

    doc.save(filename);
  };

  const handleExport = () => {
    const dataToExport = selectedPatientIds.length > 0
      ? filteredPatients.filter(p => selectedPatientIds.includes(p.id))
      : filteredPatients;
    const filename = `patients_export_${new Date().toISOString().split('T')[0]}`;
    
    if (exportFormat === 'csv') {
      exportToCSV(dataToExport, `${filename}.csv`);
    } else if (exportFormat === 'pdf') {
      exportToPDF(dataToExport, `${filename}.pdf`);
    }
    
    setShowExportModal(false);
    setSelectedPatientIds([]);
  };

  const togglePatientSelection = (patientId: string) => {
    setSelectedPatientIds(prev => 
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  // Modal Components
  const PatientModal = ({ title, onSubmit, children }: { title: string; onSubmit: (e: React.FormEvent) => void; children: React.ReactNode }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button onClick={closeModals} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={onSubmit}>
            {children}
          </form>
        </div>
      </div>
    </div>
  );

  const PatientForm = () => (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            min="0"
            max="150"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
        {formData.medicalHistory.map((history, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={history}
              onChange={(e) => handleMedicalHistoryChange(index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter medical history"
            />
            {formData.medicalHistory.length > 1 && (
              <button
                type="button"
                onClick={() => removeMedicalHistoryField(index)}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addMedicalHistoryField}
          className="text-green-600 hover:text-green-800 text-sm font-medium"
        >
          + Add More
        </button>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={closeModals}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Patient
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowFilterModal(true)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filter
        </button>
        <button 
          onClick={() => setShowExportModal(true)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Download className="w-5 h-5 mr-2" />
          Export
        </button>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const allIds = filteredPatients.map(p => p.id);
                    setSelectedPatientIds(e.target.checked ? allIds : []);
                  }}
                  checked={selectedPatientIds.length === filteredPatients.length}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedPatientIds.includes(patient.id)}
                    onChange={() => togglePatientSelection(patient.id)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.age} years • {patient.gender}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.email}</div>
                  <div className="text-sm text-gray-500">{patient.contactNumber}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{patient.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {patient.bloodGroup}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.medicalReports.length} Reports
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.lastVisit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openViewModal(patient)}
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => openEditModal(patient)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <PatientModal title="Add New Patient" onSubmit={handleAddSubmit}>
          <PatientForm />
        </PatientModal>
      )}

      {/* Edit Patient Modal */}
      {isEditModalOpen && (
        <PatientModal title="Edit Patient" onSubmit={handleEditSubmit}>
          <PatientForm />
        </PatientModal>
      )}

      {/* View Patient Modal */}
      {isViewModalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Patient Details</h2>
                <button onClick={closeModals} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Age</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Blood Group</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.bloodGroup}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.contactNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedPatient.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Medical History</h3>
                  <ul className="mt-1 space-y-1">
                    {selectedPatient.medicalHistory.map((history, index) => (
                      <li key={index} className="text-sm text-gray-900">• {history}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Medical Reports</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedPatient.medicalReports.length} reports available
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Visit</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedPatient.lastVisit}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
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
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
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
                  setFilteredPatients(patients);
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
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Export Patients Data</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>

              <div className="text-sm text-gray-600">
                {selectedPatientIds.length > 0 ? (
                  <p>Exporting data for {selectedPatientIds.length} selected patients</p>
                ) : (
                  <p>Exporting data for all {filteredPatients.length} patients</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
