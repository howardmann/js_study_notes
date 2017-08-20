let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

// Require modules
let FruitBowlAsync = require('../async.js');

// // Async tests using spies and done
describe('FruitBowlAsync', function () {
  // Spy on methods being called
  let randomFruitSpy = sinon.spy(FruitBowlAsync, 'randomFruit');
  let prepareFruitSpy = sinon.spy(FruitBowlAsync, 'prepareFruit');
  let sellFruitSpy = sinon.spy(FruitBowlAsync, 'sellFruit');
  let result; // Declare result variable to store init() Promise resolve message

  before(function (done) {
    FruitBowlAsync.init().then(message => {
      result = message;
      done();
    });
  });

  it('should resolve with success', function () {
    expect(result).to.equal('success');
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

// Async tests using stubs
describe.only('FruitBowlAsync with stubs', function () {
  // Spy on methods being called
  FruitBowlAsync.randomFruit.restore();
  FruitBowlAsync.prepareFruit.restore();
  FruitBowlAsync.sellFruit.restore();
  
  let result; // Declare result variable to store init() Promise resolve message
  let prepareFruitSpy = sinon.spy(FruitBowlAsync, 'prepareFruit');
  let sellFruitSpy = sinon.spy(FruitBowlAsync, 'sellFruit');

  // Stub out randomFruit and give a fruit
  let randomFruitStub = sinon.stub(FruitBowlAsync, 'randomFruit').returns(Promise.resolve('hot chocolate yum'));

  before(function (done) {
    FruitBowlAsync.init().then(message => {
      result = message;
      done();
    });
  });

  it('should resolve with success', function () {
    expect(result).to.equal('success');
  });
  it('should call randomFruit', function () {
    expect(randomFruitStub.called).to.be.true;
  });
  it('should call prepareFruit', function () {
    expect(prepareFruitSpy.called).to.be.true;
  });
  it('should call sellFruit', function () {
    expect(sellFruitSpy.called).to.be.true;
  });
})

