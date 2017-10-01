let util = module.exports = {}
let _ = require('lodash')

// validators 
util.isString = (str) => _.isString(str) && str.length > 0

// Validator helper stores error message for easy access
util.validator = (errMsg, fn) => {
  // Create a wrapper function that mimics the function 2nd argument given
  let predicateWrapper = function(){
    return fn.apply(fn, arguments)
  } 
  // Assign an error message property to the wrapper and store the error message
  predicateWrapper['errorMessage'] = errMsg
  return predicateWrapper
}

// Create a hidden private helper
let _nameValidator = util.validator('must be a valid string', util.isString)

// helpers
util.capitalize = (str) => {
  let isString = util.isString(str)
  if (!isString) {
    throw new Error('must be a valid string')
  }
  return str[0].toUpperCase() + str.substr(1,str.length)
}

util.capitalizeSentence = (str) => {
  // let isString = util.isString(str)
  // if (!isString) {
  //   throw new Error('must be a valid string')
  // }
  let isString = _nameValidator(str)
  if (!isString) {
    let errMsg = _nameValidator.errorMessage
    throw new Error(errMsg)
  }
  
  let strArr = str.split(' ')
  let transformedArr = strArr.map(str => util.capitalize(str))
  return transformedArr.join(' ')
}

