let util = module.exports = {}
let _ = require('lodash')

// validators 

util.isString = (str) => _.isString(str) && str.length > 0