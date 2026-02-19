
function auth(req){return req.headers.get("Authorization")==="Basic "+btoa("admin:admin");}
export async function onRequestPut(context){
if(!auth(context.request)) return new Response("Unauthorized",{status:401});
const id=new URL(context.request.url).searchParams.get("id");
const {DB}=context.env;
await DB.prepare("UPDATE reservations SET status='confirmed' WHERE id=?").bind(id).run();
return new Response("OK");
}
