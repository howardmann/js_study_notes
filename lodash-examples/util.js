let util = module.exports = {}
let _ = require('lodash')

// validators 
util.isString = (str) => _.isString(str) && str.length > 0

// TODO validator method

// helpers
util.capitalize = (str) => {
  let isString = util.isString(str)
  if (!isString) {
    throw new Error('must be a valid string')
  }
  return str[0].toUpperCase() + str.substr(1,str.length)
}

util.capitalizeSentence = (str) => {
  let isString = util.isString(str)
  if (!isString) {
    throw new Error('must be a valid string')
  }
  let strArr = str.split(' ')
  let transformedArr = strArr.map(str => util.capitalize(str))
  return transformedArr.join(' ')
}

let word = util.capitalize('hello')
word
let sentence = util.capitalizeSentence('hello world')
sentence