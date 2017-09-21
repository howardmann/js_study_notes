let core = require('./core').core
let corePromise = require('./core').corePromise
// We import our own custom fs with an async function called .readFileAsync
let fs = require('./promises').fs

let services = {
  fs: require('fs'),
  axios: require('axios'),
  $: require('jquery')
}

let shell = () => corePromise(services)
shell()