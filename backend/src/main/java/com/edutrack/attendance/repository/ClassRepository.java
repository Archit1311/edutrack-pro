package com.edutrack.attendance.repository;

import com.edutrack.attendance.model.SchoolClass;
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
public class ClassRepository {

    private final JdbcTemplate jdbcTemplate;

    public ClassRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<SchoolClass> classRowMapper = (rs, rowNum) -> {
        SchoolClass c = new SchoolClass();
        c.setId(rs.getLong("id"));
        c.setClassCode(rs.getString("class_code"));
        c.setName(rs.getString("name"));
        c.setDepartmentId(rs.getLong("department_id"));
        c.setAcademicYear(rs.getString("academic_year"));
        c.setSemester(rs.getString("semester"));
        if (rs.getTimestamp("created_at") != null) {
            c.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        }
        return c;
    };

    public Optional<SchoolClass> findById(Long id) {
        String sql = "SELECT * FROM classes WHERE id = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, classRowMapper, id));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<SchoolClass> findByCode(String code) {
        String sql = "SELECT * FROM classes WHERE class_code = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, classRowMapper, code));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<SchoolClass> findAll() {
        return jdbcTemplate.query("SELECT * FROM classes ORDER BY class_code ASC", classRowMapper);
    }

    public Long save(SchoolClass c) {
        String sql = "INSERT INTO classes (class_code, name, department_id, academic_year, semester) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, c.getClassCode());
            ps.setString(2, c.getName());
            ps.setLong(3, c.getDepartmentId());
            ps.setString(4, c.getAcademicYear());
            ps.setString(5, c.getSemester());
            return ps;
        }, keyHolder);

        Long generatedId = DbUtils.extractGeneratedId(keyHolder);
        if (generatedId != null) {
            c.setId(generatedId);
            return c.getId();
        }
        return null;
    }
}
