let calculator = module.exports = {}

// Dependencies
let { legitNumber } = require('./helpers')

// ES5 syntax
calculator.makeAdder = function(adder){
  if (!legitNumber(adder)) return false

  return function(num){
    return legitNumber(num) && (num + adder)
  }
}

// ES6 syntax (problem is we can't detect invalid params prior to returning function
calculator.makeMultiplier = (multiplier) => (num) => {
  return legitNumber(num) && (num * multiplier)
}

