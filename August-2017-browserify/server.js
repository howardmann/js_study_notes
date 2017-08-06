// Dependencies
let express = require('express');
let exphbs  = require('express-handlebars');
let path = require('path');
let app = express();

// Set view engine
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// App
app.get('/', function(req, res, next){
  res.render('home');
});

app.get('/tally', function(req, res, next){
  res.render('tally');
});

app.listen(3000, function(){
  console.log('Listening to port 3000');
});

module.exports = app;
