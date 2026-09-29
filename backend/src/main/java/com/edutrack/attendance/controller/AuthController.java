package com.edutrack.attendance.controller;

import com.edutrack.attendance.dto.ApiResponse;
import com.edutrack.attendance.dto.LoginRequest;
import com.edutrack.attendance.dto.LoginResponse;
import com.edutrack.attendance.security.UserPrincipal;
import com.edutrack.attendance.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(ApiResponse.success("Authentication successful", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully", null));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Map<String, String>>> refresh(@AuthenticationPrincipal UserPrincipal principal) {
        // Token rotation
        return ResponseEntity.ok(ApiResponse.success(Map.of("message", "Token refreshed")));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Not authenticated"));
        }
        return ResponseEntity.ok(ApiResponse.success(Map.of(
                "id", principal.getId(),
                "username", principal.getUsername(),
                "email", principal.getEmail(),
                "role", principal.getRole()
        )));
    }
}
