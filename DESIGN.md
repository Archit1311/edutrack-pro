# DESIGN.md — EduTrack Pro Design System
> Extracted from Stitch Project: **Academic Attendance Portal** (ID: `1344226064162153425`)  
> Design Theme: **Academic Precision** · Mode: **Light** · Device: **Desktop-first with responsive mobile**

---

## 1. Screen Inventory

| # | Stitch Screen ID | Title | Route (planned) | Role |
|---|-----------------|-------|-----------------|------|
| 1 | `a1cc92ab13c140fd8104b985e6ca1f0a` | Unified Login — EduTrack Pro | `/login` | All |
| 2 | `f22a7e39237a4685a9bbd65dfde9131a` | Student Login — EduTrack Pro | `/login` (student tab) | Student |
| 3 | `14626e2cde5a4c25a08010569cd7f789` | Faculty Login — EduTrack Pro | `/login` (faculty tab) | Teacher |
| 4 | `cabee7bbb9b647c7a0b7bff6112a13f7` | Teacher Dashboard | `/teacher/dashboard` | Teacher |
| 5 | `531c7f0d9ecf420aae9f754cc45b1a5e` | Mark Attendance — Teacher View | `/teacher/attendance/mark` | Teacher |
| 6 | `314d5a6a4d834e2e996e0ba099e5c1ee` | Student Attendance Portal | `/student/dashboard` | Student |
| 7 | `14ee86029020495e895849895aceac33` | Attendance Analytics & Trends | `/teacher/analytics` | Teacher/Admin |

---

## 2. Color System

All colors are from the **"Academic Precision"** Material Design 3 theme (light mode).

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#000000` | Primary buttons, active nav items, headings, brand |
| `on-primary` | `#ffffff` | Text/icons on primary background |
| `primary-container` | `#131b2e` | Dark accent containers |
| `on-primary-container` | `#7c839b` | Text on primary container |
| `primary-fixed` | `#dae2fd` | Light fixed primary (chip/badge bg) |
| `primary-fixed-dim` | `#bec6e0` | Dimmed fixed primary |
| `inverse-primary` | `#bec6e0` | Inverse primary |

### Secondary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary` | `#505f76` | Secondary text, inactive nav icons |
| `on-secondary` | `#ffffff` | Text on secondary |
| `secondary-container` | `#d0e1fb` | Active nav background (light), batch chips |
| `on-secondary-container` | `#54647a` | Text on secondary container |
| `secondary-fixed` | `#d3e4fe` | Chart legend (EE line) |
| `secondary-fixed-dim` | `#b7c8e1` | Dimmed secondary fixed |

### Tertiary Palette (Success / Present)

| Token | Hex | Usage |
|-------|-----|-------|
| `tertiary` | `#000000` | — |
| `tertiary-fixed` | `#6ffbbe` | Progress bars (safe), Present status, chart lines |
| `tertiary-fixed-dim` | `#4edea3` | Progress bar track (safe), chart ME line |
| `tertiary-container` | `#002113` | Text color for "Safe" status |
| `on-tertiary-container` | `#009668` | Safe label text |

### Surface Hierarchy (light to dark)

| Token | Hex | Description |
|-------|-----|-------------|
| `surface-container-lowest` | `#ffffff` | Cards, modals, white surfaces |
| `surface-container-low` | `#f2f4f6` | Hover states, subtle backgrounds |
| `surface-container` | `#eceef0` | Container backgrounds |
| `surface-container-high` | `#e6e8ea` | Table zebra, elevated containers |
| `surface-container-highest` | `#e0e3e5` | Highest container |
| `surface` | `#f7f9fb` | Base page background |
| `surface-bright` | `#f7f9fb` | Main content canvas, input backgrounds |
| `surface-dim` | `#d8dadc` | Dimmed surface |
| `surface-variant` | `#e0e3e5` | Hover fill |
| `background` | `#f7f9fb` | Root body background |

### On-Surface / Text

| Token | Hex | Usage |
|-------|-----|-------|
| `on-surface` | `#191c1e` | Primary body text, headings |
| `on-surface-variant` | `#45464d` | Secondary text, subtitles, placeholders |
| `outline` | `#76777d` | Input borders, dividers |
| `outline-variant` | `#c6c6cd` | Card borders, table separators |
| `inverse-surface` | `#2d3133` | Dark mode surface |
| `inverse-on-surface` | `#eff1f3` | Text on dark surfaces |
| `surface-tint` | `#565e74` | Hover state for primary button |

### Error / Absent

| Token | Hex | Usage |
|-------|-----|-------|
| `error` | `#ba1a1a` | Error text, absent badge text, at-risk |
| `error-container` | `#ffdad6` | Absent badge bg, error container |
| `on-error` | `#ffffff` | Text on error |
| `on-error-container` | `#93000a` | Text on error container |

### Semantic Accent Colors (Non-system, hardcoded in Stitch HTML)

| Color | Hex | Usage |
|-------|-----|-------|
| Present badge bg | `#DCFCE7` | Present status pill background |
| Present badge text | `#166534` | Present status pill text |
| Absent badge bg | `#FEE2E2` | Absent status pill background |
| Absent badge text | `#991B1B` | Absent status pill text |
| Late badge bg | `#FEF3C7` | Late status pill background |
| Late badge text | `#92400E` | Late status pill text |
| Warning bar | `#F59E0B` | Attendance bar color when below 75% (amber) |
| Warning text | `#B45309` | Warning label text |

---

## 3. Typography System

### Font Families

| Role | Font | Import |
|------|------|--------|
| Headlines / Display | Hanken Grotesk | Google Fonts |
| Body / UI text | Inter | Google Fonts |
| Monospace / Data / IDs | JetBrains Mono | Google Fonts |
| Icons | Material Symbols Outlined | Google Fonts |

### Type Scale

| Token | Font Family | Size | Line Height | Weight | Letter Spacing |
|-------|-------------|------|------------|--------|---------------|
| `display-lg` | Hanken Grotesk | 36px | 44px | 700 | — |
| `headline-md` | Hanken Grotesk | 24px | 32px | 600 | — |
| `headline-sm` | Hanken Grotesk | 20px | 28px | 600 | — |
| `body-lg` | Inter | 16px | 24px | 400 | — |
| `body-md` | Inter | 14px | 20px | 400 | — |
| `body-sm` | Inter | 12px | 18px | 400 | — |
| `label-caps` | Inter | 11px | 16px | 700 | 0.05em |
| `data-mono` | JetBrains Mono | 13px | 20px | 450 | — |

### Typography Usage Rules

- `display-lg` — Page-level titles (student name, course name, "Department Analytics")
- `headline-md` — Section headings, top nav brand name
- `headline-sm` — Card headings, sidebar section labels, login headings
- `body-md` — Table body content, nav item labels, general paragraph text
- `body-sm` — Helper text, sub-labels, footer links, timestamps
- `label-caps` — Table column headers (UPPERCASE, tracked), sidebar nav items, chip labels, stat card labels
- `data-mono` — Student IDs, dates in tables, course codes, attendance percentages in data cells

---

## 4. Spacing System (4px base unit)

| Token | Value | CSS Usage |
|-------|-------|-----------|
| `xs` | 4px | Tight spacing between inline elements |
| `sm` | 8px | Button padding (py), list item gaps |
| `md` | 16px | Card padding, gap-md, form group spacing |
| `lg` | 24px | Section gap, card padding-lg |
| `xl` | 40px | Major section separation |
| `gutter` | 20px | Grid gap |
| `margin-mobile` | 16px | Page padding on mobile |
| `margin-desktop` | 32px | Page padding on desktop |

---

## 5. Border Radius System

| Token | Value | Usage |
|-------|-------|-------|
| `DEFAULT` | 2px (0.125rem) | Very subtle rounding — inputs, small chips |
| `lg` | 4px (0.25rem) | Input fields, card inner elements |
| `xl` | 8px (0.5rem) | Cards, buttons, badges |
| `full` | 12px (0.75rem) | Pills, avatar circles (Stitch maps `rounded-full` to 0.75rem) |

---

## 6. Elevation and Shadow

| Level | CSS | Usage |
|-------|-----|-------|
| 0 — Background | Background color only | Page background |
| 1 — Card | `border: 1px solid outline-variant` | Cards, table containers |
| 2 — Modal | `shadow-[0_4px_20px_rgba(15,23,42,0.08)]` + border | Login cards |

---

## 7. Component Inventory

### 7.1 Sidebar Navigation (Desktop, w-[280px], lg:flex, hidden on mobile)

Structure:
1. Brand header — Institution logo (40x40 rounded-full) + "Academic Portal" (headline-sm bold) + "Faculty Division" (label-caps, on-surface-variant)
2. Primary CTA button — "New Session" — full-width, `bg-primary text-on-primary`, `rounded-lg`, `add` icon
3. Nav items — `flex items-center gap-md px-md py-sm`, `rounded-lg`, icon + label
   - Active: `bg-secondary-container text-on-secondary-container`, icon FILL=1
   - Inactive: `text-secondary hover:bg-surface-variant`
   - Items: Overview (dashboard), My Batches (group), Attendance Log (fact_check), Analytics (analytics), Settings (settings)
4. Bottom section — `mt-auto border-t`, Help Center + Logout

### 7.2 Top Navigation Bar (Mobile, lg:hidden, h-16)

- `bg-surface-container-lowest border-b border-outline-variant sticky top-0`
- Left: hamburger menu + "EduTrack Pro" (headline-md, primary)
- Right: notifications icon + user avatar (32x32 rounded-full)

### 7.3 Top Navigation Bar (Desktop authenticated variant — horizontal)

- Same height, white bg, border-b, `max-w-[1440px]`
- Left: Brand + links: Dashboard / Batches / Reports / Trends
  - Active link: `text-primary border-b-2 border-primary`
  - Inactive: `text-on-surface-variant hover:text-primary`
- Right: "Mark Attendance" primary button + notifications + settings + avatar

### 7.4 Login Card

- Centered, `max-w-md`, `bg-surface-container-lowest rounded-xl border border-outline-variant`
- Shadow: `shadow-[0_4px_20px_rgba(15,23,42,0.08)]`, padding: `p-lg md:p-xl`
- Above card: "Academic Portal" (display-lg, primary) + "EduTrack Pro" (headline-sm, on-surface-variant)
- Role Tab Switcher: Student | Faculty tabs with underline indicator
  - Active: `text-primary border-b-2 border-primary`
  - Inactive: `text-on-surface-variant border-b-2 border-transparent hover:text-primary`
- Inputs: `bg-surface-bright border border-outline-variant rounded`, focus: `focus:border-primary focus:ring-1`
  - Student ID: `data-mono` font, placeholder "e.g. 20240192", `badge` icon
  - Password: `data-mono` font, placeholder dots, `lock` icon + visibility toggle button
- Forgot Password: `body-sm text-secondary hover:text-primary`
- Remember Me: checkbox + label
- Submit: full-width primary button, `headline-sm`, `arrow_forward` icon
- Footer: border-t, student — "New Student? Register here"; faculty — support/IT links
- System status indicator: green dot + label-caps tracking-widest text

### 7.5 KPI Stat Cards (Teacher Dashboard — 3-column)

- `bg-surface-container-lowest border border-outline-variant rounded-xl p-md`
- Top: Colored icon box (bg-primary-fixed / bg-secondary-container / bg-error-container) + label-caps label
- Value: `font-display-lg text-display-lg text-on-surface`
- Sub: progress bar or pill badge
- `hover:bg-surface-container-low transition-colors cursor-pointer`

### 7.6 KPI Stat Cards (Analytics — 4-column)

- Same base, adds trend arrow in tertiary-fixed-dim
- At-risk in `text-error`

### 7.7 Overall Attendance Card (Student — dark)

- `bg-primary-container text-on-primary-container border-none overflow-hidden relative`
- Decorative `monitoring` icon (120px, opacity-10) top-right
- Value: `display-lg on-primary`, sub: `body-sm secondary-fixed-dim`

### 7.8 Attendance Status Badges

```
inline-flex items-center justify-center px-2 py-1 rounded font-semibold text-[11px] uppercase tracking-wide
Present: bg-[#DCFCE7] text-[#166534]
Absent:  bg-[#FEE2E2] text-[#991B1B]
Late:    bg-[#FEF3C7] text-[#92400E]
```

### 7.9 Attendance Toggle (P/L/A Segmented Control)

```
flex bg-surface-container border border-outline-variant rounded-md p-1
  button.flex-1.py-1.rounded-sm.font-label-caps
  Active P: bg-tertiary-fixed/20 text-on-tertiary-fixed-variant border border-tertiary-fixed/30
  Active L: bg-amber-100 text-amber-900 border border-amber-200
  Active A: bg-error/20 text-on-error-container border border-error/30
  Inactive: text-on-surface-variant hover:bg-surface-container-high
```

### 7.10 Attendance Progress Bars (Subject view)

- Track: `w-full bg-surface-container-high h-2 rounded-full overflow-hidden`
- Fill (safe): `bg-tertiary-fixed` | Fill (warning): `bg-[#F59E0B]`
- Status label: `text-tertiary-container` ("Safe") | `text-[#B45309]` ("Warning (<75%)")

### 7.11 Mini Progress Bar (table cells)

- Track: `w-16 h-1.5 bg-surface-variant rounded-full`
- Fill: `bg-error` (below threshold) | `bg-tertiary-fixed-dim` (ok)

### 7.12 Data Tables

```
thead: bg-surface-container border-b font-label-caps text-on-surface-variant py-sm px-md
tbody: font-body-sm text-on-surface
row: border-b border-outline-variant hover:bg-surface-container-low transition-colors
Date/ID cells: font-data-mono text-on-surface-variant
Name cells: font-semibold text-primary (or group-hover:text-primary)
Action: icon button text-secondary hover:text-primary
Trend: trending_down (error) | trending_flat (surface-tint) | trending_up (tertiary-fixed-dim)
```

### 7.13 Mark Attendance Student List Row

```
grid-cols-[auto_1fr_auto] md:grid-cols-[auto_2fr_1fr_auto] gap-4 p-3
  Col1: row number (data-mono, on-surface-variant, w-10 text-center)
  Col2: avatar (32x32 rounded-full) + name (body-md bold) + ID (data-mono xs)
  Col3: mini progress bar + percentage (hidden on mobile)
  Col4: P/L/A toggle (w-[200px])
```

Toolbar: search filter input + Compact/Standard density toggle

### 7.14 Session Stats Bar

```
md:col-span-2 grid grid-cols-3 gap-sm bg-surface-container-lowest border rounded-xl p-md
  [Total Enrolled | divider | Present | divider | Attendance Rate + mini bar]
```

### 7.15 Class Schedule Cards (Teacher Dashboard)

Active class:
```
rounded-xl overflow-hidden flex flex-col sm:flex-row
  Time block: bg-primary text-on-primary p-md sm:w-32
  Content: subject name, batch chip (secondary-container), location
  Footer: avatar stack + "Mark Attendance" button
```

Completed class: `opacity-60`, time block uses `bg-surface-container-high`, subject has `line-through`, footer shows "Attendance Marked (XX%)" chip + "View Report"

### 7.16 My Batches List

```
bg-surface-container-lowest border rounded-xl overflow-hidden
  Row: p-md border-b hover:bg-surface-container-low flex items-center justify-between group
    Left: 40x40 rounded square (bg-primary-container / secondary-container / tertiary-container) + initials + name + count
    Right: chevron_right icon (group-hover:text-primary)
  "Request New Batch" dashed border button below
```

### 7.17 Batch Alert Cards (Analytics sidebar)

```
bg-surface-container-low p-sm rounded-lg border-l-4
  Critical: border-error
  Warning: border-surface-tint
  Content: batch code + percentage + description text
```

### 7.18 Analytics Line Chart (SVG)

- Container: `min-h-[400px] border-b border-l border-outline-variant`
- Dashed grid lines, Y-axis labels (100%/90%/80%/70%), X-axis labels (Week 1-6)
- Animated SVG lines (draw-on: `stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: dash 2s ease-out forwards`)
- Legend: colored dot + program label
- Lines: CS=primary/black solid, ME=`#4edea3` solid, EE=`#d3e4fe` dashed

### 7.19 Mini Calendar Widget (Student Portal)

- 7-col grid, day headers (M/T/W/T/F/S/S), 10px on-surface-variant
- Day cells: `p-1 hover:bg-surface-variant rounded cursor-pointer`
- Today: `bg-primary text-on-primary rounded font-bold shadow-sm`
- Event dot: absolute bottom-right 4px dot (`bg-[#166534]` present, `bg-primary` scheduled)
- Below: Timeline list of today's classes with left-border color coding and time columns

### 7.20 Buttons

| Variant | Key Styles |
|---------|-----------|
| Primary | `bg-primary text-on-primary rounded-lg py-sm px-md hover:opacity-90 transition-opacity` |
| Primary large (login) | Full-width + `font-headline-sm hover:bg-surface-tint` |
| Secondary / Ghost | `border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low` |
| Dashed | `border border-outline border-dashed rounded-lg text-secondary hover:bg-surface-container-low` |
| Icon Button | `p-sm rounded-full text-on-surface-variant hover:bg-surface-container-low hover:text-primary` |
| Text Link | `text-primary hover:underline font-body-sm font-semibold` |
| Mark All Present | `bg-tertiary-fixed/10 text-on-tertiary-fixed-variant border border-tertiary-fixed/30 rounded-lg` |
| Export | `border border-outline-variant rounded-lg` with download icon |

### 7.21 Form Inputs

Standard pattern:
```html
<div class="relative">
  <div class="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
    <span class="material-symbols-outlined text-outline">badge</span>
  </div>
  <input class="block w-full pl-[40px] pr-sm py-sm
    bg-surface-bright border border-outline-variant rounded
    focus:border-primary focus:ring-1 focus:ring-primary transition-colors
    placeholder:text-outline-variant font-data-mono text-data-mono" />
</div>
```

Select:
```html
bg-surface-container-lowest border border-outline-variant text-on-surface text-body-sm
rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none
```

Checkbox: `h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary`

---

## 8. Layout System

### Standard Authenticated Page Layout

```
body.min-h-screen.flex.flex-col.md:flex-row (or .flex.overflow-hidden)
  nav.w-[280px].h-screen.sticky.left-0.hidden.lg:flex   ← sidebar
  main.flex-1.flex.flex-col.min-w-0
    header.h-16.sticky.top-0.lg:hidden                   ← mobile top nav
    header.h-16.sticky.top-0.hidden.lg:flex              ← desktop top bar
    div.flex-1.overflow-y-auto.p-margin-mobile.md:p-margin-desktop
      div.max-w-[1440px].mx-auto                          ← content constraint
```

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| mobile (< 640px) | Single column, mobile top nav only, sidebar hidden |
| sm (640px) | Class cards go from stacked to flex-row |
| md (768px) | 2-3 column grids, full desktop padding, search bar visible |
| lg (1024px) | Sidebar visible, desktop top bar, full multi-column layouts |
| xl (1280px+) | Content max-width constraint kicks in |

### Grid Layouts

| Screen | Grid |
|--------|------|
| Teacher Dashboard KPIs | `grid-cols-1 md:grid-cols-3 gap-md` |
| Teacher Dashboard main | `grid-cols-1 lg:grid-cols-3 gap-lg` (2+1) |
| Analytics KPIs | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter` |
| Analytics main | `grid-cols-1 md:grid-cols-3 lg:grid-cols-4` (3+1) |
| Student Portal main | `grid-cols-1 lg:grid-cols-12 gap-lg` (8+4) |
| Mark Attendance stats | `grid-cols-1 md:grid-cols-3 gap-md` (2+1) |
| Mark Attendance row | `grid-cols-[auto_1fr_auto] md:grid-cols-[auto_2fr_1fr_auto]` |

---

## 9. Icon Library

**Material Symbols Outlined** (variable font, FILL 0 default, FILL 1 for active states)

Key icons: `school`, `dashboard`, `group`/`groups`, `fact_check`, `analytics`, `settings`, `help`, `logout`, `add`, `notifications`, `menu`, `badge`, `lock`, `visibility_off`, `arrow_forward`, `login`, `chevron_right`, `chevron_left`, `event_available`, `calendar_today`, `schedule`, `location_on`, `computer`, `monitoring`, `search`, `download`, `check_circle`, `more_vert`, `trending_up`, `trending_down`, `trending_flat`, `warning`, `pie_chart`, `event_note`, `mail`, `support_agent`, `security`, `arrow_upward`

---

## 10. Navigation Structure

### Teacher Sidebar
1. Overview (dashboard)
2. My Batches (group)
3. Attendance Log (fact_check)
4. Analytics (analytics)
5. Settings (settings)
- Bottom: Help Center + Logout
- CTA: "New Session" button

### Student Horizontal Tabs
1. Dashboard
2. Batches
3. Reports (attendance log)
4. Trends

---

## 11. User Flows

### Login Flow
```
/login
  Student tab: Student ID + Password → POST /api/auth/login → /student/dashboard
  Faculty tab: Staff Email/ID + Password → POST /api/auth/login → /teacher/dashboard
```

### Teacher Mark Attendance Flow
```
/teacher/dashboard → "Mark Attendance" button
  → /teacher/attendance/mark
    [Course + Batch + Date + Time header]
    [Session stats: Enrolled / Present / Rate]
    [Bulk Actions: Mark All Present]
    [Student list: search filter + density toggle]
    [Each row: avatar + name + ID + overall% bar + P/L/A toggle]
    [Submit Session button] → POST /api/attendance/sessions
```

### Teacher Analytics Flow
```
/teacher/analytics
  [Semester dropdown filter + Export]
  [4 KPI cards]
  [SVG trend chart + Batch Alerts sidebar]
  [At-Risk Register table: search + email action]
```

### Student Dashboard Flow
```
/student/dashboard
  [Student header: name + ID + program + term]
  Left 8/12: Subject attendance bars + Recent history table (filter by subject)
  Right 4/12: Overall % card + Mini calendar + Today's schedule
```

---

## 12. React Component Map

### Common (shared)
- `SidebarNav` — 280px sidebar
- `TopNavBar` — mobile/desktop header
- `StatusBadge` — Present/Absent/Late pill
- `AttendanceProgressBar` — subject bar with label
- `KpiCard` — stat card with icon, value, sub
- `DataTable` — responsive table with sticky header
- `SearchInput` — icon-prefixed search
- `SelectDropdown` — styled select
- `AvatarStack` — overlapping avatars
- `SectionHeader` — title + action row

### Auth
- `LoginCard` — centered form card
- `RoleTabSwitcher` — Student/Faculty tabs
- `PasswordInput` — with visibility toggle
- `SystemStatusBar` — dot + status text

### Teacher
- `ClassCard` — active/completed schedule card
- `BatchListRow` — batch item row
- `AttendanceToggle` — P/L/A segmented control
- `StudentAttendanceRow` — full row in mark-attendance
- `BulkActionsPanel` — mark all + overflow
- `BatchAlertCard` — at-risk batch with border-left
- `TrendChart` — animated SVG multi-line
- `AtRiskRegister` — at-risk data table

### Student
- `SubjectAttendanceBar` — per-subject bar + sessions
- `AttendanceHistoryTable` — date/subject/type/status log
- `MiniCalendar` — 7-col month with event dots
- `TodaySchedule` — timeline class list
- `OverallAttendanceCard` — dark primary-container card

---

## 13. Design Principles

1. Clarity first — dense data with generous whitespace
2. Status at a glance — color-coded badges and bars
3. Tonal layering — depth from surface tokens, not heavy shadows
4. Consistent layout — identical sidebar + content canvas across all pages
5. Desktop-first responsive — sidebar collapses, grids stack
6. Data-dense tables — compact rows, sticky headers, filter, density toggle
7. Accessible typography — #191c1e on #f7f9fb (WCAG AA)
8. Monospace for data — all IDs/percentages/dates use JetBrains Mono
9. Subtle animation — transition-colors, hover:opacity-90, SVG draw-on only
10. Flat clean UI — tonal containers, no decorative gradients
