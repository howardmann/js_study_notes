let chai = require('chai');
let expect = chai.expect;

let fruits = require('../../utility/main.js');
let db = require('../../utility/fruits.json');

describe('Fruits', function(){
  
  it('should exist', () => expect(fruits).to.not.be.undefined);

  describe('random', function(){
    it('should exist', () => expect(fruits.random).to.not.be.undefined);
    it('should return a random fruit object', function(){
      let randomFruit = fruits.random();
      expect(randomFruit).to.be.a('object');
      expect(db).to.include(randomFruit);      
    });
  });
})
