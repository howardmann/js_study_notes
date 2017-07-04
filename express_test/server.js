// Dependencies
let express = require('express');
let exphbs  = require('express-handlebars');
let app = express();
let weather = require('./app/weather');

// Set view engine
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

// App
app.get('/', function(req, res, next){
  res.render('home');
});

app.get('/query', function(req, res, next){
  let query = req.query || {};
  let lat = query.lat;
  let lng = query.lng;

  weather.fetch({lat, lng})
    .then(data => weather.deserialize(data.data))
    .then(data =>{
      res.status(200).json({
        lat: lat || '', 
        lng: lng || '',
        weather: data
      })
    })
});

app.use(function(req, res){
  res.status(404).json({
    status: `404 error for route ${req.url}`
  })
});

app.listen(3000, function(){
  console.log('Listening to port 3000');
});

module.exports = app;
