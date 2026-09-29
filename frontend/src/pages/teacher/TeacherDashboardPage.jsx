import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import KpiCard from '../../components/common/KpiCard';
import ClassCard from '../../components/teacher/ClassCard';
import BatchListRow from '../../components/teacher/BatchListRow';
import { mockDataService } from '../../services/mockData';

export default function TeacherDashboardPage() {
  const [data, setData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dashboardData = mockDataService.getTeacherDashboardData();
    setData(dashboardData);
  }, []);

  if (!data) {
    return (
      <div className="spinner-container" style={{ height: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar for Desktop */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="main-content">
        <TopNavBar
          title="Teacher Dashboard"
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          actions={
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/teacher/attendance/mark')}
            >
              <span className="material-symbols-outlined">add</span>
              <span className="hide-mobile">New Session</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            {/* Page Header */}
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Faculty Overview
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Academic Year 2024-25 • Department of Computer Science & Engineering
                </p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/teacher/attendance/log')}
                >
                  <span className="material-symbols-outlined">fact_check</span>
                  <span>View All Logs</span>
                </button>
              </div>
            </div>

            {/* 3 KPI Cards */}
            <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
              <KpiCard
                icon="how_to_reg"
                iconBg="primary-fixed"
                label="Today's Attendance Rate"
                value={`${data.kpis.todayAttendanceRate}%`}
                progress={data.kpis.todayAttendanceRate}
                subtext="Target: 85% institutional average"
              />
              <KpiCard
                icon="groups"
                iconBg="secondary-container"
                label="Enrolled Across Today's Sessions"
                value={data.kpis.totalEnrolledToday}
                trend={{ direction: 'up', text: '+4 from last week' }}
                subtext="3 lectures and laboratory slots"
              />
              <KpiCard
                icon="warning"
                iconBg="error-container"
                label="Students At-Risk (<75%)"
                value={data.kpis.atRiskCount}
                trend={{ direction: 'down', text: 'Action recommended' }}
                subtext="Flagged for low attendance alerts"
                onClick={() => navigate('/teacher/analytics')}
              />
            </div>

            {/* Main 2-column Grid: Schedule (2/3) + Batches (1/3) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-lg)',
              alignItems: 'start',
            }}>
              {/* Left Column: Today's Schedule */}
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <h2 className="text-headline-sm">Today's Class Schedule</h2>
                  </div>
                  <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  {data.schedule.map((item) => (
                    <ClassCard
                      key={item.id}
                      classData={item}
                      onMarkAttendance={(c) => navigate(`/teacher/attendance/mark?classId=${c.id}&batch=${c.batchCode}&subject=${c.subjectCode}`)}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: My Batches */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined text-primary">group</span>
                    <h2 className="text-headline-sm">My Batches</h2>
                  </div>
                  <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>
                    {data.batches.length} Assigned
                  </span>
                </div>

                <div className="card" style={{ overflow: 'hidden' }}>
                  {data.batches.map((batch, index) => (
                    <BatchListRow
                      key={batch.id}
                      batch={batch}
                      bgType={index % 2 === 0 ? 'primary-container' : 'secondary-container'}
                      onClick={() => navigate(`/teacher/attendance/log?batch=${batch.code}`)}
                    />
                  ))}

                  <div style={{ padding: 'var(--space-md)' }}>
                    <button
                      type="button"
                      className="btn btn-dashed btn-full"
                      onClick={() => alert('Batch assignment request submitted to Head of Department.')}
                    >
                      <span className="material-symbols-outlined">add</span>
                      <span>Request New Batch Assignment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
