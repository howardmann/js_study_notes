let expect = require('chai').expect
let {
  isString
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
})