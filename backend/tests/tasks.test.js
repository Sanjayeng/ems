jest.mock('../config/prisma', () => ({
  task: {
    create: jest.fn(async (data) => ({ id: 't1', ...data })),
    findMany: jest.fn(async () => [{ id: 't1', title: 'Test Task' }]),
    findUnique: jest.fn(async () => ({ id: 't1', versionNo: 1, title: 'Test Task', description: 'd', dueDate: new Date() })),
    update: jest.fn(async (args) => ({ id: args.where.id, ...args.data }))
  },
  taskVersion: {
    create: jest.fn(async () => ({ id: 'v1' }))
  }
}));

const request = require('supertest');
const app = require('../app');

describe('Tasks API', () => {
  test('POST /api/tasks creates a task', async () => {
    const payload = { title: 'Test Task', description: 'd', departmentId: 'dep1', assignedToId: 'u1', assignedById: 'u2', priority: 'low' };
    const res = await request(app).post('/api/tasks').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(payload.title);
  });

  test('GET /api/tasks returns list', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PATCH /api/tasks/:id updates a task', async () => {
    const res = await request(app).patch('/api/tasks/t1').send({ title: 'Updated Title', changedById: 'u2' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });
});
