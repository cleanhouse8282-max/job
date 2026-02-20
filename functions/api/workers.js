//export async function onRequest() {
//  return Response.json([{id:1, name:"테스트작업자"}]);
//}
//export async function onRequest({ env }) {
//  const db = env.mydb;

//  const result = await db.prepare(`
//    SELECT id, name
//    FROM workers
//    WHERE active = 1
//    ORDER BY name ASC
//  `).all();

//  return Response.json(result.results);
//}

export async function onRequestGet(context){
if(!auth(context.request)) return new Response("Unauthorized",{status:401});
const {DB}=context.env;
const {results}=await DB.prepare("SELECT id, name FROM workers ORDER BY name").all();
return Response.json(results);
}

//export async function onRequest({ env }) {
//  const db = env.mydb;

//  const { results } = await db.prepare(`
//    SELECT id, name
//    FROM workers
//  `).all();

//  return Response.json(results);
//}
