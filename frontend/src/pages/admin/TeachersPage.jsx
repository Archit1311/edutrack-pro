import { useState } from 'react';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import SearchInput from '../../components/common/SearchInput';
import { getStore } from '../../services/mockData';

export default function TeachersPage() {
  const store = getStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const facultyMembers = [
    { id: 1, staffId: 'FAC-8921', name: 'Dr. Aris Thorne', department: 'Computer Science & Engineering', title: 'Associate Professor', batches: ['CS-2024-A', 'CS-2024-B', 'CS-2023-A'], email: 'teacher@edutrack.edu' },
    { id: 2, staffId: 'FAC-8922', name: 'Prof. Sarah Lin', department: 'Computer Science & Engineering', title: 'Professor', batches: ['CS-2024-B'], email: 'slin@edutrack.edu' },
    { id: 3, staffId: 'FAC-8923', name: 'Dr. Marcus Vance', department: 'Electrical Engineering', title: 'Assistant Professor', batches: ['EE-2024-A'], email: 'mvance@edutrack.edu' },
    { id: 4, staffId: 'FAC-8924', name: 'Dr. Raymond Holt', department: 'Mechanical Engineering', title: 'Department Chair', batches: ['ME-2024-A'], email: 'rholt@edutrack.edu' },
  ];

  const filtered = facultyMembers.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-layout">
      <SidebarNav />

      <div className="main-content">
        <TopNavBar
          title="Faculty Directory"
          actions={
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <span className="material-symbols-outlined">add</span>
              <span>Add Faculty Member</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Faculty & Instructor Directory
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Teaching staff, course assignments, and attendance authority permissions
                </p>
              </div>

              <div style={{ minWidth: '240px' }}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search faculty..."
                />
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Faculty Member</th>
                      <th>Staff ID</th>
                      <th>Department</th>
                      <th>Academic Title</th>
                      <th>Assigned Batches</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((f) => (
                      <tr key={f.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              className="avatar-initials avatar--sm"
                              style={{ backgroundColor: 'var(--color-primary-container)', color: '#ffffff' }}
                            >
                              {f.name.split(' ').slice(1, 3).map((p) => p[0]).join('') || 'DR'}
                            </div>
                            <div>
                              <div className="td-name">{f.name}</div>
                              <div className="text-body-sm text-on-surface-variant" style={{ fontSize: '11px' }}>{f.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="td-mono">{f.staffId}</td>
                        <td>{f.department}</td>
                        <td>{f.title}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {f.batches.map((b) => (
                              <span key={b} className="class-card__batch-chip text-label-caps">{b}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className="badge badge--present">ACTIVE</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={() => alert(`Viewing teaching schedule for ${f.name}`)}
                          >
                            Schedule
                          </button>
                        </td>
                      </tr>
                    ))}
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
