function saveProfile(){
alert("Profile Updated Successfully!");
bootstrap.Modal.getInstance(profileModal).hide();
}

function updateTime(){
let d=new Date();
let opt={weekday:'long',year:'numeric',month:'long',day:'numeric'};
datetime.innerText=d.toLocaleDateString(undefined,opt)+' '+d.toLocaleTimeString();
}
updateTime();
setInterval(updateTime,1000);