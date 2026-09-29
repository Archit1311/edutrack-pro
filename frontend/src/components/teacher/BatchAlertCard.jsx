export default function BatchAlertCard({
  batchCode,
  rate,
  title,
  description,
  severity = 'critical', // 'critical' | 'warning'
  onClick,
}) {
  const isCritical = severity === 'critical';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--color-surface-container-low)',
        borderLeft: `4px solid ${isCritical ? 'var(--color-error)' : 'var(--color-warning)'}`,
        padding: 'var(--space-sm) var(--space-md)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'var(--transition-colors)',
      }}
      className="batch-alert-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          className="text-data-mono"
          style={{
            fontWeight: 700,
            fontSize: '12px',
            color: 'var(--color-primary)'
          }}
        >
          {batchCode}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            color: isCritical ? 'var(--color-error)' : 'var(--color-warning-text)'
          }}
        >
          {rate}% Avg
        </span>
      </div>

      <div style={{
        fontSize: 'var(--text-body-sm-size)',
        fontWeight: 600,
        color: 'var(--color-on-surface)'
      }}>
        {title}
      </div>

      {description && (
        <div style={{
          fontSize: '11px',
          color: 'var(--color-on-surface-variant)',
          lineHeight: '1.4'
        }}>
          {description}
        </div>
      )}
    </div>
  );
}
