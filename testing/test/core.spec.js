let expect = require('chai').expect
let core = require('../core').core
let corePromise = require('../core').corePromise
let sinon = require('sinon');

describe('#core', () => {
  it('should exist', () => expect(core).to.not.be.undefined)  
  it('should call services', () => {
    let services = {
      fs: {
        readFile: sinon.stub(),
        writeFile: sinon.spy()        
      },
      $: {
        get: sinon.stub()
      }
    }

    services.fs.readFile.yields('http://www.test.com')
    services.$.get.yields({data:'html outputs'})

    core(services)

    // This works ok when using callbacks. Sinon.stub Tests dont seem to work when using nested .then promises inside
    expect(services.fs.readFile.calledWith('./url.txt', 'utf8')).to.be.ok
    expect(services.$.get.called).to.be.true
    expect(services.fs.writeFile.calledWith('./output.tmp', 'html outputs')).to.be.true
  })  
})

describe('#corePromise', () => {
  let services = {
    fs: {
      readFileAsync: sinon.stub(),
      writeFile: sinon.spy()
    },
    axios: {
      get: sinon.stub()
    }
  }
  
  it('should call services when successful', (done) => {
    services.fs.readFileAsync.resolves('http://www.promise.com')
    services.axios.get.resolves({data:'html promise outputs'})

    corePromise(services).then(data => {
      expect(services.fs.readFileAsync.calledWith('./url.txt', 'utf8')).to.be.ok
      expect(services.axios.get.called).to.be.ok
      expect(services.fs.writeFile.calledWith('./output2.html', 'html promise outputs')).to.be.true      
      expect(data).to.equal('html promise outputs')
      done()
    })
  })  
  it('should catch errors at fs.readFileAsync', (done) => {
    services.fs.readFileAsync.returns(Promise.reject('nar mate'))
    corePromise(services).catch(err => {
      expect(err).to.equal('nar mate')
      done()
    })
  })  
  it('should catch errors at axios.get', (done) => {
    services.fs.readFileAsync.resolves('http://www.promise.com')
    services.axios.get.returns(Promise.reject('whoa buddy'))

    corePromise(services)
    .then(data => {
      expect(services.fs.readFileAsync.calledWith('./url.txt', 'utf8')).to.be.ok      
    })
    .catch(err => {
      expect(err).to.equal('whoa buddy')
      done()
    })
  })  
})