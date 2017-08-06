let util = module.exports = {};

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