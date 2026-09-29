package com.edutrack.attendance.model;

import java.time.LocalDateTime;

public class Teacher {
    private Long id;
    private Long userId;
    private String staffIdCode;
    private String firstName;
    private String lastName;
    private Long departmentId;
    private String title;
    private LocalDateTime createdAt;

    private String email;

    public Teacher() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getStaffIdCode() { return staffIdCode; }
    public void setStaffIdCode(String staffIdCode) { this.staffIdCode = staffIdCode; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getFullName() { return firstName + " " + lastName; }

    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
