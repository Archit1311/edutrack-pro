export default function OverallAttendanceCard({
  overallPercentage = 87.5,
  presentCount = 142,
  absentCount = 18,
  lateCount = 4,
}) {
  const isSafe = overallPercentage >= 75;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-primary-container)',
        color: '#ffffff',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Background Decorative Icon */}
      <span
        className="material-symbols-outlined"
        style={{
          position: 'absolute',
          right: '-10px',
          top: '-15px',
          fontSize: '130px',
          color: 'rgba(255, 255, 255, 0.05)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        monitoring
      </span>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <span
          className="text-label-caps"
          style={{
            color: 'var(--color-primary-fixed-dim)',
            letterSpacing: '0.08em',
          }}
        >
          Overall Attendance Rate
        </span>

        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
          marginTop: '8px',
          marginBottom: '6px'
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '44px',
            fontWeight: 700,
            lineHeight: 1,
            color: '#ffffff',
          }}>
            {overallPercentage}%
          </span>
          <span style={{
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            color: isSafe ? '#4edea3' : '#f87171',
            fontWeight: 600,
          }}>
            {isSafe ? '• Good Standing' : '• Warning: Below 75%'}
          </span>
        </div>

        <p style={{
          fontSize: '12px',
          color: 'var(--color-primary-fixed-dim)',
          marginBottom: 'var(--space-md)',
          lineHeight: '1.4'
        }}>
          {isSafe
            ? `Your attendance is ${(overallPercentage - 75).toFixed(1)}% above the required institutional threshold (75%).`
            : `You need to attend upcoming sessions to meet the minimum institutional requirement of 75%.`}
        </p>

        {/* Breakdown chips */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 'var(--space-md)'
        }}>
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-xs)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '10px', color: 'var(--color-primary-fixed-dim)' }} className="text-label-caps">Present</div>
            <div className="text-data-mono" style={{ fontSize: '14px', fontWeight: 700, color: '#4edea3' }}>{presentCount}</div>
          </div>

          <div style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-xs)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '10px', color: 'var(--color-primary-fixed-dim)' }} className="text-label-caps">Late</div>
            <div className="text-data-mono" style={{ fontSize: '14px', fontWeight: 700, color: '#fde047' }}>{lateCount}</div>
          </div>

          <div style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-xs)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '10px', color: 'var(--color-primary-fixed-dim)' }} className="text-label-caps">Absent</div>
            <div className="text-data-mono" style={{ fontSize: '14px', fontWeight: 700, color: '#f87171' }}>{absentCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
