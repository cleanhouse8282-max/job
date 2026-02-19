
function auth(req){return req.headers.get("Authorization")==="Basic "+btoa("admin:admin");}
export async function onRequestDelete(context){
if(!auth(context.request)) return new Response("Unauthorized",{status:401});
const id=new URL(context.request.url).searchParams.get("id");
const {DB}=context.env;
await DB.prepare("DELETE FROM reservations WHERE id=?").bind(id).run();
return new Response("Deleted");
}
