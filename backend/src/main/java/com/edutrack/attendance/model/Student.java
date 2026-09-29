package com.edutrack.attendance.model;

import java.time.LocalDateTime;

public class Student {
    private Long id;
    private Long userId;
    private String studentIdCode;
    private String firstName;
    private String lastName;
    private Long departmentId;
    private String program;
    private Integer yearOfStudy;
    private LocalDateTime createdAt;

    // Transient display fields
    private String email;
    private String batchCode;
    private Double overallPercentage;

    public Student() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getStudentIdCode() { return studentIdCode; }
    public void setStudentIdCode(String studentIdCode) { this.studentIdCode = studentIdCode; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getFullName() { return firstName + " " + lastName; }

    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }

    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }

    public Integer getYearOfStudy() { return yearOfStudy; }
    public void setYearOfStudy(Integer yearOfStudy) { this.yearOfStudy = yearOfStudy; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getBatchCode() { return batchCode; }
    public void setBatchCode(String batchCode) { this.batchCode = batchCode; }

    public Double getOverallPercentage() { return overallPercentage; }
    public void setOverallPercentage(Double overallPercentage) { this.overallPercentage = overallPercentage; }
}
