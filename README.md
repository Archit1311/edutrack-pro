# 🎓 EduTrack Pro — Academic Attendance Portal

> **Full-Stack Institutional Attendance Management & Early Warning System**  
> Source of Truth Design: **Academic Precision Theme (Stitch Project ID: `1344226064162153425`)**

---

## 🌟 Overview

EduTrack Pro is a modern, high-precision academic attendance management system designed for universities and higher-education institutions. It provides real-time roll call tracking, cumulative eligibility monitoring, automated early warning detection for at-risk students, faculty session management, and institutional administrative governance.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router v6, Recharts, Material Symbols, Vanilla CSS & Design Tokens |
| **Backend** | Spring Boot 3.4.3, Java 21, Spring MVC, Spring JDBC (`JdbcTemplate`), Spring Security 6, JJWT 0.12.6 |
| **Database** | MySQL 8.0, H2 Database (MySQL Mode for standalone local execution) |
| **Event Streaming & Audit** | Apache Kafka (KRaft mode), MongoDB 6.0 |
| **DevOps & Containers** | Docker Compose, Maven Wrapper (`mvnw`), npm |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Java 21** or higher
- **Node.js 18+** & **npm**
- *(Optional)* **Docker & Docker Compose** for MySQL, MongoDB, and Kafka

### 1. Start the Backend API (Spring Boot)
```bash
cd backend
# Windows
.\mvnw.cmd spring-boot:run

# Linux / macOS
./mvnw spring-boot:run
```
- **Backend API:** `http://localhost:8080/api`
- **Interactive H2 Database Console:** `http://localhost:8080/api/h2-console`
  - **JDBC URL:** `jdbc:h2:mem:attendance_db`
  - **Username:** `sa`
  - **Password:** *(leave blank)*

### 2. Start the Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
- **Frontend App:** `http://localhost:5174/` (or `http://localhost:5173/`)

### 3. Optional: Spin Up Infrastructure (MySQL, MongoDB, Kafka)
```bash
docker-compose up -d
```

---

## 🔐 Pre-Configured Test Credentials

| Role | Username / Identifier | Password | Associated User in DB | Destination Page |
| :--- | :--- | :--- | :--- | :--- |
| **Faculty / Teacher** | `FAC-8921` *(or `teacher@edutrack.edu`)* | `password123` | **Dr. Aris Thorne** (Associate Professor, CSE) | `/teacher/dashboard` |
| **Student** | `20240192` *(or `student@edutrack.edu`)* | `password123` | **Alexander Hayes** (B.Tech CSE, Sem IV) | `/student/dashboard` |
| **Administrator** | `ADM-0001` *(or `admin@edutrack.edu`)* | `password123` | **Dr. Evelyn Carter** (Dean of Academic Administration) | `/admin/dashboard` |

---

## 📂 Project Architecture

```
attendance_app/
├── backend/                        # Spring Boot 3.4.3 Application
│   ├── src/main/java/com/edutrack/attendance/
│   │   ├── config/                 # SecurityConfig, CorsConfig, DataInitializer
│   │   ├── controller/             # REST Controllers (Auth, Attendance, Students, etc.)
│   │   ├── dto/                    # Request/Response Data Transfer Objects
│   │   ├── model/                  # Domain Models (User, Student, Session, Record)
│   │   ├── repository/             # Spring JDBC DAO Layer (JdbcTemplate & RowMappers)
│   │   ├── security/               # JWT Token Provider & OncePerRequest Filter
│   │   └── service/                # Business & Attendance Calculation Logic
│   └── src/main/resources/
│       ├── application.yml         # Spring Boot & Database configuration
│       ├── schema.sql              # MySQL & H2 relational DDL
│       └── data.sql                # Seed data & initial institutional records
├── frontend/                       # React 18 + Vite Web Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/               # RoleTabSwitcher, PasswordInput, SystemStatusBar
│   │   │   ├── common/             # SidebarNav, TopNavBar, StatusBadge, KpiCard, etc.
│   │   │   ├── student/            # SubjectAttendanceBar, OverallAttendanceCard, MiniCalendar
│   │   │   └── teacher/            # ClassCard, BatchListRow, AttendanceToggle, TrendChart
│   │   ├── context/                # AuthContext (JWT session management)
│   │   ├── pages/                  # Teacher, Student, Admin, and Auth Pages
│   │   ├── services/               # Axios API client & endpoints
│   │   └── styles/                 # Material Design 3 tokens & global utility CSS
├── docker-compose.yml              # MySQL 8, MongoDB 6, Apache Kafka (KRaft)
├── DESIGN.md                       # Comprehensive design system extracted from Stitch
└── README.md                       # Documentation & setup guide
```

---

## 📑 License
This project is proprietary and maintained for institutional academic attendance management.
