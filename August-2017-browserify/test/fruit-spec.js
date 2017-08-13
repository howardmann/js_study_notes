var chai = require('chai');
var expect = chai.expect;
let fruit = require('../app/fruit.js');


describe('#fruit', function(){
  it('should exist', function(){
    expect(fruit).to.not.be.undefined;
  });

  describe('.index', function(){
    it('should exist', () => expect(fruit.index).to.not.be.undefined);
    it('should return an array of objects', function(){
      let fruits = fruit.index();
      let arrayOfObjects = function(arr){
        return arr.every(el => {
          return typeof(el) === 'object';
        })
      };
      expect(fruits).to.satisfy(arrayOfObjects);
    });
    // it('should return elements with keys "name" and "color"', () => {
    //   let fruits = fruit.index();
      

    // })
  })

});

