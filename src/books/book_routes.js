const express = require('express');
const book = require('./book_controller.js');

const route = express.Router();

route.get('/books', async (req, res) => {
  try {
    const booksData = await book.getBooks();
    res.status(200).json(booksData[0]);
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.get('/books/:isbn', async (req, res) => {
  const isbnNo = req.params.isbn;
  console.log(`sending book with isbn ${isbnNo}`);
  try {
    const booksData = await book.getBookByIsbn(isbnNo);
    res.status(200).json(booksData[0]);
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.post('/books', (req, res) => {
  console.log('inserting book');
  res.status(200).send('we will insert');
});

route.put('/books/:isbn', (req, res) => {
  const isbnNo = req.params.isbn;
  console.log(`update book with isbn ${isbnNo}`);
  res.status(200).send('we will update');
});

route.delete('/books/:isbn', (req, res) => {
  const isbnNo = req.params.isbn;
  console.log(`delete book with isbn ${isbnNo}`);
  res.status(200).send('we will delete');
});

module.exports = route;
