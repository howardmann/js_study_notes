let fruit = module.exports = {};
const fruits = require('../database/fruits.json').fruits;

// Dependencies
fruit.index = () => {
  return fruits;
}