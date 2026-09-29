import { useState, useMemo } from 'react';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import SearchInput from '../../components/common/SearchInput';
import { getStore, saveStore } from '../../services/mockData';

export default function UsersPage() {
  const [store, setStore] = useState(getStore());
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newIdentifier, setNewIdentifier] = useState('');
  const [newRole, setNewRole] = useState('ROLE_STUDENT');
  const [newDept, setNewDept] = useState('Computer Science & Engineering');

  const filteredUsers = useMemo(() => {
    return (store.users || []).filter((u) => {
      const matchRole = selectedRole === 'ALL' || u.role === selectedRole;
      const matchSearch =
        !searchQuery.trim() ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.identifier.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRole && matchSearch;
    });
  }, [store.users, selectedRole, searchQuery]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName || !newEmail || !newIdentifier) return;

    const newUser = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      identifier: newIdentifier,
      role: newRole,
      department: newDept,
      avatarUrl: '',
    };

    const updated = {
      ...store,
      users: [newUser, ...store.users],
    };
    setStore(updated);
    saveStore(updated);
    setShowAddModal(false);

    // Reset
    setNewName('');
    setNewEmail('');
    setNewIdentifier('');
  };

  return (
    <div className="app-layout">
      <SidebarNav />

      <div className="main-content">
        <TopNavBar
          title="User Directory"
          actions={
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <span className="material-symbols-outlined">person_add</span>
              <span>Create User</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            <div className="section-header">
              <div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Institutional User Directory
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Manage student, faculty, and administrator accounts and authorization roles
                </p>
              </div>
            </div>

            {/* Filter controls */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-lg)'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>Role:</span>
                {['ALL', 'ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`btn ${selectedRole === r ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                    onClick={() => setSelectedRole(r)}
                  >
                    {r.replace('ROLE_', '')}
                  </button>
                ))}
              </div>

              <div style={{ minWidth: '240px' }}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search user by name, email, ID..."
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Institutional ID</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              className="avatar-initials avatar--sm"
                              style={{
                                backgroundColor: 'var(--color-secondary-container)',
                                color: 'var(--color-on-secondary-container)',
                              }}
                            >
                              {u.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                            </div>
                            <span className="td-name">{u.name}</span>
                          </div>
                        </td>
                        <td className="td-mono">{u.identifier}</td>
                        <td style={{ color: 'var(--color-on-surface-variant)' }}>{u.email}</td>
                        <td>{u.department || 'Academic Affairs'}</td>
                        <td>
                          <span
                            className="class-card__batch-chip text-label-caps"
                            style={{
                              backgroundColor: u.role === 'ROLE_ADMIN' ? 'var(--color-primary-fixed)' : 'var(--color-surface-container)',
                            }}
                          >
                            {u.role.replace('ROLE_', '')}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge--present">ACTIVE</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={() => alert(`Reset password link sent to ${u.email}`)}
                          >
                            Reset Password
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Create User Modal */}
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
                <div className="card-elevated" style={{ backgroundColor: 'var(--color-surface-container-lowest)', maxWidth: '480px', width: '100%', padding: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                    <h3 className="text-headline-sm">Create Institutional User</h3>
                    <button type="button" className="btn-icon" onClick={() => setShowAddModal(false)}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon"
                        placeholder="e.g. Maya Patel"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Institutional Email</label>
                      <input
                        type="email"
                        className="form-input form-input--no-icon"
                        placeholder="name@edutrack.edu"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Institutional ID Code</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon form-input--mono"
                        placeholder="e.g. 20240210 or FAC-9001"
                        value={newIdentifier}
                        onChange={(e) => setNewIdentifier(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                      >
                        <option value="ROLE_STUDENT">Student</option>
                        <option value="ROLE_TEACHER">Faculty / Teacher</option>
                        <option value="ROLE_ADMIN">Administrator</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <input
                        type="text"
                        className="form-input form-input--no-icon"
                        value={newDept}
                        onChange={(e) => setNewDept(e.target.value)}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-sm)' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save User
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
