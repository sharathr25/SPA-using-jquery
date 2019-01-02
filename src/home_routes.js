const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
  res.status(200).send('welcome');
});

route.get('*', (req, res) => {
  res.status(404).send('404 not found');
});

module.exports = route;
