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