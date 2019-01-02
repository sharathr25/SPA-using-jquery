const express = require('express');
const author = require('./author_controller.js');

const route = express.Router();

route.get('/authors', async (req, res) => {
  try {
    const data = await author.getAuthors();
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(200).send('some error happend please go back');
  }
});

route.post('/authors', (req, res) => {
  console.log('insert new book');
  res.status(200).send('we will insert');
});

route.put('/authors/:id', (req, res) => {
  const isbnNo = req.params.isbn;
  console.log(`delete book with isbn ${isbnNo}`);
  res.status(200).send('we will update');
});

route.delete('/authors/:id', (req, res) => {
  const isbnNo = req.params.isbn;
  console.log(`delete book with isbn ${isbnNo}`);
  res.status(200).send('we will delete');
});

module.exports = route;
