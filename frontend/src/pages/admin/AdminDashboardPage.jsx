import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import KpiCard from '../../components/common/KpiCard';
import { getStore } from '../../services/mockData';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const store = getStore();

  const studentCount = store.students.length;
  const teacherCount = store.users.filter((u) => u.role === 'ROLE_TEACHER').length || 18;
  const classCount = store.batches.length;
  const subjectCount = store.subjects.length;

  return (
    <div className="app-layout">
      <SidebarNav />

      <div className="main-content">
        <TopNavBar
          title="Admin Portal"
          actions={
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/admin/reports')}
            >
              <span className="material-symbols-outlined">summarize</span>
              <span>Generate Audit Report</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Institutional Administration
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Central attendance compliance, faculty & student directory, and event audit trail
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/admin/users')}
                >
                  <span className="material-symbols-outlined">person_add</span>
                  <span>Add Institutional User</span>
                </button>
              </div>
            </div>

            {/* 4 KPI Cards */}
            <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
              <KpiCard
                icon="school"
                iconBg="primary-fixed"
                label="Enrolled Students"
                value="1,248"
                subtext="Across all 4 academic years"
                onClick={() => navigate('/admin/students')}
              />
              <KpiCard
                icon="badge"
                iconBg="secondary-container"
                label="Faculty Members"
                value="64"
                subtext="8 academic departments"
                onClick={() => navigate('/admin/teachers')}
              />
              <KpiCard
                icon="groups"
                iconBg="primary-fixed"
                label="Active Batches"
                value="28"
                subtext="Spring 2024-25 term"
                onClick={() => navigate('/admin/classes')}
              />
              <KpiCard
                icon="how_to_reg"
                iconBg="tertiary-fixed"
                label="Overall Attendance"
                value="88.2%"
                subtext="+1.8% above institutional benchmark"
                onClick={() => navigate('/teacher/analytics')}
              />
            </div>

            {/* Quick Actions & System Modules */}
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="text-headline-sm" style={{ marginBottom: 'var(--space-md)' }}>
                System Management Modules
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-md)'
              }}>
                <div
                  className="card"
                  style={{ padding: 'var(--space-md)', cursor: 'pointer', transition: 'var(--transition-colors)' }}
                  onClick={() => navigate('/admin/users')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', backgroundColor: 'var(--color-primary-fixed)', borderRadius: 'var(--radius-sm)' }}>
                      <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>people</span>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600 }}>User Directory & Roles</h4>
                      <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>Manage accounts, credentials, and RBAC permissions</p>
                    </div>
                  </div>
                </div>

                <div
                  className="card"
                  style={{ padding: 'var(--space-md)', cursor: 'pointer', transition: 'var(--transition-colors)' }}
                  onClick={() => navigate('/admin/subjects')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', backgroundColor: 'var(--color-secondary-container)', borderRadius: 'var(--radius-sm)' }}>
                      <span className="material-symbols-outlined" style={{ color: 'var(--color-on-secondary-container)' }}>book</span>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600 }}>Curriculum & Subjects</h4>
                      <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>Course codes, credit allocations, and syllabi</p>
                    </div>
                  </div>
                </div>

                <div
                  className="card"
                  style={{ padding: 'var(--space-md)', cursor: 'pointer', transition: 'var(--transition-colors)' }}
                  onClick={() => navigate('/admin/classes')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', backgroundColor: 'var(--color-surface-container-high)', borderRadius: 'var(--radius-sm)' }}>
                      <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>groups</span>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600 }}>Batches & Class Sections</h4>
                      <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>Class rosters, faculty mappings, and timetables</p>
                    </div>
                  </div>
                </div>

                <div
                  className="card"
                  style={{ padding: 'var(--space-md)', cursor: 'pointer', transition: 'var(--transition-colors)' }}
                  onClick={() => navigate('/admin/reports')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', backgroundColor: 'rgba(111, 251, 190, 0.2)', borderRadius: 'var(--radius-sm)' }}>
                      <span className="material-symbols-outlined" style={{ color: '#005236' }}>summarize</span>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600 }}>Compliance & Lambda Reports</h4>
                      <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>Asynchronous PDF compilation and Kafka event audit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture / Event Stream Audit Card */}
            <div className="card" style={{ padding: 'var(--space-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-symbols-outlined" style={{ color: '#166534' }}>hub</span>
                  <h3 className="text-headline-sm" style={{ fontSize: '16px' }}>Kafka Event Stream & MongoDB Audit Pipeline</h3>
                </div>
                <span className="badge badge--present">Live Streaming Active</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Topic</th>
                      <th>Event ID</th>
                      <th>Triggered By</th>
                      <th>Payload Summary</th>
                      <th style={{ textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-mono">2026-09-29 18:30:12</td>
                      <td><span className="text-data-mono" style={{ color: '#6366f1' }}>attendance.marked</span></td>
                      <td className="td-mono">evt-948192</td>
                      <td>Dr. Aris Thorne (FAC-8921)</td>
                      <td>Finalized Session #501 for CS-2024-A (42 students)</td>
                      <td style={{ textAlign: 'right' }}><span className="badge badge--present">PROCESSED</span></td>
                    </tr>
                    <tr>
                      <td className="td-mono">2026-09-29 18:30:14</td>
                      <td><span className="text-data-mono" style={{ color: '#d97706' }}>notification.at_risk</span></td>
                      <td className="td-mono">evt-948193</td>
                      <td>Automated Risk Detector</td>
                      <td>Warning queued for Ian Malcolm (64.0% &lt; 75%)</td>
                      <td style={{ textAlign: 'right' }}><span className="badge badge--present">DISPATCHED</span></td>
                    </tr>
                    <tr>
                      <td className="td-mono">2026-09-29 17:15:00</td>
                      <td><span className="text-data-mono" style={{ color: '#0284c7' }}>audit.user_login</span></td>
                      <td className="td-mono">evt-948180</td>
                      <td>Alexander Hayes (20240192)</td>
                      <td>Authenticated from IP 192.168.1.45 via JWT</td>
                      <td style={{ textAlign: 'right' }}><span className="badge badge--present">LOGGED</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
