// KISS - Don't use event emitter if you don't need to
// Object Literal without using event Emitters

var FruitBowlSync = {
  randomFruit: function () {
    const fruitsArr = ['apple', 'banana', 'pineapple', 'pear', 'orange', 'tomato'];
    let randomFruit = fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
    console.log(`RandomFruit picked: ${randomFruit}`);
    return randomFruit;
  },

  init: function () {
    let randomFruit = this.randomFruit();
    let preparedFruit = this.prepareFruit(randomFruit);
    this.sellFruit(preparedFruit);
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

FruitBowlSync.init();
// Output
// RandomFruit picked: pineapple
// PreparedFruit: pineapple juice
// Sold Fruit: pineapple juice

module.exports = FruitBowlSync