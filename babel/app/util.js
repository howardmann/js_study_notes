// CommonJS way of doing things
// const util = module.exports = {};

// ES6 way create an empty module (P.S I personally like Node's commonJS method)
const util = {};
export default util;

util.sayName = name => `Hi my name is ${name}`;

util.rateSong = (title='michael jackson') => ({
  title,
  verdict: 'awesome'
})
