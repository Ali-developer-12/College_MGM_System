const photoInput = document.getElementById("photo");
const profilePic = document.getElementById("profilePic");

photoInput.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(){
            profilePic.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById("profileForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Profile Updated Successfully!");
});