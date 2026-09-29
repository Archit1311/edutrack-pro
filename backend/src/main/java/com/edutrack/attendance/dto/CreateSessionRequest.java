package com.edutrack.attendance.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

public class CreateSessionRequest {
    private Long classId;
    private Long subjectId;
    private Long teacherId;
    private LocalDate sessionDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String roomLocation;
    private String topic;
    private Map<Long, String> records; // studentId -> 'PRESENT' | 'LATE' | 'ABSENT'

    public CreateSessionRequest() {}

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

    public Map<Long, String> getRecords() { return records; }
    public void setRecords(Map<Long, String> records) { this.records = records; }
}
