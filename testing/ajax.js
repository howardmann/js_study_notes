let ajax = module.exports = {}

// Dependencies
let { legitString } = require('./helpers')

// ES6 syntax
ajax.makeFetch = ($) => (url) => {
  if (!legitString(url)) return false
  return $.get(url)
}

// // ES5 syntax
// ajax.makeFetch = function($){
//   return function(url){
//     if (!legitString(url)) {
//       return false
//     }      
//     return $.get(url)
//   }
// }
