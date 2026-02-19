
export async function onRequestGet(context){
const {DB}=context.env;
const {results}=await DB.prepare("SELECT date,status FROM reservations").all();
return Response.json(results);
}
