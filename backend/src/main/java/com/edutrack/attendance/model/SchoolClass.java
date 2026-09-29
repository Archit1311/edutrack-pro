package com.edutrack.attendance.model;

import java.time.LocalDateTime;

public class SchoolClass {
    private Long id;
    private String classCode;
    private String name;
    private Long departmentId;
    private String academicYear;
    private String semester;
    private LocalDateTime createdAt;

    private int enrolledCount;
    private double avgAttendance;

    public SchoolClass() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getClassCode() { return classCode; }
    public void setClassCode(String classCode) { this.classCode = classCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public int getEnrolledCount() { return enrolledCount; }
    public void setEnrolledCount(int enrolledCount) { this.enrolledCount = enrolledCount; }

    public double getAvgAttendance() { return avgAttendance; }
    public void setAvgAttendance(double avgAttendance) { this.avgAttendance = avgAttendance; }
}
