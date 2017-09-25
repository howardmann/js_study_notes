let app = module.exports = {}
let axios = require('axios');

// Using arrow function syntax
/* ES5 syntax
app.makeFetch = function(axios){
  return function(url){
    return axios.get(url)
  }
}
*/
app.makeFetch = (axios) => (url) => axios.get(url)

app.parseFruit = (obj) => {
  let {id, fruit, color} = obj
  return {
    fruit: `${fruit} with color of ${color}`
  }
}

app.fetch = app.makeFetch(axios)