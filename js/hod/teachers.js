let teachers=[
{name:"Engr. Ali Khan",dept:"Civil",qual:"MS Civil Engg",phone:"0300-1234567",status:"Active"},
{name:"Engr. Ahmed Raza",dept:"Mechanical",qual:"MS Mechanical",phone:"0301-2345678",status:"Active"},
{name:"Engr. Usman Shah",dept:"Electrical",qual:"MS Electrical",phone:"0302-3456789",status:"Active"},
{name:"Engr. Salman Iqbal",dept:"Electronic",qual:"MS Electronics",phone:"0303-4567890",status:"Active"},
{name:"Mr. Hassan Khan",dept:"CIT",qual:"BS Computer Science",phone:"0304-5678901",status:"Active"}
];

function render(){
let html="";
teachers.forEach((t,i)=>{
html+=`
<tr>
<td>${i+1}</td>
<td>${t.name}</td>
<td>${t.dept}</td>
<td>${t.qual}</td>
<td>${t.phone}</td>
<td>
<span class="badge ${t.status=="Active"?"badge-active":"badge-inactive"}">
${t.status}
</span>
</td>
<td>
<button class="btn btn-sm btn-warning" onclick="editTeacher(${i})">Edit</button>
<button class="btn btn-sm btn-danger" onclick="deleteTeacher(${i})">Delete</button>
</td>
</tr>`;
});
teacherTable.innerHTML=html;
totalTeachers.innerText=teachers.length;
}
render();

function saveTeacher(){
let data={
name:tName.value,
dept:tDept.value,
qual:tQual.value,
phone:tPhone.value,
status:tStatus.value
};
let idx=editIndex.value;
idx?teachers[idx]=data:teachers.push(data);
editIndex.value="";
bootstrap.Modal.getInstance(teacherModal).hide();
render();
}

function editTeacher(i){
let t=teachers[i];
editIndex.value=i;
tName.value=t.name;
tDept.value=t.dept;
tQual.value=t.qual;
tPhone.value=t.phone;
tStatus.value=t.status;
new bootstrap.Modal(teacherModal).show();
}

function deleteTeacher(i){
if(confirm("Delete this teacher?")){
teachers.splice(i,1);
render();
}
}

search.onkeyup=()=>{
let v=search.value.toLowerCase();
[...teacherTable.rows].forEach(r=>{
r.style.display=r.innerText.toLowerCase().includes(v)?"":"none";
});
};