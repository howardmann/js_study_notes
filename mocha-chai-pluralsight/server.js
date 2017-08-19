// Dependencies
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Helpers
let validation = require('./app/validation.js');

// App
app.get('/', function(req, res, next){
  res.send('hello world');
})

app.post('/validation', function (req, res, next) {
  try {
    validation.checkAll(req.body);
    res.send({message: 'success'});
  }
  catch (e) {
    res.status(400).send({message: e.message})
  }
});

// use port 3000 unless there exists a preconfigured port. Set preconfigred port via terminal `PORT=1234 node server.js`
const PORT = process.env.PORT || 3000;

// Contrived example of showing how to retrieve environment variables. In npm run dev package.json we set the environment variable key value pair as BANANA=fruit and access it via process.env.BANANA
console.log(process.env.BANANA);

app.listen(PORT, function () {
  console.log(`Listening to port ${PORT}`);
});

module.exports = app;
