package com.edutrack.attendance.service;

import com.edutrack.attendance.dto.LoginRequest;
import com.edutrack.attendance.dto.LoginResponse;
import com.edutrack.attendance.model.Student;
import com.edutrack.attendance.model.Teacher;
import com.edutrack.attendance.model.User;
import com.edutrack.attendance.repository.StudentRepository;
import com.edutrack.attendance.repository.TeacherRepository;
import com.edutrack.attendance.repository.UserRepository;
import com.edutrack.attendance.security.JwtTokenProvider;
import com.edutrack.attendance.security.UserPrincipal;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       StudentRepository studentRepository,
                       TeacherRepository teacherRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByIdentifier(request.getIdentifier().trim())
                .orElseThrow(() -> new BadCredentialsException("Invalid identifier or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid identifier or password");
        }

        UserPrincipal principal = UserPrincipal.create(user);
        String accessToken = tokenProvider.generateAccessToken(principal);
        String refreshToken = tokenProvider.generateRefreshToken(principal);

        Map<String, Object> userMeta = new HashMap<>();
        userMeta.put("id", user.getId());
        userMeta.put("username", user.getUsername());
        userMeta.put("email", user.getEmail());
        userMeta.put("role", user.getRole());

        // Attach domain profile details
        if ("ROLE_STUDENT".equals(user.getRole())) {
            Optional<Student> studentOpt = studentRepository.findByUserId(user.getId());
            if (studentOpt.isPresent()) {
                Student s = studentOpt.get();
                userMeta.put("name", s.getFullName());
                userMeta.put("identifier", s.getStudentIdCode());
                userMeta.put("program", s.getProgram());
                userMeta.put("studentId", s.getId());
            } else {
                userMeta.put("name", user.getUsername());
                userMeta.put("identifier", user.getUsername());
            }
        } else if ("ROLE_TEACHER".equals(user.getRole())) {
            Optional<Teacher> teacherOpt = teacherRepository.findByUserId(user.getId());
            if (teacherOpt.isPresent()) {
                Teacher t = teacherOpt.get();
                userMeta.put("name", t.getFullName());
                userMeta.put("identifier", t.getStaffIdCode());
                userMeta.put("title", t.getTitle());
                userMeta.put("teacherId", t.getId());
            } else {
                userMeta.put("name", "Faculty Member");
                userMeta.put("identifier", user.getUsername());
            }
        } else {
            userMeta.put("name", "Administrator");
            userMeta.put("identifier", user.getUsername());
        }

        return new LoginResponse(accessToken, refreshToken, userMeta);
    }
}
