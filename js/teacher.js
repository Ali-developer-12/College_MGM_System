/**
 * Teacher Module Logic - CMS
 */

// Global state for Teacher Module
const TeacherModule = {
    attendanceData: {},
    students: [
        { id: '24-CIT-101', name: 'Muhammad Ali', photo: null },
        { id: '24-CIT-102', name: 'Fatima Khan', photo: null },
        { id: '24-CIT-103', name: 'Ahmad Raza', photo: null },
        { id: '24-CIT-104', name: 'Sara Ahmed', photo: null },
        { id: '24-CIT-105', name: 'Usman Tariq', photo: null },
        { id: '24-CIT-106', name: 'Ayesha Bibi', photo: null },
        { id: '24-CIT-107', name: 'Hassan Ali', photo: null },
        { id: '24-CIT-108', name: 'Zainab Fatima', photo: null },
        { id: '24-CIT-109', name: 'Bilal Ahmad', photo: null },
        { id: '24-CIT-110', name: 'Maryam Noor', photo: null },
        { id: '24-CIT-111', name: 'Imran Khan', photo: null },
        { id: '24-CIT-112', name: 'Sana Malik', photo: null },
    ],

    init: function () {
        this.updateUserInfo();
        this.initEventListeners();

        // Page specific initialization
        if (document.getElementById('studentGrid')) {
            this.loadAttendanceSheet();
        }
        if (document.getElementById('marksTableBody')) {
            this.loadMarksSheet();
        }
        if (document.getElementById('currentDate')) {
            this.startDashboardClock();
        }
    },

    updateUserInfo: function () {
        const user = getCurrentUser();
        if (user) {
            const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            const els = {
                'userName': user.name.split(' ').slice(0, 2).join(' '),
                'navUserName': user.name,
                'welcomeName': user.name.split(' ')[0] + ' ' + (user.name.split(' ')[1] || ''),
                'navUserRole': user.id
            };

            for (let id in els) {
                const el = document.getElementById(id);
                if (el) el.textContent = els[id];
            }

            document.querySelectorAll('#userAvatar, #navAvatar').forEach(el => el.textContent = initials);
        }
    },

    initEventListeners: function () {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                sidebar.classList.toggle('collapsed');
            });
        }

        if (sidebarOverlay && sidebar) {
            sidebarOverlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
            });
        }

        document.querySelectorAll('.dropdown-cms').forEach(d => {
            d.addEventListener('click', e => {
                e.stopPropagation();
                d.classList.toggle('show');
            });
        });

        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-cms').forEach(d => d.classList.remove('show'));
        });
    },

    // Attendance Management
    loadAttendanceSheet: function () {
        const grid = document.getElementById('studentGrid');
        if (!grid) return;

        grid.innerHTML = this.students.map(s => `
            <div class="col-md-4 col-lg-3 mb-3">
                <div class="attendance-card ${this.attendanceData[s.id] || ''}" id="card-${s.id}" onclick="TeacherModule.toggleAttendance('${s.id}')">
                    <div class="d-flex align-items-center gap-3">
                        <div class="avatar avatar-md">${s.name.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                            <h6 class="mb-0 text-truncate highlight-name" style="max-width: 150px;">${s.name}</h6>
                            <small class="text-muted">${s.id}</small>
                        </div>
                    </div>
                    <div class="attendance-status">
                        <span class="status-btn present ${this.attendanceData[s.id] === 'present' ? 'active' : ''}">P</span>
                        <span class="status-btn absent ${this.attendanceData[s.id] === 'absent' ? 'active' : ''}">A</span>
                        <span class="status-btn late ${this.attendanceData[s.id] === 'late' ? 'active' : ''}">L</span>
                    </div>
                </div>
            </div>
        `).join('');

        this.attendanceData = {};
        this.updateAttendanceSummary();
    },

    loadStudents: function () {
        this.loadAttendanceSheet();
    },

    toggleAttendance: function (id) {
        const current = this.attendanceData[id];
        let next = 'present';

        // Workflow Optimization: If already present, next is absent (for quick adjustment after Mark All Present)
        // Order: Unmarked -> Present -> Absent -> Late -> Unmarked
        if (current === 'present') next = 'absent';
        else if (current === 'absent') next = 'late';
        else if (current === 'late') next = '';

        this.markStatus(id, next);
    },

    markStatus: function (id, status) {
        this.attendanceData[id] = status;
        const card = document.getElementById('card-' + id);
        if (!card) return;

        card.className = 'attendance-card ' + (status || '');
        card.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.remove('active');
            if (status && btn.classList.contains(status)) btn.classList.add('active');
        });

        this.updateAttendanceSummary();
    },

    markAll: function (status) {
        this.students.forEach(s => this.markStatus(s.id, status));
    },

    resetAttendance: function () {
        this.students.forEach(s => {
            const card = document.getElementById('card-' + s.id);
            if (card) {
                card.className = 'attendance-card';
                card.querySelectorAll('.status-btn').forEach(btn => btn.classList.remove('active'));
            }
        });
        this.attendanceData = {};
        this.updateAttendanceSummary();
    },

    updateAttendanceSummary: function () {
        const present = Object.values(this.attendanceData).filter(v => v === 'present').length;
        const absent = Object.values(this.attendanceData).filter(v => v === 'absent').length;
        const late = Object.values(this.attendanceData).filter(v => v === 'late').length;
        const unmarked = this.students.length - present - absent - late;

        const maps = {
            'presentCount': present,
            'absentCount': absent,
            'lateCount': late,
            'unmarkedCount': unmarked,
            'totalCount': this.students.length
        };

        for (let id in maps) {
            const el = document.getElementById(id);
            if (el) el.textContent = maps[id];
        }

        // Update analytics if on analytics page
        if (document.getElementById('avgAttendance')) {
            this.updateAnalyticsPage();
        }
    },

    submitAttendance: function () {
        const unmarked = this.students.length - Object.keys(this.attendanceData).length;
        if (unmarked > 0) {
            alert(`Please mark attendance for all students. ${unmarked} students are unmarked.`);
            return;
        }

        const stats = Object.values(this.attendanceData).reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, { present: 0, absent: 0, late: 0 });

        alert(`✅ Attendance submitted successfully!\n\nPresent: ${stats.present}\nAbsent: ${stats.absent}\nLate: ${stats.late}`);
    },

    // Report Generation Logic
    generateReport: function () {
        const type = document.getElementById('reportType')?.value;
        const subject = document.getElementById('subject')?.value;
        const section = document.getElementById('section')?.value;
        const container = document.getElementById('reportOutput');

        if (!container) return;

        // Mock report data generation
        let html = `
            <div class="report-preview animate-fade-in">
                <div class="report-header">
                    <h2 class="mb-1">GCT Bhakkar - Performance Report</h2>
                    <p class="text-muted mb-0">${type === 'attendance' ? 'Student Attendance Record' : 'Internal Assessment Report'}</p>
                </div>
                <div class="report-meta">
                    <div><strong>Subject:</strong> ${subject}</div>
                    <div><strong>Class/Section:</strong> ${section}</div>
                    <div><strong>Instructor:</strong> ${getCurrentUser()?.name}</div>
                    <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                </div>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>${type === 'attendance' ? 'Total Classes' : 'Test Marks'}</th>
                            <th>${type === 'attendance' ? 'Present' : 'Total'}</th>
                            <th>${type === 'attendance' ? 'Percentage' : 'Grade'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.students.map(s => {
            const val = type === 'attendance' ? Math.floor(Math.random() * 20 + 80) + '%' : this.getGrade(Math.floor(Math.random() * 40 + 60), 100);
            return `
                                <tr>
                                    <td>${s.id}</td>
                                    <td>${s.name}</td>
                                    <td>${type === 'attendance' ? '24' : '100'}</td>
                                    <td>${type === 'attendance' ? Math.floor(Math.random() * 5 + 19) : Math.floor(Math.random() * 40 + 60)}</td>
                                    <td><span class="badge-cms ${type === 'marks' ? (val === 'F' ? 'badge-danger' : 'badge-success') : ''}">${val}</span></td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
                <div class="mt-5 text-end opacity-50 fst-italic">Generated via CMS - ${new Date().toLocaleString()}</div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('actionButtons').classList.remove('d-none');
    },

    printReport: function () {
        window.print();
    },

    // Analytics Page Logic
    updateAnalyticsPage: function () {
        // This would normally fetch real data
        const stats = {
            avgAttendance: 88,
            avgMarks: 72,
            passRate: 92,
            topStudents: this.students.slice(0, 3).map(s => ({ name: s.name, marks: Math.floor(Math.random() * 10 + 90) }))
        };

        const els = {
            'avgAttendance': stats.avgAttendance + '%',
            'avgMarks': stats.avgMarks + '%',
            'passRate': stats.passRate + '%',
            'presentBar': stats.avgAttendance + '%',
            'marksBar': stats.avgMarks + '%',
            'passBar': stats.passRate + '%'
        };

        for (let id in els) {
            const el = document.getElementById(id);
            if (el) {
                if (id.endsWith('Bar')) el.style.width = els[id];
                else el.textContent = els[id];
            }
        }
    },

    // Marks Management
    loadMarksSheet: function () {
        const tbody = document.getElementById('marksTableBody');
        if (!tbody) return;

        const totalMarks = parseInt(document.getElementById('totalMarks').value) || 50;
        const passMarks = parseInt(document.getElementById('passMarks').value) || 17;

        tbody.innerHTML = this.students.slice(0, 10).map((s, idx) => `
            <tr>
                <td>${idx + 1}</td>
                <td><code>${s.id}</code></td>
                <td><strong>${s.name}</strong></td>
                <td>
                    <input type="number" class="marks-input" id="marks-${s.id}" 
                           min="0" max="${totalMarks}" placeholder="0"
                           onchange="TeacherModule.updateGrade('${s.id}')">
                </td>
                <td><span class="badge-cms badge-secondary grade-badge" id="grade-${s.id}">-</span></td>
                <td><span class="badge-cms badge-secondary" id="status-${s.id}">-</span></td>
            </tr>
        `).join('');
        this.updateMarksStats();
    },

    getGrade: function (marks, total) {
        const percent = (marks / total) * 100;
        if (percent >= 90) return 'A+';
        if (percent >= 80) return 'A';
        if (percent >= 70) return 'B+';
        if (percent >= 60) return 'B';
        if (percent >= 50) return 'C+';
        if (percent >= 40) return 'C';
        if (percent >= 33) return 'D';
        return 'F';
    },

    updateGrade: function (id) {
        const total = parseInt(document.getElementById('totalMarks').value) || 50;
        const pass = parseInt(document.getElementById('passMarks').value) || 17;
        const input = document.getElementById('marks-' + id);
        const gradeEl = document.getElementById('grade-' + id);
        const statusEl = document.getElementById('status-' + id);
        const marks = parseInt(input.value) || 0;

        const grade = this.getGrade(marks, total);
        const passed = marks >= pass;

        gradeEl.textContent = grade;
        gradeEl.className = 'badge-cms grade-badge ' + (passed ? 'badge-success' : 'badge-danger');
        statusEl.textContent = passed ? 'Pass' : 'Fail';
        statusEl.className = 'badge-cms ' + (passed ? 'badge-success' : 'badge-danger');
        input.className = 'marks-input ' + (passed ? 'pass' : 'fail');

        this.updateMarksStats();
    },

    updateMarksStats: function () {
        const total = parseInt(document.getElementById('totalMarks').value) || 50;
        const pass = parseInt(document.getElementById('passMarks').value) || 17;
        let sum = 0, count = 0, passCount = 0, failCount = 0;

        this.students.slice(0, 10).forEach(s => {
            const input = document.getElementById('marks-' + s.id);
            if (input && input.value !== '') {
                const marks = parseInt(input.value) || 0;
                sum += marks;
                count++;
                if (marks >= pass) passCount++;
                else failCount++;
            }
        });

        const avgEl = document.getElementById('classAverage');
        if (avgEl) avgEl.textContent = count > 0 ? (sum / count).toFixed(1) + ' / ' + total : '-';

        const pCountEl = document.getElementById('passCount');
        if (pCountEl) pCountEl.textContent = passCount;

        const fCountEl = document.getElementById('failCount');
        if (fCountEl) fCountEl.textContent = failCount;
    },

    saveMarks: function () {
        const inputs = this.students.slice(0, 10).map(s => document.getElementById('marks-' + s.id));
        const allFilled = inputs.every(input => input && input.value !== '');

        if (!allFilled) {
            alert('Please enter marks for all students.');
            return;
        }

        alert('✅ Marks saved successfully!');
    },

    // Clock
    startDashboardClock: function () {
        const updateTime = () => {
            const now = new Date();
            const dateEl = document.getElementById('currentDate');
            const timeEl = document.getElementById('currentTime');

            if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            if (timeEl) timeEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        };
        updateTime();
        setInterval(updateTime, 60000);
    }
};

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => TeacherModule.init());
