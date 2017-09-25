let _ = require('lodash');

var add = function(first, last) {
  return first + last
}

var adder = function(first) {
  return function(last) {
    return first + last
  }
}

var result = add(1,2)
result

var addTwo = adder(2)
var output = addTwo(3)
output

// ES6 syntax
var multipler = (first) => (last) => first * last
var timesTwo = multipler(2)
var output = timesTwo(10)
output

// Using lodash partials we can prefill the function
// This is handy for poorly written functions that have dependencies but do not return functions
var pow = function(exponent, base) {
  return Math.pow(base, exponent)
}
var square = _.partial(pow,2)
var result = square(3)
result

// The better way to write the above and not rely on partials is per below
// Function returning another function
var betterPow = (exponent) => (base) => Math.pow(base,exponent)
var betterSquare = betterPow(2)
var result = betterSquare(3)
result