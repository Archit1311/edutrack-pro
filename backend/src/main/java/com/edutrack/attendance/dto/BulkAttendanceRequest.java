package com.edutrack.attendance.dto;

import java.util.Map;

public class BulkAttendanceRequest {
    private Map<Long, String> records; // studentId -> 'PRESENT' | 'LATE' | 'ABSENT'

    public BulkAttendanceRequest() {}

    public Map<Long, String> getRecords() { return records; }
    public void setRecords(Map<Long, String> records) { this.records = records; }
}
