<<<<<<< HEAD
// Callback example
=======
>>>>>>> ac1b484b4c84a0deecc0c0713787b53adb893aae
let core = (services) => {
  services.fs.readFile('./url.txt', 'utf8', function(err, data) {
    if (err) { 
      console.log(err)
    }
    services.$.get(data, function(payload){
      let output = payload.data
      console.log(output)
<<<<<<< HEAD
      services.fs.writeFile('./output.html', output)      
=======
      services.fs.writeFile('./output.tmp', output)      
>>>>>>> ac1b484b4c84a0deecc0c0713787b53adb893aae
    })
  })
}

<<<<<<< HEAD
// Promise example
let corePromise = (services) => {
  services.fs.readFileAsync('./url.txt', 'utf8')
    .then(data => services.axios.get(data))
    .then(payload => {
      let output = payload.data
      console.log(output)
      services.fs.writeFile('./output2.html', output)
    })
}

module.exports = {
  core,
  corePromise
}
=======
module.exports = core
>>>>>>> ac1b484b4c84a0deecc0c0713787b53adb893aae
