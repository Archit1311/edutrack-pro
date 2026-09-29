import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './TopNavBar.css';

export default function TopNavBar({ title, actions, onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user
    ? ((user.firstName?.[0] || '') + (user.lastName?.[0] || '')).toUpperCase() || 'U'
    : 'U';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="topbar">
      {/* Left: Menu (mobile) + Brand / Title */}
      <div className="topbar__left">
        <button className="btn-icon hide-desktop" onClick={onMenuClick} aria-label="Open menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="topbar__brand">
          {title || 'EduTrack Pro'}
        </span>
      </div>

      {/* Right: Custom actions + Notifications + Avatar */}
      <div className="topbar__right">
        {actions && <div className="topbar__actions">{actions}</div>}
        <button className="btn-icon" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="topbar__avatar" onClick={handleLogout} aria-label="User menu">
          {initials}
        </button>
      </div>
    </header>
  );
}
