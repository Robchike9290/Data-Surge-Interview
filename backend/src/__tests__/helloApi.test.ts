import request from 'supertest';
import app from '../index';
import { pool } from '../db';

describe('GET /api/hello', () => {
  it('responds with the message from the database', async () => {
    const response = await request(app).get('/api/hello');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, world' });
  });
});

// Ensure we clean up the PostgreSQL pool so Jest can exit cleanly.
afterAll(async () => {
  await pool.end();
});

