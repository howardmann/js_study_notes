let expect = require('chai').expect
let promises = require('../promises')
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

// Note
// Examples below show the various syntaxes for writing tests for promises
// I prefer the first example of using done because it more accurately reflects how the code
// will be exected in the application
// using chai-as-promised is nice to be able to write tests in less verbose input vs. actual way, however...
// ...this disguises the promises as synchronous code which is not how it will run in the application
// Finally the return syntax is just a bit too much magic for more liking


describe('#promises', () => {
  it('should exist', () => expect(promises).to.not.be.undefined)
  describe('.readFileAsync', () => {
    it('should work', (done) => {
      promises.readFileAsync('./cow.txt', 'utf8')
        .then(data => {
          expect(data).to.equal('moo')
          done()
        })
    })
  })
  describe('.makeReadFileAsync', () => {
    describe('testing promise resolve', () => {
      let fs, readFileAsync
      beforeEach('setup stub and function', () => {
        fs = {
          readFileAsync() {
            return Promise.resolve('miaow')
          }
        }

        readFileAsync = promises.makeReadFileAsync(fs)
      })
      it('should work with mocha done syntax', (done) => {
        readFileAsync('./cow.txt', 'utf8')
          .then(data => {
            expect(data).to.equal('miaow')
            done()
          })
      })
      it('should work with mocha return syntax and no done', () => {
        return readFileAsync('./cow.txt', 'utf8')
          .then(data => expect(data).to.equal('miaow'))
      })
      it('should work using chai-as-promised helper syntax', () => {
        // Using chai-as-promised library allows us to write assertions more similar to mocha input v actual
        let input = readFileAsync('./cow.txt', 'utf8')
        let actual = 'miaow'
        expect(input).to.eventually.equal(actual)
      })
    })
    describe('testing promise reject', () => {
      let fs, readFileAsync
      beforeEach('setup stub and function', () => {
        fs = {
          readFileAsync() {
            return Promise.reject('nar mate')
          }
        }

        readFileAsync = promises.makeReadFileAsync(fs)
      })
      it('should work with mocha done syntax', (done) => {
        readFileAsync('./cow.txt', 'utf8')
          .catch(err => {
            expect(err).to.equal('nar mate')
            done()
          })
      })
      it('should work with mocha return syntax and no done', () => {
        return readFileAsync('./cow.txt', 'utf8')
          .catch(err => expect(err).to.equal('nar mate'))
      })
      it('should work using chai-as-promised helper syntax', () => {
        // Using chai-as-promised library allows us to write assertions more similar to mocha input v actual
        let input = readFileAsync('./cow.txt', 'utf8')
        let actual = 'nar mate'
        expect(input).to.be.rejectedWith(actual)
      })
    })
  })
})