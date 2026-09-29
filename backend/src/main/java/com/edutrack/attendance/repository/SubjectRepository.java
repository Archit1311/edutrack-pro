package com.edutrack.attendance.repository;

import com.edutrack.attendance.model.Subject;
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
public class SubjectRepository {

    private final JdbcTemplate jdbcTemplate;

    public SubjectRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Subject> subjectRowMapper = (rs, rowNum) -> {
        Subject s = new Subject();
        s.setId(rs.getLong("id"));
        s.setSubjectCode(rs.getString("subject_code"));
        s.setName(rs.getString("name"));
        s.setDepartmentId(rs.getLong("department_id"));
        s.setCredits(rs.getInt("credits"));
        if (rs.getTimestamp("created_at") != null) {
            s.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        }
        return s;
    };

    public Optional<Subject> findById(Long id) {
        String sql = "SELECT * FROM subjects WHERE id = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, subjectRowMapper, id));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<Subject> findByCode(String code) {
        String sql = "SELECT * FROM subjects WHERE subject_code = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, subjectRowMapper, code));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<Subject> findAll() {
        return jdbcTemplate.query("SELECT * FROM subjects ORDER BY subject_code ASC", subjectRowMapper);
    }

    public Long save(Subject subject) {
        String sql = "INSERT INTO subjects (subject_code, name, department_id, credits) VALUES (?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, subject.getSubjectCode());
            ps.setString(2, subject.getName());
            ps.setLong(3, subject.getDepartmentId());
            ps.setInt(4, subject.getCredits());
            return ps;
        }, keyHolder);

        Long generatedId = DbUtils.extractGeneratedId(keyHolder);
        if (generatedId != null) {
            subject.setId(generatedId);
            return subject.getId();
        }
        return null;
    }
}
