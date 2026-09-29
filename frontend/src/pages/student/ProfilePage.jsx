import { useNavigate } from 'react-router-dom';
import TopNavBar from '../../components/common/TopNavBar';
import { useAuth } from '../../context/AuthContext';
import { getStore } from '../../services/mockData';

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const store = getStore();

  const student = store.users.find((u) => u.role === 'ROLE_STUDENT') || {
    identifier: '20240192',
    name: 'Alexander Hayes',
    email: 'student@edutrack.edu',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    semester: 'Semester IV (2024-25)',
    overallAttendance: 89.4,
  };

  return (
    <div className="app-layout" style={{ flexDirection: 'column' }}>
      <TopNavBar
        title="Student Profile"
        actions={
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/student/dashboard')}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </button>
        }
      />

      <div className="content-canvas" style={{ padding: 'var(--space-margin-desktop) var(--space-md)' }}>
        <div className="content-max-width-lg">
          <div className="section-header">
            <div>
              <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                Institutional Profile
              </h1>
              <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                Academic identity, batch enrollment, and compliance standing
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
            {/* Left Card: Profile & Credentials */}
            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--space-lg)' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face"
                  alt={student.name}
                  className="avatar avatar--lg"
                  style={{ width: '72px', height: '72px' }}
                />
                <div>
                  <h3 className="text-headline-sm">{student.name}</h3>
                  <div className="text-data-mono" style={{ color: 'var(--color-primary)', fontSize: '13px', marginTop: '2px' }}>
                    {student.identifier}
                  </div>
                  <span className="badge badge--present" style={{ marginTop: '6px' }}>
                    Verified Student
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Institutional Email</div>
                  <div style={{ fontWeight: 500, marginTop: '2px' }}>{student.email}</div>
                </div>

                <div>
                  <div className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Department</div>
                  <div style={{ fontWeight: 500, marginTop: '2px' }}>{student.department}</div>
                </div>

                <div>
                  <div className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Program & Term</div>
                  <div style={{ fontWeight: 500, marginTop: '2px' }}>{student.program} • {student.semester}</div>
                </div>

                <div>
                  <div className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Faculty Mentor</div>
                  <div style={{ fontWeight: 500, marginTop: '2px' }}>Dr. Aris Thorne (Assoc. Prof)</div>
                </div>
              </div>
            </div>

            {/* Right Card: Attendance & Eligibility Status */}
            <div className="card" style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <h3 className="text-headline-sm">Examination Eligibility</h3>

              <div style={{
                backgroundColor: 'var(--color-surface-container-low)',
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '4px solid #166534',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#166534' }}>Eligible for End-Semester Exams</span>
                  <span className="text-data-mono" style={{ fontWeight: 700, fontSize: '16px' }}>89.4%</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                  Your cumulative attendance exceeds the 75% regulatory requirement established by the Academic Council.
                </p>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <h4 className="text-label-caps" style={{ color: 'var(--color-outline)', marginBottom: '8px' }}>Security & Device Session</h4>
                <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>
                  Logged in with institutional SSO credentials.<br />
                  Session authenticated via JWT with cryptographic token rotation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
