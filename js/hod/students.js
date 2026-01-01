let students=[];

function render(){
let html="";
students.forEach((s,i)=>{
html+=`
<tr>
<td>${i+1}</td>
<td>${s.roll}</td>
<td>${s.name}</td>
<td>${s.dept}</td>
<td>${s.sem}</td>
<td>${s.phone}</td>
<td><span class="badge ${s.status=="Active"?"badge-active":"badge-inactive"}">${s.status}</span></td>
<td>
<button class="btn btn-sm btn-warning" onclick="editStudent(${i})">Edit</button>
<button class="btn btn-sm btn-danger" onclick="deleteStudent(${i})">Delete</button>
</td>
</tr>`;
});
studentTable.innerHTML=html;
totalStudents.innerText=students.length;
}
render();

function saveStudent(){
let data={
name:sName.value,
roll:sRoll.value,
dept:sDept.value,
sem:sSem.value,
phone:sPhone.value,
status:sStatus.value
};
let idx=editIndex.value;
idx?students[idx]=data:students.push(data);
editIndex.value="";
bootstrap.Modal.getInstance(studentModal).hide();
render();
}

function editStudent(i){
let s=students[i];
editIndex.value=i;
sName.value=s.name;
sRoll.value=s.roll;
sDept.value=s.dept;
sSem.value=s.sem;
sPhone.value=s.phone;
sStatus.value=s.status;
new bootstrap.Modal(studentModal).show();
}

function deleteStudent(i){
if(confirm("Delete this student record?")){
students.splice(i,1);
render();
}
}

search.onkeyup=()=>{
let v=search.value.toLowerCase();
[...studentTable.rows].forEach(r=>{
r.style.display=r.innerText.toLowerCase().includes(v)?"":"none";
});
};