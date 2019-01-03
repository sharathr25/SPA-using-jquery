const express = require('express');
const author = require('./author_controller.js');

const route = express.Router();

route.get('/authors', async (req, res) => {
  try {
    const data = await author.getAuthors();
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).send('some error happend please go back');
  }
});

route.get('/authors/:id', async (req, res) => {
  const idNo = req.params.id;
  try {
    const data = await author.getAuthorById(idNo);
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).send('some error happend please go back');
  }
});

route.post('/authors', async (req, res) => {
  const authorData = req.body;
  try {
    await author.insertAuthor(authorData);
    res.status(200).send('author inserted');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.put('/authors/:id', async (req, res) => {
  const idNo = req.params.id;
  const authorData = req.body;
  try {
    await author.updateAuthorById(idNo, authorData);
    res.status(200).send('author updated');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.delete('/authors/:id', async (req, res) => {
  const idNo = req.params.id;
  try {
    await author.deleteAuthorById(idNo);
    res.status(200).send('author deleted');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

module.exports = route;
