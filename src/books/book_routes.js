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
  try {
    const booksData = await book.getBookByIsbn(isbnNo);
    res.status(200).json(booksData[0]);
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.post('/books', async (req, res) => {
  const bookData = req.body;
  try {
    await book.insertBook(bookData);
    res.status(200).send('book inserted');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.put('/books/:isbn', async (req, res) => {
  const isbnNo = req.params.isbn;
  const bookData = req.body;
  try {
    await book.updateBookByIsbn(isbnNo, bookData);
    res.status(200).send('book updated');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.delete('/books/:isbn', async (req, res) => {
  const isbnNo = req.params.isbn;
  try {
    await book.deleteBook(isbnNo);
    res.status(200).send('book deleted');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

module.exports = route;
