// Same example as PubSub but using an Object Literal pattern
const EventEmitter = require('events').EventEmitter;
// We create a new instance of eventEmitter that the object literal has access to. We cannot use inheritance here
const fruitEvents = new EventEmitter();

// Custom class function which will inherit from node event emitter
var FruitBowlLiteral = {
  randomFruit: function() {
    const fruitsArr = ['apple', 'banana', 'pineapple', 'pear', 'orange', 'tomato'];
    let randomFruit = fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
    console.log(`RandomFruit picked: ${randomFruit}`);
    return randomFruit;
  },

  init: function() {
    this.setupTasks();
    // Trigger pickFruit
    fruitEvents.emit('pickFruit', this.randomFruit());
  },

  setupTasks: function(){
    // We must register .on functions first before triggering emit
    fruitEvents.on('pickFruit', FruitBowlLiteral.prepareFruit);
    fruitEvents.on('juiceFruit', FruitBowlLiteral.sellFruit);         
  },

  prepareFruit: (randomFruit) => {
    let juice = `${randomFruit} juice`;
    console.log(`PreparedFruit: ${juice}`);
    
    fruitEvents.emit('juiceFruit', juice);
  },

  sellFruit: function (randomFruit) {
    console.log(`Sold Fruit: ${randomFruit}`);
  }
}

FruitBowlLiteral.init();
// Output
// RandomFruit picked: pineapple
// PreparedFruit: pineapple juice
// Sold Fruit: pineapple juice

module.exports = {FruitBowlLiteral, fruitEvents};