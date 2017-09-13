// [6] Composition - Build based on what things do not what things are
// Here we transform our methods into separate functions that return object literals
// We can then compose new object literals by using these functions as building blocks
// Example below shows how we build a FruitComp object which accepts a product arg of what we are building
// We then build a fruitbowl and fruitsalad product
// Final example shows how we can build a new PetComp object which uses only randomString and sellItem

let composition = module.exports = {};

composition.randomString = function(arrString){
  return {
    randomString: function(){
      let random = arrString[Math.floor(Math.random() * arrString.length)];
      console.log(`Random item picked: ${random}`);
      return random;
    }
  }
}

composition.appendString = function(appendString){
  return {
    prepareString: function(string){
      let prepared = `${string} ${appendString}`;
      console.log(`Prepared: ${prepared}`);
      return prepared;
    }
  }
}

composition.sellItem = function(product){
  return {
    sellItem: function(item){
      let soldItem = `Sold ${product} comprised of: ${item}`
      console.log(soldItem);
      return soldItem
    }
  }
}

// Fruit example
const FruitComp = function(product){
  let obj = Object.assign({},
    composition.randomString(['apple', 'pear', 'orange', 'peach', 'chocolate']),
    composition.appendString('juice'),
    composition.sellItem(product)
  )
  obj.init = function(){
    let randomFruit = this.randomString();
    let preparedFruit = this.prepareString(randomFruit);
    this.sellItem(preparedFruit);
  }
  return obj
}

let fruitBowl = FruitComp('fruit bowl');
let fruitSalad = FruitComp('fruit salad');
fruitBowl.init();
fruitSalad.init();
// console.log ->
// Random item picked: peach
// Prepared: peach juice
// Sold fruit bowl comprised of: peach juice
// Random item picked: peach
// Prepared: peach juice
// Sold fruit salad comprised of: peach juice

// Pets example
const PetComp = function(product){
  let obj = Object.assign({},
    composition.randomString(['puppy', 'kitten', 'goldfish', 'panda']),
    composition.sellItem(product)
  )
  obj.init = function(){
    let randomPet = this.randomString();
    this.sellItem(randomPet);
  }
  return obj;
}

let petToy = PetComp('soft toy');
petToy.init();
// console.log ->
// Random item picked: goldfish
// Sold soft toy comprised of: goldfish

let chineseRestaurant = PetComp('stir fry');
chineseRestaurant.init();
// console.log ->
// Random item picked: goldfish
// Sold soft toy comprised of: goldfish
