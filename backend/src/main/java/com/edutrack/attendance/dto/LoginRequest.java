package com.edutrack.attendance.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank(message = "Identifier (Student ID, Staff ID, or Email) is required")
    private String identifier;

    @NotBlank(message = "Password is required")
    private String password;

    private String role; // 'student', 'faculty', 'admin'

    public LoginRequest() {}

    public String getIdentifier() { return identifier; }
    public void setIdentifier(String identifier) { this.identifier = identifier; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
