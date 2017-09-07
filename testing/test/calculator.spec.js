let expect = require('chai').expect
let calculator = require('../calculator')

describe.only('#calculator', () => {
  it('should exist', () => expect(calculator).to.not.be.undefined)
  describe('.makeAdder', () => {
    it('should exist', () => expect(calculator.makeAdder).to.not.be.undefined)
    it('should return an addition function', () => {
      let addTwo = calculator.makeAdder(2)
      let input = addTwo(10)
      let actual = 12
      expect(addTwo).to.be.a('function')
      expect(input).to.equal(actual)
    })
    it('should check for invalid adder params', () => {
      let falsey = [undefined, null, 'banana', {}, [1,2,3]]
      falsey.forEach(el => {
        let input = calculator.makeAdder(el)
        expect(input).to.be.false
      })      
    })
    it('should check for invalid num params', () => {
      let addTwo = calculator.makeAdder(2)
      let falsey = [undefined, null, 'banana', {}, [1, 2, 3]]
      falsey.forEach(el => {
        let input = addTwo(el)
        expect(input).to.be.false
      })            
    })
  })
  describe('.makeMultiplier', () => {
    it('should exist', () => expect(calculator.makeMultiplier).to.not.be.undefined)
    it('should return a multiplier function', () => {
      let multiplyTwo = calculator.makeMultiplier(2)
      let input = multiplyTwo(10)
      let actual = 20
      expect(multiplyTwo).to.be.a('function')
      expect(input).to.equal(actual)
    })
    it('should check for invalid num params', () => {
      let multiplyTwo = calculator.makeMultiplier(2)
      let falsey = [undefined, null, 'banana', {}, [1, 2, 3]]
      falsey.forEach(el => {
        let input = multiplyTwo(el)
        expect(input).to.be.false
      })
    })

  })
})