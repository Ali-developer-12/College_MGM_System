/**
 * Principal Module JavaScript - CMS
 * Government College of Technology, Bhakkar
 */

// Principal Module Data
const PRINCIPAL_DATA = {
    // Department Data
    departments: [
        { id: 'cit', name: 'Computer Information Technology', code: 'CIT', hod: 'Dr. Asad Ullah', students: 245, teachers: 7, attendance: 88, passRate: 92 },
        { id: 'civil', name: 'Civil Technology', code: 'CIVIL', hod: 'Umar Farooq', students: 312, teachers: 4, attendance: 85, passRate: 89 },
        { id: 'electrical', name: 'Electrical Technology', code: 'ELEC', hod: 'Engr.Muhammad Naveed Iqbal', students: 298, teachers: 5, attendance: 82, passRate: 87 },
        { id: 'electronics', name: 'Electronics Technology', code: 'ELCT', hod: 'Muhammad Shahazaib Sana', students: 186, teachers: 4, attendance: 78, passRate: 85 },
        { id: 'mechanical', name: 'Mechanical Technology', code: 'MECH', hod: 'Muhammad Safdar', students: 204, teachers: 5, attendance: 84, passRate: 88 }
    ],

    // Staff Summary
    staff: {
        total: 65,
        teaching: 50,
        nonTeaching: 15,
        hods: 5
    },

    // Student Summary
    students: {
        total: 2000,
        year1: 700,
        year2: 680,
        year3: 620,
        morningShift: 1100,
        eveningShift: 900
    },

    // Recent Activities
    activities: [
        { type: 'attendance', title: 'Daily attendance marked for CIT Department', time: '10 minutes ago' },
        { type: 'notice', title: 'New exam schedule uploaded for semester exams', time: '1 hour ago' },
        { type: 'approval', title: 'Leave request approved for Mr. Ahmed Khan', time: '2 hours ago' },
        { type: 'event', title: 'Annual sports day scheduled for next week', time: '3 hours ago' },
        { type: 'attendance', title: 'Low attendance alert for Electronics Dept.', time: '4 hours ago' }
    ],

    // Quick Stats
    quickStats: {
        classesToday: 48,
        absentStudents: 156,
        pendingFees: 'Rs. 2.4M',
        libraryBooks: 12450,
        transportBuses: 8,
        pendingApprovals: 12
    },

    // Announcements
    announcements: [
        { id: 1, title: 'Semester Exams Schedule', content: 'The semester exams will commence from January 15, 2025. All students are advised to collect their roll number slips from the office.', category: 'academic', date: '2024-12-25', urgent: false },
        { id: 2, title: 'Winter Vacation Notice', content: 'The college will remain closed from December 27 to January 5 for winter vacations.', category: 'general', date: '2024-12-24', urgent: false },
        { id: 3, title: 'Fee Submission Deadline', content: 'Last date for fee submission is December 31, 2024. Late fee will be charged after the deadline.', category: 'urgent', date: '2024-12-23', urgent: true }
    ]
};

// Initialize Principal Dashboard
function initPrincipalDashboard() {
    updateUserInfo();
    updateDateTime();
    setInterval(updateDateTime, 60000);
    initSidebarToggle();
    initDropdowns();
}

// Update User Information
function updateUserInfo() {
    const user = getCurrentUser();
    if (user) {
        const initials = user.name.split(' ').slice(-2).map(n => n[0]).join('').toUpperCase();

        // Update all user name displays
        document.querySelectorAll('#userName, #navUserName, #welcomeName').forEach(el => {
            if (el) el.textContent = user.name;
        });

        // Update all avatar displays
        document.querySelectorAll('#userAvatar, #navAvatar').forEach(el => {
            if (el) el.textContent = initials;
        });
    }
}

// Update Date and Time
function updateDateTime() {
    const now = new Date();

    const dateEl = document.getElementById('currentDate');
    const timeEl = document.getElementById('currentTime');

    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialize Sidebar Toggle
function initSidebarToggle() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
}

// Initialize Dropdowns
function initDropdowns() {
    document.querySelectorAll('.dropdown-cms').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-cms').forEach(d => d.classList.remove('show'));
    });
}

// Render Department Cards (for departments.html)
function renderDepartmentCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const iconMap = {
        cit: 'bi-pc-display',
        civil: 'bi-building',
        electrical: 'bi-lightning-charge',
        electronics: 'bi-cpu',
        mechanical: 'bi-gear'
    };

    const html = PRINCIPAL_DATA.departments.map(dept => `
        <div class="col-lg-4 col-md-6">
            <div class="department-card ${dept.id}">
                <div class="dept-icon"><i class="bi ${iconMap[dept.id] || 'bi-building'}"></i></div>
                <h4>${dept.name}</h4>
                <p class="hod-name">HOD: <span class="highlight-name">${dept.hod}</span></p>
                <div class="dept-stats">
                    <div class="dept-stat">
                        <div class="value">${dept.students}</div>
                        <div class="label">Students</div>
                    </div>
                    <div class="dept-stat">
                        <div class="value">${dept.teachers}</div>
                        <div class="label">Teachers</div>
                    </div>
                    <div class="dept-stat">
                        <div class="value">${dept.attendance}%</div>
                        <div class="label">Attendance</div>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted fs-sm">Pass Rate</span>
                        <span class="fw-bold text-success">${dept.passRate}%</span>
                    </div>
                    <div class="progress-cms">
                        <div class="progress-bar-cms success" style="width: ${dept.passRate}%"></div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

// Render Department Table (for dashboard.html)
function renderDepartmentTable(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = PRINCIPAL_DATA.departments.map(dept => `
        <tr>
            <td><strong>${dept.code}</strong></td>
            <td><span class="highlight-name">${dept.hod}</span></td>
            <td>${dept.students}</td>
            <td>${dept.teachers}</td>
            <td><span class="badge-cms badge-${dept.attendance >= 80 ? 'success' : 'warning'}">${dept.attendance}%</span></td>
            <td><span class="badge-cms badge-success">${dept.passRate}%</span></td>
        </tr>
    `).join('');

    container.innerHTML = html;
}

// Render HOD Cards (for staff.html)
function renderHODCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = PRINCIPAL_DATA.departments.map(dept => {
        const initials = dept.hod.split(' ').slice(-2).map(n => n[0]).join('').toUpperCase();
        return `
            <div class="staff-card">
                <div class="avatar avatar-xl">${initials}</div>
                <div class="name">${dept.hod}</div>
                <div class="designation">HOD / Senior Lecturer</div>
                <span class="department">${dept.code}</span>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

// Render Stats (dynamically update stat values)
function renderStats() {
    // Calculate totals from department data
    const totalStudents = PRINCIPAL_DATA.departments.reduce((sum, d) => sum + d.students, 0);
    const totalTeachers = PRINCIPAL_DATA.departments.reduce((sum, d) => sum + d.teachers, 0);
    const avgAttendance = Math.round(PRINCIPAL_DATA.departments.reduce((sum, d) => sum + d.attendance, 0) / PRINCIPAL_DATA.departments.length);

    // Update stat values if elements exist
    const statMappings = {
        'statTotalStudents': totalStudents.toLocaleString(),
        'statTotalTeachers': totalTeachers,
        'statTotalStaff': PRINCIPAL_DATA.staff.total,
        'statDepartments': PRINCIPAL_DATA.departments.length,
        'statOverallAttendance': avgAttendance + '%'
    };

    Object.entries(statMappings).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
}

// Render Activity Feed
function renderActivityFeed(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const iconMap = {
        attendance: 'bi-calendar-check',
        notice: 'bi-megaphone',
        approval: 'bi-check-circle',
        event: 'bi-calendar-event'
    };

    const html = PRINCIPAL_DATA.activities.map(activity => `
        <li class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="bi ${iconMap[activity.type]}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </li>
    `).join('');

    container.innerHTML = html;
}

// Render Staff List
function renderStaffList(containerId, filterDept = 'all') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Demo staff data
    const staffList = [
        { name: 'Dr. Asad Ullah', designation: 'HOD / Senior Lecturer', department: 'CIT', initials: 'AU' },
        { name: 'Mr. Shahid Mahmood', designation: 'Lecturer', department: 'CIT', initials: 'SM' },
        { name: 'Engr. Rashid Mehmood', designation: 'HOD / Associate Professor', department: 'CIVIL', initials: 'RM' },
        { name: 'Mr. Ahmed Khan', designation: 'Senior Lecturer', department: 'CIVIL', initials: 'AK' },
        { name: 'Engr. Kamran Saeed', designation: 'HOD / Senior Lecturer', department: 'ELECTRICAL', initials: 'KS' },
        { name: 'Mr. Imran Ali', designation: 'Lecturer', department: 'ELECTRICAL', initials: 'IA' },
        { name: 'Engr. Farhan Ahmed', designation: 'HOD / Lecturer', department: 'ELECTRONICS', initials: 'FA' },
        { name: 'Engr. Tariq Mahmood', designation: 'HOD / Senior Lecturer', department: 'MECHANICAL', initials: 'TM' }
    ];

    const filtered = filterDept === 'all' ? staffList : staffList.filter(s => s.department === filterDept);

    const html = filtered.map(staff => `
        <div class="staff-card">
            <div class="avatar avatar-xl">${staff.initials}</div>
            <div class="name">${staff.name}</div>
            <div class="designation">${staff.designation}</div>
            <span class="department">${staff.department}</span>
        </div>
    `).join('');

    container.innerHTML = html;
}

// Render Announcements
function renderAnnouncements(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = PRINCIPAL_DATA.announcements.map(notice => `
        <div class="notice-card ${notice.urgent ? 'urgent' : notice.category}">
            <div class="notice-header">
                <span class="notice-title">${notice.title}</span>
                <span class="notice-date">${formatDate(notice.date)}</span>
            </div>
            <div class="notice-content">${notice.content}</div>
        </div>
    `).join('');

    container.innerHTML = html;
}

// Format Date Helper
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Search/Filter Functions
function filterStaff(searchTerm, department) {
    // Implementation for staff filtering
    console.log('Filtering staff:', searchTerm, department);
}

function filterStudents(searchTerm, department, year) {
    // Implementation for student filtering
    console.log('Filtering students:', searchTerm, department, year);
}

// Announcement Form Handler
function handleAnnouncementSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const title = form.querySelector('[name="title"]').value;
    const content = form.querySelector('[name="content"]').value;
    const category = form.querySelector('[name="category"]:checked')?.value || 'general';

    // Add new announcement
    PRINCIPAL_DATA.announcements.unshift({
        id: Date.now(),
        title,
        content,
        category,
        date: new Date().toISOString().split('T')[0],
        urgent: category === 'urgent'
    });

    // Re-render announcements
    renderAnnouncements('announcementsList');

    // Reset form
    form.reset();

    // Show success message
    showToast('Announcement published successfully!', 'success');
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert-cms alert-${type} animate-fade-in-down`;
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `<i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'}"></i><span>${message}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Export functions for use in pages
window.PrincipalModule = {
    init: initPrincipalDashboard,
    data: PRINCIPAL_DATA,
    renderDepartmentCards,
    renderDepartmentTable,
    renderHODCards,
    renderStats,
    renderActivityFeed,
    renderStaffList,
    renderAnnouncements,
    handleAnnouncementSubmit,
    filterStaff,
    filterStudents,
    showToast
};
