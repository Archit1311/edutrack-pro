package com.edutrack.attendance.model;

import java.time.LocalDateTime;

public class AttendanceRecord {
    private Long id;
    private Long sessionId;
    private Long studentId;
    private String status; // 'PRESENT', 'LATE', 'ABSENT'
    private String remarks;
    private LocalDateTime markedAt;

    // Joins
    private String studentName;
    private String studentIdCode;

    public AttendanceRecord() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public LocalDateTime getMarkedAt() { return markedAt; }
    public void setMarkedAt(LocalDateTime markedAt) { this.markedAt = markedAt; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentIdCode() { return studentIdCode; }
    public void setStudentIdCode(String studentIdCode) { this.studentIdCode = studentIdCode; }
}
