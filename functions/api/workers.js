// export async function onRequest() {
//  return Response.json([{id:1, name:"테스트작업자"}]);
// }

export async function onRequest(context) {
  const { DB } = context.env;

  try {
    const { results } = await DB.prepare(`
      SELECT id, name
      FROM workers
      WHERE active = 1
      ORDER BY name ASC
    `).all();

    return Response.json(results);

  } catch (err) {
    return new Response("DB Error: " + err.message, { status: 500 });
  }
}

