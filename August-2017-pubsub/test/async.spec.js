// [5.] Test for async code using by passing in done arg in mocha hooks and calling done() when finished with promise
// We can also rely on sinon's stub to replace the db fetch in our tests and simulate a random fruit being returned
// This is faster. See example by commenting and uncommenting randomFruitSpy spy vs stub alternatives below

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

// Require modules
let FruitBowlAsync = require('../5-asyncKISS.js');

// // Async tests using spies and done
describe('FruitBowlAsync', function () {
  // Spy on methods being called

  // You can use a spy on stub. Stubbing it will be faster for tests and not require a db fetch
  let randomFruitSpy = sinon.spy(FruitBowlAsync, 'randomFruit');
  // let randomFruitSpy = sinon.stub(FruitBowlAsync, 'randomFruit').returns(Promise.resolve('hot chocolate yum'));
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
