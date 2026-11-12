import { createClient } from '@libsql/client/web';

// Initialize the client once per function instance.
// Vercel reuses warm instances, so this avoids re-creating it on every request.
const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
  // CORS (optional — remove if you only call this from the same origin)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      // Simple health check + example read
      const result = await db.execute('SELECT 1 AS ok');
      return res.status(200).json({
        ok: true,
        database: process.env.TURSO_DATABASE_URL,
        result: result.rows,
      });
    }

    if (req.method === 'POST') {
      // Example: run a parameterized query.
      // Body: { "sql": "SELECT * FROM users WHERE id = ?", "args": [123] }
      const { sql, args = [] } = req.body ?? {};

      if (!sql) {
        return res.status(400).json({ error: 'Missing "sql" in request body' });
      }

      const result = await db.execute({ sql, args });
      return res.status(200).json({
        columns: result.columns,
        rows: result.rows,
        rowsAffected: result.rowsAffected,
      });
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[turso]', err);
    return res.status(500).json({ error: err.message });
  }
}
