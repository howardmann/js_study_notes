let express = require('express');
let app = express();

let fruits = require('../fruits');

app.get('/', function (req, res, next) {
  let randomFruit = fruits.random();
  res.send(randomFruit);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Listening to port ${PORT}`);
});

module.exports = app;
