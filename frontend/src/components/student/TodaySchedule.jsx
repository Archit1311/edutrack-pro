export default function TodaySchedule({ schedule = [] }) {
  const items = schedule.length > 0 ? schedule : [
    { id: 1, time: '09:00 - 10:30 AM', subject: 'Data Structures & Algorithms', code: 'CS201', room: 'Hall 3B', teacher: 'Dr. Aris Thorne', status: 'completed', attendance: 'PRESENT' },
    { id: 2, time: '11:00 - 12:30 PM', subject: 'Database Management Systems', code: 'CS304', room: 'Lab 2', teacher: 'Prof. Sarah Lin', status: 'upcoming', attendance: null },
    { id: 3, time: '02:00 - 03:30 PM', subject: 'Computer Networks', code: 'CS310', room: 'Hall 1A', teacher: 'Dr. Marcus Vance', status: 'upcoming', attendance: null },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-md)'
      }}>
        <h4 style={{
          fontFamily: 'var(--font-headline)',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-on-surface)'
        }}>
          Today's Schedule
        </h4>
        <span className="text-label-caps" style={{ color: 'var(--color-outline)', fontSize: '10px' }}>
          3 Classes
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item) => {
          const isCompleted = item.status === 'completed';
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isCompleted ? 'var(--color-surface-container-low)' : 'var(--color-surface-bright)',
                borderLeft: `3px solid ${isCompleted ? 'var(--color-tertiary-fixed-dim)' : 'var(--color-primary)'}`,
              }}
            >
              <div style={{ minWidth: '85px' }}>
                <div className="text-data-mono" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)' }}>
                  {item.time.split(' - ')[0]}
                </div>
                <div className="text-data-mono" style={{ fontSize: '10px', color: 'var(--color-outline)' }}>
                  {item.time.split(' - ')[1]}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-on-surface)',
                  lineHeight: '1.3'
                }}>
                  {item.subject}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--color-on-surface-variant)',
                  display: 'flex',
                  gap: '6px',
                  marginTop: '2px'
                }}>
                  <span>{item.room}</span>
                  <span>•</span>
                  <span>{item.teacher}</span>
                </div>
              </div>

              {item.attendance && (
                <span className="badge badge--present" style={{ fontSize: '9px', padding: '1px 6px' }}>
                  {item.attendance}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
