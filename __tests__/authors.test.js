const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(6);
  });

  it('should return an author with list of books', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dob: expect.any(String),
      pob: expect.any(String),
      books: expect.any(Array),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
