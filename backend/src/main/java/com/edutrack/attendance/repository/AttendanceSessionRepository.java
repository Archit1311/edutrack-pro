package com.edutrack.attendance.repository;

import com.edutrack.attendance.model.AttendanceSession;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Repository
public class AttendanceSessionRepository {

    private final JdbcTemplate jdbcTemplate;

    public AttendanceSessionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<AttendanceSession> sessionRowMapper = (rs, rowNum) -> {
        AttendanceSession s = new AttendanceSession();
        s.setId(rs.getLong("id"));
        s.setClassId(rs.getLong("class_id"));
        s.setSubjectId(rs.getLong("subject_id"));
        s.setTeacherId(rs.getLong("teacher_id"));
        s.setSessionDate(rs.getDate("session_date").toLocalDate());
        s.setStartTime(rs.getTime("start_time").toLocalTime());
        s.setEndTime(rs.getTime("end_time").toLocalTime());
        s.setRoomLocation(rs.getString("room_location"));
        s.setTopic(rs.getString("topic"));
        s.setStatus(rs.getString("status"));
        if (rs.getTimestamp("created_at") != null) {
            s.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        }

        // Joined columns
        s.setBatchCode(rs.getString("batch_code"));
        s.setSubjectCode(rs.getString("subject_code"));
        s.setSubjectName(rs.getString("subject_name"));
        s.setTeacherName(rs.getString("teacher_name"));
        s.setTotalEnrolled(rs.getInt("total_enrolled"));
        s.setPresentCount(rs.getInt("present_count"));
        s.setLateCount(rs.getInt("late_count"));
        s.setAbsentCount(rs.getInt("absent_count"));

        int totalMarked = s.getPresentCount() + s.getLateCount() + s.getAbsentCount();
        if (totalMarked > 0) {
            double rate = ((s.getPresentCount() + s.getLateCount() * 0.5) / totalMarked) * 100.0;
            s.setAttendanceRate(Math.round(rate * 10.0) / 10.0);
        } else {
            s.setAttendanceRate(0.0);
        }

        return s;
    };

    private static final String SELECT_JOIN_SQL = """
        SELECT s.*,
               c.class_code AS batch_code,
               sub.subject_code AS subject_code,
               sub.name AS subject_name,
               CONCAT(t.first_name, ' ', t.last_name) AS teacher_name,
               (SELECT COUNT(*) FROM enrollments e WHERE e.class_id = s.class_id) AS total_enrolled,
               COALESCE((SELECT COUNT(*) FROM attendance_records r WHERE r.session_id = s.id AND r.status = 'PRESENT'), 0) AS present_count,
               COALESCE((SELECT COUNT(*) FROM attendance_records r WHERE r.session_id = s.id AND r.status = 'LATE'), 0) AS late_count,
               COALESCE((SELECT COUNT(*) FROM attendance_records r WHERE r.session_id = s.id AND r.status = 'ABSENT'), 0) AS absent_count
        FROM attendance_sessions s
        JOIN classes c ON s.class_id = c.id
        JOIN subjects sub ON s.subject_id = sub.id
        JOIN teachers t ON s.teacher_id = t.id
    """;

    public Optional<AttendanceSession> findById(Long id) {
        String sql = SELECT_JOIN_SQL + " WHERE s.id = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, sessionRowMapper, id));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<AttendanceSession> findAll() {
        String sql = SELECT_JOIN_SQL + " ORDER BY s.session_date DESC, s.start_time DESC";
        return jdbcTemplate.query(sql, sessionRowMapper);
    }

    public List<AttendanceSession> findByTeacherId(Long teacherId) {
        String sql = SELECT_JOIN_SQL + " WHERE s.teacher_id = ? ORDER BY s.session_date DESC, s.start_time DESC";
        return jdbcTemplate.query(sql, sessionRowMapper, teacherId);
    }

    public List<AttendanceSession> findByClassId(Long classId) {
        String sql = SELECT_JOIN_SQL + " WHERE s.class_id = ? ORDER BY s.session_date DESC, s.start_time DESC";
        return jdbcTemplate.query(sql, sessionRowMapper, classId);
    }

    public Long save(AttendanceSession session) {
        String sql = """
            INSERT INTO attendance_sessions (class_id, subject_id, teacher_id, session_date, start_time, end_time, room_location, topic, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, session.getClassId());
            ps.setLong(2, session.getSubjectId());
            ps.setLong(3, session.getTeacherId());
            ps.setDate(4, Date.valueOf(session.getSessionDate()));
            ps.setTime(5, Time.valueOf(session.getStartTime()));
            ps.setTime(6, Time.valueOf(session.getEndTime()));
            ps.setString(7, session.getRoomLocation());
            ps.setString(8, session.getTopic());
            ps.setString(9, session.getStatus() != null ? session.getStatus() : "ACTIVE");
            return ps;
        }, keyHolder);

        Long generatedId = DbUtils.extractGeneratedId(keyHolder);
        if (generatedId != null) {
            session.setId(generatedId);
            return session.getId();
        }
        return null;
    }

    public void updateStatus(Long id, String status) {
        jdbcTemplate.update("UPDATE attendance_sessions SET status = ? WHERE id = ?", status, id);
    }
}
