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

// Using _.get to avoid boomz (e.g. exception error cannot find .country of undefined)
// If value is undefined we set as appropriate error
// We store the values in an array and filter and map out the error messages
// If no errors we return true else we return the array of error messages 
let checkPayload = (payload) => {
  let name = _.get(payload, "data.user.name", new Error('name missing'))
  let role = _.get(payload, "data.user.role", new Error('role missing'))
  let id = _.get(payload, "data.user.id", new Error('id missing'))
  let country = _.get(payload, "data.meta.country", new Error('country missing'))
  let browser = _.get(payload, "data.meta.browser", new Error('browser missing'))
  let predicatesArr = [name, role, id, country, browser]
  let errors = predicatesArr.filter(el => el instanceof Error).map(err => err.message) 
  return (errors.length > 1) ? errors : true
}

// Same example as above except it is a predicate only returning true or false, makes it more easily chainable
// We use _.every to check that all values return true otherwise it will return false
// Disadvantage is it doesn't give us error feedback
let checkPayloadPredicate = (payload) => {
  let name = _.get(payload, "data.user.name")
  let role = _.get(payload, "data.user.role")
  let id = _.get(payload, "data.user.id")
  let country = _.get(payload, "data.meta.country")
  let browser = _.get(payload, "data.meta.browser")
  let predicatesArr = [name, role, id, country, browser]
  return _.every(predicatesArr, i => i)
}

module.exports = {
  getNestedFruit,
  checkPayload,
  checkPayloadPredicate
}