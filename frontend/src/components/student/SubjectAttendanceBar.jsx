import AttendanceProgressBar from '../common/AttendanceProgressBar';

export default function SubjectAttendanceBar({
  subjectCode,
  subjectName,
  attended,
  total,
  percentage,
}) {
  const calcPct = percentage !== undefined
    ? percentage
    : (total > 0 ? Math.round((attended / total) * 100) : 0);

  const isSafe = calcPct >= 75;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span
            className="text-data-mono"
            style={{
              fontSize: '11px',
              color: 'var(--color-on-surface-variant)',
              display: 'block',
              marginBottom: '2px'
            }}
          >
            {subjectCode}
          </span>
          <h4 style={{
            fontFamily: 'var(--font-headline)',
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-on-surface)',
          }}>
            {subjectName}
          </h4>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '18px',
            fontWeight: 700,
            color: isSafe ? 'var(--color-primary)' : 'var(--color-warning-text)'
          }}>
            {calcPct}%
          </div>
          <span
            className="text-label-caps"
            style={{
              fontSize: '10px',
              color: isSafe ? 'var(--color-on-tertiary-container)' : 'var(--color-warning-text)',
            }}
          >
            {isSafe ? 'Safe' : 'At Risk (<75%)'}
          </span>
        </div>
      </div>

      <AttendanceProgressBar
        percentage={calcPct}
        size="md"
        threshold={75}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: 'var(--color-on-surface-variant)',
        fontFamily: 'var(--font-body)',
        marginTop: '2px'
      }}>
        <span>Sessions Attended</span>
        <span className="text-data-mono" style={{ fontWeight: 600 }}>
          {attended} / {total}
        </span>
      </div>
    </div>
  );
}
