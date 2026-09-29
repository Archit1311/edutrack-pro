export default function StatusBadge({ status, label }) {
  const norm = (status || '').toUpperCase();
  let className = 'badge badge--present';
  let defaultLabel = 'PRESENT';

  if (norm === 'ABSENT' || norm === 'A') {
    className = 'badge badge--absent';
    defaultLabel = 'ABSENT';
  } else if (norm === 'LATE' || norm === 'L') {
    className = 'badge badge--late';
    defaultLabel = 'LATE';
  }

  return (
    <span className={className}>
      {label || defaultLabel}
    </span>
  );
}
