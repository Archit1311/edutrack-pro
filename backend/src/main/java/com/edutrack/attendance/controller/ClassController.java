package com.edutrack.attendance.controller;

import com.edutrack.attendance.dto.ApiResponse;
import com.edutrack.attendance.model.SchoolClass;
import com.edutrack.attendance.model.Subject;
import com.edutrack.attendance.repository.ClassRepository;
import com.edutrack.attendance.repository.SubjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classes")
public class ClassController {

    private final ClassRepository classRepository;

    public ClassController(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SchoolClass>>> getAllClasses() {
        return ResponseEntity.ok(ApiResponse.success(classRepository.findAll()));
    }
}
