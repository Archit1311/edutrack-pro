export default function AttendanceToggle({ value, onChange }) {
  const norm = (value || '').toUpperCase();

  return (
    <div className="attendance-toggle" style={{ minWidth: '150px' }}>
      <button
        type="button"
        className={`attendance-toggle__btn ${norm === 'PRESENT' || norm === 'P' ? 'attendance-toggle__btn--present' : ''}`}
        onClick={() => onChange('PRESENT')}
      >
        P
      </button>
      <button
        type="button"
        className={`attendance-toggle__btn ${norm === 'LATE' || norm === 'L' ? 'attendance-toggle__btn--late' : ''}`}
        onClick={() => onChange('LATE')}
      >
        L
      </button>
      <button
        type="button"
        className={`attendance-toggle__btn ${norm === 'ABSENT' || norm === 'A' ? 'attendance-toggle__btn--absent' : ''}`}
        onClick={() => onChange('ABSENT')}
      >
        A
      </button>
    </div>
  );
}
