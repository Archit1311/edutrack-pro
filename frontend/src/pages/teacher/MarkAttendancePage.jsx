import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SidebarNav from '../../components/common/SidebarNav';
import TopNavBar from '../../components/common/TopNavBar';
import SearchInput from '../../components/common/SearchInput';
import StudentAttendanceRow from '../../components/teacher/StudentAttendanceRow';
import { getStore, mockDataService } from '../../services/mockData';

export default function MarkAttendancePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const classId = searchParams.get('classId') || '101';
  const batchCode = searchParams.get('batch') || 'CS-2024-A';
  const subjectCode = searchParams.get('subject') || 'CS201';

  const store = getStore();
  const initialStudents = store.students.filter((s) => s.batchCode === batchCode);
  const students = initialStudents.length > 0 ? initialStudents : store.students;

  // Track status for each student: studentId -> 'PRESENT' | 'LATE' | 'ABSENT'
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const init = {};
    students.forEach((s) => {
      // Default to PRESENT for easy marking
      init[s.id] = 'PRESENT';
    });
    return init;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isCompact, setIsCompact] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Compute live stats
  const stats = useMemo(() => {
    const total = students.length;
    let present = 0;
    let late = 0;
    let absent = 0;

    Object.values(attendanceRecords).forEach((status) => {
      if (status === 'PRESENT') present++;
      else if (status === 'LATE') late++;
      else if (status === 'ABSENT') absent++;
    });

    const rate = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0;
    return { total, present, late, absent, rate };
  }, [attendanceRecords, students]);

  // Filter students based on search
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.studentIdCode && s.studentIdCode.toLowerCase().includes(q))
    );
  }, [students, searchQuery]);

  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: newStatus,
    }));
  };

  const handleMarkAllPresent = () => {
    const allPresent = {};
    students.forEach((s) => {
      allPresent[s.id] = 'PRESENT';
    });
    setAttendanceRecords(allPresent);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      mockDataService.saveAttendanceSession(
        {
          classId,
          batchCode,
          subjectCode,
          subjectName: 'Data Structures & Algorithms',
          timeSlot: '10:00 - 11:30 AM',
        },
        attendanceRecords
      );

      setShowToast(true);
      setTimeout(() => {
        navigate('/teacher/attendance/log');
      }, 1200);
    } catch (err) {
      alert('Error saving session: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-layout">
      <SidebarNav />

      <div className="main-content">
        <TopNavBar
          title="Mark Attendance"
          actions={
            <button
              type="button"
              className="btn btn-primary"
              disabled={submitting}
              onClick={handleSubmit}
            >
              <span className="material-symbols-outlined">save</span>
              <span>Finalize Session</span>
            </button>
          }
        />

        <div className="content-canvas">
          <div className="content-max-width">
            {/* Header info */}
            <div className="section-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="text-data-mono" style={{ fontSize: '13px', color: 'var(--color-secondary)' }}>
                    {subjectCode}
                  </span>
                  <span style={{ color: 'var(--color-outline)' }}>•</span>
                  <span className="badge badge--present" style={{ fontSize: '10px' }}>
                    Live Session
                  </span>
                  <span className="class-card__batch-chip text-label-caps">{batchCode}</span>
                </div>
                <h1 className="text-display-lg" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>
                  Data Structures & Algorithms
                </h1>
                <p className="text-body-sm text-on-surface-variant" style={{ marginTop: '4px' }}>
                  Lecture Room: Lab 302, Turing Block • Time: 10:00 AM - 11:30 AM
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/teacher/dashboard')}
                >
                  <span className="material-symbols-outlined">close</span>
                  <span className="hide-mobile">Cancel</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={submitting}
                  onClick={handleSubmit}
                >
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>Submit Records</span>
                </button>
              </div>
            </div>

            {/* Session Stats Bar */}
            <div
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                padding: 'var(--space-md)',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-lg)',
                backgroundColor: 'var(--color-surface-container-lowest)',
              }}
            >
              <div>
                <div className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Total Enrolled</div>
                <div className="text-display-lg" style={{ fontSize: '28px', marginTop: '2px' }}>{stats.total}</div>
                <div className="text-body-sm text-on-surface-variant">Class roster verified</div>
              </div>

              <div style={{ borderLeft: '1px solid var(--color-outline-variant)', paddingLeft: 'var(--space-md)' }}>
                <div className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Attendance Breakdown</div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', marginTop: '2px' }}>
                  <span style={{ color: '#166534', fontWeight: 700, fontSize: '20px', fontFamily: 'var(--font-mono)' }}>
                    {stats.present} P
                  </span>
                  <span style={{ color: '#d97706', fontWeight: 700, fontSize: '20px', fontFamily: 'var(--font-mono)' }}>
                    {stats.late} L
                  </span>
                  <span style={{ color: '#ba1a1a', fontWeight: 700, fontSize: '20px', fontFamily: 'var(--font-mono)' }}>
                    {stats.absent} A
                  </span>
                </div>
                <div className="text-body-sm text-on-surface-variant">Present / Late / Absent</div>
              </div>

              <div style={{ borderLeft: '1px solid var(--color-outline-variant)', paddingLeft: 'var(--space-md)' }}>
                <div className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Attendance Rate</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                  <span className="text-display-lg" style={{ fontSize: '28px' }}>{stats.rate}%</span>
                  <span style={{ fontSize: '12px', color: stats.rate >= 75 ? '#166534' : '#ba1a1a', fontWeight: 600 }}>
                    {stats.rate >= 75 ? 'Optimal' : 'Low Attendance'}
                  </span>
                </div>
                <div className="progress-track progress-track--sm" style={{ marginTop: '6px' }}>
                  <div className={`progress-fill ${stats.rate < 75 ? 'progress-fill--warning' : ''}`} style={{ width: `${stats.rate}%` }} />
                </div>
              </div>
            </div>

            {/* List Controls / Toolbar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-md)'
            }}>
              <div style={{ flex: '1', minWidth: '240px', maxWidth: '400px' }}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Filter student by name or ID..."
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: 'rgba(111, 251, 190, 0.15)',
                    color: 'var(--color-on-tertiary-fixed-variant)',
                    border: '1px solid rgba(111, 251, 190, 0.4)',
                  }}
                  onClick={handleMarkAllPresent}
                >
                  <span className="material-symbols-outlined">done_all</span>
                  <span>Mark All Present</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsCompact(!isCompact)}
                >
                  <span className="material-symbols-outlined">
                    {isCompact ? 'view_agenda' : 'density_medium'}
                  </span>
                  <span className="hide-mobile">{isCompact ? 'Standard' : 'Compact'}</span>
                </button>
              </div>
            </div>

            {/* Student Attendance Register Table */}
            <div className="card" style={{ overflow: 'hidden' }}>
              {/* Header row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isCompact ? '40px 1fr auto' : '40px 2fr 1fr auto',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: '10px var(--space-md)',
                  backgroundColor: 'var(--color-surface-container)',
                  borderBottom: '1px solid var(--color-outline-variant)',
                }}
              >
                <span className="text-label-caps" style={{ textAlign: 'center' }}>#</span>
                <span className="text-label-caps">Student Information</span>
                {!isCompact && <span className="text-label-caps hide-mobile">Cumulative Attendance</span>}
                <span className="text-label-caps" style={{ textAlign: 'center', minWidth: '150px' }}>Status Toggle</span>
              </div>

              {/* Rows */}
              <div>
                {filteredStudents.map((student, index) => (
                  <StudentAttendanceRow
                    key={student.id}
                    index={index}
                    student={student}
                    status={attendanceRecords[student.id]}
                    onChangeStatus={handleStatusChange}
                    compact={isCompact}
                  />
                ))}

                {filteredStudents.length === 0 && (
                  <div className="empty-state">
                    <span className="material-symbols-outlined">person_search</span>
                    <p>No students match "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Success Toast */}
      {showToast && (
        <div className="toast-container">
          <div className="toast" style={{ backgroundColor: 'var(--color-primary-container)', color: '#ffffff' }}>
            <span className="material-symbols-outlined" style={{ color: '#4edea3', marginRight: '8px' }}>check_circle</span>
            Attendance Session Finalized Successfully!
          </div>
        </div>
      )}
    </div>
  );
}
