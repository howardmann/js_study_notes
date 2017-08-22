(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Require depedencies
let fruits = require('./utility/main.js');


// Export various modules
module.exports = fruits
},{"./utility/main.js":3}],2:[function(require,module,exports){
module.exports=[
  {"fruit": "apple", "color": "red"},
  {"fruit": "blueberry", "color": "blue"},
  {"fruit": "watermelon", "color": "pink"},
  {"fruit": "pineapple", "color": "yellow"},
  {"fruit": "rockmelon", "color": "orange"}
]
},{}],3:[function(require,module,exports){
let fruits = module.exports = {}

// Dependencies
let data = require('./fruits.json');

fruits.random = function(){
  return data[Math.floor(Math.random() * data.length)]
}

fruits.stringify = function(obj){
  let fruit = obj.fruit;
  let color = obj.color;
  return `Tasty ${color} ${fruit}`
}

fruits.color = function(obj){
  return obj.color;
}
},{"./fruits.json":2}],4:[function(require,module,exports){
var fruit = require('../fruits');

var template = function(randomFruit){
  return `
    <div style="background-color:${randomFruit.color};padding: 20px">
      My favorite fruit is ${randomFruit.fruit}
    </div>
  `
} 

window.setInterval(function(){
  var randomFruit = fruit.random();
  document.getElementById('main').innerHTML = template(randomFruit);
},1000);
},{"../fruits":1}]},{},[4]);
