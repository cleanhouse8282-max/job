
function auth(req){return req.headers.get("Authorization")==="Basic "+btoa("admin:admin");}
export async function onRequestGet(context){
if(!auth(context.request)) return new Response("Unauthorized",{status:401});
const {DB}=context.env;
// const {results}=await DB.prepare("SELECT * FROM reservations ORDER BY date").all();
const {results}=await DB.prepare("SELECT a.id, a.name, a.phone, a.category,a.timeslot, a.roadAddress, a.detailAddress, a.pyeong, a.date, a.status, a.worker_id, b.name worker_name  FROM reservations a , workers b where a.worker_id = b.id ORDER BY a.date").all();
  
return Response.json(results);
}
