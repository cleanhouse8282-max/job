
let currentDate=new Date();
let bookedInfo=[];
let pricePerPyeong=10000;

function execDaumPostcode(){
new daum.Postcode({
oncomplete:function(data){
document.getElementById('roadAddress').value=data.roadAddress;
}
}).open();
}

async function fetchBooked(){
const res=await fetch("/api/booked-dates");
bookedInfo=await res.json();
}

async function fetchPrice(){
const res=await fetch("/api/price");
const data=await res.json();
pricePerPyeong=data.price;
}

async function generateCalendar(){
await fetchBooked();
const calendar=document.getElementById("calendar");
calendar.innerHTML="";
const year=currentDate.getFullYear();
const month=currentDate.getMonth();
document.getElementById("monthYear").innerText=`${year}년 ${month+1}월`;

const days=["일","월","화","수","목","금","토"];
days.forEach((d,i)=>{
const el=document.createElement("div");
el.innerText=d;
if(i===0||i===6) el.classList.add("weekend");
calendar.appendChild(el);
});

const firstDay=new Date(year,month,1).getDay();
const lastDate=new Date(year,month+1,0).getDate();

for(let i=0;i<firstDay;i++){ calendar.innerHTML+="<div></div>"; }

for(let i=1;i<=lastDate;i++){
const dateStr=`${year}-${month+1}-${i}`;
const dayEl=document.createElement("div");
dayEl.classList.add("day");
const dayOfWeek=new Date(year,month,i).getDay();
if(dayOfWeek===0||dayOfWeek===6) dayEl.classList.add("weekend");
dayEl.innerText=i;

const found=bookedInfo.find(d=>d.date===dateStr);
if(found){
dayEl.classList.add(found.status==="confirmed"?"confirmed":"booked");
}else{
dayEl.onclick=()=>selectDate(dateStr);
}

calendar.appendChild(dayEl);
}
}

function prevMonth(){ currentDate.setMonth(currentDate.getMonth()-1); generateCalendar(); }
function nextMonth(){ currentDate.setMonth(currentDate.getMonth()+1); generateCalendar(); }

function selectDate(dateStr){
document.getElementById("selectedDate").innerText=dateStr;
document.getElementById("reservationForm").classList.remove("hidden");
document.getElementById("reserveForm").dataset.date=dateStr;
}

document.querySelector("input[name='pyeong']").addEventListener("input",function(){
const total=this.value*pricePerPyeong;
document.getElementById("priceResult").innerText="예상금액: "+total.toLocaleString()+"원";
});

document.getElementById("reserveForm").addEventListener("submit",async function(e){
e.preventDefault();
const formData=new FormData(this);
formData.append("date",this.dataset.date);
const res=await fetch("/api/reserve",{method:"POST",body:formData});
if(res.ok){ alert("예약 완료"); generateCalendar(); this.reset(); }
else{ alert("이미 예약됨"); }
});

async function loadWorkers() {
  const res = await fetch("/workers");
  const workers = await res.json();

  const select = document.getElementById("workerSelect");

  workers.forEach(worker => {
    const option = document.createElement("option");
    option.value = worker.id;     // DB의 id
    option.textContent = worker.name;  // 화면에 표시될 이름
    select.appendChild(option);
  });
}

loadWorkers();

fetchPrice();
generateCalendar();
