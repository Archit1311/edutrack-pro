package com.edutrack.attendance.repository;

import com.edutrack.attendance.model.Student;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class StudentRepository {

    private final JdbcTemplate jdbcTemplate;

    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Student> studentRowMapper = (rs, rowNum) -> {
        Student s = new Student();
        s.setId(rs.getLong("id"));
        s.setUserId(rs.getLong("user_id"));
        s.setStudentIdCode(rs.getString("student_id_code"));
        s.setFirstName(rs.getString("first_name"));
        s.setLastName(rs.getString("last_name"));
        s.setDepartmentId(rs.getLong("department_id"));
        s.setProgram(rs.getString("program"));
        s.setYearOfStudy(rs.getInt("year_of_study"));
        if (rs.getTimestamp("created_at") != null) {
            s.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        }
        return s;
    };

    public Optional<Student> findById(Long id) {
        String sql = "SELECT * FROM students WHERE id = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, studentRowMapper, id));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<Student> findByUserId(Long userId) {
        String sql = "SELECT * FROM students WHERE user_id = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, studentRowMapper, userId));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<Student> findByCode(String code) {
        String sql = "SELECT * FROM students WHERE student_id_code = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, studentRowMapper, code));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<Student> findAll() {
        return jdbcTemplate.query("SELECT * FROM students ORDER BY id ASC", studentRowMapper);
    }

    public List<Student> findByClassId(Long classId) {
        String sql = """
            SELECT s.* FROM students s
            JOIN enrollments e ON s.id = e.student_id
            WHERE e.class_id = ?
            ORDER BY s.student_id_code ASC
        """;
        return jdbcTemplate.query(sql, studentRowMapper, classId);
    }

    public List<Student> findByBatchCode(String batchCode) {
        String sql = """
            SELECT s.* FROM students s
            JOIN enrollments e ON s.id = e.student_id
            JOIN classes c ON e.class_id = c.id
            WHERE c.class_code = ?
            ORDER BY s.student_id_code ASC
        """;
        return jdbcTemplate.query(sql, studentRowMapper, batchCode);
    }

    public Long save(Student student) {
        String sql = """
            INSERT INTO students (user_id, student_id_code, first_name, last_name, department_id, program, year_of_study)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """;
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, student.getUserId());
            ps.setString(2, student.getStudentIdCode());
            ps.setString(3, student.getFirstName());
            ps.setString(4, student.getLastName());
            ps.setLong(5, student.getDepartmentId());
            ps.setString(6, student.getProgram());
            ps.setInt(7, student.getYearOfStudy());
            return ps;
        }, keyHolder);

        Long generatedId = DbUtils.extractGeneratedId(keyHolder);
        if (generatedId != null) {
            student.setId(generatedId);
            return student.getId();
        }
        return null;
    }
}
