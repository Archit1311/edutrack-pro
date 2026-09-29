import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — redirects to /login if not authenticated.
 * If `allowedRoles` is provided, also enforces role-based access.
 */
export function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="spinner-container" style={{ height: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to the user's own dashboard
    const dashboardMap = {
      ROLE_ADMIN:    '/admin/dashboard',
      ROLE_TEACHER:  '/teacher/dashboard',
      ROLE_STUDENT:  '/student/dashboard',
    };
    return <Navigate to={dashboardMap[user.role] || '/login'} replace />;
  }

  return children;
}

/**
 * PublicRoute — redirects authenticated users to their dashboard.
 */
export function PublicRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="spinner-container" style={{ height: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    const dashboardMap = {
      ROLE_ADMIN:   '/admin/dashboard',
      ROLE_TEACHER: '/teacher/dashboard',
      ROLE_STUDENT: '/student/dashboard',
    };
    return <Navigate to={dashboardMap[user.role] || '/'} replace />;
  }

  return children;
}
