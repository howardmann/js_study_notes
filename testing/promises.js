let promises = module.exports = {}

// dependencies
let fs = require('fs')

// Wrap readFile as a native JS Promise
fs.readFileAsync = function(file, ext) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, ext, function(err, data){
      if (err) { 
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// Expose the promisified function above as a method
promises.readFileAsync = function (file, ext) {
  return fs.readFileAsync(file, ext)
}

// Wrap our example above in factory for dependency injection to make it testable
// Here it takes the fs module as an argument and then calls the method .readFileAsync
// In our tests we will inject a fake fs object with a fake method that resolves/ rejects
promises.makeReadFileAsync = (fs) => (file, ext) => {
  return fs.readFileAsync(file, ext)
}