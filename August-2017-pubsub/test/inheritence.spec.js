let chai = require('chai');
let expect = chai.expect;
let FruitBowl = require('../inheritence.js');
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
