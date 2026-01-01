let results=[
{name:"Ahmed Ali",dept:"CIT",subject:"Web Development",marks:78},
{name:"Bilal Khan",dept:"CIT",subject:"Database",marks:42},
];

function render(){
let html="";
let pass=0,fail=0;
results.forEach((r,i)=>{
let status = r.marks>=50 ? "Pass":"Fail";
status=="Pass"?pass++:fail++;
let badge=status=="Pass"?"badge-pass":"badge-fail";

html+=`
<tr>
<td>${i+1}</td>
<td>${r.name}</td>
<td>${r.dept}</td>
<td>${r.subject}</td>
<td>${r.marks}</td>
<td><span class="badge ${badge}">${status}</span></td>
<td>
<button class="btn btn-sm btn-warning me-1" onclick="editResult(${i})">Edit</button>
<button class="btn btn-sm btn-danger" onclick="deleteResult(${i})">Delete</button>
</td>
</tr>`;
});

resultTable.innerHTML=html;
totalStudents.innerText=results.length;
passStudents.innerText=pass;
failStudents.innerText=fail;
}
render();

function saveResult(){
let data={
name:resName.value,
dept:resDept.value,
subject:resSubject.value,
marks:Number(resMarks.value)
};
let idx=editIndex.value;
idx?results[idx]=data:results.push(data);
editIndex.value="";
bootstrap.Modal.getInstance(resultModal).hide();
render();
}

function editResult(i){
let r=results[i];
editIndex.value=i;
resName.value=r.name;
resDept.value=r.dept;
resSubject.value=r.subject;
resMarks.value=r.marks;
new bootstrap.Modal(resultModal).show();
}

function deleteResult(i){
if(confirm("Delete this result?")){
results.splice(i,1);
render();
}
}

function updateTime(){
let d=new Date();
let opt={weekday:'long',year:'numeric',month:'long',day:'numeric'};
datetime.innerText=d.toLocaleDateString(undefined,opt)+' '+d.toLocaleTimeString();
}
updateTime();
setInterval(updateTime,1000);