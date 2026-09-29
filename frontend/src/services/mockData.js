// Local persistence key
const STORAGE_KEY = 'edutrack_pro_store_v1';

const INITIAL_DATA = {
  users: [
    {
      id: 1,
      identifier: '20240192',
      email: 'student@edutrack.edu',
      name: 'Alexander Hayes',
      role: 'ROLE_STUDENT',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      department: 'Computer Science & Engineering',
      program: 'B.Tech Computer Science',
      semester: 'Semester IV (2024-25)',
      overallAttendance: 89.4,
    },
    {
      id: 2,
      identifier: 'FAC-8921',
      email: 'teacher@edutrack.edu',
      name: 'Dr. Aris Thorne',
      role: 'ROLE_TEACHER',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      department: 'Computer Science & Engineering',
      title: 'Associate Professor',
    },
    {
      id: 3,
      identifier: 'ADM-0001',
      email: 'admin@edutrack.edu',
      name: 'Dr. Evelyn Carter',
      role: 'ROLE_ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      department: 'Academic Affairs',
      title: 'Dean of Academic Administration',
    },
  ],

  batches: [
    { id: 1, code: 'CS-2024-A', name: 'Computer Science A', enrolledCount: 42, department: 'CSE', year: '2nd Year', avgAttendance: 87.2 },
    { id: 2, code: 'CS-2024-B', name: 'Computer Science B', enrolledCount: 38, department: 'CSE', year: '2nd Year', avgAttendance: 84.6 },
    { id: 3, code: 'ME-2024-A', name: 'Mechanical Engineering', enrolledCount: 45, department: 'ME', year: '2nd Year', avgAttendance: 81.3 },
    { id: 4, code: 'EE-2024-A', name: 'Electrical Engineering', enrolledCount: 36, department: 'EE', year: '2nd Year', avgAttendance: 78.5 },
  ],

  subjects: [
    { id: 1, code: 'CS201', name: 'Data Structures & Algorithms', credits: 4, department: 'CSE' },
    { id: 2, code: 'CS304', name: 'Database Management Systems', credits: 3, department: 'CSE' },
    { id: 3, code: 'CS310', name: 'Computer Networks', credits: 3, department: 'CSE' },
    { id: 4, code: 'MA202', name: 'Discrete Mathematics', credits: 4, department: 'Mathematics' },
    { id: 5, code: 'CS405', name: 'Operating Systems', credits: 4, department: 'CSE' },
  ],

  schedule: [
    {
      id: 101,
      time: '10:00 - 11:30 AM',
      endTime: '11:30 AM',
      subjectName: 'Data Structures & Algorithms',
      subjectCode: 'CS201',
      batchCode: 'CS-2024-A',
      location: 'Lab 302, Turing Block',
      enrolledCount: 42,
      status: 'ACTIVE',
      teacherId: 2,
    },
    {
      id: 102,
      time: '01:30 - 03:00 PM',
      endTime: '03:00 PM',
      subjectName: 'Database Management Systems',
      subjectCode: 'CS304',
      batchCode: 'CS-2024-B',
      location: 'Lecture Hall 405',
      enrolledCount: 38,
      status: 'SCHEDULED',
      teacherId: 2,
    },
    {
      id: 103,
      time: '08:30 - 10:00 AM',
      endTime: '10:00 AM',
      subjectName: 'Advanced Algorithms',
      subjectCode: 'CS401',
      batchCode: 'CS-2023-A',
      location: 'Auditorium Hall B',
      enrolledCount: 35,
      status: 'COMPLETED',
      attendanceRate: 94,
      teacherId: 2,
    },
  ],

  students: [
    { id: 1, studentIdCode: '20240192', name: 'Alexander Hayes', batchCode: 'CS-2024-A', overallPercentage: 94, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
    { id: 2, studentIdCode: '20240193', name: 'Beatrice Vance', batchCode: 'CS-2024-A', overallPercentage: 88, avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
    { id: 3, studentIdCode: '20240194', name: 'Charles Montgomery', batchCode: 'CS-2024-A', overallPercentage: 71, avatarUrl: '' },
    { id: 4, studentIdCode: '20240195', name: 'Diana Prince', batchCode: 'CS-2024-A', overallPercentage: 96, avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face' },
    { id: 5, studentIdCode: '20240196', name: 'Ethan Hunt', batchCode: 'CS-2024-A', overallPercentage: 68, avatarUrl: '' },
    { id: 6, studentIdCode: '20240197', name: 'Fiona Gallagher', batchCode: 'CS-2024-A', overallPercentage: 91, avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face' },
    { id: 7, studentIdCode: '20240198', name: 'George Clark', batchCode: 'CS-2024-A', overallPercentage: 84, avatarUrl: '' },
    { id: 8, studentIdCode: '20240199', name: 'Hannah Abbott', batchCode: 'CS-2024-A', overallPercentage: 76, avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
    { id: 9, studentIdCode: '20240200', name: 'Ian Malcolm', batchCode: 'CS-2024-A', overallPercentage: 64, avatarUrl: '' },
    { id: 10, studentIdCode: '20240201', name: 'Julia Roberts', batchCode: 'CS-2024-A', overallPercentage: 98, avatarUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face' },
    { id: 11, studentIdCode: '20240202', name: 'Kevin Tran', batchCode: 'CS-2024-A', overallPercentage: 82, avatarUrl: '' },
    { id: 12, studentIdCode: '20240203', name: 'Laura Croft', batchCode: 'CS-2024-A', overallPercentage: 89, avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face' },
  ],

  studentSubjectSummary: [
    { subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', attended: 36, total: 40, percentage: 90 },
    { subjectCode: 'CS304', subjectName: 'Database Management Systems', attended: 31, total: 34, percentage: 91.2 },
    { subjectCode: 'CS310', subjectName: 'Computer Networks', attended: 26, total: 32, percentage: 81.3 },
    { subjectCode: 'MA202', subjectName: 'Discrete Mathematics', attended: 24, total: 35, percentage: 68.6 },
    { subjectCode: 'CS405', subjectName: 'Operating Systems', attended: 33, total: 36, percentage: 91.7 },
  ],

  recentStudentLogs: [
    { id: 1, date: '2026-09-29', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', type: 'Lecture', status: 'PRESENT', time: '10:00 AM' },
    { id: 2, date: '2026-09-29', subjectCode: 'CS304', subjectName: 'Database Management Systems', type: 'Lab', status: 'PRESENT', time: '01:30 PM' },
    { id: 3, date: '2026-09-28', subjectCode: 'MA202', subjectName: 'Discrete Mathematics', type: 'Lecture', status: 'ABSENT', time: '09:00 AM' },
    { id: 4, date: '2026-09-28', subjectCode: 'CS310', subjectName: 'Computer Networks', type: 'Lecture', status: 'LATE', time: '11:00 AM' },
    { id: 5, date: '2026-09-27', subjectCode: 'CS405', subjectName: 'Operating Systems', type: 'Lecture', status: 'PRESENT', time: '02:00 PM' },
    { id: 6, date: '2026-09-26', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', type: 'Lab', status: 'PRESENT', time: '10:00 AM' },
  ],

  sessions: [
    {
      id: 501,
      batchCode: 'CS-2024-A',
      subjectCode: 'CS201',
      subjectName: 'Data Structures & Algorithms',
      date: '2026-09-29',
      timeSlot: '10:00 - 11:30 AM',
      facultyName: 'Dr. Aris Thorne',
      totalEnrolled: 42,
      presentCount: 38,
      lateCount: 2,
      absentCount: 2,
      attendanceRate: 90.5,
      status: 'FINALIZED',
    },
    {
      id: 502,
      batchCode: 'CS-2024-B',
      subjectCode: 'CS304',
      subjectName: 'Database Management Systems',
      date: '2026-09-28',
      timeSlot: '01:30 - 03:00 PM',
      facultyName: 'Dr. Aris Thorne',
      totalEnrolled: 38,
      presentCount: 32,
      lateCount: 3,
      absentCount: 3,
      attendanceRate: 84.2,
      status: 'FINALIZED',
    },
    {
      id: 503,
      batchCode: 'CS-2023-A',
      subjectCode: 'CS401',
      subjectName: 'Advanced Algorithms',
      date: '2026-09-29',
      timeSlot: '08:30 - 10:00 AM',
      facultyName: 'Dr. Aris Thorne',
      totalEnrolled: 35,
      presentCount: 33,
      lateCount: 1,
      absentCount: 1,
      attendanceRate: 94.3,
      status: 'FINALIZED',
    },
  ],
};

// Initialize or load from local storage
export function getStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(raw);
  } catch (_) {
    return INITIAL_DATA;
  }
}

export function saveStore(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
    // fallback
  }
}

// Helper methods
export const mockDataService = {
  getTeacherDashboardData: () => {
    const store = getStore();
    return {
      kpis: {
        todayAttendanceRate: 89.2,
        totalEnrolledToday: 115,
        atRiskCount: 6,
      },
      schedule: store.schedule,
      batches: store.batches,
    };
  },

  getStudentDashboardData: (studentId = 1) => {
    const store = getStore();
    const user = store.users.find((u) => u.id === studentId) || store.users[0];
    return {
      student: user,
      subjectSummary: store.studentSubjectSummary,
      history: store.recentStudentLogs,
      overall: {
        overallPercentage: user.overallAttendance || 89.4,
        presentCount: 142,
        absentCount: 18,
        lateCount: 4,
      },
    };
  },

  getAnalyticsData: () => {
    const store = getStore();
    return {
      kpis: {
        averageAttendance: 86.8,
        totalActiveSessions: 148,
        atRiskStudents: 14,
        flaggedBatches: 2,
      },
      trends: [
        { week: 'W1', cs: 94, me: 89, ee: 85 },
        { week: 'W2', cs: 91, me: 87, ee: 82 },
        { week: 'W3', cs: 88, me: 84, ee: 79 },
        { week: 'W4', cs: 92, me: 86, ee: 83 },
        { week: 'W5', cs: 89, me: 83, ee: 81 },
        { week: 'W6', cs: 87, me: 82, ee: 78 },
      ],
      batchAlerts: [
        { id: 1, batchCode: 'EE-2024-A', rate: 71.4, title: 'Electrical Eng. 2nd Year', description: 'Consecutive dip below 75% threshold in 3 subjects.', severity: 'critical' },
        { id: 2, batchCode: 'ME-2024-A', rate: 74.8, title: 'Mechanical Eng. 2nd Year', description: 'High absentee rate in Monday morning lab sessions.', severity: 'warning' },
      ],
      atRiskStudents: store.students.filter((s) => s.overallPercentage < 75),
    };
  },

  saveAttendanceSession: (sessionData, records) => {
    const store = getStore();
    const newSession = {
      id: Date.now(),
      batchCode: sessionData.batchCode || 'CS-2024-A',
      subjectCode: sessionData.subjectCode || 'CS201',
      subjectName: sessionData.subjectName || 'Data Structures & Algorithms',
      date: new Date().toISOString().split('T')[0],
      timeSlot: sessionData.timeSlot || '10:00 - 11:30 AM',
      facultyName: 'Dr. Aris Thorne',
      totalEnrolled: Object.keys(records).length,
      presentCount: Object.values(records).filter((r) => r === 'PRESENT').length,
      lateCount: Object.values(records).filter((r) => r === 'LATE').length,
      absentCount: Object.values(records).filter((r) => r === 'ABSENT').length,
      attendanceRate: Math.round(
        (Object.values(records).filter((r) => r === 'PRESENT').length / Object.keys(records).length) * 100
      ),
      status: 'FINALIZED',
    };

    store.sessions.unshift(newSession);

    // Update schedule if class matches
    if (sessionData.classId) {
      const classItem = store.schedule.find((s) => s.id === Number(sessionData.classId));
      if (classItem) {
        classItem.status = 'COMPLETED';
        classItem.attendanceRate = newSession.attendanceRate;
      }
    }

    saveStore(store);
    return newSession;
  },
};
