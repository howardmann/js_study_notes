let util = module.exports = {}
let _ = require('lodash')
let axios = require('axios')

// validators 
/**
 * Predicate string checker
 * @param  {String} str
 * @return {Boolean}
 */
util.isString = (str) => _.isString(str) && str.length > 0

/**
 * Predicate number checker (excludes NaN and Infinity)
 * @param  {Number} num
 * @return {Boolean}
 */
util.isNumber = (num) => _.isFinite(num)

/**
 * Validator helper to store error message for easy access
 * @param  {String} errMsg {error message you want stored for the validator}
 * @param  {Function} fn {predicate function you are applying the error message to}
 * @return {Function} {the predicate function wrapped with an errorMessage property}
 */
util.validator = (errMsg, fn) => {
  // Create a wrapper function that mimics the function 2nd argument given
  let predicateWrapper = function(){
    return fn.apply(fn, arguments)
  } 
  // Assign an error message property to the wrapper and store the error message
  predicateWrapper['errorMessage'] = errMsg
  return predicateWrapper
}

// Private helper
let _nameValidator = util.validator('must be a valid string', util.isString)

/**
 * Capitalizes a single word
 * @param  {String} str {string word}
 * @return {String} {capitalized string word}
 */
util.capitalize = (str) => {
  let isString = util.isString(str)
  if (!isString) {
    throw new Error('must be a valid string')
  }
  return str[0].toUpperCase() + str.substr(1,str.length)
}

/**
 * Capitalizes each word in a sentence
 * @param  {String} str {sentence or single word string}
 * @return {String} {capitalized sentence or single word string}
 */
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

let _numberValidator = util.validator('not a valid number', util.isNumber)

/**
 * Converts celsius to fahrenheit
 * @param  {Number} celsius {temperature in degrees celsius}
 * @return {Number} {temperature in degrees fahrenheit}
 */
util.celsiusToFahrenheit = (celsius) => {
  let isNumber = _numberValidator(celsius)
  if (!isNumber) {
    let errMsg = _numberValidator.errorMessage
    throw new Error(errMsg)
  }
  return celsius * 1.8 + 32
}

util.promiseFetch = (url, request=axios) => {
  return request.get(url)
}