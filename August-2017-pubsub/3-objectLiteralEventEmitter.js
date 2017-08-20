// [3.] Object Literal pattern
// Same example as 2-inheritenceEventEmitter but using Object literal pattern
// Note object literals cannot inhereit from the eventEmitter, therefore we have two variables 1 for the ltieral and 1 for a new instance of the eventEmitter
// Unlike the construtor example in 2, the FruitBowlLiteral relies on a separate eventEmitter instance (fruitEvents) for its pubsub patterns
// We must remember to register the .on events before calling .emit
// In our example below we have an init function which first calls setupTasks to register the .on events and workflow and then calls the first .emit to trigger the process

const EventEmitter = require('events').EventEmitter;
// We create a new instance of eventEmitter that the object literal has access to. We cannot use inheritance here
const fruitEvents = new EventEmitter();

// Objet Literal
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