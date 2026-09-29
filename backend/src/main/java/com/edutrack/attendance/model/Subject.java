package com.edutrack.attendance.model;

import java.time.LocalDateTime;

public class Subject {
    private Long id;
    private String subjectCode;
    private String name;
    private Long departmentId;
    private Integer credits;
    private LocalDateTime createdAt;

    private String departmentName;

    public Subject() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }

    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
}
