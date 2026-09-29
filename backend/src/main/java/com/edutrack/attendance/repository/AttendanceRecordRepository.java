package com.edutrack.attendance.repository;

import com.edutrack.attendance.model.AttendanceRecord;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AttendanceRecordRepository {

    private final JdbcTemplate jdbcTemplate;

    public AttendanceRecordRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<AttendanceRecord> recordRowMapper = (rs, rowNum) -> {
        AttendanceRecord r = new AttendanceRecord();
        r.setId(rs.getLong("id"));
        r.setSessionId(rs.getLong("session_id"));
        r.setStudentId(rs.getLong("student_id"));
        r.setStatus(rs.getString("status"));
        r.setRemarks(rs.getString("remarks"));
        if (rs.getTimestamp("marked_at") != null) {
            r.setMarkedAt(rs.getTimestamp("marked_at").toLocalDateTime());
        }
        r.setStudentName(rs.getString("student_name"));
        r.setStudentIdCode(rs.getString("student_id_code"));
        return r;
    };

    public List<AttendanceRecord> findBySessionId(Long sessionId) {
        String sql = """
            SELECT r.*,
                   CONCAT(s.first_name, ' ', s.last_name) AS student_name,
                   s.student_id_code
            FROM attendance_records r
            JOIN students s ON r.student_id = s.id
            WHERE r.session_id = ?
            ORDER BY s.student_id_code ASC
        """;
        return jdbcTemplate.query(sql, recordRowMapper, sessionId);
    }

    public List<Map<String, Object>> findHistoryByStudentId(Long studentId) {
        String sql = """
            SELECT r.id,
                   s.session_date AS session_date,
                   s.start_time AS start_time,
                   sub.subject_code AS subject_code,
                   sub.name AS subject_name,
                   'Lecture' AS session_type,
                   CONCAT(t.first_name, ' ', t.last_name) AS teacher_name,
                   r.status AS status,
                   r.remarks AS remarks
            FROM attendance_records r
            JOIN attendance_sessions s ON r.session_id = s.id
            JOIN subjects sub ON s.subject_id = sub.id
            JOIN teachers t ON s.teacher_id = t.id
            WHERE r.student_id = ?
            ORDER BY s.session_date DESC, s.start_time DESC
        """;
        return jdbcTemplate.queryForList(sql, studentId);
    }

    public void upsertRecord(Long sessionId, Long studentId, String status, String remarks) {
        String sql = """
            MERGE INTO attendance_records (session_id, student_id, status, remarks)
            KEY(session_id, student_id)
            VALUES (?, ?, ?, ?)
        """;
        // To be safe across both H2 and MySQL, check existence or use delete-then-insert
        jdbcTemplate.update("DELETE FROM attendance_records WHERE session_id = ? AND student_id = ?", sessionId, studentId);
        jdbcTemplate.update(
            "INSERT INTO attendance_records (session_id, student_id, status, remarks) VALUES (?, ?, ?, ?)",
            sessionId, studentId, status, remarks
        );
    }

    public Double getCumulativePercentageForStudent(Long studentId) {
        String sql = """
            SELECT
                COUNT(*) AS total,
                COALESCE(SUM(CASE WHEN status = 'PRESENT' THEN 1.0 WHEN status = 'LATE' THEN 0.5 ELSE 0.0 END), 0.0) AS weighted
            FROM attendance_records
            WHERE student_id = ?
        """;

        return jdbcTemplate.query(sql, rs -> {
            if (rs.next()) {
                int total = rs.getInt("total");
                double weighted = rs.getDouble("weighted");
                if (total == 0) return 100.0;
                return Math.round((weighted / total) * 1000.0) / 10.0;
            }
            return 100.0;
        }, studentId);
    }
}
