
let price=10000;
function auth(req){return req.headers.get("Authorization")==="Basic "+btoa("admin:admin");}
export async function onRequestGet(){ return Response.json({price}); }
export async function onRequestPut(context){
if(!auth(context.request)) return new Response("Unauthorized",{status:401});
const body=await context.request.json();
price=body.price;
return new Response("OK");
}
