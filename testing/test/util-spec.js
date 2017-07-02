var chai = require('chai');
var expect = chai.expect;

describe('#util', function(){
  let util = require('../util.js');
  it('should exist', function(){
    expect(util).to.be.ok;
  });

  describe('.dateTransform', function(){
    it('should exist', function(){
      expect(util.dateTransform).to.be.ok;
    });
    
    it('should transform a unix string', function(){
      let input = 1499027144;
      let actual = '2/7/2017'
      expect(util.dateTransform(input)).to.equal(actual);
    });

    it('should return false if param is not a number', function(){
      let input = [undefined, null, false, '123'];
      let actual = false;
      input.forEach(input => {
        expect(util.dateTransform(input)).to.be.false;
      })      
    });
  })
});