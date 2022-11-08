const { Router } = require('express');
const { Author } = require('../models/authors');

module.exports = Router().get('/', async (req, res) => {
  const authors = await Author.getAll();
  res.json(authors);
});
