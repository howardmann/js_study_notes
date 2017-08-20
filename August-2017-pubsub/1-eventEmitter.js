// [1.] Example below of how to use Node.js built in event emitter
// This follows the pub sub pattern where: 
// a. firstly you register .on the 'event' string you want to listen for and then pass in the function you want executed
// b. emit the event passing through optional data .emit
// c. this will then trigger the function registered by the .on listeners/ subscribers

// require the core node EventEmitter from the node events module
const EventEmitter = require('events').EventEmitter;

// create an instance of the EventEmitter object
const events = new EventEmitter();

// register a listener for the random fruit event
events.on('randomFruit', function(fruit){
  console.log(`Received string ${fruit}`);
})

// randomly return a fruit
events.randomFruit = function(){
  const fruitsArr = ['apple', 'banana', 'pineapple', 'pear'];
  return fruitsArr[Math.floor(Math.random() * fruitsArr.length)]
}

// emit the event
events.emit('randomFruit', events.randomFruit());


module.exports = events;