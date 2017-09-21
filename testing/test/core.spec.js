let expect = require('chai').expect
let core = require('../core')
let sinon = require('sinon')

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