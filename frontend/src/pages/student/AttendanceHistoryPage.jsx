import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../../components/common/TopNavBar';
import StatusBadge from '../../components/common/StatusBadge';
import SearchInput from '../../components/common/SearchInput';
import { getStore } from '../../services/mockData';

export default function AttendanceHistoryPage() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const store = getStore();
  const allLogs = store.recentStudentLogs || [];

  const subjects = ['ALL', 'CS201', 'CS304', 'CS310', 'MA202', 'CS405'];
  const statuses = ['ALL', 'PRESENT', 'LATE', 'ABSENT'];

  const filteredLogs = useMemo(() => {
    return allLogs.filter((log) => {
      const matchSub = selectedSubject === 'ALL' || log.subjectCode === selectedSubject;
      const matchStat = selectedStatus === 'ALL' || log.status === selectedStatus;
      const matchSearch =
        !searchQuery.trim() ||
        log.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.date.includes(searchQuery);
      return matchSub && matchStat && matchSearch;
    });
  }, [allLogs, selectedSubject, selectedStatus, searchQuery]);

  return (
    <div className="app-layout" style={{ flexDirection: 'column' }}>
      <TopNavBar
        title="Attendance Records"
        actions={
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/student/dashboard')}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Back to Dashboard</span>
          </button>
        }
      />

      <div className="content-canvas" style={{ padding: 'var(--space-margin-desktop) var(--space-md)' }}>
        <div className="content-max-width">
          <div className="section-header">
            <div>
              <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                Personal Attendance History
              </h1>
              <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                Complete verifiable record of all marked lecture and laboratory attendances
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => alert('Downloading official attendance statement (PDF)...')}
            >
              <span className="material-symbols-outlined">download</span>
              <span>Download Statement</span>
            </button>
          </div>

          {/* Filters Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-lg)'
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Subject:</span>
              <select
                className="form-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <span className="text-label-caps" style={{ color: 'var(--color-outline)', marginLeft: '8px' }}>Status:</span>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div style={{ minWidth: '240px' }}>
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search date or course..."
              />
            </div>
          </div>

          {/* Records Table */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Session Type</th>
                    <th>Faculty</th>
                    <th style={{ textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="td-mono">{log.date}</td>
                      <td className="td-mono" style={{ fontSize: '11px' }}>{log.time}</td>
                      <td>
                        <span className="text-data-mono" style={{ fontWeight: 600 }}>{log.subjectCode}</span>
                      </td>
                      <td className="td-name">{log.subjectName}</td>
                      <td>
                        <span className="badge badge--present" style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}>
                          {log.type}
                        </span>
                      </td>
                      <td style={{ color: 'var(--color-on-surface-variant)' }}>Dr. Aris Thorne</td>
                      <td style={{ textAlign: 'right' }}>
                        <StatusBadge status={log.status} />
                      </td>
                    </tr>
                  ))}

                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan="7">
                        <div className="empty-state">
                          <span className="material-symbols-outlined">filter_list_off</span>
                          <p>No attendance records match your filter criteria.</p>
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
  );
}
