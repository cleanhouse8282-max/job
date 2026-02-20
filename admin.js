
async function load(){
const res=await fetch("/api/reservations",{headers:{Authorization:"Basic "+btoa("admin:admin")}});
const data=await res.json();
const tbody=document.querySelector("#table tbody");
tbody.innerHTML="";
data.forEach(r=>{
tbody.innerHTML+=`<tr>
<td>${r.date}</td>
<td>${r.timeslot}</td>
<td>${r.name}</td>
<td>${r.category}</td>
<td>${r.roadAddress}, ${r.detailAddress}</td>
<td>${r.pyeong}</td>
<td>${r.status}</td>
<td>${r.worker_id} ${r.worker_name} </td>
<td><button onclick="confirmRes(${r.id})">확정</button></td>
<td><button onclick="cancelRes(${r.id})">취소</button></td>
</tr>`;
});
}

async function confirmRes(id){
await fetch("/api/confirm?id="+id,{method:"PUT",headers:{Authorization:"Basic "+btoa("admin:admin")}});
load();
}

async function cancelRes(id){
await fetch("/api/cancel?id="+id,{method:"DELETE",headers:{Authorization:"Basic "+btoa("admin:admin")}});
load();
}

async function updatePrice(){
const price=document.getElementById("priceInput").value;
await fetch("/api/price",{method:"PUT",headers:{Authorization:"Basic "+btoa("admin:admin"),"Content-Type":"application/json"},body:JSON.stringify({price})});
alert("저장완료");
}

load();
