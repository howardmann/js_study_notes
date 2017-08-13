let fruit = module.exports = {};

// Dependencies
const fruits = require('../database/fruits.json').fruits;

fruit.index = () => {
  return fruits;
}

fruit.get = (name) => {
  let results = fruits.filter(el => el.name === name);
  if (results.length > 0) {
    return results
  } else {
    throw new Error('No fruit by that name');
  }
}