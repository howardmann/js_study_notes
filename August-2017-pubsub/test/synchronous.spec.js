// Because we arent using node eventEmitters we are able to spy on all functions being calld
// KISS is great isn't it

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

// Require modules
let FruitBowlSync = require('../4-synchronousKISS.js');

describe('FruitBowlSync', function () {
  // Spy on methods being called
  let randomFruitSpy = sinon.spy(FruitBowlSync, 'randomFruit');
  let prepareFruitSpy = sinon.spy(FruitBowlSync, 'prepareFruit');
  let sellFruitSpy = sinon.spy(FruitBowlSync, 'sellFruit');

  before(function () {
    FruitBowlSync.init();
  });

  it('should call randomFruit', function () {
    expect(randomFruitSpy.called).to.be.true;
  });
  it('should call prepareFruit', function () {
    expect(prepareFruitSpy.called).to.be.true;
  });
  it('should call sellFruit', function () {
    expect(sellFruitSpy.called).to.be.true;
  });

  describe('.randomFruit', function(){
    let randomFruit = FruitBowlSync.randomFruit;
    it('should exist', () => expect(randomFruit).to.not.be.undefined);
    it('should return a random fruit from the fruits arr',function(){
      const fruitsArr = ['apple', 'banana', 'pineapple', 'pear', 'orange', 'tomato'];
      let fruit = randomFruit();
      expect(fruitsArr).to.include(fruit);
    })
  })
})

