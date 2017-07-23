var express = require('express');
var app = express();
var Util = require('./utils');
var db = require('./db');

app.get('/', (req, res, next) => {
  res.send('ok');
});

app.get('/word/:string', (req, res, next) => {
  let string = req.params.string;
  let capitalize = Util.capitalize;
  let output = capitalize(string);
  res.send(output);
});

app.get('/github/:username', (req, res, next) => {
  let username = req.params.username;
  db.fetchGithub(username).then(data => {
    res.json(data.data)
  })
});

app.get('/colors', (req, res, ext) => {
  db.fetchAsync('/colors.json').then(data => {
    res.json(JSON.parse(data));
  })
})

app.get('/names', (req, res, ext) => {
  let data = db.fetchSync('names');
  res.json(data)
})

app.listen(3000, () => console.log('Listening on port 3000'));