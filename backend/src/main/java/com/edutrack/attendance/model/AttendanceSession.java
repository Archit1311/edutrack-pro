package com.edutrack.attendance.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

public class AttendanceSession {
    private Long id;
    private Long classId;
    private Long subjectId;
    private Long teacherId;
    private LocalDate sessionDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String roomLocation;
    private String topic;
    private String status; // 'ACTIVE', 'FINALIZED', 'CANCELLED'
    private LocalDateTime createdAt;

    // Display joins
    private String batchCode;
    private String subjectCode;
    private String subjectName;
    private String teacherName;
    private int totalEnrolled;
    private int presentCount;
    private int lateCount;
    private int absentCount;
    private double attendanceRate;

    public AttendanceSession() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }

    public Long getSubjectId() { return subjectId; }
    public void setSubjectId(Long subjectId) { this.subjectId = subjectId; }

    public Long getTeacherId() { return teacherId; }
    public void setTeacherId(Long teacherId) { this.teacherId = teacherId; }

    public LocalDate getSessionDate() { return sessionDate; }
    public void setSessionDate(LocalDate sessionDate) { this.sessionDate = sessionDate; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public String getRoomLocation() { return roomLocation; }
    public void setRoomLocation(String roomLocation) { this.roomLocation = roomLocation; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getBatchCode() { return batchCode; }
    public void setBatchCode(String batchCode) { this.batchCode = batchCode; }

    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getTeacherName() { return teacherName; }
    public void setTeacherName(String teacherName) { this.teacherName = teacherName; }

    public int getTotalEnrolled() { return totalEnrolled; }
    public void setTotalEnrolled(int totalEnrolled) { this.totalEnrolled = totalEnrolled; }

    public int getPresentCount() { return presentCount; }
    public void setPresentCount(int presentCount) { this.presentCount = presentCount; }

    public int getLateCount() { return lateCount; }
    public void setLateCount(int lateCount) { this.lateCount = lateCount; }

    public int getAbsentCount() { return absentCount; }
    public void setAbsentCount(int absentCount) { this.absentCount = absentCount; }

    public double getAttendanceRate() { return attendanceRate; }
    public void setAttendanceRate(double attendanceRate) { this.attendanceRate = attendanceRate; }
}
