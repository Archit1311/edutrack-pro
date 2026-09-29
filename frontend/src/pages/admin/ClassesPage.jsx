import { useState } from 'react';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import SearchInput from '../../components/common/SearchInput';
import AttendanceProgressBar from '../../components/common/AttendanceProgressBar';
import { getStore, saveStore } from '../../services/mockData';

export default function ClassesPage() {
  const [store, setStore] = useState(getStore());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [year, setYear] = useState('2nd Year');

  const batches = store.batches || [];

  const filtered = batches.filter(
    (b) =>
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBatch = (e) => {
    e.preventDefault();
    if (!code || !name) return;

    const newBatch = {
      id: Date.now(),
      code: code.toUpperCase(),
      name,
      department,
      year,
      enrolledCount: 0,
      avgAttendance: 100,
    };

    const updated = {
      ...store,
      batches: [...store.batches, newBatch],
    };

    setStore(updated);
    saveStore(updated);
    setShowAddModal(false);
    setCode('');
    setName('');
  };

  return (
    <div className="app-layout">
      <SidebarNav />

      <div className="main-content">
        <TopNavBar
          title="Classes & Batches"
          actions={
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <span className="material-symbols-outlined">add</span>
              <span>Create Batch</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Batches & Cohort Sections
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Institutional class divisions, student allocations, and cohort average attendance
                </p>
              </div>

              <div style={{ minWidth: '240px' }}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search batch or cohort..."
                />
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Batch Code</th>
                      <th>Cohort Name</th>
                      <th>Department</th>
                      <th>Academic Year</th>
                      <th>Enrolled Students</th>
                      <th>Cohort Avg Attendance</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <span className="class-card__batch-chip text-label-caps">{b.code}</span>
                        </td>
                        <td className="td-name">{b.name}</td>
                        <td>{b.department}</td>
                        <td>{b.year}</td>
                        <td className="td-mono">{b.enrolledCount} Students</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="text-data-mono" style={{ fontWeight: 700 }}>
                              {b.avgAttendance}%
                            </span>
                            <div style={{ width: '70px' }}>
                              <AttendanceProgressBar percentage={b.avgAttendance} size="xs" />
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={() => alert(`Managing student assignments for ${b.code}...`)}
                          >
                            Manage Roster
                          </button>
                        </td>
                      </tr>
                    ))}
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
                    <h3 className="text-headline-sm">Create New Batch</h3>
                    <button type="button" className="btn-icon" onClick={() => setShowAddModal(false)}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <form onSubmit={handleAddBatch} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div className="form-group">
                      <label className="form-label">Batch Code</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon form-input--mono"
                        placeholder="e.g. CS-2024-C"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Cohort Name</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon"
                        placeholder="e.g. Computer Science Section C"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Academic Year</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-sm)' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Create Batch
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
