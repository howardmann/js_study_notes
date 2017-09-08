let expect = require('chai').expect
let { getNestedFruit } = require('../helpers')

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