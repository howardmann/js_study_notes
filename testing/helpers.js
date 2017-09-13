const _ = require('lodash')

const legitString = (string) => typeof string === 'string'

const legitNumber = (number) => Number.isFinite(number)

const legitArray = (array) => Array.isArray(array)

const legitObject = (object) => _.isPlainObject(object)

module.exports = {
  legitString,
  legitNumber,
  legitArray,
  legitObject
}