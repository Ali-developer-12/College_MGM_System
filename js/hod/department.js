let departments=[
{name:"Civil Engineering",code:"CIV",hod:"Engr. Ali Khan",status:"Active"},
{name:"Mechanical Engineering",code:"MECH",hod:"Engr. Ahmed Raza",status:"Active"},
{name:"Electrical Engineering",code:"ELEC",hod:"Engr. Usman Shah",status:"Active"},
{name:"Electronics Engineering",code:"ENTC",hod:"Engr. Salman Iqbal",status:"Active"},
{name:"CIT",code:"CIT",hod:"Mr. Hassan Khan",status:"Active"}
];

function render(){
let html="";
departments.forEach((d,i)=>{
html+=`
<tr>
<td>${i+1}</td>
<td>${d.name}</td>
<td>${d.code}</td>
<td>${d.hod}</td>
<td>
<span class="badge ${d.status=="Active"?"badge-active":"badge-inactive"}">
${d.status}
</span>
</td>
<td>
<button class="btn btn-sm btn-warning" onclick="editDept(${i})">Edit</button>
<button class="btn btn-sm btn-danger" onclick="deleteDept(${i})">Delete</button>
</td>
</tr>`;
});
deptTable.innerHTML=html;
totalDept.innerText=departments.length;
}
render();

function saveDept(){
let data={
name:deptName.value,
code:deptCode.value,
hod:hodName.value,
status:deptStatus.value
};
let idx=editIndex.value;
idx?departments[idx]=data:departments.push(data);
editIndex.value="";
bootstrap.Modal.getInstance(deptModal).hide();
render();
}

function editDept(i){
let d=departments[i];
editIndex.value=i;
deptName.value=d.name;
deptCode.value=d.code;
hodName.value=d.hod;
deptStatus.value=d.status;
new bootstrap.Modal(deptModal).show();
}

function deleteDept(i){
if(confirm("Are you sure to delete this department?")){
departments.splice(i,1);
render();
}
}

search.onkeyup=()=>{
let v=search.value.toLowerCase();
[...deptTable.rows].forEach(r=>{
r.style.display=r.innerText.toLowerCase().includes(v)?"":"none";
});
};