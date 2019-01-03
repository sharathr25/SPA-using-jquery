const request = require('supertest');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

describe('loading express', () => {
  process.env.DATABASE = 'test';
  process.env.PORT = 5000;
  let server;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../server.js');
  });
  afterEach(() => {
    server.close();
  });
  it('testing /', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        console.log(res.text);
        expect(res.text).to.have.string('welcome');
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
