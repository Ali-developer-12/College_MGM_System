let requests=[
{type:"Student Registration",name:"Ahmed Ali",dept:"Civil",details:"Semester 1",status:"Pending"},
{type:"Teacher Leave",name:"Engr. Ali Khan",dept:"Mechanical",details:"2 days leave",status:"Pending"},
{type:"Student Registration",name:"Bilal Khan",dept:"Electrical",details:"Semester 3",status:"Pending"},
{type:"Teacher Leave",name:"Engr. Usman Shah",dept:"CIT",details:"1 day leave",status:"Pending"},
];

function render(){
let html="";
requests.forEach((r,i)=>{
let badgeClass = r.status=="Approved"?"badge-approved":r.status=="Rejected"?"badge-rejected":"badge-pending";
html+=`
<tr>
<td>${i+1}</td>
<td>${r.type}</td>
<td>${r.name}</td>
<td>${r.dept}</td>
<td>${r.details}</td>
<td><span class="badge ${badgeClass}">${r.status}</span></td>
<td>
<button class="btn btn-sm btn-success me-1" onclick="approve(${i})">Approve</button>
<button class="btn btn-sm btn-danger" onclick="reject(${i})">Reject</button>
</td>
</tr>`;
});
approvalTable.innerHTML=html;
}
render();

function approve(i){
requests[i].status="Approved";
render();
}

function reject(i){
requests[i].status="Rejected";
render();
}

search.onkeyup=()=>{
let v=search.value.toLowerCase();
[...approvalTable.rows].forEach(r=>{
r.style.display=r.innerText.toLowerCase().includes(v)?"":"none";
});
};