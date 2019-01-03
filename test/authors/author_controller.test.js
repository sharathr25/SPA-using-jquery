// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;
const author = require('../../src/authors/author_controller.js');

// testing mysql book db
describe('testing test database', () => {
  it('getting authors from test database', async () => {
    let authorTestData = {
      id: 1, name: 'osmani', about: 'programmer', place: 'LA',
    };
    const data = await author.getAuthors();
    const authorDbdata = data[0];
    const authorData = JSON.stringify(authorDbdata[0]);
    authorTestData = JSON.stringify(authorTestData);
    expect(authorData).to.be.equal(authorTestData);
  });
  it('getting author by valid author id from test database', async () => {
    const data = await author.getAuthors();
    let authorTestData = {
      id: 1, name: 'osmani', about: 'programmer', place: 'LA',
    };
    const authorDbData = data[0];
    const authorData = JSON.stringify(authorDbData[0]);
    authorTestData = JSON.stringify(authorTestData);
    expect(authorData).to.be.equal(authorTestData);
  });
  it('Not getting author by wrong author id from test database', async () => {
    const data = await author.getAuthorById(10);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(0);
  });
  it('adding an author to test database', async () => {
    const authorTestData = {
      id: 3, name: 'osmani', about: 'programmer', place: 'LA',
    };
    const data = await author.insertAuthor(authorTestData);
    expect(data[0].affectedRows).to.be.equal(1);
  });
  it('updating an author in test database', async () => {
    const authorTestData = {
      name: 'osmani', about: 'programmer', place: 'LA',
    };
    const data = await author.updateAuthorById('3', authorTestData);
    expect(data[0].affectedRows).to.be.equal(1);
  });
  it('deleting an author from test database', async () => {
    const data = await author.deleteAuthorById('3');
    expect(data[0].affectedRows).to.be.equal(1);
  });
});
