const express = require('express');
const bodyParser = require('body-parser');
const homeRoutes = require('./src/home_routes.js');
const bookRoutes = require('./src/books/book_routes.js');
const authorRoutes = require('./src/authors/author_routes.js');
const middleware = require('./src/common/middleware.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(middleware.logUrl);
app.use(bookRoutes);
app.use(authorRoutes);
app.use(homeRoutes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = server;
