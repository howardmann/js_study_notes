let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

// Require modules
let FruitBowlSync = require('../synchronous.js');

describe.only('FruitBowlSync', function () {
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
})

