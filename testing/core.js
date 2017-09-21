let core = (services) => {
  services.fs.readFile('./url.txt', 'utf8', function(err, data) {
    if (err) { 
      console.log(err)
    }
    services.$.get(data, function(payload){
      let output = payload.data
      console.log(output)
      services.fs.writeFile('./output.tmp', output)      
    })
  })
}

module.exports = core