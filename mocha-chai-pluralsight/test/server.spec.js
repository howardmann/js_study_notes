var chai = require('chai');
var expect = chai.expect;
let app = require('../server.js');
var chaiHttp = require('chai-http');
var nock = require('nock');

chai.use(chaiHttp);

describe('App', () => {
  it('should exist', () => expect(app).to.not.be.undefined);
  it('should successfully validate valid properties on POST /validation', function(done){
    chai.request(app)
      .post('/validation')
      .send({
        email: 'john@test.com',
        weight: 99,
        first: 'john',
        last: 'smith'
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('success');
        done();
      })
  });
  it('should successfully invalidate wrong email on POST /validation', function(done){
    chai.request(app)
      .post('/validation')
      .send({
        email: '1',
        weight: 99,
        first: 'john',
        last: 'smith'
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Invalid email');
        done();
      })
  });

  it('should successfully invalidate wrong weight on POST /validation', function(done){
    chai.request(app)
      .post('/validation')
      .send({
        email: 'test@test.com',
        weight: 199,
        first: 'john',
        last: 'smith'
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Invalid weight');
        done();
      })
  });
  

});

describe.only('App using nock', () => {
  // Use nock to intercept http request
  var goodCall = nock('http://localhost:3000')
    .get('/bananaboat')
    .reply(200, {
      message: 'omg my favourite boat'
    });

    var badCall = nock('http://localhost:3000')
    .get('/xyz')
    .reply(404, {
      message: 'page not found'
    });
  
  it('should intercept good calls', function(done){
    chai.request('http://localhost:3000')
      .get('/bananaboat')
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.message).to.equal('omg my favourite boat')
        done();
      })
  })

  it('should intercept bad calls', function(done){
    chai.request('http://localhost:3000')
      .get('/xyz')
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body.message).to.equal('page not found')
        done();
      })
  })
})