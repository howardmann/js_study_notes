let expect = require('chai').expect
let promises = require('../promises')
let chai = require("chai");
let sinon = require('sinon');
let chaiAsPromised = require("chai-as-promised");
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
    describe('testing with sinon', () => {
      it('should work succesfully', (done) => {
        let fs = require('fs')
        let data = Promise.resolve('chook') 
        let stub = sinon.stub(fs, 'readFileAsync').withArgs('./chicken.txt', 'utf8').returns(data);

        promises.readFileAsync('./chicken.txt', 'utf8')
          .then(data => {
            expect(data).to.eql('chook')
            done()
          })
      })
      it('should work success with different stubbing', (done) => {
        // Same as dependency injection examples above except we can control the arguments passed
        let fs = {
          readFileAsync: sinon.stub().withArgs('./cat.txt', 'utf8').returns(Promise.resolve('miaow'))
        }        
        
        let readFileAsync = promises.makeReadFileAsync(fs)
        readFileAsync('./cat.txt', 'utf8')
          .then(data => {
            expect(data).to.equal('miaow')
            done()
          })
      })
      it('should work error with different stubbing', (done) => {
        // Same as dependency injection examples above except we can control the arguments passed
        let fs = {
          readFileAsync: sinon.stub().withArgs('./banned.txt', 'utf8').returns(Promise.reject('nar mate'))
        }        
        
        let readFileAsync = promises.makeReadFileAsync(fs)
        readFileAsync('./banned.txt', 'utf8')
          .catch(data => {
            expect(data).to.equal('nar mate')
            done()
          })
      })
    })
  })
})