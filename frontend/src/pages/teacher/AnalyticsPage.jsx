import { useState } from 'react';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import KpiCard from '../../components/common/KpiCard';
import TrendChart from '../../components/teacher/TrendChart';
import BatchAlertCard from '../../components/teacher/BatchAlertCard';
import SearchInput from '../../components/common/SearchInput';
import { mockDataService } from '../../services/mockData';

export default function AnalyticsPage() {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifiedStudents, setNotifiedStudents] = useState({});

  const analytics = mockDataService.getAnalyticsData();

  const handleNotifyStudent = (studentId, studentName) => {
    setNotifiedStudents((prev) => ({ ...prev, [studentId]: true }));
    alert(`Formal attendance warning email dispatched to ${studentName}.`);
  };

  const handleEmailAllAtRisk = () => {
    alert(`Dispatched formal attendance warnings to all ${analytics.atRiskStudents.length} at-risk students.`);
  };

  const filteredAtRisk = analytics.atRiskStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentIdCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.batchCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-layout">
      <SidebarNav />

      <div className="main-content">
        <TopNavBar
          title="Attendance Analytics"
          actions={
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => alert('Generating institutional compliance PDF report...')}
            >
              <span className="material-symbols-outlined">picture_as_pdf</span>
              <span>Generate PDF</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            {/* Header */}
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Department Analytics & Trends
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Institutional attendance performance, batch alerts, and automated risk detection
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select
                  className="form-select"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="Fall 2024">Fall Semester 2024-25</option>
                  <option value="Spring 2024">Spring Semester 2023-24</option>
                  <option value="Full Year">Full Academic Year</option>
                </select>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => alert('Exporting raw dataset...')}
                >
                  <span className="material-symbols-outlined">download</span>
                  <span className="hide-mobile">Export Data</span>
                </button>
              </div>
            </div>

            {/* 4 KPI Cards */}
            <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
              <KpiCard
                icon="monitoring"
                iconBg="primary-fixed"
                label="Average Attendance Rate"
                value={`${analytics.kpis.averageAttendance}%`}
                trend={{ direction: 'up', text: '+1.4% vs last term' }}
                subtext="Institutional threshold: 75.0%"
              />
              <KpiCard
                icon="fact_check"
                iconBg="secondary-container"
                label="Total Active Sessions"
                value={analytics.kpis.totalActiveSessions}
                trend={{ direction: 'flat', text: '100% audited' }}
                subtext="Across 4 department batches"
              />
              <KpiCard
                icon="warning"
                iconBg="error-container"
                label="At-Risk Students (<75%)"
                value={analytics.kpis.atRiskStudents}
                trend={{ direction: 'down', text: '3 critical (<65%)' }}
                subtext="Action required by faculty"
              />
              <KpiCard
                icon="notification_important"
                iconBg="secondary-container"
                label="Flagged Batches"
                value={analytics.kpis.flaggedBatches}
                subtext="EE-2024-A & ME-2024-A"
              />
            </div>

            {/* Middle Section: Trend Chart (3/4) + Batch Alerts (1/4) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-lg)',
              marginBottom: 'var(--space-xl)',
            }}>
              {/* Trend Chart (2-column span) */}
              <div style={{ gridColumn: 'span 2' }} className="card">
                <div style={{
                  padding: 'var(--space-md)',
                  borderBottom: '1px solid var(--color-outline-variant)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <h3 className="text-headline-sm" style={{ fontSize: '16px' }}>Weekly Attendance Trajectory</h3>
                    <p className="text-body-sm text-on-surface-variant">Comparing CS, Mechanical, and Electrical cohorts</p>
                  </div>
                  <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>
                    Last 6 Academic Weeks
                  </span>
                </div>
                <div style={{ padding: 'var(--space-md)' }}>
                  <TrendChart data={analytics.trends} />
                </div>
              </div>

              {/* Batch Alerts Sidebar */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  padding: 'var(--space-md)',
                  borderBottom: '1px solid var(--color-outline-variant)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span className="material-symbols-outlined text-error">notification_important</span>
                  <h3 className="text-headline-sm" style={{ fontSize: '16px' }}>Cohort Warnings</h3>
                </div>

                <div style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  {analytics.batchAlerts.map((alert) => (
                    <BatchAlertCard
                      key={alert.id}
                      batchCode={alert.batchCode}
                      rate={alert.rate}
                      title={alert.title}
                      description={alert.description}
                      severity={alert.severity}
                    />
                  ))}

                  <div style={{
                    backgroundColor: 'var(--color-surface-container-low)',
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    color: 'var(--color-on-surface-variant)',
                    marginTop: 'auto'
                  }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '4px' }}>
                      Automated Academic Early Warning
                    </div>
                    Notifications are queued via Apache Kafka and sent automatically to students and mentors when attendance falls below 75%.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: At-Risk Register Table */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{
                padding: 'var(--space-md)',
                borderBottom: '1px solid var(--color-outline-variant)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 'var(--space-md)',
              }}>
                <div>
                  <h3 className="text-headline-sm" style={{ fontSize: '18px' }}>At-Risk Student Register</h3>
                  <p className="text-body-sm text-on-surface-variant">Students currently below the 75% institutional attendance threshold</p>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                  <div style={{ minWidth: '220px' }}>
                    <SearchInput
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="Search at-risk students..."
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEmailAllAtRisk}
                  >
                    <span className="material-symbols-outlined">mail</span>
                    <span>Notify All</span>
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Student ID</th>
                      <th>Batch</th>
                      <th>Cumulative Attendance</th>
                      <th>Risk Level</th>
                      <th>Trend</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAtRisk.map((student) => {
                      const isNotified = notifiedStudents[student.id];
                      const isCritical = student.overallPercentage < 70;

                      return (
                        <tr key={student.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div
                                className="avatar-initials avatar--sm"
                                style={{
                                  backgroundColor: isCritical ? 'var(--color-error-container)' : 'var(--color-secondary-container)',
                                  color: isCritical ? 'var(--color-on-error-container)' : 'var(--color-on-secondary-container)',
                                }}
                              >
                                {student.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                              </div>
                              <span className="td-name">{student.name}</span>
                            </div>
                          </td>
                          <td className="td-mono">{student.studentIdCode}</td>
                          <td>
                            <span className="class-card__batch-chip text-label-caps">{student.batchCode}</span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                className="text-data-mono"
                                style={{
                                  fontWeight: 700,
                                  color: isCritical ? 'var(--color-error)' : 'var(--color-warning-text)',
                                }}
                              >
                                {student.overallPercentage}%
                              </span>
                              <div className="progress-track progress-track--xs" style={{ width: '60px' }}>
                                <div
                                  className="progress-fill progress-fill--warning"
                                  style={{
                                    width: `${student.overallPercentage}%`,
                                    backgroundColor: isCritical ? 'var(--color-error)' : 'var(--color-warning)',
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`badge ${isCritical ? 'badge--absent' : 'badge--late'}`}
                            >
                              {isCritical ? 'CRITICAL (<70%)' : 'WARNING (<75%)'}
                            </span>
                          </td>
                          <td>
                            <span className="material-symbols-outlined text-error" style={{ fontSize: '18px' }}>
                              trending_down
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              type="button"
                              className={`btn ${isNotified ? 'btn-secondary' : 'btn-primary'}`}
                              style={{ padding: '4px 10px', fontSize: '11px' }}
                              disabled={isNotified}
                              onClick={() => handleNotifyStudent(student.id, student.name)}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                                {isNotified ? 'check' : 'mail'}
                              </span>
                              <span>{isNotified ? 'Notified' : 'Email Warning'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredAtRisk.length === 0 && (
                      <tr>
                        <td colSpan="7">
                          <div className="empty-state">
                            <span className="material-symbols-outlined">check_circle</span>
                            <p>No at-risk students found.</p>
                          </div>
                        </td>
                      </tr>
                    )}
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
