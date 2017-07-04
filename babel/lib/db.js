'use strict';

var _arguments = arguments;
var db = module.exports = {};

db.query = function (id) {
  return new Promise(function (resolve, reject) {
    if (_arguments[0] === undefined) {
      reject('No params received');
    }
    resolve({
      user: 'user_' + id,
      status: 'ok'
    });
  });
};