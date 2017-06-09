// Reduce takes a reducer and a starting value and iterates through an array incrementing to the previous step

// Simple reduce example with numbers to sum
var numArr = [1,2,3,4,5];
var initialValue = 0;

var sum = numArr.reduce(function(tally, el){
  return tally += el;
}, initialValue)

console.log(sum);
// 15

// Reduce can be more complicated and take an object as a starting value
// This example returns tally of votes by category
var votesArr = [
  'apple',
  'apple',
  'apple',
  'banana',
  'pear',
  'banana',
  'banana',
  'pineapple',
  'pear'
];

var initialValue = {};

var voteSum = votesArr.reduce(function(tally, el){
  // if key does not exist then create the first one with a record of 1
  // otherwise if it does add + 1 to the key that already exists
  // remember to return the tally for the next iterator to use
  if (!tally[el]) {
    tally[el] = 1;
  } else {
    tally[el] += 1;
  }
  return tally;
}, initialValue);
console.log(voteSum);
// 15

// Reduce another example
var customers = [
  ['Joe', 21, 'male', '70kg' ],
  ['Mary', 23, 'female', '60kg' ],
  ['Bo', 33, 'male', '80kg' ],
];
var initialValue = {};

var customersLabel = customers.reduce(function(tally, el){
  tally[el[0]] = {
    name: el[0],
    age: el[1],
    sex: el[2],
    weight: el[3]
  }
  return tally;
}, initialValue)

console.log(customersLabel);
// { Joe: { name: 'Joe', age: 21, sex: 'male', weight: '70kg' },
//   Mary: { name: 'Mary', age: 23, sex: 'female', weight: '60kg' },
//   Bo: { name: 'Bo', age: 33, sex: 'male', weight: '80kg' } }

// Reduce again more complicated
var transactions = [
  ['Joe', 'Shirt', 15, 2],
  ['Joe', 'Shorts', 10, 1],
  ['Mary', 'Skirt', 12, 2],
  ['Joe', 'Hat', 5, 3],
  ['Mary', 'CD', 22, 2],
  ['Bo', 'Lamb', 25, 2]     
]

var initialValue = {};

var customerTransactions = transactions.reduce(function(tally, el){
  let name = el[0]
  // Set key name as empty array if first time, otherwise keep what it was before
  tally[name] = tally[name] || [];
  tally[name].push({
    item: el[1],
    price: el[2],
    quantity: el[3],
    total: el[2] * el[3]
  })    
  return tally;
}, initialValue);

console.log(customerTransactions);

// { Joe:
//    [ { item: 'Shirt', price: 15, quantity: 2, total: 30 },
//      { item: 'Shorts', price: 10, quantity: 1, total: 10 },
//      { item: 'Hat', price: 5, quantity: 3, total: 15 } ],
//   Mary:
//    [ { item: 'Skirt', price: 12, quantity: 2, total: 24 },
//      { item: 'CD', price: 22, quantity: 2, total: 44 } ],
//   Bo: [ { item: 'Lamb', price: 25, quantity: 2, total: 50 } ] }