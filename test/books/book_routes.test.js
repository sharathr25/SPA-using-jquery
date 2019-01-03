const request = require('supertest');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

describe('loading express', () => {
  process.env.DATABASE = 'test';
  process.env.PORT = 5000;
  let server;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../server.js');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /books -status 200', (done) => {
    request(server)
      .get('/books')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('"isbn":123');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to post /books', (done) => {
    const bookTestData = {
      isbn: 555,
      title: 'abcd',
      subtitle: 'xyz',
      publishedOn: '2018',
      publisher: 'o reilly',
      pages: 200,
      description: 'no desccription',
      imgsrc: 'no image',
      id: 1,
    };
    request(server)
      .post('/books')
      .send(bookTestData)
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('book inserted');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to put /books/1', (done) => {
    const bookTestData = {
      title: 'abcd',
      subtitle: 'xyz',
      publishedOn: '2018',
      publisher: 'o reilly media',
      pages: 200,
      description: 'no desccription',
      imgsrc: 'no image',
    };
    request(server)
      .put('/books/555')
      .send(bookTestData)
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('book updated');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to delete /books/1', (done) => {
    request(server)
      .delete('/books/555')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('book deleted');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404)
      .end((err, res) => {
        console.log(res.text);
        expect(res.text).to.have.string('404 not found');
        console.log('----------------------------------------------');
        done();
      });
  });
});
