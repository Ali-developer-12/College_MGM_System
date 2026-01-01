const form = document.getElementById("certForm");
const cert = document.getElementById("certificate");
const text = document.getElementById("certText");
const certDate = document.getElementById("certDate");

form.addEventListener("submit", function(e){
    e.preventDefault();

    let content = `
        This is to certify that <strong>${name.value}</strong>,
        Roll Number <strong>${roll.value}</strong>,
        is a bonafide student of <strong>${class.value}</strong>
        in the <strong>${department.value}</strong> department of this institution.
        This <strong>${type.value}</strong> is issued on the request of the student
        for official use.
    `;

    text.innerHTML = content;
    certDate.innerText = date.value;
    cert.classList.remove("d-none");
});