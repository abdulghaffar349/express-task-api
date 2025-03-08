// tests/app.test.js
const request = require('supertest');
const app = require('../app');

describe('Task API', () => {
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task' });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toEqual('Test Task');
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({});
      
      expect(res.statusCode).toEqual(400);
    });
  });
});