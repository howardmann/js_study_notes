<<<<<<< HEAD
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
=======
let core = require('./core')
let services = {
  fs: require('fs'),
  axios: require('axios')
}

let shell = () => core(services)
>>>>>>> ac1b484b4c84a0deecc0c0713787b53adb893aae
shell()