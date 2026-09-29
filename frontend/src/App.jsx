import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './routes/RouteGuards';

// Auth
import LoginPage from './pages/auth/LoginPage';

// Teacher
import TeacherDashboardPage   from './pages/teacher/TeacherDashboardPage';
import MarkAttendancePage     from './pages/teacher/MarkAttendancePage';
import AttendanceLogPage      from './pages/teacher/AttendanceLogPage';
import AnalyticsPage          from './pages/teacher/AnalyticsPage';

// Student
import StudentDashboardPage   from './pages/student/StudentDashboardPage';
import AttendanceHistoryPage  from './pages/student/AttendanceHistoryPage';
import ProfilePage            from './pages/student/ProfilePage';

// Admin
import AdminDashboardPage     from './pages/admin/AdminDashboardPage';
import UsersPage              from './pages/admin/UsersPage';
import StudentsPage           from './pages/admin/StudentsPage';
import TeachersPage           from './pages/admin/TeachersPage';
import SubjectsPage           from './pages/admin/SubjectsPage';
import ClassesPage            from './pages/admin/ClassesPage';
import ReportsPage            from './pages/admin/ReportsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ── Public ───────────────────────────────────────── */}
          <Route path="/login" element={
            <PublicRoute><LoginPage /></PublicRoute>
          } />

          {/* ── Student ──────────────────────────────────────── */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_ADMIN']}>
              <StudentDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/student/attendance" element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_ADMIN']}>
              <AttendanceHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="/student/profile" element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_ADMIN']}>
              <ProfilePage />
            </ProtectedRoute>
          } />

          {/* ── Teacher ──────────────────────────────────────── */}
          <Route path="/teacher/dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
              <TeacherDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/teacher/attendance/mark" element={
            <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
              <MarkAttendancePage />
            </ProtectedRoute>
          } />
          <Route path="/teacher/attendance/log" element={
            <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
              <AttendanceLogPage />
            </ProtectedRoute>
          } />
          <Route path="/teacher/analytics" element={
            <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
              <AnalyticsPage />
            </ProtectedRoute>
          } />

          {/* ── Admin ────────────────────────────────────────── */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <UsersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/students" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <StudentsPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/teachers" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <TeachersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/subjects" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <SubjectsPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/classes" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <ClassesPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <ReportsPage />
            </ProtectedRoute>
          } />

          {/* ── Catch-all ────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
