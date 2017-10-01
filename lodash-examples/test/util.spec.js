let expect = require('chai').expect
let {
  isString,
  capitalize,
  capitalizeSentence,
  validator,
  isNumber,
  celsiusToFahrenheit,
  promiseFetch
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
  describe('.isNumber', () => {
    it('should check valid numbers', () => {
      let input = isNumber(42)
      expect(input).to.be.ok
    })
    it('should return false for invalid numbers', () => {
      let inputArr = ['hello', null, undefined, true, [1,2,3], {}, NaN, Infinity]
      inputArr.forEach(num => {
        let input = isNumber(num)
        expect(input).to.not.be.ok
      })
    })
  })
  describe('.celsiusToFahrenheit', () => {
    it('should convert valid celsius inputs', () => {
      let input = celsiusToFahrenheit(0)
      let actual = 32
      expect(input).to.equal(actual)
    })
    it('should throw error message for invalid inputs', () => {
      let inputArr = ['hello', null, undefined, true, [1, 2, 3], {}, NaN, Infinity]
      inputArr.forEach(num => {
        expect(() => celsiusToFahrenheit(num)).to.throw('not a valid number')
      })
    })
  })
  describe('.promiseFetch', () => {
    it('should fetch data and return a promise', (done) => {
      let mockRequest = {
        get() {
          return Promise.resolve({data: 'banana'})
        }
      }
      promiseFetch('http://howiemann.tech', mockRequest)
        .then(payload => {
          let input = payload.data
          let actual = 'banana'
          expect(input).to.equal(actual)
          done()
        })
    })
    it('should also work using async await', async () => {
      // Note async await only works with node > 8 [You will need to use nvm to use the latest version or test will throw error]
      let mockRequest = {
        get() {
          return Promise.resolve({ data: 'banana' })
        }
      }
      let input = await promiseFetch('http://howiemann.tech', mockRequest)
      let actual = {data: 'banana'}
      expect(input).to.eql(actual)
    })
  })
})