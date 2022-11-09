const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM books`);
    return rows.map((bookRow) => new Book(bookRow));
  }
}

class BookDeets {
  title;
  released;
  authors;

  constructor(row) {
    this.title = row.title;
    this.released = row.released;
    this.authors =
      row.authors.length > 0
        ? row.authors.map(({ id, name }) => ({ id, name }))
        : [];
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    select books.*,
    coalesce(
        json_agg(to_jsonb(authors))
        filter(WHERE authors.id IS NOT NULL), '[]') as authors
        from books left join combo
        on books.id = combo.book_id
        left join authors
        on authors.id = combo.author_id
        where books.id = $1
        group by books.id;
        `,
      [id]
    );
    const newBookDeets = new BookDeets(rows[0]);
    return newBookDeets;
  }
}

module.exports = { Book, BookDeets };
