import { useState } from 'react';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import SearchInput from '../../components/common/SearchInput';
import { getStore, saveStore } from '../../services/mockData';

export default function SubjectsPage() {
  const [store, setStore] = useState(getStore());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [credits, setCredits] = useState(4);

  const subjects = store.subjects || [];

  const filtered = subjects.filter(
    (s) =>
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!code || !name) return;

    const newSub = {
      id: Date.now(),
      code: code.toUpperCase(),
      name,
      department,
      credits: Number(credits),
    };

    const updated = {
      ...store,
      subjects: [...store.subjects, newSub],
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
          title="Curriculum Subjects"
          actions={
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <span className="material-symbols-outlined">add</span>
              <span>New Subject</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Curriculum & Course Catalogue
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Institutional subjects, credit weightings, and syllabus attendance policies
                </p>
              </div>

              <div style={{ minWidth: '240px' }}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search course code or title..."
                />
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Course Title</th>
                      <th>Department</th>
                      <th>Credits</th>
                      <th>Attendance Requirement</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <span className="text-data-mono" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                            {s.code}
                          </span>
                        </td>
                        <td className="td-name">{s.name}</td>
                        <td>{s.department}</td>
                        <td className="td-mono">{s.credits} Credits</td>
                        <td>
                          <span className="badge badge--present" style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}>
                            75% Mandatory
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={() => alert(`Editing syllabus and attendance thresholds for ${s.code}...`)}
                          >
                            Edit
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
                    <h3 className="text-headline-sm">Add Subject</h3>
                    <button type="button" className="btn-icon" onClick={() => setShowAddModal(false)}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <form onSubmit={handleAddSubject} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div className="form-group">
                      <label className="form-label">Subject Code</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon form-input--mono"
                        placeholder="e.g. CS501"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Course Title</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon"
                        placeholder="e.g. Artificial Intelligence"
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
                      <label className="form-label">Credits</label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        className="form-input form-input--no-icon"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-sm)' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Add Subject
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
