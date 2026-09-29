package com.edutrack.attendance.controller;

import com.edutrack.attendance.dto.ApiResponse;
import com.edutrack.attendance.model.User;
import com.edutrack.attendance.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers(@RequestParam(required = false) String role) {
        List<User> list = role != null && !role.isBlank()
                ? userRepository.findByRole(role)
                : userRepository.findAll();

        // Strip password hashes from response
        list.forEach(u -> u.setPasswordHash(null));

        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
