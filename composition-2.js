// Example 1: Using object literal
// Pros: is easy to read and understand
// Cons: not suitable when you want to create multiple instances, when we change the number it will affect the add method
var calculator = {
  first: 1,
  second: 2,
  add: function(){
    return this.first + this.second
  }
}

console.log(calculator.add());
// 3
calculator.first = 3;
console.log(calculator.add());
// 5

// Example 2: Constructor pattern
// Pros: creates new instances
// Cons: harder to read and understand, not reusable
var Calculator = function(){
  this.first = 1;
  this.second = 2;
  this.add = function(){
    return this.first + this.second;
  }
}

var howiesCalculator = new Calculator();
console.log(howiesCalculator.add());
// 3
howiesCalculator.first = 3;
console.log(howiesCalculator.add());
// 5

var felixsCalculator = new Calculator();
console.log(felixsCalculator.add());
// 3

// Example 3: Composition <== Try to practice more with composition
// Pros: reusable code, creates new instances
// Cons: syntax of returning object literals and Object.assign is a bit trickier to get used to

var addition = function(state){
  return {
    add: function(){
      return state.first + state.second;
    }
  }
}

var BuildCalculator = function(first, second){
  var state = {
    first, second
  }
  // Optional
  var setState = function(){
    return {
      setState: function(fn, ln){
        state.first = fn;
        state.second = ln;
      }
    }
  }
  return Object.assign({},
    addition(state),
    setState()
  )
}

var helasCalculator = BuildCalculator(38,4);
console.log(helasCalculator.add());
// 42
var noahsCalculator = BuildCalculator(10,10)
console.log(noahsCalculator.add());
// 20

console.log(helasCalculator.add());
// 42

helasCalculator.setState(100,100);
console.log(helasCalculator.add());
// 200

console.log(noahsCalculator.add());
// 20