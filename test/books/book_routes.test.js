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
    request(server)
      .post('/books')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('we will insert');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to put /books/1', (done) => {
    request(server)
      .put('/books/1')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('we will update');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to delete /books/1', (done) => {
    request(server)
      .delete('/books/1')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('we will delete');
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
