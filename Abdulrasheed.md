# Principal Module - Frontend Development

**Developer:** Abdul Rasheed  
**Date:** December 26, 2024  
**Module:** Principal Dashboard

---

## Overview

Complete frontend implementation for the Principal module of the College Management System (CMS) for Government College of Technology, Bhakkar.

## Features Implemented

### Pages Created (9 Total)
| Page | Description |
|------|-------------|
| `dashboard.html` | Main dashboard with stats, department performance table, activity feed |
| `departments.html` | All 5 departments with HOD info, pass rates, attendance |
| `staff.html` | HOD cards, teaching staff directory with filters |
| `students.html` | Student statistics, distribution charts, directory |
| `analytics.html` | Performance analytics, GPA distribution, top performers |
| `attendance.html` | Attendance overview, low attendance alerts, monthly summary |
| `reports.html` | Report generation interface with quick reports |
| `notices.html` | Announcements management with categories |
| `settings.html` | Profile settings, notifications, security |

### Files Created
- `css/principal.css` - 700+ lines of module-specific styles
- `js/principal.js` - Data management and dynamic rendering

### Files Modified
- `js/auth.js` - Updated Principal name to "Sir Javed Ali Bhidwal"

## Departments & HODs

| Department | HOD Name | Teachers | Students |
|------------|----------|----------|----------|
| CIT | Rao Muhammad Haziq | 7 | 245 |
| Civil | Umar Farooq | 4 | 312 |
| Electrical | Engr. Muhammad Naveed Iqbal | 5 | 298 |
| Electronics | Muhammad Shahazaib Sana | 4 | 186 |
| Mechanical | Muhammad Safdar | 5 | 204 |

## Dynamic Rendering

Data is now dynamically rendered from `principal.js`. To update HOD names or department info:

```javascript
// Edit principal.js lines 9-15
departments: [
    { id: 'cit', hod: 'New Name', students: 245, teachers: 7, ... },
    // ...
]
```

## Tech Stack
- HTML5, CSS3, Bootstrap 5
- Vanilla JavaScript
- Bootstrap Icons

## Login Credentials
- **Username:** PRINCIPAL
- **Password:** principal123
