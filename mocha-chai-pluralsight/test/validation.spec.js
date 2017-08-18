var chai = require('chai');
var expect = chai.expect;
let validation = require('../app/validation.js');

describe('#Validation', function () {
  it('should exist', function(){
    expect(validation).to.not.be.undefined;
  })
  describe('Application is valid if...', function(){
    it('all validators are successful', function(){
      let input = {
        email: 'john@test.com',
        weight: 99,
        first: 'john',
        last: 'smith'
      }
      expect(validation.checkAll(input)).to.be.true;
    })
  })
  describe('Application is invalid if...', function () {
    it('email is less than 4 characters and/or does not include the @ symbol', function(){
      let input = ['totallymann', 'a@1', '']
      let actual = 'Invalid email';
      input.forEach(email => {
        expect(() => validation.checkEmail(email)).to.throw(actual);
      })
    });
    it('weight is greater than 100kg', function(){
      let input = [101,200,'banana']
      let actual = 'Invalid weight';
      input.forEach(weight => {
        expect(() => validation.checkWeight(weight)).to.throw(actual);
      })
    });
    it('first name is omitted', function(){
      let input = [undefined,42]
      let actual = 'First name needed';
      input.forEach(name => {
        expect(() => validation.checkFirst(name)).to.throw(actual);
      })
    });
    it('last name is omitted', function(){
      let input = [undefined, 42]
      let actual = 'Last name needed';
      input.forEach(name => {
        expect(() => validation.checkLast(name)).to.throw(actual);
      })
    });
  });

})

