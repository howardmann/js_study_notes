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

/**
 * @function {calculates count of elements occuring in an array}
 * @param  {Array} arr
 * @return {Object} {key value pair of element and vote tally}
 */
util.tallyArr = (arr) => {
  if (!Array.isArray(arr)) { throw new Error('Must pass array as argument')} // Handle non-array params
  let initial = {};
  return arr.reduce((tally, el) => {
    !tally[el] ? tally[el] = 1 : tally[el] += 1;  // Create object with element as property and initial value 1, increment property value if it exists
    return tally;
  }, initial);
}

/**
 * @function {sorts an object by property value}
 * @param  {Object} obj
 * @return {Object} {sorted object from highest to lowest value}
 */
util.sortObj = (obj) => {
  // Note JS quirk, array typeof is an object, so we also need to check that if is Array then we throw
  if ((typeof obj) !== 'object' || (Array.isArray(obj))) { throw new Error('Must pass object as argument')} // Handle non-object params
  // Step 1: Transform object of key value pairs into array of arrays
  sortableArr = [];
  for (var prop in obj) {
    sortableArr.push([prop, obj[prop]]);
  }
  // Step 2: Sort array from greatest to smallest
  let sortedArr = sortableArr.sort((a,b)=>{
    return b[1] - a[1];
  })
  // Step 3: Reduce sorted array back into an object of key value pairs
  let initial = {};
  return sortedArr.reduce((tally,el) => {
    tally[el[0]] = el[1];
    return tally;
  }, initial)
}