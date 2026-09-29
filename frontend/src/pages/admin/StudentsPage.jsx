import { useState, useMemo } from 'react';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import SearchInput from '../../components/common/SearchInput';
import AttendanceProgressBar from '../../components/common/AttendanceProgressBar';
import { getStore, saveStore } from '../../services/mockData';

export default function StudentsPage() {
  const [store, setStore] = useState(getStore());
  const [selectedBatch, setSelectedBatch] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [studentIdCode, setStudentIdCode] = useState('');
  const [batchCode, setBatchCode] = useState('CS-2024-A');

  const batches = ['ALL', 'CS-2024-A', 'CS-2024-B', 'ME-2024-A', 'EE-2024-A'];

  const filteredStudents = useMemo(() => {
    return (store.students || []).filter((s) => {
      const matchBatch = selectedBatch === 'ALL' || s.batchCode === selectedBatch;
      const matchSearch =
        !searchQuery.trim() ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentIdCode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBatch && matchSearch;
    });
  }, [store.students, selectedBatch, searchQuery]);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!name || !studentIdCode) return;

    const newStudent = {
      id: Date.now(),
      name,
      studentIdCode,
      batchCode,
      overallPercentage: 100,
      avatarUrl: '',
    };

    const updated = {
      ...store,
      students: [newStudent, ...store.students],
    };

    setStore(updated);
    saveStore(updated);
    setShowAddModal(false);
    setName('');
    setStudentIdCode('');
  };

  return (
    <div className="app-layout">
      <SidebarNav />

      <div className="main-content">
        <TopNavBar
          title="Student Roster"
          actions={
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <span className="material-symbols-outlined">add</span>
              <span>Enroll Student</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Student Enrollment & Compliance
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Institutional student directory, cohort allocations, and cumulative attendance records
                </p>
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
                <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Batch:</span>
                {batches.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`btn ${selectedBatch === b ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                    onClick={() => setSelectedBatch(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <div style={{ minWidth: '240px' }}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search student by name or ID..."
                />
              </div>
            </div>

            {/* Students Table */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Student ID</th>
                      <th>Batch Cohort</th>
                      <th>Cumulative Attendance</th>
                      <th>Eligibility Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => {
                      const isSafe = s.overallPercentage >= 75;
                      return (
                        <tr key={s.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div
                                className="avatar-initials avatar--sm"
                                style={{
                                  backgroundColor: isSafe ? 'var(--color-secondary-container)' : 'var(--color-error-container)',
                                  color: isSafe ? 'var(--color-on-secondary-container)' : 'var(--color-on-error-container)',
                                }}
                              >
                                {s.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                              </div>
                              <span className="td-name">{s.name}</span>
                            </div>
                          </td>
                          <td className="td-mono">{s.studentIdCode}</td>
                          <td>
                            <span className="class-card__batch-chip text-label-caps">{s.batchCode}</span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                className="text-data-mono"
                                style={{
                                  fontWeight: 700,
                                  color: isSafe ? 'var(--color-on-surface)' : 'var(--color-error)',
                                }}
                              >
                                {s.overallPercentage}%
                              </span>
                              <div style={{ width: '80px' }}>
                                <AttendanceProgressBar percentage={s.overallPercentage} size="xs" />
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${isSafe ? 'badge--present' : 'badge--absent'}`}>
                              {isSafe ? 'ELIGIBLE' : 'AT-RISK (<75%)'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '11px' }}
                              onClick={() => alert(`Opening academic compliance dossier for ${s.name}...`)}
                            >
                              View Dossier
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal */}
            {showAddModal && (
              <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: 'var(--space-md)'
              }}>
                <div className="card-elevated" style={{ backgroundColor: 'var(--color-surface-container-lowest)', maxWidth: '440px', width: '100%', padding: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                    <h3 className="text-headline-sm">Enroll New Student</h3>
                    <button type="button" className="btn-icon" onClick={() => setShowAddModal(false)}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon"
                        placeholder="e.g. Lucas Graham"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Student ID Code</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon form-input--mono"
                        placeholder="e.g. 20240215"
                        value={studentIdCode}
                        onChange={(e) => setStudentIdCode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Assigned Batch</label>
                      <select
                        className="form-select"
                        value={batchCode}
                        onChange={(e) => setBatchCode(e.target.value)}
                      >
                        <option value="CS-2024-A">CS-2024-A (Computer Science A)</option>
                        <option value="CS-2024-B">CS-2024-B (Computer Science B)</option>
                        <option value="ME-2024-A">ME-2024-A (Mechanical Engineering)</option>
                        <option value="EE-2024-A">EE-2024-A (Electrical Engineering)</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-sm)' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Enroll Student
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
