import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SidebarNav.css';

const TEACHER_NAV = [
  { icon: 'dashboard', label: 'Overview',       to: '/teacher/dashboard' },
  { icon: 'how_to_reg',label: 'Mark Attendance',to: '/teacher/attendance/mark' },
  { icon: 'fact_check',label: 'Attendance Log', to: '/teacher/attendance/log' },
  { icon: 'analytics', label: 'Analytics',       to: '/teacher/analytics' },
];

const STUDENT_NAV = [
  { icon: 'dashboard',   label: 'Dashboard',    to: '/student/dashboard'  },
  { icon: 'fact_check',  label: 'Attendance',   to: '/student/attendance' },
  { icon: 'person',      label: 'Profile',      to: '/student/profile'    },
];

const ADMIN_NAV = [
  { icon: 'dashboard',   label: 'Dashboard',  to: '/admin/dashboard' },
  { icon: 'people',      label: 'Users',      to: '/admin/users'     },
  { icon: 'school',      label: 'Students',   to: '/admin/students'  },
  { icon: 'person',      label: 'Teachers',   to: '/admin/teachers'  },
  { icon: 'book',        label: 'Subjects',   to: '/admin/subjects'  },
  { icon: 'groups',      label: 'Classes',    to: '/admin/classes'   },
  { icon: 'summarize',   label: 'Reports',    to: '/admin/reports'   },
];

export default function SidebarNav({ onNewSession }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems =
    user?.role === 'ROLE_TEACHER' ? TEACHER_NAV :
    user?.role === 'ROLE_STUDENT' ? STUDENT_NAV :
    user?.role === 'ROLE_ADMIN'   ? ADMIN_NAV   : [];

  const isTeacher = user?.role === 'ROLE_TEACHER';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      {/* Brand Header */}
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <span className="material-symbols-outlined fill" style={{ color: 'var(--color-on-primary)', fontSize: 20 }}>school</span>
        </div>
        <div>
          <div className="sidebar__app-name">Academic Portal</div>
          <div className="sidebar__division text-label-caps text-on-surface-variant">
            {user?.role === 'ROLE_STUDENT' ? 'Student Portal' : 'Faculty Division'}
          </div>
        </div>
      </div>

      {/* New Session CTA (Teacher only) */}
      {isTeacher && (
        <div className="sidebar__cta">
          <button
            type="button"
            className="btn btn-primary btn-full sidebar__new-session-btn"
            onClick={onNewSession || (() => navigate('/teacher/attendance/mark'))}
          >
            <span className="material-symbols-outlined">add</span>
            <span className="text-label-caps">New Session</span>
          </button>
        </div>
      )}

      {/* Navigation Items */}
      <div className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-label-caps">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="sidebar__bottom">
        <a href="#help" className="sidebar__nav-item">
          <span className="material-symbols-outlined">help</span>
          <span className="text-label-caps">Help Center</span>
        </a>
        <button className="sidebar__nav-item sidebar__logout-btn" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="text-label-caps">Logout</span>
        </button>
      </div>
    </nav>
  );
}
