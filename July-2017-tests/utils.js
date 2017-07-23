// Module
let Utils = module.exports = {};

/**
 * @function {capitalizes a one word string}
 * @param  {String} string {word to be capitalized}
 * @return {String} {capitalized string}
 */
Utils.capitalize = function(string){
  if (typeof string !== 'string') { throw new TypeError('Must be String') }
  return string[0].toUpperCase() + string.substr(1);
}

/**
 * @function {checks if param is valid or not}
 * @param  {any} param {Any paramater}
 * @return {boolean} {return true if valid or throw error if invalid}
 */
Utils.validate = function(param){
  let falsey = param === undefined || param === null || param === false || param === '';
  if (falsey) { throw new TypeError('Invalid param')};
  return true;
}