-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;


CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob DATE,
  pob VARCHAR
);

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

INSERT INTO authors (
    name,
    dob,
    pob
)
VALUES
  ('J.R.R. Tolkien', '1892-01-03', 'Bloemfontein, South Africa'),
  ('Patrick Rothfus', '1973-06-06', 'Madison, WI'),
  ('Neil Gaiman', '1960-11-10', 'Portchester, UK'),
  ('Mary Shelley', '1797-08-30', 'Somers Town, UK'),
  ('Brandon Sanderson', '1975-12-19', 'Lincoln, NE'),
  ('Christopher Tolkien', '1924-11-21', 'Leeds, UK')
;

INSERT INTO books (
    title,
    released
)
VALUES
  ('The Hobbit', 1937),
  ('The Way of Kings', 2010),
  ('Skyward', 2018),
  ('Frankenstien', 1818),
  ('The Mortal Immortal', 1833),
  ('American Gods', 2001),
  ('The Name of the Wind', 2007),
  ('The Wise Mans Fear', 2011),
  ('The Silmarillion', 1977)
;
