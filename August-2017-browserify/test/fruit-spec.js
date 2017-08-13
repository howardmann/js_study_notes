var chai = require('chai');
var expect = chai.expect;
let fruit = require('../app/fruit.js');


describe('#fruit', function(){
  it('should exist', function(){
    expect(fruit).to.not.be.undefined;
  });

  describe('.index', function(){
    let fruits = fruit.index();
    it('should exist', () => expect(fruit.index).to.not.be.undefined);
    it('should return an array of objects', function(){
      let arrayOfObjects = function(arr){
        return arr.every(el => {
          return typeof(el) === 'object';
        })
      };
      expect(fruits).to.satisfy(arrayOfObjects);
    });
    it('should return elements with keys "name" and "color"', () => {
      fruits.forEach(el => {
        expect(el).to.have.keys('name', 'color');
      });
    });
    it('should always include a black avocado', () => {
      let avocado = {name: "avocado", color: "black"};
      expect(fruits).to.deep.include(avocado);
    });
  });

  describe('.get', function(){
    it('should exist', () => expect(fruit.get).to.not.be.undefined);
    it('should get a fruit by name', () => {
      let input = fruit.get('apple');
      let actual = {name: "apple", color: "red"};
      expect(input).to.deep.include(actual);
    });
    it('should throw error if no fruit by that name', () => {
      let error = 'No fruit by that name';
      expect(() => fruit.get('chocolate')).to.throw(error);
    })
  })

});

