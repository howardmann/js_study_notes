let expect = require('chai').expect
let { 
  getNestedFruit,
  checkPayload,
  checkPayloadPredicate
} = require('../helpers')

let payload = {
  data: {
    results: {
      fruits: [
        {name: 'banana', color: 'yellow'},
        {name: 'apple', color: 'red'},
        {name: 'rockmelon', color: 'orange'},
        {name: 'pear', color: 'green'},
        {name: 'grape', color: 'purple'}
      ]
    }
  }
}

let badPayload = {
  data: {
    message : 'not the same as good payload'
  }
}

let validPayload = {
  data: {
    user: {
      id: 42,
      name: 'Howie Mann',
      role: 'Admin'
    },
    meta: {
      country: 'Neverland',
      browser: 'Opera'
    }
  }
}
let errorPayload = {
  data: {
    user: {
      id: 42,
      name: 'Howie Mann',
      role: 'Admin'
    },
    punkd: {
      country: 'Neverland',
      browser: 'Opera'
    }
  }
}


describe('#getNestedFruit', () => {
 it('should exist', () => expect(getNestedFruit).to.not.be.undefined)
 it('should return the nested fruit if it exists', () => {
   let input = getNestedFruit(payload, 'banana')
   let actual = {name: 'banana', color: 'yellow'}
   expect(input).to.eql(actual)
 })
 it('should return false if nested fruit does not exist', () => {
   let input = getNestedFruit(payload, 'chocolate')
   let actual = false
   expect(input).to.eql(actual)   
 })
 it('should return false with different payload', () => {
   let input = getNestedFruit(badPayload, 'banana')
   let actual = false
   expect(input).to.eql(actual)      
 })
})

describe.only('#checkPayload', () => {
  it('should exist', () => expect(checkPayload).to.not.be.undefined)
  it('should return true if valid payload', () => {
    let input = checkPayload(validPayload)
    expect(input).to.be.true
  })
  it('should return array of error messages if invalid payload', () => {
    let input = checkPayload(errorPayload)
    let actual = ['country missing', 'browser missing']
    expect(input).to.eql(actual)
  })
})

describe.only('#checkPayloadPredicate', () => {
  it('should exist', () => expect(checkPayloadPredicate).to.not.be.undefined)
  it('should return true if valid payload', () => {
    let input = checkPayloadPredicate(validPayload)
    expect(input).to.be.true
  })
  it('should return false if invalid payload', () => {
    let input = checkPayloadPredicate(errorPayload)
    expect(input).to.be.false
  })
})