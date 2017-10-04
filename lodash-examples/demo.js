let promiseFetch = require('./util').promiseFetch;

promiseFetch('http://localhost:3000/answer')
  .then(resp => {
    let data = resp.data
    console.log(data);
  })