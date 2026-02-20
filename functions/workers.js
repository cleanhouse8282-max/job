export async function onRequest({ request, env }) {
  const db = env.mydb;

  const result = await db.prepare(`
    SELECT id, name
    FROM workers
    ORDER BY name ASC
  `).all();

  return Response.json(result.results);
}
