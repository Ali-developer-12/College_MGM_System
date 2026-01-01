const form = document.getElementById("idForm");
const cardArea = document.getElementById("cardArea");
const printBtn = document.getElementById("printBtn");

form.addEventListener("submit", function(e){
    e.preventDefault();

    cardName.innerText = name.value;
    cardRoll.innerText = roll.value;
    cardClass.innerText = class.value;
    cardDept.innerText = department.value;

    const file = photo.files[0];
    const reader = new FileReader();
    reader.onload = function(){
        cardPhoto.src = reader.result;
    }
    reader.readAsDataURL(file);

    cardArea.classList.remove("d-none");
    printBtn.classList.remove("d-none");
});