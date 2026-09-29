package com.edutrack.attendance.config;

import com.edutrack.attendance.model.AttendanceSession;
import com.edutrack.attendance.model.SchoolClass;
import com.edutrack.attendance.model.Student;
import com.edutrack.attendance.model.Subject;
import com.edutrack.attendance.model.Teacher;
import com.edutrack.attendance.model.User;
import com.edutrack.attendance.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final ClassRepository classRepository;
    private final AttendanceSessionRepository sessionRepository;
    private final AttendanceRecordRepository recordRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    public DataInitializer(UserRepository userRepository,
                           StudentRepository studentRepository,
                           TeacherRepository teacherRepository,
                           SubjectRepository subjectRepository,
                           ClassRepository classRepository,
                           AttendanceSessionRepository sessionRepository,
                           AttendanceRecordRepository recordRepository,
                           PasswordEncoder passwordEncoder,
                           JdbcTemplate jdbcTemplate) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.subjectRepository = subjectRepository;
        this.classRepository = classRepository;
        this.sessionRepository = sessionRepository;
        this.recordRepository = recordRepository;
        this.passwordEncoder = passwordEncoder;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        String encodedPassword = passwordEncoder.encode("password123");
        jdbcTemplate.update("UPDATE users SET password_hash = ?", encodedPassword);

        // Check if database already has users
        if (!userRepository.findAll().isEmpty()) {
            System.out.println(">>> Users synchronized with verified BCrypt credentials.");
            return;
        }

        System.out.println(">>> Initializing EduTrack Pro Institutional Seed Data & BCrypt Passwords...");

        // 1. Departments
        jdbcTemplate.update("INSERT INTO departments (name, code) VALUES ('Computer Science & Engineering', 'CSE')");
        jdbcTemplate.update("INSERT INTO departments (name, code) VALUES ('Electrical Engineering', 'EE')");
        jdbcTemplate.update("INSERT INTO departments (name, code) VALUES ('Mechanical Engineering', 'ME')");
        jdbcTemplate.update("INSERT INTO departments (name, code) VALUES ('Mathematics', 'MATH')");

        // 2. Users (Password: password123)
        // encodedPassword already initialized at top of method

        User studentUser = new User();
        studentUser.setUsername("20240192");
        studentUser.setEmail("student@edutrack.edu");
        studentUser.setPasswordHash(encodedPassword);
        studentUser.setRole("ROLE_STUDENT");
        studentUser.setActive(true);
        Long studentUserId = userRepository.save(studentUser);

        User teacherUser = new User();
        teacherUser.setUsername("FAC-8921");
        teacherUser.setEmail("teacher@edutrack.edu");
        teacherUser.setPasswordHash(encodedPassword);
        teacherUser.setRole("ROLE_TEACHER");
        teacherUser.setActive(true);
        Long teacherUserId = userRepository.save(teacherUser);

        User adminUser = new User();
        adminUser.setUsername("ADM-0001");
        adminUser.setEmail("admin@edutrack.edu");
        adminUser.setPasswordHash(encodedPassword);
        adminUser.setRole("ROLE_ADMIN");
        adminUser.setActive(true);
        userRepository.save(adminUser);

        // Additional students
        String[] studentNames = {
            "Alexander Hayes:20240192", "Beatrice Vance:20240193", "Charles Montgomery:20240194",
            "Diana Prince:20240195", "Ethan Hunt:20240196", "Fiona Gallagher:20240197",
            "George Clark:20240198", "Hannah Abbott:20240199", "Ian Malcolm:20240200",
            "Julia Roberts:20240201", "Kevin Tran:20240202", "Laura Croft:20240203"
        };

        // 3. Classes / Batches
        SchoolClass csA = new SchoolClass();
        csA.setClassCode("CS-2024-A");
        csA.setName("Computer Science Section A");
        csA.setDepartmentId(1L);
        csA.setAcademicYear("2024-25");
        csA.setSemester("Semester IV");
        Long classAId = classRepository.save(csA);

        SchoolClass csB = new SchoolClass();
        csB.setClassCode("CS-2024-B");
        csB.setName("Computer Science Section B");
        csB.setDepartmentId(1L);
        csB.setAcademicYear("2024-25");
        csB.setSemester("Semester IV");
        classRepository.save(csB);

        SchoolClass meA = new SchoolClass();
        meA.setClassCode("ME-2024-A");
        meA.setName("Mechanical Engineering Section A");
        meA.setDepartmentId(3L);
        meA.setAcademicYear("2024-25");
        meA.setSemester("Semester IV");
        classRepository.save(meA);

        SchoolClass eeA = new SchoolClass();
        eeA.setClassCode("EE-2024-A");
        eeA.setName("Electrical Engineering Section A");
        eeA.setDepartmentId(2L);
        eeA.setAcademicYear("2024-25");
        eeA.setSemester("Semester IV");
        classRepository.save(eeA);

        // 4. Subjects
        Subject cs201 = new Subject();
        cs201.setSubjectCode("CS201");
        cs201.setName("Data Structures & Algorithms");
        cs201.setDepartmentId(1L);
        cs201.setCredits(4);
        Long subjectId = subjectRepository.save(cs201);

        Subject cs304 = new Subject();
        cs304.setSubjectCode("CS304");
        cs304.setName("Database Management Systems");
        cs304.setDepartmentId(1L);
        cs304.setCredits(3);
        subjectRepository.save(cs304);

        Subject cs310 = new Subject();
        cs310.setSubjectCode("CS310");
        cs310.setName("Computer Networks");
        cs310.setDepartmentId(1L);
        cs310.setCredits(3);
        subjectRepository.save(cs310);

        Subject ma202 = new Subject();
        ma202.setSubjectCode("MA202");
        ma202.setName("Discrete Mathematics");
        ma202.setDepartmentId(4L);
        ma202.setCredits(4);
        subjectRepository.save(ma202);

        Subject cs405 = new Subject();
        cs405.setSubjectCode("CS405");
        cs405.setName("Operating Systems");
        cs405.setDepartmentId(1L);
        cs405.setCredits(4);
        subjectRepository.save(cs405);

        // 5. Teachers
        Teacher teacher = new Teacher();
        teacher.setUserId(teacherUserId);
        teacher.setStaffIdCode("FAC-8921");
        teacher.setFirstName("Aris");
        teacher.setLastName("Thorne");
        teacher.setDepartmentId(1L);
        teacher.setTitle("Associate Professor");
        Long teacherId = teacherRepository.save(teacher);

        // 6. Primary Student
        Student primaryStudent = new Student();
        primaryStudent.setUserId(studentUserId);
        primaryStudent.setStudentIdCode("20240192");
        primaryStudent.setFirstName("Alexander");
        primaryStudent.setLastName("Hayes");
        primaryStudent.setDepartmentId(1L);
        primaryStudent.setProgram("B.Tech Computer Science");
        primaryStudent.setYearOfStudy(2);
        Long primaryStudentId = studentRepository.save(primaryStudent);
        jdbcTemplate.update("INSERT INTO enrollments (student_id, class_id) VALUES (?, ?)", primaryStudentId, classAId);

        // Seed other cohort students
        for (int i = 1; i < studentNames.length; i++) {
            String[] parts = studentNames[i].split(":");
            String fullName = parts[0];
            String code = parts[1];
            String[] nameParts = fullName.split(" ");

            User su = new User();
            su.setUsername(code);
            su.setEmail(code + "@edutrack.edu");
            su.setPasswordHash(encodedPassword);
            su.setRole("ROLE_STUDENT");
            su.setActive(true);
            Long uid = userRepository.save(su);

            Student st = new Student();
            st.setUserId(uid);
            st.setStudentIdCode(code);
            st.setFirstName(nameParts[0]);
            st.setLastName(nameParts.length > 1 ? nameParts[1] : "Student");
            st.setDepartmentId(1L);
            st.setProgram("B.Tech Computer Science");
            st.setYearOfStudy(2);
            Long sid = studentRepository.save(st);

            jdbcTemplate.update("INSERT INTO enrollments (student_id, class_id) VALUES (?, ?)", sid, classAId);
        }

        // 7. Seed Past Attendance Sessions
        AttendanceSession session1 = new AttendanceSession();
        session1.setClassId(classAId);
        session1.setSubjectId(subjectId);
        session1.setTeacherId(teacherId);
        session1.setSessionDate(LocalDate.now().minusDays(1));
        session1.setStartTime(LocalTime.of(10, 0));
        session1.setEndTime(LocalTime.of(11, 30));
        session1.setRoomLocation("Lab 302, Turing Block");
        session1.setTopic("Binary Search Trees & AVL Balancing");
        session1.setStatus("FINALIZED");
        Long s1Id = sessionRepository.save(session1);

        // Seed record for primary student
        recordRepository.upsertRecord(s1Id, primaryStudentId, "PRESENT", "Verified");

        System.out.println(">>> Seed Data Initialized Successfully.");
    }
}
