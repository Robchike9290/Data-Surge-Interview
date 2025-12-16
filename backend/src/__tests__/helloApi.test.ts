import request from 'supertest';
import app from '../index';

describe('GET /api/hello', () => {
  it('responds with the message from data.txt', async () => {
    const response = await request(app).get('/api/hello');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, world' });
  });
});


