/**
 * Library Management Module - CMS
 * Handles all library operations: books, issues, returns, members, fines
 */

const LibraryModule = {
    // Mock Book Database
    books: [
        { id: 'B001', title: 'Database Systems', author: 'C.J. Date', isbn: '978-0321197849', category: 'Computer Science', copies: 5, available: 3, shelf: 'A1' },
        { id: 'B002', title: 'C++ Programming', author: 'Bjarne Stroustrup', isbn: '978-0321563842', category: 'Computer Science', copies: 8, available: 5, shelf: 'A2' },
        { id: 'B003', title: 'Web Development', author: 'Jon Duckett', isbn: '978-1118008188', category: 'Computer Science', copies: 6, available: 2, shelf: 'A3' },
        { id: 'B004', title: 'Data Structures', author: 'Mark Allen Weiss', isbn: '978-0132847377', category: 'Computer Science', copies: 10, available: 7, shelf: 'A4' },
        { id: 'B005', title: 'Networking Essentials', author: 'Jeffrey S. Beasley', isbn: '978-0789758743', category: 'Networking', copies: 4, available: 1, shelf: 'B1' },
        { id: 'B006', title: 'Civil Engineering Handbook', author: 'W.F. Chen', isbn: '978-0849309588', category: 'Civil Engineering', copies: 3, available: 3, shelf: 'C1' },
        { id: 'B007', title: 'Electrical Circuits', author: 'Charles Alexander', isbn: '978-0073380575', category: 'Electrical', copies: 6, available: 4, shelf: 'D1' },
        { id: 'B008', title: 'Digital Logic Design', author: 'Morris Mano', isbn: '978-0132774208', category: 'Electronics', copies: 5, available: 2, shelf: 'E1' },
        { id: 'B009', title: 'Thermodynamics', author: 'Yunus Cengel', isbn: '978-0073398174', category: 'Mechanical', copies: 4, available: 4, shelf: 'F1' },
        { id: 'B010', title: 'English Grammar', author: 'Raymond Murphy', isbn: '978-0521189392', category: 'General', copies: 12, available: 10, shelf: 'G1' },
        { id: 'B011', title: 'Applied Mathematics', author: 'Erwin Kreyszig', isbn: '978-0470458365', category: 'Mathematics', copies: 8, available: 5, shelf: 'G2' },
        { id: 'B012', title: 'Operating Systems', author: 'Abraham Silberschatz', isbn: '978-1118063330', category: 'Computer Science', copies: 5, available: 3, shelf: 'A5' }
    ],

    // Mock Issues Database
    issues: [
        { id: 'I001', bookId: 'B001', bookTitle: 'Database Systems', studentId: '24-CIT-101', studentName: 'Ahmad Ali', issueDate: '2025-12-20', dueDate: '2026-01-03', status: 'active' },
        { id: 'I002', bookId: 'B002', bookTitle: 'C++ Programming', studentId: '24-CIT-105', studentName: 'Sara Khan', issueDate: '2025-12-18', dueDate: '2026-01-01', status: 'active' },
        { id: 'I003', bookId: 'B003', bookTitle: 'Web Development', studentId: '23-CIT-102', studentName: 'Usman Ali', issueDate: '2025-12-10', dueDate: '2025-12-24', status: 'overdue' },
        { id: 'I004', bookId: 'B004', bookTitle: 'Data Structures', studentId: '24-CIVIL-101', studentName: 'Fatima Khan', issueDate: '2025-12-15', dueDate: '2025-12-29', status: 'overdue' },
        { id: 'I005', bookId: 'B005', bookTitle: 'Networking Essentials', studentId: '23-ELEC-101', studentName: 'Hassan Raza', issueDate: '2025-12-16', dueDate: '2025-12-30', status: 'overdue' }
    ],

    // Mock Members Database
    members: [
        { id: 'M001', studentId: '24-CIT-101', name: 'Muhammad Ali', department: 'CIT', semester: 1, memberSince: '2024-09-01', booksIssued: 2, status: 'active' },
        { id: 'M002', studentId: '24-CIT-105', name: 'Sara Khan', department: 'CIT', semester: 1, memberSince: '2024-09-01', booksIssued: 1, status: 'active' },
        { id: 'M003', studentId: '23-CIT-102', name: 'Usman Ali', department: 'CIT', semester: 3, memberSince: '2023-09-01', booksIssued: 1, status: 'active' },
        { id: 'M004', studentId: '24-CIVIL-101', name: 'Fatima Khan', department: 'Civil', semester: 1, memberSince: '2024-09-01', booksIssued: 1, status: 'active' },
        { id: 'M005', studentId: '23-ELEC-101', name: 'Hassan Raza', department: 'Electrical', semester: 3, memberSince: '2023-09-01', booksIssued: 1, status: 'active' },
        { id: 'M006', studentId: '24-MECH-101', name: 'Bilal Ahmed', department: 'Mechanical', semester: 1, memberSince: '2024-09-01', booksIssued: 0, status: 'active' },
        { id: 'M007', studentId: '23-CIT-103', name: 'Ayesha Malik', department: 'CIT', semester: 3, memberSince: '2023-09-01', booksIssued: 0, status: 'active' }
    ],

    // Mock Fines Database
    fines: [
        { id: 'F001', studentId: '23-CIT-102', studentName: 'Usman Ali', bookTitle: 'Web Development', daysOverdue: 8, amount: 80, status: 'pending' },
        { id: 'F002', studentId: '24-CIVIL-101', studentName: 'Fatima Khan', bookTitle: 'Data Structures', daysOverdue: 3, amount: 30, status: 'pending' },
        { id: 'F003', studentId: '23-ELEC-101', studentName: 'Hassan Raza', bookTitle: 'Networking Essentials', daysOverdue: 2, amount: 20, status: 'pending' },
        { id: 'F004', studentId: '24-CIT-105', studentName: 'Sara Khan', bookTitle: 'Database Systems', daysOverdue: 5, amount: 50, status: 'paid', paidDate: '2025-12-20' }
    ],

    // Fine rate per day
    fineRate: 10,

    // Initialize module
    init() {
        this.setupEventListeners();
        this.updateStats();
    },

    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('collapsed');
            });
        }

        // Dropdowns
        document.querySelectorAll('.dropdown-cms').forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });
        });

        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-cms').forEach(d => d.classList.remove('show'));
        });
    },

    // Update user info from session
    updateUserInfo() {
        const user = getCurrentUser();
        if (user) {
            const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const userName = document.getElementById('userName');
            const navUserName = document.getElementById('navUserName');
            const navUserRole = document.getElementById('navUserRole');

            if (userName) userName.textContent = user.name;
            if (navUserName) navUserName.textContent = user.name;
            if (navUserRole) navUserRole.textContent = user.id;

            document.querySelectorAll('#userAvatar, #navAvatar').forEach(el => {
                if (el) el.textContent = initials;
            });
        }
    },

    // Statistics
    getStats() {
        const totalBooks = this.books.reduce((sum, book) => sum + book.copies, 0);
        const availableBooks = this.books.reduce((sum, book) => sum + book.available, 0);
        const issuedBooks = totalBooks - availableBooks;
        const overdueBooks = this.issues.filter(i => i.status === 'overdue').length;
        const totalMembers = this.members.filter(m => m.status === 'active').length;
        const totalFinesPending = this.fines.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);

        return {
            totalBooks,
            availableBooks,
            issuedBooks,
            overdueBooks,
            totalMembers,
            totalFinesPending,
            bookTitles: this.books.length
        };
    },

    updateStats() {
        const stats = this.getStats();
        // Update stat cards if they exist on the page
        const elements = {
            'totalBooks': stats.bookTitles,
            'booksIssued': stats.issuedBooks,
            'overdueBooks': stats.overdueBooks,
            'activeMembers': stats.totalMembers,
            'pendingFines': `Rs. ${stats.totalFinesPending}`
        };

        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = elements[id];
        });
    },

    // Book operations
    searchBooks(query) {
        const q = query.toLowerCase();
        return this.books.filter(book =>
            book.title.toLowerCase().includes(q) ||
            book.author.toLowerCase().includes(q) ||
            book.isbn.includes(q) ||
            book.id.toLowerCase().includes(q)
        );
    },

    filterBooksByCategory(category) {
        if (category === 'all') return this.books;
        return this.books.filter(book => book.category === category);
    },

    getBookById(id) {
        return this.books.find(book => book.id === id);
    },

    // Issue operations
    issueBook(bookId, studentId) {
        const book = this.getBookById(bookId);
        const member = this.members.find(m => m.studentId === studentId);

        if (!book || book.available < 1) {
            return { success: false, message: 'Book not available' };
        }

        if (!member) {
            return { success: false, message: 'Member not found' };
        }

        const issueDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 14 days loan period

        const newIssue = {
            id: 'I' + String(this.issues.length + 1).padStart(3, '0'),
            bookId: book.id,
            bookTitle: book.title,
            studentId: member.studentId,
            studentName: member.name,
            issueDate: issueDate.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0],
            status: 'active'
        };

        this.issues.push(newIssue);
        book.available--;
        member.booksIssued++;

        return { success: true, message: 'Book issued successfully', issue: newIssue };
    },

    // Return operations
    returnBook(issueId) {
        const issue = this.issues.find(i => i.id === issueId);
        if (!issue) {
            return { success: false, message: 'Issue record not found' };
        }

        const book = this.getBookById(issue.bookId);
        const member = this.members.find(m => m.studentId === issue.studentId);

        // Calculate fine if overdue
        const today = new Date();
        const dueDate = new Date(issue.dueDate);
        let fine = 0;

        if (today > dueDate) {
            const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
            fine = daysOverdue * this.fineRate;

            // Add fine record
            this.fines.push({
                id: 'F' + String(this.fines.length + 1).padStart(3, '0'),
                studentId: issue.studentId,
                studentName: issue.studentName,
                bookTitle: issue.bookTitle,
                daysOverdue,
                amount: fine,
                status: 'pending'
            });
        }

        // Update records
        issue.status = 'returned';
        issue.returnDate = today.toISOString().split('T')[0];
        if (book) book.available++;
        if (member) member.booksIssued--;

        return {
            success: true,
            message: fine > 0 ? `Book returned. Fine: Rs. ${fine}` : 'Book returned successfully',
            fine
        };
    },

    // Fine operations
    collectFine(fineId) {
        const fine = this.fines.find(f => f.id === fineId);
        if (!fine) {
            return { success: false, message: 'Fine record not found' };
        }

        fine.status = 'paid';
        fine.paidDate = new Date().toISOString().split('T')[0];

        return { success: true, message: 'Fine collected successfully' };
    },

    // Render functions
    renderBooksTable(containerId, books = this.books) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = books.map(book => `
            <tr>
                <td><strong>${book.id}</strong></td>
                <td>
                    <div>
                        <strong>${book.title}</strong>
                        <div class="text-muted fs-sm">${book.author}</div>
                    </div>
                </td>
                <td><span class="badge-cms badge-info">${book.category}</span></td>
                <td>${book.isbn}</td>
                <td>${book.shelf}</td>
                <td>
                    <span class="${book.available > 0 ? 'text-success' : 'text-danger'}">${book.available}</span>/${book.copies}
                </td>
                <td>
                    <span class="badge-cms ${book.available > 0 ? 'badge-success' : 'badge-danger'}">
                        ${book.available > 0 ? 'Available' : 'All Issued'}
                    </span>
                </td>
                <td>
                    <button class="btn-cms btn-ghost btn-sm" onclick="LibraryModule.viewBook('${book.id}')">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn-cms btn-ghost btn-sm" onclick="LibraryModule.editBook('${book.id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        container.innerHTML = html;
    },

    renderIssuesTable(containerId, issues = this.issues.filter(i => i.status !== 'returned')) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = issues.map(issue => {
            const isOverdue = issue.status === 'overdue';
            return `
                <tr>
                    <td><strong>${issue.id}</strong></td>
                    <td>${issue.bookTitle}</td>
                    <td>
                        <div>
                            <strong>${issue.studentName}</strong>
                            <div class="text-muted fs-sm">${issue.studentId}</div>
                        </div>
                    </td>
                    <td>${issue.issueDate}</td>
                    <td>${issue.dueDate}</td>
                    <td>
                        <span class="badge-cms ${isOverdue ? 'badge-danger' : 'badge-success'}">
                            ${isOverdue ? 'Overdue' : 'Active'}
                        </span>
                    </td>
                    <td>
                        <button class="btn-cms btn-primary btn-sm" onclick="LibraryModule.processReturn('${issue.id}')">
                            Return
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        container.innerHTML = html;
    },

    renderMembersTable(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.members.map(member => `
            <tr>
                <td><strong>${member.studentId}</strong></td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <div class="avatar avatar-sm">${member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                        <strong>${member.name}</strong>
                    </div>
                </td>
                <td><span class="badge-cms badge-primary">${member.department}</span></td>
                <td>Semester ${member.semester}</td>
                <td>${member.booksIssued}</td>
                <td><span class="badge-cms badge-success">${member.status}</span></td>
                <td>
                    <button class="btn-cms btn-ghost btn-sm" onclick="LibraryModule.viewMember('${member.id}')">
                        <i class="bi bi-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        container.innerHTML = html;
    },

    renderFinesTable(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const pendingFines = this.fines.filter(f => f.status === 'pending');
        const html = pendingFines.map(fine => `
            <tr>
                <td><strong>${fine.id}</strong></td>
                <td>
                    <div>
                        <strong>${fine.studentName}</strong>
                        <div class="text-muted fs-sm">${fine.studentId}</div>
                    </div>
                </td>
                <td>${fine.bookTitle}</td>
                <td><span class="text-danger">${fine.daysOverdue} days</span></td>
                <td><strong class="text-danger">Rs. ${fine.amount}</strong></td>
                <td>
                    <button class="btn-cms btn-success btn-sm" onclick="LibraryModule.collectFineUI('${fine.id}')">
                        <i class="bi bi-check"></i> Collect
                    </button>
                </td>
            </tr>
        `).join('');

        container.innerHTML = html || '<tr><td colspan="6" class="text-center text-muted py-4">No pending fines</td></tr>';
    },

    // UI Action handlers
    viewBook(bookId) {
        const book = this.getBookById(bookId);
        if (book) {
            alert(`Book Details:\n\nTitle: ${book.title}\nAuthor: ${book.author}\nISBN: ${book.isbn}\nCategory: ${book.category}\nShelf: ${book.shelf}\nAvailable: ${book.available}/${book.copies}`);
        }
    },

    editBook(bookId) {
        alert('Edit book functionality - would open modal form');
    },

    viewMember(memberId) {
        const member = this.members.find(m => m.id === memberId);
        if (member) {
            alert(`Member Details:\n\nName: ${member.name}\nID: ${member.studentId}\nDepartment: ${member.department}\nBooks Issued: ${member.booksIssued}`);
        }
    },

    processReturn(issueId) {
        if (confirm('Confirm book return?')) {
            const result = this.returnBook(issueId);
            alert(result.message);
            location.reload();
        }
    },

    collectFineUI(fineId) {
        if (confirm('Confirm fine collection?')) {
            const result = this.collectFine(fineId);
            alert(result.message);
            location.reload();
        }
    },

    // Report generation
    generateReport(type) {
        const stats = this.getStats();
        let report = '';

        switch (type) {
            case 'summary':
                report = `
Library Summary Report
Generated: ${new Date().toLocaleDateString()}
========================
Total Book Titles: ${stats.bookTitles}
Total Copies: ${stats.totalBooks}
Currently Issued: ${stats.issuedBooks}
Available: ${stats.availableBooks}
Overdue: ${stats.overdueBooks}
Active Members: ${stats.totalMembers}
Pending Fines: Rs. ${stats.totalFinesPending}
                `;
                break;
            case 'overdue':
                const overdueIssues = this.issues.filter(i => i.status === 'overdue');
                report = `
Overdue Books Report
Generated: ${new Date().toLocaleDateString()}
========================
${overdueIssues.map(i => `${i.bookTitle} - ${i.studentName} (Due: ${i.dueDate})`).join('\n')}
                `;
                break;
        }

        return report;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    LibraryModule.init();
    LibraryModule.updateUserInfo();
});
