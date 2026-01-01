const form = document.getElementById("seatForm");
const table = document.getElementById("seatTable");

form.addEventListener("submit", function(e){
    e.preventDefault();

    let row = `
    <tr>
        <td>${session.value}</td>
        <td>${class.value}</td>
        <td>${room.value}</td>
        <td>${fromRoll.value}</td>
        <td>${toRoll.value}</td>
        <td>${seats.value}</td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="this.closest('tr').remove()">Delete</button>
        </td>
    </tr>
    `;

    table.innerHTML += row;
    form.reset();
});