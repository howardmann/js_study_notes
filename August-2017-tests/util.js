let util = module.exports = {};

/**
 * @function {sums an array of numbers}
 * @param  {Array} arr
 * @return {Number}
 */
util.sumArr = (arr) => {  
  if (!Array.isArray(arr)) { throw new Error('Must pass array as argument')} // Handle non-array params
  
  let initial = 0;  // Starting value in reduce
  
  let sumTotal = arr.reduce((tally, el, index) => {
    let num = parseInt(el); // Parse string numbers
    if (isNaN(num)) { throw new Error(`Not a number (el, index): (${el}, ${index})`) }  // Handle non-numbers
    return tally += num;  // Reducer
  }, initial);

  return sumTotal;
}

util.tallyArr = (arr) => {
  if (!Array.isArray(arr)) { throw new Error('Must pass array as argument')} // Handle non-array params
  let initial = {};
  return arr.reduce((tally, el) => {
    !tally[el] ? tally[el] = 1 : tally[el] += 1;  // Create object with element as property and initial value 1, increment property value if it exists
    return tally;
  }, initial);
}