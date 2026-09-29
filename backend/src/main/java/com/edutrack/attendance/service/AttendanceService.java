package com.edutrack.attendance.service;

import com.edutrack.attendance.dto.CreateSessionRequest;
import com.edutrack.attendance.model.AttendanceRecord;
import com.edutrack.attendance.model.AttendanceSession;
import com.edutrack.attendance.model.Student;
import com.edutrack.attendance.repository.AttendanceRecordRepository;
import com.edutrack.attendance.repository.AttendanceSessionRepository;
import com.edutrack.attendance.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class AttendanceService {

    private final AttendanceSessionRepository sessionRepository;
    private final AttendanceRecordRepository recordRepository;
    private final StudentRepository studentRepository;

    public AttendanceService(AttendanceSessionRepository sessionRepository,
                             AttendanceRecordRepository recordRepository,
                             StudentRepository studentRepository) {
        this.sessionRepository = sessionRepository;
        this.recordRepository = recordRepository;
        this.studentRepository = studentRepository;
    }

    public List<AttendanceSession> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Optional<AttendanceSession> getSessionById(Long id) {
        return sessionRepository.findById(id);
    }

    @Transactional
    public AttendanceSession createAndRecordSession(CreateSessionRequest request) {
        AttendanceSession session = new AttendanceSession();
        session.setClassId(request.getClassId() != null ? request.getClassId() : 1L);
        session.setSubjectId(request.getSubjectId() != null ? request.getSubjectId() : 1L);
        session.setTeacherId(request.getTeacherId() != null ? request.getTeacherId() : 1L);
        session.setSessionDate(request.getSessionDate() != null ? request.getSessionDate() : LocalDate.now());
        session.setStartTime(request.getStartTime() != null ? request.getStartTime() : LocalTime.of(10, 0));
        session.setEndTime(request.getEndTime() != null ? request.getEndTime() : LocalTime.of(11, 30));
        session.setRoomLocation(request.getRoomLocation() != null ? request.getRoomLocation() : "Lab 302");
        session.setTopic(request.getTopic() != null ? request.getTopic() : "Attendance Roll Call");
        session.setStatus("FINALIZED");

        Long sessionId = sessionRepository.save(session);
        session.setId(sessionId);

        // Save records if provided
        if (request.getRecords() != null && !request.getRecords().isEmpty()) {
            for (Map.Entry<Long, String> entry : request.getRecords().entrySet()) {
                recordRepository.upsertRecord(sessionId, entry.getKey(), entry.getValue(), "Session marked");
            }
        }

        return sessionRepository.findById(sessionId).orElse(session);
    }

    @Transactional
    public void bulkMark(Long sessionId, Map<Long, String> records) {
        for (Map.Entry<Long, String> entry : records.entrySet()) {
            recordRepository.upsertRecord(sessionId, entry.getKey(), entry.getValue(), "Bulk mark");
        }
    }

    public void finalizeSession(Long sessionId) {
        sessionRepository.updateStatus(sessionId, "FINALIZED");
    }

    public List<AttendanceRecord> getRecordsBySession(Long sessionId) {
        return recordRepository.findBySessionId(sessionId);
    }

    public Map<String, Object> getStudentSummary(Long studentId) {
        Double cumulative = recordRepository.getCumulativePercentageForStudent(studentId);
        List<Map<String, Object>> history = recordRepository.findHistoryByStudentId(studentId);

        Map<String, Object> summary = new HashMap<>();
        summary.put("studentId", studentId);
        summary.put("overallPercentage", cumulative);
        summary.put("historyCount", history.size());
        summary.put("isSafe", cumulative >= 75.0);

        return summary;
    }

    public List<Map<String, Object>> getStudentHistory(Long studentId) {
        return recordRepository.findHistoryByStudentId(studentId);
    }

    public List<Map<String, Object>> getTrends() {
        return List.of(
            Map.of("week", "W1", "cs", 94, "me", 89, "ee", 85),
            Map.of("week", "W2", "cs", 91, "me", 87, "ee", 82),
            Map.of("week", "W3", "cs", 88, "me", 84, "ee", 79),
            Map.of("week", "W4", "cs", 92, "me", 86, "ee", 83),
            Map.of("week", "W5", "cs", 89, "me", 83, "ee", 81),
            Map.of("week", "W6", "cs", 87, "me", 82, "ee", 78)
        );
    }

    public List<Map<String, Object>> getAtRiskStudents() {
        List<Student> allStudents = studentRepository.findAll();
        List<Map<String, Object>> atRisk = new ArrayList<>();

        for (Student s : allStudents) {
            Double pct = recordRepository.getCumulativePercentageForStudent(s.getId());
            if (pct < 75.0) {
                Map<String, Object> m = new HashMap<>();
                m.put("id", s.getId());
                m.put("name", s.getFullName());
                m.put("studentIdCode", s.getStudentIdCode());
                m.put("overallPercentage", pct);
                m.put("program", s.getProgram());
                atRisk.add(m);
            }
        }
        return atRisk;
    }
}
