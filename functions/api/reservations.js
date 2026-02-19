
function auth(req){return req.headers.get("Authorization")==="Basic "+btoa("admin:admin");}
export async function onRequestGet(context){
if(!auth(context.request)) return new Response("Unauthorized",{status:401});
const {DB}=context.env;
const {results}=await DB.prepare("SELECT * FROM reservations ORDER BY date").all();
return Response.json(results);
}
