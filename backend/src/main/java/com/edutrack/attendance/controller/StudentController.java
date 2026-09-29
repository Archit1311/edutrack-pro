package com.edutrack.attendance.controller;

import com.edutrack.attendance.dto.ApiResponse;
import com.edutrack.attendance.model.Student;
import com.edutrack.attendance.repository.AttendanceRecordRepository;
import com.edutrack.attendance.repository.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentRepository studentRepository;
    private final AttendanceRecordRepository recordRepository;

    public StudentController(StudentRepository studentRepository, AttendanceRecordRepository recordRepository) {
        this.studentRepository = studentRepository;
        this.recordRepository = recordRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Student>>> getAllStudents(@RequestParam(required = false) String batch) {
        List<Student> list;
        if (batch != null && !batch.isBlank()) {
            list = studentRepository.findByBatchCode(batch);
        } else {
            list = studentRepository.findAll();
        }

        // Compute live percentage
        for (Student s : list) {
            s.setOverallPercentage(recordRepository.getCumulativePercentageForStudent(s.getId()));
        }

        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(s -> {
                    s.setOverallPercentage(recordRepository.getCumulativePercentageForStudent(s.getId()));
                    return ResponseEntity.ok(ApiResponse.success(s));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
