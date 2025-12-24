/**
 * Authentication System - CMS
 */

// Demo Users Database
const USERS_DB = {
    // Students
    '24-CIT-101': {
        id: '24-CIT-101', name: 'Muhammad Ali', role: 'student',
        technology: 'CIT', shift: 'Evening', year: 2024, semester: 1, section: 'A',
        email: 'ali@student.gctb.edu', phone: '0300-1234567',
        password: 'student123', dashboardUrl: 'pages/student/dashboard.html'
    },
    '24-CIT-102': {
        id: '24-CIT-102', name: 'Fatima Khan', role: 'student',
        technology: 'CIT', shift: 'Evening', year: 2024, semester: 1,
        password: 'student123', dashboardUrl: 'pages/student/dashboard.html'
    },
    '24-CIVIL-101': {
        id: '24-CIVIL-101', name: 'Hassan Raza', role: 'student',
        technology: 'CIVIL', shift: 'Morning', year: 2024, semester: 1,
        password: 'student123', dashboardUrl: 'pages/student/dashboard.html'
    },
    '23-ELEC-101': {
        id: '23-ELEC-101', name: 'Usman Tariq', role: 'student',
        technology: 'ELECTRICAL', shift: 'Morning', year: 2023, semester: 3,
        password: 'student123', dashboardUrl: 'pages/student/dashboard.html'
    },

    // Teachers
    'T-CIT-001': {
        id: 'T-CIT-001', name: 'Mr. Shahid Mahmood', role: 'teacher',
        technology: 'CIT', designation: 'Lecturer',
        subjects: ['Programming Fundamentals', 'Database Systems', 'Web Development'],
        password: 'teacher123', dashboardUrl: 'pages/teacher/dashboard.html'
    },
    'T-CIVIL-001': {
        id: 'T-CIVIL-001', name: 'Mr. Ahmed Khan', role: 'teacher',
        technology: 'CIVIL', designation: 'Senior Lecturer',
        password: 'teacher123', dashboardUrl: 'pages/teacher/dashboard.html'
    },
    'T-ELEC-001': {
        id: 'T-ELEC-001', name: 'Mr. Imran Ali', role: 'teacher',
        technology: 'ELECTRICAL', designation: 'Lecturer',
        password: 'teacher123', dashboardUrl: 'pages/teacher/dashboard.html'
    },

    // HODs
    'HOD-CIT': {
        id: 'HOD-CIT', name: 'Dr. Asad Ullah', role: 'hod',
        technology: 'CIT', department: 'Computer Information Technology',
        password: 'hod123', dashboardUrl: 'pages/hod/dashboard.html'
    },
    'HOD-CIVIL': {
        id: 'HOD-CIVIL', name: 'Engr. Rashid Mehmood', role: 'hod',
        technology: 'CIVIL', department: 'Civil Technology',
        password: 'hod123', dashboardUrl: 'pages/hod/dashboard.html'
    },
    'HOD-ELEC': {
        id: 'HOD-ELEC', name: 'Engr. Kamran Saeed', role: 'hod',
        technology: 'ELECTRICAL', department: 'Electrical Technology',
        password: 'hod123', dashboardUrl: 'pages/hod/dashboard.html'
    },

    // Principal
    'PRINCIPAL': {
        id: 'PRINCIPAL', name: 'Dr. Muhammad Aslam', role: 'principal',
        designation: 'Principal', email: 'principal@gctb.edu.pk',
        password: 'admin123', dashboardUrl: 'pages/principal/dashboard.html'
    },

    // Clerk
    'CLK-001': {
        id: 'CLK-001', name: 'Mr. Nasir Abbas', role: 'clerk',
        designation: 'Senior Clerk', department: 'Administration',
        password: 'clerk123', dashboardUrl: 'pages/clerk/dashboard.html'
    },

    // Transport
    'TRN-001': {
        id: 'TRN-001', name: 'Mr. Javed Iqbal', role: 'transport',
        designation: 'Transport Manager',
        password: 'transport123', dashboardUrl: 'pages/transport/dashboard.html'
    },

    // Library
    'LIB-001': {
        id: 'LIB-001', name: 'Mr. Khalid Mehmood', role: 'library',
        designation: 'Librarian',
        password: 'library123', dashboardUrl: 'pages/library/dashboard.html'
    }
};

function authenticateUser(collegeId, password) {
    const normalizedId = collegeId.toUpperCase();
    const user = USERS_DB[normalizedId];

    if (!user) {
        return { success: false, message: 'User not found. Please check your College ID.' };
    }

    if (user.password !== password) {
        return { success: false, message: 'Incorrect password. Please try again.' };
    }

    const userSession = { ...user };
    delete userSession.password;

    return { success: true, message: 'Login successful', user: userSession };
}

function getCurrentUser() {
    const session = localStorage.getItem('cmsSession') || sessionStorage.getItem('cmsSession');
    if (!session) return null;
    try {
        return JSON.parse(session).user;
    } catch (e) {
        return null;
    }
}

function isAuthenticated() {
    return getCurrentUser() !== null;
}

function logout() {
    localStorage.removeItem('cmsSession');
    sessionStorage.removeItem('cmsSession');
    window.location.href = getBasePath() + 'index.html';
}

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
        const subDirs = path.split('/pages/')[1].split('/').length - 1;
        return '../'.repeat(subDirs + 1);
    }
    return './';
}

function protectPage(allowedRoles = []) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = getBasePath() + 'index.html';
        return false;
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        window.location.href = getBasePath() + user.dashboardUrl;
        return false;
    }
    return true;
}

function getRoleDisplayName(role) {
    const roles = {
        'student': 'Student', 'teacher': 'Teacher', 'hod': 'Head of Department',
        'principal': 'Principal', 'clerk': 'Office Staff',
        'transport': 'Transport Admin', 'library': 'Library Admin'
    };
    return roles[role] || 'User';
}

function getTechnologyName(code) {
    const technologies = {
        'CIT': 'Computer Information Technology',
        'CIVIL': 'Civil Technology',
        'ELECTRICAL': 'Electrical Technology',
        'ELECTRONICS': 'Electronics Technology',
        'MECHANICAL': 'Mechanical Technology'
    };
    return technologies[code] || code;
}
