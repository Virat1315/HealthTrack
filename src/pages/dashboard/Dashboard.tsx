import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  lastVisit: string;
}

interface Report {
  id: string;
  patientId: string;
  type: string;
  date: string;
  fileUrl: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'patients' | 'reports'>('patients');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const hospitalId = localStorage.getItem('hospitalId') || '';

  // Demo data - replace with actual API calls
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Sumit kumar',
      age: 18,
      diagnosis: 'Hypertension',
      lastVisit: '2024-02-01',
    },
    {
      id: '2',
      name: 'Kumari Shambhavi',
      age: 18,
      diagnosis: 'Diabetes Type 2',
      lastVisit: '2024-01-28',
    },
  ]);

  const [reports] = useState<Report[]>([
    {
      id: '1',
      patientId: '1',
      type: 'Blood Test',
      date: '2024-02-01',
      fileUrl: '#',
    },
    {
      id: '2',
      patientId: '2',
      type: 'X-Ray',
      date: '2024-01-28',
      fileUrl: '#',
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('hospitalId');
    navigate('/login');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      // Here you would typically upload the file to your server
      console.log('Uploading file:', selectedFile.name);
      // Reset file selection
      setSelectedFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h1>
              <span className="text-sm text-gray-500">Hospital ID: {hospitalId}</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`${
                  activeTab === 'patients'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('patients')}
              >
                Patients
              </button>
              <button
                className={`${
                  activeTab === 'reports'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('reports')}
              >
                Reports
              </button>
            </nav>
          </div>

          {activeTab === 'patients' && (
            <div className="mt-6">
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Age
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Diagnosis
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Last Visit
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {patients.map((patient) => (
                            <tr key={patient.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.age}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.diagnosis}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastVisit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="mt-6">
              <div className="mb-6">
                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upload New Report</label>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!selectedFile}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
                  >
                    Upload Report
                  </button>
                </form>
              </div>

              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Patient ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {reports.map((report) => (
                            <tr key={report.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.patientId}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <a href={report.fileUrl} className="text-indigo-600 hover:text-indigo-900">
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
