'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// CommonJS way of doing things
// const util = module.exports = {};

// ES6 way create an empty module (P.S I personally like Node's commonJS method)
var util = {};
exports.default = util;


util.sayName = function (name) {
  return 'Hi my name is ' + name;
};

util.rateSong = function () {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'michael jackson';
  return {
    title: title,
    verdict: 'awesome'
  };
};