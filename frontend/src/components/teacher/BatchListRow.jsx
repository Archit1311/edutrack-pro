export default function BatchListRow({
  batch,
  onClick,
  bgType = 'primary-container',
}) {
  const getContainerStyle = () => {
    switch (bgType) {
      case 'secondary-container':
        return { backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)' };
      case 'tertiary-container':
        return { backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-on-tertiary-fixed)' };
      case 'primary-container':
      default:
        return { backgroundColor: 'var(--color-primary-container)', color: 'var(--color-on-primary)' };
    }
  };

  const initials = batch.code ? batch.code.substring(0, 3) : 'BAT';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-md)',
        borderBottom: '1px solid var(--color-outline-variant)',
        cursor: 'pointer',
        transition: 'var(--transition-colors)',
      }}
      className="batch-list-row"
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '12px',
            flexShrink: 0,
            ...getContainerStyle(),
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 'var(--text-body-md-size)',
            color: 'var(--color-primary)'
          }}>
            {batch.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body-sm-size)',
            color: 'var(--color-on-surface-variant)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '2px'
          }}>
            <span className="text-data-mono">{batch.code}</span>
            <span>•</span>
            <span>{batch.studentCount || batch.enrolledCount || 0} Students</span>
          </div>
        </div>
      </div>

      <span className="material-symbols-outlined text-outline" style={{ fontSize: '20px' }}>
        chevron_right
      </span>
    </div>
  );
}
