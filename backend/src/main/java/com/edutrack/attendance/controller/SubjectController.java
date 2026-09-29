package com.edutrack.attendance.controller;

import com.edutrack.attendance.dto.ApiResponse;
import com.edutrack.attendance.model.Subject;
import com.edutrack.attendance.repository.SubjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    private final SubjectRepository subjectRepository;

    public SubjectController(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Subject>>> getAllSubjects() {
        return ResponseEntity.ok(ApiResponse.success(subjectRepository.findAll()));
    }
}
