let core = require('./core')
let services = {
  fs: require('fs'),
  axios: require('axios')
}

let shell = () => core(services)
shell()