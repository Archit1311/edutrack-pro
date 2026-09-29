import { useState } from 'react';

export default function MiniCalendar({ attendanceEvents = {} }) {
  const [currentDate] = useState(new Date());

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calculate days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0

  const today = currentDate.getDate();

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
          {monthNames[month]} {year}
        </h4>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button type="button" className="btn-icon" style={{ width: '28px', height: '28px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_left</span>
          </button>
          <button type="button" className="btn-icon" style={{ width: '28px', height: '28px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        textAlign: 'center',
        marginBottom: '6px'
      }}>
        {daysOfWeek.map((day, idx) => (
          <span
            key={idx}
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-label)',
              fontWeight: 700,
              color: 'var(--color-on-surface-variant)'
            }}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Day cells */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        textAlign: 'center'
      }}>
        {/* Blank days before start of month */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`blank-${i}`} style={{ height: '32px' }} />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const isToday = dayNum === today;
          const status = attendanceEvents[dayNum] || (dayNum % 7 === 0 ? 'absent' : dayNum < today ? 'present' : null);

          return (
            <div
              key={dayNum}
              style={{
                height: '32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: isToday ? 'var(--color-primary)' : 'transparent',
                color: isToday ? 'var(--color-on-primary)' : 'var(--color-on-surface)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: isToday ? 700 : 500,
                position: 'relative',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isToday) e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)';
              }}
              onMouseLeave={(e) => {
                if (!isToday) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>{dayNum}</span>
              {status && !isToday && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: status === 'present' ? '#166534' : status === 'absent' ? '#ba1a1a' : '#d97706',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
