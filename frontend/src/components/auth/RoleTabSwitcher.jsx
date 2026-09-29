export default function RoleTabSwitcher({ activeRole, onSelectRole }) {
  const tabs = [
    { role: 'student', label: 'Student', icon: 'school' },
    { role: 'faculty', label: 'Faculty', icon: 'badge' },
    { role: 'admin',   label: 'Admin',   icon: 'shield_person' },
  ];

  return (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid var(--color-outline-variant)',
      marginBottom: 'var(--space-lg)'
    }}>
      {tabs.map((tab) => {
        const isActive = activeRole === tab.role;
        return (
          <button
            key={tab.role}
            type="button"
            onClick={() => onSelectRole(tab.role)}
            style={{
              flex: 1,
              padding: '10px var(--space-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              fontWeight: isActive ? 600 : 500,
              fontSize: 'var(--text-body-sm-size)',
              fontFamily: 'var(--font-body)',
              transition: 'var(--transition-colors)',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            <span
              className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}
              style={{ fontSize: '18px' }}
            >
              {tab.icon}
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
