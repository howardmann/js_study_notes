// require events and util which will be used to extend to an emitter
const EventEmitter = require('events').EventEmitter;
const util = require('util');

// Custom class function which will inherit from node event emitter
let FruitBowl = function(){
  // Define a callback to be used in success message
  var callback;
  // Bind this to Node.js EventEmitter, provide access to .on and .emit
  EventEmitter.call(this);

  this.randomFruit = function () {
    const fruitsArr = ['apple', 'banana', 'pineapple', 'pear', 'orange', 'tomato'];
    let randomFruit = fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
    console.log(`RandomFruit picked: ${randomFruit}`);
    return randomFruit;
  }

  // Node EventEmitter (PubSub pattern) can help us manage complex processes and workflows sequentially
  // Note: numbering is out of order because 

  // 1. Start by emitting first event and passing in a randomFruit
  this.init = function (cb) {
    // Set init callback
    callback = cb;
    this.emit('pickFruit', this.randomFruit());
  }  

  // 3. PrepareFruit will run its logic then call juiceFruit next passing through the transformed object
  this.prepareFruit = function (randomFruit) {
    let juice = `${randomFruit} juice`;
    console.log(`PreparedFruit: ${juice}`);
    this.emit('juiceFruit', juice);
  }
   
  // 2. After pickFruit is called call prepareFruit
  this.on('pickFruit', this.prepareFruit);

  // 5. End of process will log out a success message and callback
  this.sellFruit = function (randomFruit) {
    console.log(`Sold Fruit: ${randomFruit}`);
    callback(null, {
      message: 'success'
    })
  }

  // 4. When juiceFruit is complete, then its time to call sellFruit
  this.on('juiceFruit', this.sellFruit);

}

// Use node util.inherets for FruitBowl to inhereit from the EventEmitter methods including .on and .emit
util.inherits(FruitBowl, EventEmitter);

// To initialize code, create a new instance of FruitBowl and then call init
var fruit1 = new FruitBowl();
// fruit1.init(function(err, result){
//   console.log(result);
// });
// Output
// RandomFruit picked: pineapple
// PreparedFruit: pineapple juice
// Sold Fruit: pineapple juice

module.exports = FruitBowl;