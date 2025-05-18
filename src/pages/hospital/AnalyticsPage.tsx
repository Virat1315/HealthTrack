import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Battery,
  Video,
  MessageSquare,
  AlertTriangle,
  X,
  Plus
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { mockMonitoringData, generateHistoricalData, PatientMonitoring } from '../../data/mockAnalytics';

interface HistoricalDataPoint {
  timestamp: string;
  heartRate: number;
  oxygenLevel: number;
  systolic: number;
  diastolic: number;
  respiratoryRate: number;
  temperature: number;
}

export default function AnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientMonitoring | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [showTelemedicine, setShowTelemedicine] = useState(false);

  useEffect(() => {
    if (selectedPatient) {
      setHistoricalData(generateHistoricalData(7)); // Generate 7 days of historical data
    }
  }, [selectedPatient]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const patient = mockMonitoringData.find(p => 
      p.patientId.toLowerCase() === query.toLowerCase() ||
      p.patientName.toLowerCase().includes(query.toLowerCase())
    );
    setSelectedPatient(patient || null);
  };

  const handleAddNote = () => {
    if (!selectedPatient || !newNote) return;

    const newAnnotation = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      doctorName: 'Dr. Current User', // Replace with actual logged-in doctor
      note: newNote
    };

    setSelectedPatient(prev => prev ? {
      ...prev,
      annotations: [newAnnotation, ...prev.annotations]
    } : null);

    setNewNote('');
    setShowAddNote(false);
  };

  const getVitalSignStatus = (parameter: string, value: number): 'normal' | 'warning' | 'critical' => {
    const thresholds: Record<string, { warning: [number, number], critical: [number, number] }> = {
      heartRate: { warning: [50, 100], critical: [40, 120] },
      oxygenLevel: { warning: [92, 100], critical: [90, 100] },
      temperature: { warning: [36.5, 37.5], critical: [35, 38.5] },
      respiratoryRate: { warning: [12, 20], critical: [10, 25] }
    };

    if (parameter in thresholds) {
      const { warning, critical } = thresholds[parameter];
      if (value >= critical[0] && value <= critical[1]) {
        if (value >= warning[0] && value <= warning[1]) {
          return 'normal';
        }
        return 'warning';
      }
      return 'critical';
    }
    return 'normal';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Remote Monitoring</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patient by ID or name..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {selectedPatient ? (
        <div className="grid grid-cols-12 gap-6">
          {/* Patient Info and Vital Signs */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Patient Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500">Patient ID:</span>
                  <span className="ml-2 font-medium">{selectedPatient.patientId}</span>
                </div>
                <div>
                  <span className="text-gray-500">Name:</span>
                  <span className="ml-2 font-medium">{selectedPatient.patientName}</span>
                </div>
                <div>
                  <span className="text-gray-500">Doctor:</span>
                  <span className="ml-2 font-medium">{selectedPatient.assignedDoctor}</span>
                </div>
                <div>
                  <span className="text-gray-500">Admission Date:</span>
                  <span className="ml-2 font-medium">{new Date(selectedPatient.admissionDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Diagnosis:</span>
                  <span className="ml-2 font-medium">{selectedPatient.diagnosis}</span>
                </div>
              </div>
            </div>

            {/* Vital Signs Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Current Vital Signs</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Heart className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Heart Rate</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {selectedPatient.vitalSigns.heartRate}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">bpm</span>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Activity className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">SpO2</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {selectedPatient.vitalSigns.oxygenLevel}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">%</span>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Activity className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-sm text-gray-600">Blood Pressure</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {selectedPatient.vitalSigns.bloodPressure.systolic}/
                    {selectedPatient.vitalSigns.bloodPressure.diastolic}
                  </span>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Thermometer className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-600">Temperature</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {selectedPatient.vitalSigns.temperature.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">°C</span>
                </div>
              </div>
            </div>

            {/* Connected Devices */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Connected Devices</h2>
              <div className="space-y-4">
                {selectedPatient.devices.map(device => (
                  <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        device.status === 'connected' ? 'bg-green-500' :
                        device.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                      }`} />
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Battery className="w-5 h-5 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{device.batteryLevel}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts and Monitoring */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Vital Signs Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Vital Signs Trend</h2>
                <select className="border border-gray-300 rounded-md px-3 py-1">
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="heartRate" stroke="#3B82F6" name="Heart Rate" />
                    <Line type="monotone" dataKey="oxygenLevel" stroke="#10B981" name="SpO2" />
                    <Line type="monotone" dataKey="systolic" stroke="#EF4444" name="Systolic BP" />
                    <Line type="monotone" dataKey="diastolic" stroke="#F59E0B" name="Diastolic BP" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
              <div className="space-y-4">
                {selectedPatient.alerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.type === 'critical' ? 'border-red-200 bg-red-50' :
                      alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                      'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <AlertTriangle className={`w-5 h-5 mr-3 ${
                        alert.type === 'critical' ? 'text-red-500' :
                        alert.type === 'warning' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{alert.message}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {!alert.acknowledged && (
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                              Acknowledge
                            </button>
                          )}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="text-gray-600">Value: </span>
                          <span className="font-medium">{alert.value}</span>
                          <span className="text-gray-600 ml-3">Threshold: </span>
                          <span className="font-medium">{alert.threshold}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Plan */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Treatment Plan</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Medications</h3>
                  <div className="space-y-2">
                    {selectedPatient.treatmentPlan.medications.map((med, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{med.name}</div>
                          <div className="text-sm text-gray-500">{med.dosage} - {med.frequency}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Procedures</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {selectedPatient.treatmentPlan.procedures.map((procedure, index) => (
                      <li key={index}>{procedure}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Notes</h3>
                  <p className="text-gray-600">{selectedPatient.treatmentPlan.notes}</p>
                </div>
              </div>
            </div>

            {/* Annotations */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Annotations & Notes</h2>
                <button
                  onClick={() => setShowAddNote(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  Add Note
                </button>
              </div>
              <div className="space-y-4">
                {selectedPatient.annotations.map(annotation => (
                  <div key={annotation.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{annotation.doctorName}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(annotation.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <p className="text-gray-600">{annotation.note}</p>
                    {annotation.relatedParameter && (
                      <div className="mt-2 text-sm text-gray-500">
                        Related to: {annotation.relatedParameter}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Telemedicine Controls */}
          <div className="fixed bottom-6 right-6 flex gap-3">
            <button
              onClick={() => setShowTelemedicine(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Video className="w-5 h-5 mr-2" />
              Start Video Call
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Chat
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Search for a Patient
          </h3>
          <p className="text-gray-500">
            Enter patient ID or name to view their monitoring data
          </p>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add Note</h2>
                <button onClick={() => setShowAddNote(false)}>
                  <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                rows={4}
                placeholder="Enter your note here..."
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddNote(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Telemedicine Modal */}
      {showTelemedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Video Call</h2>
                <button onClick={() => setShowTelemedicine(false)}>
                  <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <div className="aspect-video bg-gray-900 rounded-lg mb-4">
                {/* Video call interface would go here */}
                <div className="h-full flex items-center justify-center text-white">
                  Video call interface placeholder
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                  <Video className="w-6 h-6" />
                </button>
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                  <MessageSquare className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setShowTelemedicine(false)}
                  className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
