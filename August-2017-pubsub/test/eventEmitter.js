let chai = require('chai');
let expect = chai.expect;
let events = require('../eventEmitter.js');
let sinon = require('sinon');

describe('events', function(){
  describe('.emit("randomFruit")', function(){
    it('should call events.randomFruit',function(){
      sinon.spy(events,'randomFruit');
      events.emit('randomFruit', events.randomFruit());
      sinon.assert.called(events.randomFruit);
    })
  })
})
