var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

let app = require('../server.js');

describe.only('App', () => {
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