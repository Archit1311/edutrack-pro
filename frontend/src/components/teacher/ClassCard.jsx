import { useNavigate } from 'react-router-dom';
import './ClassCard.css';

export default function ClassCard({
  classData, // { id, time, endTime, subjectName, subjectCode, batchCode, location, enrolledCount, status, attendanceRate }
  onMarkAttendance,
}) {
  const navigate = useNavigate();
  const isCompleted = classData.status === 'COMPLETED';

  return (
    <div className={`class-card ${isCompleted ? 'class-card--completed' : ''}`}>
      <div className={`class-card__time ${isCompleted ? 'class-card__time--completed' : ''}`}>
        <span className="material-symbols-outlined class-card__time-icon">schedule</span>
        <span className="class-card__time-text text-data-mono">{classData.time}</span>
        {classData.endTime && (
          <span className="class-card__endtime-text text-data-mono">{classData.endTime}</span>
        )}
      </div>

      <div className="class-card__body">
        <div className="class-card__top">
          <div>
            <div className="class-card__chips">
              <span className="class-card__code text-data-mono">{classData.subjectCode}</span>
              <span className="class-card__batch-chip text-label-caps">{classData.batchCode}</span>
            </div>
            <h3 className={`class-card__title ${isCompleted ? 'class-card__title--completed' : ''}`}>
              {classData.subjectName}
            </h3>
          </div>

          {isCompleted && classData.attendanceRate !== undefined && (
            <span className="badge badge--present">
              {classData.attendanceRate}% Recorded
            </span>
          )}
        </div>

        <div className="class-card__footer">
          <div className="class-card__meta text-body-sm text-on-surface-variant">
            <span className="class-card__meta-item">
              <span className="material-symbols-outlined">location_on</span>
              {classData.location}
            </span>
            <span className="class-card__meta-item">
              <span className="material-symbols-outlined">groups</span>
              {classData.enrolledCount} Students
            </span>
          </div>

          <div className="class-card__actions">
            {isCompleted ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(`/teacher/attendance/log?batch=${classData.batchCode}`)}
              >
                <span className="material-symbols-outlined">fact_check</span>
                View Log
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onMarkAttendance ? onMarkAttendance(classData) : navigate(`/teacher/attendance/mark?classId=${classData.id}`)}
              >
                <span className="material-symbols-outlined">how_to_reg</span>
                Mark Attendance
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
