var chai = require('chai');
var expect = chai.expect;
let app = require('../server.js');
var chaiHttp = require('chai-http');
var nock = require('nock');

chai.use(chaiHttp);

describe('app', () => {
  // Use nock to intercept http request
  var goodCall = nock('http://localhost:3000')
    .get('/')
    .reply(200, {
      fruit: 'watermelon',
      color: 'pink'
    });

  it('should intercept good calls', function (done) {
    chai.request('http://localhost:3000')
      .get('/')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.eql({fruit: 'watermelon', color: 'pink'})
        done();
      })
  })
})