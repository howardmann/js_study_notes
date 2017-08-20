// [5] Async */ KISS - Same example as 4 but using Promises and setTimout to simulate async code and database fetches
// We simulate randomFruit being a database fetch which takes 1 second to return a random fruit
// We wrap this in a Promise and resolve after 1 second with the random fruit
// The init function itself also returns a Promise which first fetches the random fruit .then calls the other methods before finally resolving with a success message
// NOTE: this is still KISS and much cleaner than using event emitters
// For testing, this introduces stubs which we can use to simulate the randomFruit fetching and resolving a Promise with a piece of fruit

var FruitBowlAsync = {
  randomFruit: function () {
    const fruitsArr = ['apple', 'banana', 'pineapple', 'pear', 'orange', 'tomato'];
    let randomFruit = fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
    
    // Simulate delayed fetching random fruit from db. Wrap in promise to resolve after 1 second
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        console.log(`RandomFruit picked: ${randomFruit}`);
        resolve(randomFruit);
      },1000)
    });
  },

  init: function () {
    // Execute async code, fetch randomFruit first, then run and return prepareFruit and then sell the fruit
    return new Promise((resolve, reject) => {
      this.randomFruit().then(randomFruit => {
        return this.prepareFruit(randomFruit);
      }).then((preparedFruit)=> {
        this.sellFruit(preparedFruit);
        resolve('success');
      })
    });
  },

  prepareFruit: (randomFruit) => {
    let juice = `${randomFruit} juice`;
    console.log(`PreparedFruit: ${juice}`);
    return juice;
  },

  sellFruit: function (randomFruit) {
    console.log(`Sold Fruit: ${randomFruit}`);
  }
}

// FruitBowlAsync.init();
// Output
// RandomFruit picked: pineapple
// PreparedFruit: pineapple juice
// Sold Fruit: pineapple juice

module.exports = FruitBowlAsync