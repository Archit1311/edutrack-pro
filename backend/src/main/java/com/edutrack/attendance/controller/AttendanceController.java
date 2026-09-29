package com.edutrack.attendance.controller;

import com.edutrack.attendance.dto.ApiResponse;
import com.edutrack.attendance.dto.BulkAttendanceRequest;
import com.edutrack.attendance.dto.CreateSessionRequest;
import com.edutrack.attendance.model.AttendanceRecord;
import com.edutrack.attendance.model.AttendanceSession;
import com.edutrack.attendance.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    // Sessions
    @GetMapping("/sessions")
    public ResponseEntity<ApiResponse<List<AttendanceSession>>> getSessions() {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getAllSessions()));
    }

    @PostMapping("/sessions")
    public ResponseEntity<ApiResponse<AttendanceSession>> createSession(@RequestBody CreateSessionRequest request) {
        AttendanceSession created = attendanceService.createAndRecordSession(request);
        return ResponseEntity.ok(ApiResponse.success("Session saved successfully", created));
    }

    @GetMapping("/sessions/{id}")
    public ResponseEntity<ApiResponse<AttendanceSession>> getSession(@PathVariable Long id) {
        return attendanceService.getSessionById(id)
                .map(s -> ResponseEntity.ok(ApiResponse.success(s)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/sessions/{id}/finalize")
    public ResponseEntity<ApiResponse<String>> finalizeSession(@PathVariable Long id) {
        attendanceService.finalizeSession(id);
        return ResponseEntity.ok(ApiResponse.success("Session finalized", null));
    }

    // Records
    @PostMapping("/sessions/{id}/records")
    public ResponseEntity<ApiResponse<String>> bulkMarkAttendance(@PathVariable Long id, @RequestBody BulkAttendanceRequest request) {
        if (request.getRecords() != null) {
            attendanceService.bulkMark(id, request.getRecords());
        }
        return ResponseEntity.ok(ApiResponse.success("Attendance records marked", null));
    }

    @GetMapping("/records")
    public ResponseEntity<ApiResponse<List<AttendanceRecord>>> getRecords(@RequestParam(required = false) Long sessionId) {
        if (sessionId != null) {
            return ResponseEntity.ok(ApiResponse.success(attendanceService.getRecordsBySession(sessionId)));
        }
        return ResponseEntity.ok(ApiResponse.success(List.of()));
    }

    // Student Summaries & History
    @GetMapping("/student/{studentId}/summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStudentSummary(@PathVariable Long studentId) {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getStudentSummary(studentId)));
    }

    @GetMapping("/student/{studentId}/history")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getStudentHistory(@PathVariable Long studentId) {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getStudentHistory(studentId)));
    }

    // Analytics
    @GetMapping("/analytics/atrisk")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAtRisk() {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getAtRiskStudents()));
    }

    @GetMapping("/analytics/trends")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getTrends() {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getTrends()));
    }
}
