let chai = require('chai');
let expect = chai.expect;
let Utils = require('../utils');

describe('#Utils', () => {
  it('should exist', () => expect(Utils).to.be.ok );

  describe('.capitalize', () => {
    let capitalize = Utils.capitalize;
    it('should exist', () => expect(capitalize).to.be.ok );
    it('should return a capitalized string', ()=>{
      let input = 'banana';
      let actual = 'Banana';
      expect(capitalize(input)).to.equal(actual);

      input = 'orange';
      actual = 'Orange';
      expect(capitalize(input)).to.equal(actual);
    })

    it('should throw error if non-string param is passed', ()=>{      
      let input = [42, undefined, null, false, true];
      let err = 'Must be String';
      input.forEach(el=>{
        expect(()=>capitalize(el)).to.throw(err);
      })
    });
  });

  describe('.validate', () => {
    let validate = Utils.validate;
    it('should exist', () => expect(validate).to.be.ok );
    it('should throw error when given a false param', () => {
      let input = [undefined, null, '', false];
      let err = 'Invalid param';
      input.forEach(el => {
        expect(() => validate(el)).to.throw(err);
      });      
    });
    it('should return if given a non falsey param', () => {
      let input = 'I am ok';
      expect(validate(input)).to.be.ok;
    })
  })
});