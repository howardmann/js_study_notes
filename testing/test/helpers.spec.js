let expect = require('chai').expect
let {
  legitString,
  legitNumber,
  legitArray,
  legitObject
} = require('../helpers')

describe('#helpers', () => {
  describe('.legitString', () => {
    it('should exist', () => expect(legitString).to.not.be.undefined)
    it('should return true when passed a valid string', () => {
      let input = legitString('banana')
      expect(input).to.be.true
      expect(input).to.not.be.false
    })
    it('should return false when passed an invalid string', () => {
      let falsey = [undefined, NaN, null, 42, true, false, {}, [1,2,3]]
      falsey.forEach(el => {
        let input = legitString(el)
        expect(input).to.be.false
        expect(input).to.not.be.true
      })
    })
  })
  describe('.legitNumber', () => {
    it('should exist', () => expect(legitNumber).to.not.be.undefined)
    it('should return true when passed a valid number', () => {
      let input = legitNumber(42)
      expect(input).to.be.true
      expect(input).to.not.be.false
    })
    it('should return false when passed an invalid number', () => {
      let falsey = [undefined, NaN, null, 'banana', '42', true, false, {}, [1, 2, 3]]
      falsey.forEach(el => {
        let input = legitNumber(el)
        expect(input).to.be.false
        expect(input).to.not.be.true
      })
    })
  })
  describe('.legitArray', () => {
    it('should exist', () => expect(legitArray).to.not.be.undefined)
    it('should return true when passed a valid array', () => {
      let input = legitArray([42,1])
      expect(input).to.be.true
      expect(input).to.not.be.false
    })
    it('should return false when passed an invalid number', () => {
      let falsey = [undefined, NaN, null, 'banana', '42', true, false, {}]
      falsey.forEach(el => {
        let input = legitArray(el)
        expect(input).to.be.false
        expect(input).to.not.be.true
      })
    })
  })
  describe('.legitObject', () => {
    it('should exist', () => expect(legitObject).to.not.be.undefined)
    it('should return true when passed a valid array', () => {
      let input = legitObject({a: 'banana', b: 'fruit'})
      expect(input).to.be.true
      expect(input).to.not.be.false
    })
    it('should return false when passed an invalid number', () => {
      let falsey = [[1,2,3], NaN, null, 'banana', '42', true, false]
      falsey.forEach(el => {
        let input = legitObject(el)
        expect(input).to.be.false
        expect(input).to.not.be.true
      })
    })
  })

})