import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../../components/common/TopNavBar';
import SubjectAttendanceBar from '../../components/student/SubjectAttendanceBar';
import OverallAttendanceCard from '../../components/student/OverallAttendanceCard';
import MiniCalendar from '../../components/student/MiniCalendar';
import TodaySchedule from '../../components/student/TodaySchedule';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { mockDataService } from '../../services/mockData';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const studentData = mockDataService.getStudentDashboardData(user?.id || 1);
    setData(studentData);
  }, [user]);

  if (!data) {
    return (
      <div className="spinner-container" style={{ height: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="app-layout" style={{ flexDirection: 'column' }}>
      {/* Top Navbar */}
      <TopNavBar
        title="Student Portal"
        actions={
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/student/attendance')}
            >
              <span className="material-symbols-outlined">history</span>
              <span className="hide-mobile">Full History</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/student/profile')}
            >
              <span className="material-symbols-outlined">person</span>
              <span className="hide-mobile">My Profile</span>
            </button>
          </div>
        }
      />

      {/* Main Content */}
      <div className="content-canvas" style={{ padding: 'var(--space-margin-desktop) var(--space-md)' }}>
        <div className="content-max-width">
          {/* Student Profile Banner */}
          <div
            className="card"
            style={{
              padding: 'var(--space-lg)',
              marginBottom: 'var(--space-xl)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--space-md)',
              backgroundColor: 'var(--color-surface-container-lowest)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={data.student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'}
                alt={data.student.name}
                className="avatar avatar--lg"
                style={{ width: '56px', height: '56px' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span className="text-data-mono" style={{ fontSize: '12px', color: 'var(--color-primary)' }}>
                    {data.student.identifier || '20240192'}
                  </span>
                  <span style={{ color: 'var(--color-outline-variant)' }}>•</span>
                  <span className="badge badge--present" style={{ fontSize: '10px' }}>
                    Active Enrolled
                  </span>
                </div>
                <h1 className="text-display-lg" style={{ fontSize: '26px', color: 'var(--color-primary)' }}>
                  {data.student.name}
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '2px' }}>
                  {data.student.program || 'B.Tech Computer Science & Engineering'} • {data.student.semester || 'Semester IV (2024-25)'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Standing</span>
                <div style={{ color: '#166534', fontWeight: 700, fontSize: '15px' }}>Good Standing</div>
              </div>
              <div style={{ height: '32px', width: '1px', backgroundColor: 'var(--color-outline-variant)' }} />
              <div style={{ textAlign: 'right' }}>
                <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Required</span>
                <div className="text-data-mono" style={{ fontWeight: 700, fontSize: '15px' }}>75.0%</div>
              </div>
            </div>
          </div>

          {/* Main 12-column Layout: Left 8/12, Right 4/12 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'start',
          }}>
            {/* Left 8/12 Section */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              {/* Subject Attendance Breakdown */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined text-primary">pie_chart</span>
                    <h2 className="text-headline-sm">Course Attendance</h2>
                  </div>
                  <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>
                    {data.subjectSummary.length} Courses Enrolled
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 'var(--space-md)'
                }}>
                  {data.subjectSummary.map((sub) => (
                    <SubjectAttendanceBar
                      key={sub.subjectCode}
                      subjectCode={sub.subjectCode}
                      subjectName={sub.subjectName}
                      attended={sub.attended}
                      total={sub.total}
                      percentage={sub.percentage}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Attendance Log Table */}
              <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{
                  padding: 'var(--space-md)',
                  borderBottom: '1px solid var(--color-outline-variant)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <h3 className="text-headline-sm" style={{ fontSize: '16px' }}>Recent Class Roll Calls</h3>
                    <p className="text-body-sm text-on-surface-variant">Last 7 verified session entries</p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ fontSize: '12px', padding: '4px 10px' }}
                    onClick={() => navigate('/student/attendance')}
                  >
                    View All
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Course</th>
                        <th>Type</th>
                        <th style={{ textAlign: 'right' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.history.map((record) => (
                        <tr key={record.id}>
                          <td className="td-mono">{record.date}</td>
                          <td className="td-mono" style={{ fontSize: '11px' }}>{record.time}</td>
                          <td>
                            <div className="td-name">{record.subjectName}</div>
                            <div className="text-data-mono" style={{ fontSize: '11px', color: 'var(--color-outline)' }}>
                              {record.subjectCode}
                            </div>
                          </td>
                          <td>
                            <span className="text-data-mono" style={{ fontSize: '12px' }}>{record.type}</span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <StatusBadge status={record.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right 4/12 Sidebar Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              {/* Overall Attendance Hero Card */}
              <OverallAttendanceCard
                overallPercentage={data.overall.overallPercentage}
                presentCount={data.overall.presentCount}
                absentCount={data.overall.absentCount}
                lateCount={data.overall.lateCount}
              />

              {/* Mini Calendar */}
              <MiniCalendar />

              {/* Today's Schedule */}
              <TodaySchedule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
