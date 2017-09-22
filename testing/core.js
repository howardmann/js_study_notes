// Callback example
let core = (services) => {
  services.fs.readFile('./url.txt', 'utf8', function(err, data) {
    if (err) { 
      console.log(err)
    }
    services.$.get(data, function(payload){
      let output = payload.data
      console.log(output)
      services.fs.writeFile('./output.html', output)      
    })
  })
}

// Promise example
let corePromise = (services) => {
  return new Promise((resolve, reject) => {
    services.fs.readFileAsync('./url.txt', 'utf8')
      .then(data => services.axios.get(data))
      .then(payload => {
        let output = payload.data
        services.fs.writeFile('./output2.html', output)
        resolve(output)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = {
  core,
  corePromise
}
