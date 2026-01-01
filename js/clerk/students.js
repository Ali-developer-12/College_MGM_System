const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

form.addEventListener("submit", function(e){
    e.preventDefault();

    let row = `
    <tr>
        <td>${name.value}</td>
        <td>${roll.value}</td>
        <td>${class.value}</td>
        <td>${department.value}</td>
        <td>${admission.value}</td>
        <td>${phone.value}</td>
        <td>${email.value}</td>
        <td>
            <span class="badge ${status.value === 'Active' ? 'bg-success' : 'bg-danger'}">
                ${status.value}
            </span>
        </td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="this.closest('tr').remove()">Delete</button>
        </td>
    </tr>
    `;

    table.innerHTML += row;
    form.reset();
});