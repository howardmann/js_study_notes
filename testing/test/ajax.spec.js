let expect = require('chai').expect
let ajax = require('../ajax')

describe('#ajax', () => {
  describe('.makeFetch', () => {
    let fetch;
    beforeEach('setup fetch', () => {
      let $ = {
        get(){
          return Promise.resolve('banana')
        } 
      }
      fetch = ajax.makeFetch($)
    })
    it('should exist', () => expect(ajax.makeFetch).to.not.be.undefined)
    it('should return a function', () => {
      expect(fetch).to.be.a('function')
    })
    it('should return false if non string is passed', () => {
      let input = fetch(42)
      expect(input).to.be.false
    })
    it('should resolve a promise with data', (done) => {
      let actual = 'banana'
      fetch('http://www.getfruitapi.com').then(input => {
        expect(input).to.equal(actual)
        done()
      })
    })
  })
  
})
