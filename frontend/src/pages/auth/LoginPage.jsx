import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RoleTabSwitcher from '../../components/auth/RoleTabSwitcher';
import PasswordInput from '../../components/auth/PasswordInput';
import SystemStatusBar from '../../components/auth/SystemStatusBar';

export default function LoginPage() {
  const [role, setRole] = useState('student'); // 'student' | 'faculty' | 'admin'
  const [identifier, setIdentifier] = useState('20240192');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
    if (newRole === 'student') {
      setIdentifier('20240192');
    } else if (newRole === 'faculty') {
      setIdentifier('FAC-8921');
    } else {
      setIdentifier('ADM-0001');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const user = await login(identifier, password, role);
      if (user.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else if (user.role === 'ROLE_TEACHER') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please verify your institutional ID and password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--color-surface)',
      padding: 'var(--space-md)',
    }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-container)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-md)',
          boxShadow: 'var(--shadow-card)',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
            school
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--color-primary)',
          letterSpacing: '-0.02em',
        }}>
          EduTrack Pro
        </h1>
        <p style={{
          fontFamily: 'var(--font-headline)',
          fontSize: 'var(--text-headline-sm-size)',
          color: 'var(--color-on-surface-variant)',
          marginTop: '4px',
        }}>
          Academic Attendance Portal
        </p>
      </div>

      {/* Main Login Card */}
      <div
        className="card-elevated"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: 'var(--space-xl)',
          backgroundColor: 'var(--color-surface-container-lowest)',
        }}
      >
        <RoleTabSwitcher activeRole={role} onSelectRole={handleRoleChange} />


        {error && (
          <div className="error-alert" style={{ marginBottom: 'var(--space-md)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {/* Identifier Input */}
          <div className="form-group">
            <label className="form-label">
              {role === 'student' ? 'Student ID' : role === 'faculty' ? 'Staff ID / Institutional Email' : 'Administrator ID'}
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <span className="material-symbols-outlined">badge</span>
              </div>
              <input
                type="text"
                className="form-input form-input--mono"
                placeholder={role === 'student' ? 'e.g. 20240192' : role === 'faculty' ? 'e.g. FAC-8921 or name@edutrack.edu' : 'e.g. ADM-0001'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <a href="#forgot" className="btn-ghost" style={{ fontSize: '12px' }}>
                Forgot Password?
              </a>
            </div>
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="remember"
              className="form-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" style={{ fontSize: 'var(--text-body-sm-size)', color: 'var(--color-on-surface-variant)', cursor: 'pointer' }}>
              Remember me on this institutional device
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={submitting}
            style={{ marginTop: 'var(--space-sm)' }}
          >
            {submitting ? (
              <span className="spinner" style={{ width: '20px', height: '20px', borderColor: '#ffffff', borderTopColor: 'transparent' }} />
            ) : (
              <>
                <span>Sign In to Portal</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Card Footer */}
        <div style={{
          marginTop: 'var(--space-lg)',
          paddingTop: 'var(--space-md)',
          borderTop: '1px solid var(--color-outline-variant)',
          textAlign: 'center',
          fontSize: 'var(--text-body-sm-size)',
          color: 'var(--color-on-surface-variant)'
        }}>
          {role === 'student' ? (
            <p>
              New student?{' '}
              <a href="#guide" className="btn-ghost">
                Institutional Registration Guide
              </a>
            </p>
          ) : (
            <p>
              Need assistance?{' '}
              <a href="#support" className="btn-ghost">
                Campus IT Helpdesk (Ext. 4022)
              </a>
            </p>
          )}
        </div>
      </div>

      <SystemStatusBar />
    </div>
  );
}
