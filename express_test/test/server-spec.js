var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
let cheerio = require('cheerio');

let app = require('../server.js');

describe('#app', () => {
  it('should exist', () => expect(app).to.not.be.undefined);
  it('should return homepage on GET /', (done) => {
    chai.request(app)
      .get('/')
      .end(function(err, res){
        let $ = cheerio.load(res.text);
        expect(res).to.have.status(200);
        expect($('h1').text()).to.equal('Hello World');
        done();
      })
  });
  it('should return 404 on inexistent route', done =>{
    chai.request(app)
      .get('/bananaboat')
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body.status).to.equal('404 error for route /bananaboat');
        done();
      })
  });
  it('should capture query params on GET /query?', done => {
    chai.request(app)
      .get('/query?lat=20&lng=30')
      .end(function(err, res){
        let actual = {
          coordinates: {
            latitude: 20,
            longitude: 30
          },
          timezone: 'Africa/Khartoum'
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.lat).to.equal('20');
        expect(res.body.lng).to.equal('30');
        expect(res.body.weather).to.eql(actual);      
        done();
      })
  })
});