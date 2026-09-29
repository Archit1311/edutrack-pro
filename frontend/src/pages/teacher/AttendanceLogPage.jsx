import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import SearchInput from '../../components/common/SearchInput';
import StatusBadge from '../../components/common/StatusBadge';
import { getStore } from '../../services/mockData';

export default function AttendanceLogPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const batchFilter = searchParams.get('batch') || 'ALL';

  const [selectedBatch, setSelectedBatch] = useState(batchFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);

  const store = getStore();
  const sessions = store.sessions || [];

  const batches = useMemo(() => {
    return ['ALL', ...new Set(sessions.map((s) => s.batchCode))];
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchBatch = selectedBatch === 'ALL' || s.batchCode === selectedBatch;
      const matchSearch =
        !searchQuery.trim() ||
        s.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.batchCode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBatch && matchSearch;
    });
  }, [sessions, selectedBatch, searchQuery]);

  return (
    <div className="app-layout">
      <SidebarNav />

      <div className="main-content">
        <TopNavBar
          title="Attendance Log"
          actions={
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/teacher/attendance/mark')}
            >
              <span className="material-symbols-outlined">add</span>
              <span>New Session</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Institutional Attendance Log
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Audited historical records and session roll calls
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => alert('Exporting attendance audit log in CSV format...')}
                >
                  <span className="material-symbols-outlined">download</span>
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-lg)'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Filter Batch:</span>
                {batches.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`btn ${selectedBatch === b ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '4px 12px', fontSize: '12px' }}
                    onClick={() => setSelectedBatch(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <div style={{ minWidth: '260px' }}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search course or batch..."
                />
              </div>
            </div>

            {/* Sessions Table */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Batch</th>
                      <th>Course / Subject</th>
                      <th>Enrolled</th>
                      <th>Breakdown (P / L / A)</th>
                      <th>Attendance Rate</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSessions.map((session) => (
                      <tr key={session.id}>
                        <td className="td-mono">{session.date}</td>
                        <td className="td-mono" style={{ fontSize: '11px' }}>{session.timeSlot}</td>
                        <td>
                          <span className="class-card__batch-chip text-label-caps">{session.batchCode}</span>
                        </td>
                        <td>
                          <div className="td-name">{session.subjectName}</div>
                          <div className="text-data-mono" style={{ fontSize: '11px', color: 'var(--color-outline)' }}>
                            {session.subjectCode}
                          </div>
                        </td>
                        <td className="td-mono" style={{ textAlign: 'center' }}>{session.totalEnrolled}</td>
                        <td>
                          <span style={{ color: '#166534', fontWeight: 600 }}>{session.presentCount}P</span>
                          {' / '}
                          <span style={{ color: '#d97706', fontWeight: 600 }}>{session.lateCount}L</span>
                          {' / '}
                          <span style={{ color: '#ba1a1a', fontWeight: 600 }}>{session.absentCount}A</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="text-data-mono" style={{ fontWeight: 700 }}>
                              {session.attendanceRate}%
                            </span>
                            <div className="progress-track progress-track--xs" style={{ width: '50px' }}>
                              <div
                                className={`progress-fill ${session.attendanceRate < 75 ? 'progress-fill--warning' : ''}`}
                                style={{ width: `${session.attendanceRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <StatusBadge status="PRESENT" label="FINALIZED" />
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={() => setSelectedSession(session)}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>visibility</span>
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredSessions.length === 0 && (
                      <tr>
                        <td colSpan="9">
                          <div className="empty-state">
                            <span className="material-symbols-outlined">event_busy</span>
                            <p>No attendance records match your filter criteria.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal for Session Details */}
            {selectedSession && (
              <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: 'var(--space-md)',
              }}>
                <div
                  className="card-elevated"
                  style={{
                    backgroundColor: 'var(--color-surface-container-lowest)',
                    maxWidth: '560px',
                    width: '100%',
                    padding: 'var(--space-lg)',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                    <div>
                      <div className="text-data-mono" style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
                        Session #{selectedSession.id} • {selectedSession.date}
                      </div>
                      <h3 className="text-headline-sm" style={{ marginTop: '2px' }}>
                        {selectedSession.subjectName}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => setSelectedSession(null)}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: 'var(--space-md)' }}>
                    <div style={{ padding: '10px', backgroundColor: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-sm)' }}>
                      <div className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Batch & Time</div>
                      <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedSession.batchCode}</div>
                      <div className="text-data-mono" style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>{selectedSession.timeSlot}</div>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-sm)' }}>
                      <div className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Faculty In-Charge</div>
                      <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedSession.facultyName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>Dept. CSE</div>
                    </div>
                  </div>

                  <div style={{ padding: '12px', border: '1px solid var(--color-outline-variant)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-md)' }}>
                    <div className="text-label-caps" style={{ marginBottom: '8px' }}>Audited Metrics</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Attendance Rate</span>
                      <span className="text-data-mono" style={{ fontWeight: 700, fontSize: '18px' }}>{selectedSession.attendanceRate}%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '13px' }}>
                      <span>Present: <b style={{ color: '#166534' }}>{selectedSession.presentCount}</b></span>
                      <span>Late: <b style={{ color: '#d97706' }}>{selectedSession.lateCount}</b></span>
                      <span>Absent: <b style={{ color: '#ba1a1a' }}>{selectedSession.absentCount}</b></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => alert(`Exporting audit certification for session ${selectedSession.id}...`)}
                    >
                      <span className="material-symbols-outlined">print</span>
                      <span>Print Summary</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setSelectedSession(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
