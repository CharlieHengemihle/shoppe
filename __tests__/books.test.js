const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(9);
    const hobbit = res.body.find((book) => book.id === '1');
    expect(hobbit).toHaveProperty('title', 'The Hobbit');
  });
  afterAll(() => {
    pool.end();
  });
});
