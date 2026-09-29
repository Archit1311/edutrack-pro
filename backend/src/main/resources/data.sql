-- ============================================================
-- EduTrack Pro — Seed Data
-- ============================================================

-- Departments
INSERT INTO departments (id, name, code) VALUES
(1, 'Computer Science & Engineering', 'CSE'),
(2, 'Electrical Engineering', 'EE'),
(3, 'Mechanical Engineering', 'ME'),
(4, 'Mathematics', 'MATH');

-- Users (BCrypt hash for 'password123': $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVKhPe3sF4F19c48bO7I455q)
INSERT INTO users (id, username, email, password_hash, role, is_active) VALUES
(1, '20240192', 'student@edutrack.edu', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVKhPe3sF4F19c48bO7I455q', 'ROLE_STUDENT', TRUE),
(2, 'FAC-8921', 'teacher@edutrack.edu', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVKhPe3sF4F19c48bO7I455q', 'ROLE_TEACHER', TRUE),
(3, 'ADM-0001', 'admin@edutrack.edu', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVKhPe3sF4F19c48bO7I455q', 'ROLE_ADMIN', TRUE);

-- Students
INSERT INTO students (id, user_id, student_id_code, first_name, last_name, department_id, program, year_of_study) VALUES
(1, 1, '20240192', 'Alexander', 'Hayes', 1, 'B.Tech Computer Science', 2);

-- Teachers
INSERT INTO teachers (id, user_id, staff_id_code, first_name, last_name, department_id, title) VALUES
(1, 2, 'FAC-8921', 'Aris', 'Thorne', 1, 'Associate Professor');

-- Subjects
INSERT INTO subjects (id, subject_code, name, department_id, credits) VALUES
(1, 'CS201', 'Data Structures & Algorithms', 1, 4),
(2, 'CS304', 'Database Management Systems', 1, 3),
(3, 'CS310', 'Computer Networks', 1, 3),
(4, 'MA202', 'Discrete Mathematics', 4, 4),
(5, 'CS405', 'Operating Systems', 1, 4);

-- Classes / Batches
INSERT INTO classes (id, class_code, name, department_id, academic_year, semester) VALUES
(1, 'CS-2024-A', 'Computer Science Section A', 1, '2024-25', 'Semester IV'),
(2, 'CS-2024-B', 'Computer Science Section B', 1, '2024-25', 'Semester IV'),
(3, 'ME-2024-A', 'Mechanical Engineering Section A', 3, '2024-25', 'Semester IV'),
(4, 'EE-2024-A', 'Electrical Engineering Section A', 2, '2024-25', 'Semester IV');

-- Enrollments
INSERT INTO enrollments (id, student_id, class_id) VALUES
(1, 1, 1);

-- Attendance Sessions
INSERT INTO attendance_sessions (id, class_id, subject_id, teacher_id, session_date, start_time, end_time, room_location, topic, status) VALUES
(1, 1, 1, 1, '2026-09-29', '10:00:00', '11:30:00', 'Lab 302, Turing Block', 'Binary Search Trees & AVL Balancing', 'FINALIZED'),
(2, 2, 2, 1, '2026-09-28', '13:30:00', '15:00:00', 'Lecture Hall 405', 'Relational Algebra & Normalization', 'FINALIZED'),
(3, 1, 1, 1, '2026-09-30', '10:00:00', '11:30:00', 'Lab 302, Turing Block', 'Graph Traversal & Dijkstra Algorithm', 'ACTIVE');

-- Attendance Records
INSERT INTO attendance_records (id, session_id, student_id, status, remarks) VALUES
(1, 1, 1, 'PRESENT', 'On-time attendance verified');
