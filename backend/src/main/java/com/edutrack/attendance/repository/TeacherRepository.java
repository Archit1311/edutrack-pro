package com.edutrack.attendance.repository;

import com.edutrack.attendance.model.Teacher;
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
public class TeacherRepository {

    private final JdbcTemplate jdbcTemplate;

    public TeacherRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Teacher> teacherRowMapper = (rs, rowNum) -> {
        Teacher t = new Teacher();
        t.setId(rs.getLong("id"));
        t.setUserId(rs.getLong("user_id"));
        t.setStaffIdCode(rs.getString("staff_id_code"));
        t.setFirstName(rs.getString("first_name"));
        t.setLastName(rs.getString("last_name"));
        t.setDepartmentId(rs.getLong("department_id"));
        t.setTitle(rs.getString("title"));
        if (rs.getTimestamp("created_at") != null) {
            t.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        }
        return t;
    };

    public Optional<Teacher> findById(Long id) {
        String sql = "SELECT * FROM teachers WHERE id = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, teacherRowMapper, id));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<Teacher> findByUserId(Long userId) {
        String sql = "SELECT * FROM teachers WHERE user_id = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, teacherRowMapper, userId));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<Teacher> findByCode(String code) {
        String sql = "SELECT * FROM teachers WHERE staff_id_code = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, teacherRowMapper, code));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<Teacher> findAll() {
        return jdbcTemplate.query("SELECT * FROM teachers ORDER BY id ASC", teacherRowMapper);
    }

    public Long save(Teacher teacher) {
        String sql = "INSERT INTO teachers (user_id, staff_id_code, first_name, last_name, department_id, title) VALUES (?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, teacher.getUserId());
            ps.setString(2, teacher.getStaffIdCode());
            ps.setString(3, teacher.getFirstName());
            ps.setString(4, teacher.getLastName());
            ps.setLong(5, teacher.getDepartmentId());
            ps.setString(6, teacher.getTitle());
            return ps;
        }, keyHolder);

        Long generatedId = DbUtils.extractGeneratedId(keyHolder);
        if (generatedId != null) {
            teacher.setId(generatedId);
            return teacher.getId();
        }
        return null;
    }
}
