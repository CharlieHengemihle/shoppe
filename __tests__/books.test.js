const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return list of books', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      title: expect.any(String),
      released: expect.any(Number),
      authors: expect.any(Array),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
