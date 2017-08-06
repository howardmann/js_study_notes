let homeModule = require('./home');
let tally = require('./tally');

$(document).ready(function(){
  console.log('ready');
  homeModule.init();
  tally.init();
});