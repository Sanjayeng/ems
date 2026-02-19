jest.mock('../config/prisma', () => ({
  task: {
    findUnique: jest.fn(async () => ({ id: 't1', versionNo: 1 }))
  },
  submission: {
    create: jest.fn(async (data) => ({ id: 's1', ...data })),
    findMany: jest.fn(async () => [{ id: 's1', taskId: 't1' }]),
    update: jest.fn(async (args) => ({ id: args.where.id, ...args.data }))
  }
}));

const request = require('supertest');
const app = require('../app');

describe('Submissions API', () => {
  test('POST /api/submissions creates a submission (no file)', async () => {
    const payload = { taskId: 't1', submittedById: 'u1', externalLink: 'https://example.com' };
    const res = await request(app).post('/api/submissions').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.taskId).toBe(payload.taskId);
  });

  test('GET /api/submissions/task/:taskId returns submissions', async () => {
    const res = await request(app).get('/api/submissions/task/t1');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PATCH /api/submissions/:id/review updates review status', async () => {
    const res = await request(app).patch('/api/submissions/s1/review').send({ reviewerId: 'u2', status: 'approved', reviewComment: 'Good' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('approved');
  });
});
