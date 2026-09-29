export default function AttendanceProgressBar({
  percentage = 0,
  size = 'md', // 'sm', 'md', 'xs'
  showStatusText = false,
  threshold = 75,
}) {
  const pct = Math.min(100, Math.max(0, Math.round(percentage)));
  const isSafe = pct >= threshold;

  let trackClass = 'progress-track';
  if (size === 'sm') trackClass += ' progress-track--sm';
  if (size === 'xs') trackClass += ' progress-track--xs';

  let fillClass = 'progress-fill';
  if (!isSafe) {
    fillClass += ' progress-fill--warning';
  }

  return (
    <div style={{ width: '100%' }}>
      {showStatusText && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-data-mono-size)',
            fontWeight: 600,
            color: 'var(--color-on-surface)'
          }}>
            {pct}%
          </span>
          <span style={{
            fontSize: '11px',
            fontFamily: 'var(--font-label)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: isSafe ? 'var(--color-on-tertiary-container)' : 'var(--color-warning-text)'
          }}>
            {isSafe ? 'Safe' : 'Warning (<75%)'}
          </span>
        </div>
      )}
      <div className={trackClass}>
        <div
          className={fillClass}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
