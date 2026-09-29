import apiClient from './apiClient';

const attendanceService = {
  // Sessions
  getSessions: (params) =>
    apiClient.get('/attendance/sessions', { params }),
  createSession: (data) =>
    apiClient.post('/attendance/sessions', data),
  getSession: (id) =>
    apiClient.get(`/attendance/sessions/${id}`),
  finalizeSession: (id) =>
    apiClient.patch(`/attendance/sessions/${id}/finalize`),

  // Records
  bulkMarkAttendance: (sessionId, records) =>
    apiClient.post(`/attendance/sessions/${sessionId}/records`, { records }),
  updateRecord: (recordId, data) =>
    apiClient.put(`/attendance/records/${recordId}`, data),
  getRecords: (params) =>
    apiClient.get('/attendance/records', { params }),

  // Summaries
  getStudentSummary: (studentId, params) =>
    apiClient.get(`/attendance/student/${studentId}/summary`, { params }),
  getStudentHistory: (studentId, params) =>
    apiClient.get(`/attendance/student/${studentId}/history`, { params }),
  getClassSummary: (classId, params) =>
    apiClient.get(`/attendance/class/${classId}/summary`, { params }),

  // Analytics
  getAtRisk: (params) =>
    apiClient.get('/attendance/analytics/atrisk', { params }),
  getTrends: (params) =>
    apiClient.get('/attendance/analytics/trends', { params }),
};

export default attendanceService;
