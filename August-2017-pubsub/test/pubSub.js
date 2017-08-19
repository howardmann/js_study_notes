let chai = require('chai');
let expect = chai.expect;
let PubSub = require('../pubSub.js');
let sinon = require('sinon');

describe('PubSub', function () {
  let pubSub = new PubSub();
  let callback;  
  let randomFruitSpy = sinon.spy(pubSub, 'randomFruit');
  let pickFruitEmitSpy = sinon.spy();
  let juiceFruitEmitSpy = sinon.spy();

  before(function(done){
    pubSub.on('pickFruit', pickFruitEmitSpy);    
    pubSub.on('juiceFruit', juiceFruitEmitSpy);    
    pubSub.init(function (err, result) {
      callback = result
      done();
    })
  });
  it('should return success message', function () {
    expect(callback.message).to.equal('success')
  })
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
