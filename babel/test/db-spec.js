const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('#db', function(){
  let db = require('../app/db');
  it('should exist', () => expect(db).to.be.ok);
  
  describe('.query', ()=>{
    it('should exist', () => expect(db.query).to.be.ok);
    it('should return data with valid id', (done)=>{
      let input = 1;
      let actual = {
        user: 'user_1',
        status: 'ok'
      }
      db.query(input).then((data)=>{
        expect(data).to.eql(actual);
      }).then(done,done)
    });

    it('should throw error if no param is given', done =>{
      let error = "Invalid id";
      db.query()
        .catch(err =>{
          expect(err).to.equal(error);
        })
        .then(done, done)
    });

    it('should return secret if given magic number', done =>{
      let input = 42;
      let actual = 'Meaning of life';
      let stub = sinon.stub(db, 'query').withArgs(input).returns(Promise.resolve(actual));
      
      db.query(input).then(data =>{
        expect(data).to.equal(actual);
      }).then(done,done)      
    })
  })
})