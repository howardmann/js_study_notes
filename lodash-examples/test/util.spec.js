let expect = require('chai').expect
let {
  isString,
  capitalize,
  capitalizeSentence,
  validator
} = require('../util')

describe.only('#util', () => {
  describe('.isString', () => {
    it('should exist', () => expect(isString).to.not.be.undefined)
    it('should be a function', () => expect(typeof isString).to.equal('function'))
    it('should return true for valid strings', () => {
      let input = isString('valid')
      expect(input).to.be.ok
    })
    it('should return false for invalid strings', () => {
      let invalidArr = ['', null, undefined, 1, true, false, [1,2,3,4], {}]
      invalidArr.forEach(str => {
        let input = isString(str)
        expect(input).to.not.be.ok
      })
    })
  })
  describe('.capitalize', () => {
    it('should capitalize a valid string', () => {
      let input = capitalize('hello')
      let actual = 'Hello'
      expect(input).to.equal(actual)
    })
    it('should throw error if invalid string passed', () => {
      let invalid = [null, undefined, 1, true]
      invalid.forEach(str => {
        expect(() => capitalize(str)).to.throw('must be a valid string')
      })
      
    })
  })
  describe('.capitalizeSentence', () => {
    it('should capitalize a valid string sentence', () => {
      let input = capitalizeSentence('hello world')
      let actual = 'Hello World'
      expect(input).to.equal(actual)
    })
    it('should throw error if invalid string passed', () => {
      let invalid = [null, undefined, 1, true]
      invalid.forEach(str => {
        expect(() => capitalizeSentence(str)).to.throw('must be a valid string')
      })
      
    })
  })
  describe('.validator', () => {
    it('should apply the original function and store the error message', () => {
      let errMsg = 'invalid name'
      let nameValidator = validator(errMsg, isString)
      let input = nameValidator(42)
      expect(input).to.not.be.ok
      expect(nameValidator.errorMessage).to.equal(errMsg)
    })
  })
})