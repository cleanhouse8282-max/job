//export async function onRequest() {
//  return Response.json([{id:1, name:"테스트작업자"}]);
//}
export async function onRequest({ env }) {
  const db = env.mydb;

  const result = await db.prepare(`
    SELECT id, name
    FROM workers
    WHERE active = 1
    ORDER BY name ASC
  `).all();

  return Response.json(result.results);
}
