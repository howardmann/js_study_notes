// Testing for eventEmitter requires sinon and registering .on before the tests
// Sinon cannot directly spy on functions that are called via sinon's event emitter 
// We must use .on and pass in a spy to detect if they are being called

let chai = require('chai');
let expect = chai.expect;
let FruitBowl = require('../2-inheritenceEventEmitter.js');
let sinon = require('sinon');

describe('FruitBowl', function () {
  let fruitBowl = new FruitBowl();
  let randomFruitSpy = sinon.spy(fruitBowl, 'randomFruit');
  let pickFruitEmitSpy = sinon.spy();
  let juiceFruitEmitSpy = sinon.spy();

  before(function(){
    fruitBowl.on('pickFruit', pickFruitEmitSpy);    
    fruitBowl.on('juiceFruit', juiceFruitEmitSpy);    
    fruitBowl.init();
  });
  it('should call randomFruit', function(){
    expect(randomFruitSpy.called).to.be.true;
  });
  it('shoud emit pickFruit event', function(){
    expect(pickFruitEmitSpy.called).to.be.true;
  })
  it('shoud emit juiceFruit event', function(){
    expect(juiceFruitEmitSpy.called).to.be.true;
  })
})
