// KISS - Don't use event emitter if you don't need to
// Object Literal when dealing with async code. Use setTimeout to simulate async

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