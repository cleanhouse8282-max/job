
export async function onRequestPost(context){
const formData=await context.request.formData();
const {DB}=context.env;
try{
await DB.prepare("INSERT INTO reservations (name,phone,category,timeslot,roadAddress,detailAddress,pyeong,date,status,worker_id) VALUES (?,?,?,?,?,?,?,?,?,?)")
.bind(formData.get("name"),formData.get("phone"),formData.get("category"),formData.get("timeslot"),
formData.get("roadAddress"),formData.get("detailAddress"),formData.get("pyeong"),formData.get("date"),"pending",formData("workerSelect").run();
return new Response("OK");
}catch{return new Response("Duplicate",{status:400});}
}
