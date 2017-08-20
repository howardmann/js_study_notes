// We can easily test composition

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

// Require modules
let composition = require('../6-composition.js');

describe('Composition', function () {
  it('should exist', () => expect(composition).to.not.be.undefined)
  describe('.randomString', function(){
    let array = ['apple', 'pear', 'orage'];
    let randomObj = composition.randomString(array)
    it('should exist', () => expect(randomObj).to.not.be.undefined);
    it('should return an object literal with a .randomString method', function(){
      expect(randomObj).to.be.a('object');
      expect(randomObj.randomString).to.be.a('function')
    })
    it('should return a random string from the array provided', function(){
      let randomFruit = randomObj.randomString();
      expect(array).to.include(randomFruit);
    })
  });

  describe('.appendString', function(){
    let appendObj = composition.appendString('smoothie');
    it('should exist', () => expect(appendObj).to.not.be.undefined);
    it('should return an object literal with a .prepareString method', function () {
      expect(appendObj).to.be.a('object');
      expect(appendObj.prepareString).to.be.a('function')
    })    
    it('should append a string at end of word', function(){
      let input = appendObj.prepareString('avocado');
      let actual = 'avocado smoothie';
      expect(input).to.equal(actual);
    })
  });

  describe('.sellItem', function(){
    let sellObj = composition.sellItem('beverage');
    it('should exist', () => expect(sellObj).to.not.be.undefined);
    it('should return an object literal with a .sellItem method', function () {
      expect(sellObj).to.be.a('object');
      expect(sellObj.sellItem).to.be.a('function')
    })    

    it('should sell the item based on product received', function(){
      let input = sellObj.sellItem('avocado');
      let actual = 'Sold beverage comprised of: avocado';
      expect(input).to.equal(actual);      
    })
  });

  describe('FruitSmoothie', function(){
    let FruitSmoothie;
    before('setup fruit smoothie', function(){
      FruitSmoothie = function (product) {
        let obj = Object.assign({},
          composition.randomString(['apple', 'pear', 'orange']),
          composition.appendString('smoothie'),
          composition.sellItem(product)
        )
        obj.init = function () {
          let randomFruit = this.randomString();
          let preparedFruit = this.prepareString(randomFruit);
          return this.sellItem(preparedFruit);          
        }
        return obj
      }
    })
    describe('beverage', function(){
      it('should return sold item', function(){
        let fruitSmoothieDrink = FruitSmoothie('drink');
        let random = fruitSmoothieDrink.init();
        let results = ['Sold drink comprised of: apple smoothie', 'Sold drink comprised of: pear smoothie', 'Sold drink comprised of: orange smoothie' ]
        expect(results).to.include(random);
      })
    })
  })
})

