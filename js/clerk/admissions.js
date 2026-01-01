let admissionNo = 1001;
const form = document.getElementById("admissionForm");
const table = document.getElementById("admissionTable");

form.addEventListener("submit", function(e){
    e.preventDefault();

    let row = `
    <tr>
        <td>ADM-${admissionNo++}</td>
        <td>${name.value}</td>
        <td>${father.value}</td>
        <td>${roll.value}</td>
        <td>${class.value}</td>
        <td>${department.value}</td>
        <td>${admissionDate.value}</td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="this.closest('tr').remove()">Delete</button>
        </td>
    </tr>
    `;

    table.innerHTML += row;
    form.reset();
});