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
  it('responds to /authors -status 200', (done) => {
    request(server)
      .get('/authors')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('"name":"osmani"');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /authors/id with valid id -status 200', (done) => {
    request(server)
      .get('/authors/1')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('"name":"osmani"');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /authors/id with invalid id -status 200', (done) => {
    request(server)
      .get('/authors/100')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('[]');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to post /authors', (done) => {
    const authorTestData = {
      id: 4, name: 'osmani', about: 'programmer', place: 'LA',
    };
    request(server)
      .post('/authors')
      .send(authorTestData)
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('author inserted');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to put /authors/1', (done) => {
    const authorTestData = {
      name: 'osmani', about: 'programmer', place: 'LA',
    };
    request(server)
      .put('/authors/4')
      .send(authorTestData)
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('author updated');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to delete /authors/1', (done) => {
    request(server)
      .delete('/authors/4')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('author deleted');
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
