let notices=[
{
title:"Mid Term Exams Schedule",
desc:"Mid-term examinations will start from 10th January 2026.",
priority:"Important",
audience:"Students",
date:"2026-01-05"
},
{
title:"Faculty Meeting",
desc:"All faculty members are requested to attend the meeting.",
priority:"Normal",
audience:"Teachers",
date:"2026-01-02"
}
];

function render(){
let html="";
notices.forEach((n,i)=>{
let badgeClass = n.priority=="Urgent"?"badge-urgent":n.priority=="Important"?"badge-important":"badge-normal";
html+=`
<div class="notice-card">
<div class="d-flex justify-content-between align-items-center mb-2">
<span class="notice-title">${n.title}</span>
<span class="badge ${badgeClass}">${n.priority}</span>
</div>
<p>${n.desc}</p>
<div class="notice-meta">
<i class="bi bi-people"></i> ${n.audience} |
<i class="bi bi-calendar"></i> ${n.date}
</div>
<div class="mt-3 text-end">
<button class="btn btn-sm btn-warning me-2" onclick="editNotice(${i})">
<i class="bi bi-pencil"></i> Edit
</button>
<button class="btn btn-sm btn-danger" onclick="deleteNotice(${i})">
<i class="bi bi-trash"></i> Delete
</button>
</div>
</div>`;
});
noticeList.innerHTML=html;
}
render();

function saveNotice(){
let data={
title:nTitle.value,
desc:nDesc.value,
priority:nPriority.value,
audience:nAudience.value,
date:nDate.value
};
let idx=editIndex.value;
idx?notices[idx]=data:notices.push(data);
editIndex.value="";
bootstrap.Modal.getInstance(noticeModal).hide();
render();
}

function editNotice(i){
let n=notices[i];
editIndex.value=i;
nTitle.value=n.title;
nDesc.value=n.desc;
nPriority.value=n.priority;
nAudience.value=n.audience;
nDate.value=n.date;
new bootstrap.Modal(noticeModal).show();
}

function deleteNotice(i){
if(confirm("Delete this notice?")){
notices.splice(i,1);
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