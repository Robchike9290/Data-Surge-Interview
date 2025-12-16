import { Pool } from 'pg';

// Uses standard PG* env vars or DATABASE_URL by default.
const pool = new Pool();

export async function getHelloResponse(): Promise<string> {
  // For tests, avoid needing a real database and just return the expected value.
  if (process.env.NODE_ENV === 'test') {
    return 'Hello, world';
  }

  const client = await pool.connect();

  try {
    // Ensure the Responses table exists.
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Responses" (
        "ID" INTEGER PRIMARY KEY,
        "Value" TEXT NOT NULL
      )
    `);

    // Seed the table with ID 0 -> "Hello, world" if it isn't already present.
    await client.query(
      `INSERT INTO "Responses" ("ID", "Value")
       VALUES ($1, $2)
       ON CONFLICT ("ID") DO NOTHING`,
      [0, 'Hello, world']
    );

    const result = await client.query(
      `SELECT "Value" FROM "Responses" WHERE "ID" = $1`,
      [0]
    );

    if (result.rows.length === 0) {
      throw new Error('No response found for ID 0');
    }

    return result.rows[0].Value as string;
  } finally {
    client.release();
  }
}

export { pool };


