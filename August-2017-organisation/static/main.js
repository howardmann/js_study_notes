var fruit = require('../fruits');

var template = function(randomFruit){
  return `
    <div style="background-color:${randomFruit.color};padding: 20px">
      My favorite fruit is ${randomFruit.fruit}
    </div>
  `
} 

window.setInterval(function(){
  var randomFruit = fruit.random();
  document.getElementById('main').innerHTML = template(randomFruit);
},1000);