let db = module.exports = {};

// Dependencies
let fs = require('fs');
let Utils = require('./utils');
let axios = require('axios');


/**
 * @function {fetches json data synchronously}
 * @param  {String} string {filename excluding extension}
 * @return {Object} {array of data from the filename}
 */
db.fetchSync = function(string){
  // Handle invalid params
  Utils.validate(string);

  // Handle file not existing
  let file = `./database/${string}.json`;
  if (!fs.existsSync(file)) { throw new Error('File does not exist bro')}

  // Read file and parse JSON
  let raw = fs.readFileSync(file, 'utf8')  
  let json = JSON.parse(raw);
  return json;
}

/**
 * @function {wraps fs.readFile into a an ES6 promise}
 * @param  {String} fileName {full name of file including beginning slash /database/colors.json}
 * @param  {String} format   {i.e. utf-8}
 * @return {Buffer} {Buffer data}
 */
db.fetchAsync = function(fileName, format){
  return new Promise((resolve, reject)=> {
    fs.readFile(`${__dirname}/database/${fileName}`, format, function(err, data){
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

db.fetchGithub = function(username){
  let url = `https://api.github.com/users/${username}`
  return axios.get(url);
}