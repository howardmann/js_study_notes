// Using object literal notation we cannot bind the eventEmitter to the object
// We test the logic separtely of the object literal and the custom event emitter it registers and listen to events

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

// Require modules
let FruitBowlLiteral = require('../3-objectLiteralEventEmitter.js').FruitBowlLiteral;
let fruitEvents = require('../3-objectLiteralEventEmitter.js').fruitEvents;

describe('FruitBowlLiteral', function () {
  // Spy on object literal methods
  let randomFruitSpy = sinon.spy(FruitBowlLiteral, 'randomFruit');
  let sellFruitSpy = sinon.spy(FruitBowlLiteral, 'sellFruit');

  before(function () {
    FruitBowlLiteral.init();
  });

  it('should call randomFruit', function () {
    expect(randomFruitSpy.called).to.be.true;
  });
  it('should call sellFruit', function () {
    expect(sellFruitSpy.called).to.be.true;
  });
})

describe('fruitEvents', function () {
  // Spy on fruitEvents emit events
  let pickFruitEmitSpy = sinon.spy();
  let juiceFruitEmitSpy = sinon.spy();

  before(function () {
    fruitEvents.on('pickFruit', pickFruitEmitSpy);
    fruitEvents.on('juiceFruit', juiceFruitEmitSpy);
    FruitBowlLiteral.init();
  });

  it('shoud emit pickFruit event', function () {
    expect(pickFruitEmitSpy.called).to.be.true;
  })
  it('shoud emit juiceFruit event', function () {
    expect(juiceFruitEmitSpy.called).to.be.true;
  })

})
