const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM authors`);
    return rows.map((authorRow) => new Author(authorRow));
  }
}

class AuthorDeets {
  id;
  name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books =
      row.books.length > 0
        ? row.books.map(({ id, title }) => ({ id, title }))
        : [];
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      select authors.*,
            coalesce(
                json_agg(to_jsonb(books))
                filter(WHERE books.id IS NOT NULL), '[]') as books
                from authors left join combo
                on authors.id = combo.author_id
                left join books
                on books.id = combo.book_id
                where authors.id = $1
                group by authors.id;
            `,
      [id]
    );
    const newAuthorDeets = new AuthorDeets(rows[0]);
    return newAuthorDeets;
  }
}

module.exports = { Author, AuthorDeets };
