const total = document.getElementById("total");
const paid = document.getElementById("paid");
const due = document.getElementById("due");
const form = document.getElementById("feeForm");
const table = document.getElementById("feeTable");

paid.addEventListener("input", calculateDue);
total.addEventListener("input", calculateDue);

function calculateDue(){
    due.value = total.value - paid.value;
}

form.addEventListener("submit", function(e){
    e.preventDefault();

    let row = `
    <tr>
        <td>${name.value}</td>
        <td>${roll.value}</td>
        <td>${class.value}</td>
        <td>${type.value}</td>
        <td>${total.value}</td>
        <td>${paid.value}</td>
        <td>${due.value}</td>
        <td>${date.value}</td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="this.closest('tr').remove()">Delete</button>
        </td>
    </tr>
    `;

    table.innerHTML += row;
    form.reset();
    due.value="";
});