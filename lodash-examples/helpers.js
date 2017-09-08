let _ = require('lodash')

// // Without using lodash
// let getNestedFruit = (payload, fruit) => {
//   let data = payload.data || {}
//   let results = data.results || {}
//   let fruits = results.fruits || {}
//   if (!Array.isArray(fruits)) return false
//   return fruits.filter(el => el.name === fruit)[0] || false
// }

// Using lodash _.get and _.has to avoid exception errors
let getNestedFruit = (payload, fruit) => {
  let fruits = _.get(payload, "data.results.fruits")
  if (!fruits) return false
  return fruits.filter(el => el.name === fruit)[0] || false
}


module.exports = {
  getNestedFruit
}