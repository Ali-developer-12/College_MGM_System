let attendanceRecords=[
{date:"2025-12-28",name:"Ahmed Ali",dept:"CIT",status:"Present"},
{date:"2025-12-28",name:"Bilal Khan",dept:"CIT",status:"Absent"},
];

function render(){
let html="";
attendanceRecords.forEach((r,i)=>{
let badgeClass=r.status=="Present"?"badge-present":"badge-absent";
html+=`<tr>
<td>${i+1}</td>
<td>${r.date}</td>
<td>${r.name}</td>
<td>${r.dept}</td>
<td><span class="badge ${badgeClass}">${r.status}</span></td>
<td>
<button class="btn btn-sm btn-warning me-1" onclick="editAttendance(${i})">Edit</button>
<button class="btn btn-sm btn-danger" onclick="deleteAttendance(${i})">Delete</button>
</td>
</tr>`;
});
attendanceTable.innerHTML=html;

// Update avg attendance
let total=attendanceRecords.length;
let present=attendanceRecords.filter(r=>r.status=="Present").length;
document.getElementById('avgAttendance').innerText = total>0?Math.round((present/total)*100)+'%':'0%';
document.getElementById('totalStudents').innerText=total;
}
render();

function saveAttendance(){
let data={
date:attDate.value,
name:attName.value,
dept:attDept.value,
status:attStatus.value
};
let idx=editIndex.value;
idx?attendanceRecords[idx]=data:attendanceRecords.push(data);
editIndex.value="";
bootstrap.Modal.getInstance(attendanceModal).hide();
render();
}

function editAttendance(i){
let r=attendanceRecords[i];
editIndex.value=i;
attDate.value=r.date;
attName.value=r.name;
attDept.value=r.dept;
attStatus.value=r.status;
new bootstrap.Modal(attendanceModal).show();
}

function deleteAttendance(i){
if(confirm("Delete this attendance record?")){
attendanceRecords.splice(i,1);
render();
}
}

function updateTime(){
const dt=new Date();
const options={weekday:'long', year:'numeric', month:'long', day:'numeric'};
document.getElementById('datetime').innerText = dt.toLocaleDateString(undefined, options)+' '+dt.toLocaleTimeString();
}
updateTime();
setInterval(updateTime,1000);