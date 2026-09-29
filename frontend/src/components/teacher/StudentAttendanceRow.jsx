import AttendanceToggle from './AttendanceToggle';
import AttendanceProgressBar from '../common/AttendanceProgressBar';

export default function StudentAttendanceRow({
  index,
  student, // { id, studentIdCode, name, avatarUrl, overallPercentage, currentStatus }
  status, // 'PRESENT', 'LATE', 'ABSENT'
  onChangeStatus,
  compact = false,
}) {
  const getInitials = (name) => {
    if (!name) return 'ST';
    return name
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const pct = student.overallPercentage !== undefined ? student.overallPercentage : 85;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: compact ? '40px 1fr auto' : '40px 2fr 1fr auto',
        alignItems: 'center',
        gap: 'var(--space-md)',
        padding: compact ? '8px var(--space-md)' : '12px var(--space-md)',
        borderBottom: '1px solid var(--color-outline-variant)',
        backgroundColor: 'var(--color-surface-container-lowest)',
        transition: 'var(--transition-colors)',
      }}
      className="student-attendance-row"
    >
      {/* Index */}
      <div
        className="text-data-mono"
        style={{
          textAlign: 'center',
          color: 'var(--color-on-surface-variant)',
          fontSize: '12px'
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Student Profile Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {student.avatarUrl ? (
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="avatar avatar--md"
          />
        ) : (
          <div
            className="avatar-initials avatar--md"
            style={{
              backgroundColor: 'var(--color-secondary-container)',
              color: 'var(--color-on-secondary-container)',
            }}
          >
            {getInitials(student.name)}
          </div>
        )}
        <div>
          <div style={{
            fontWeight: 600,
            fontSize: 'var(--text-body-md-size)',
            color: 'var(--color-primary)'
          }}>
            {student.name}
          </div>
          <div
            className="text-data-mono"
            style={{
              fontSize: '11px',
              color: 'var(--color-outline)',
              marginTop: '1px'
            }}
          >
            {student.studentIdCode || student.code || `STU-${student.id}`}
          </div>
        </div>
      </div>

      {/* Overall Attendance Bar (Desktop) */}
      {!compact && (
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, minWidth: '70px', maxWidth: '120px' }}>
            <AttendanceProgressBar
              percentage={pct}
              size="sm"
            />
          </div>
          <span
            className="text-data-mono"
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: pct < 75 ? 'var(--color-error)' : 'var(--color-on-surface-variant)',
              minWidth: '34px'
            }}
          >
            {pct}%
          </span>
        </div>
      )}

      {/* Attendance Action Toggle */}
      <div>
        <AttendanceToggle
          value={status || 'PRESENT'}
          onChange={(newStatus) => onChangeStatus(student.id, newStatus)}
        />
      </div>
    </div>
  );
}
