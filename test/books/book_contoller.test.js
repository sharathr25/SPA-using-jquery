// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;
const book = require('../../src/books/book_controller.js');

// testing mysql book db
describe('testing test database', () => {
  it('getting books from test database', async () => {
    let bookTestData = {
      isbn: 123,
      title: 'abcd',
      subtitle: 'xyz',
      published: 'o reilly',
      publisher: '2018',
      pages: 200,
      description: 'no desccription',
      imgsrc: 'no image',
      author_id: 1,
      name: 'osmani',
    };
    const data = await book.getBooks();
    const books = data[0];
    const bookData = JSON.stringify(books[0]);
    bookTestData = JSON.stringify(bookTestData);
    expect(bookData).to.be.equal(bookTestData);
  });
  it('getting book by isbn from test database', async () => {
    const data = await book.getBooks(123);
    let bookTestData = {
      isbn: 123,
      title: 'abcd',
      subtitle: 'xyz',
      published: 'o reilly',
      publisher: '2018',
      pages: 200,
      description: 'no desccription',
      imgsrc: 'no image',
      author_id: 1,
      name: 'osmani',
    };
    bookTestData = JSON.stringify(bookTestData);
    const books = data[0];
    const bookData = JSON.stringify(books[0]);
    expect(bookData).to.be.equal(bookTestData);
  });
  it('Not getting book by wrong isbn from test database', async () => {
    const data = await book.getBookByIsbn(123333);
    const bookDbData = data[0];
    expect(bookDbData).to.be.an('array');
    expect(bookDbData.length).to.be.equal(0);
  });

  it('adding an book to test database', async () => {
    const bookTestData = {
      isbn: 343,
      title: 'abcd',
      subtitle: 'xyz',
      publishedOn: '2018',
      publisher: 'o reilly',
      pages: 200,
      description: 'no desccription',
      imgsrc: 'no image',
      id: 1,
    };
    const data = await book.insertBook(bookTestData);
    expect(data[0].affectedRows).to.be.equal(1);
  });
  it('updating a book to test database', async () => {
    const bookTestData = {
      title: 'abcd',
      subtitle: 'xyz',
      publishedOn: '2018',
      publisher: 'o reilly media',
      pages: 200,
      description: 'no desccription',
      imgsrc: 'no image',
    };
    const data = await book.updateBookByIsbn('343', bookTestData);
    expect(data[0].affectedRows).to.be.equal(1);
  });
  it('deleting a book from test database', async () => {
    const data = await book.deleteBook('343');
    expect(data[0].affectedRows).to.be.equal(1);
  });
});
