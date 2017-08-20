// Composition - Build based on what things do not what things are

// ES5 way of a function taking an argument and returning an objct literal
var bark = function(state){
  return {
    bark: function(){
      console.log(`Woof my name is ${state.name}`)
    }
  }
}

// ES6 method using arrow functions
let laser = (state) => {
  return {laser: () => console.log(`My laser beam color is ${state.color}`)}
}

// ES6 method shortcut to not write return. Use brackets around curly braces to return an object literal
let kill = (state) => ({
  kill: () => console.log(`I have killed you with ${state.weapon}`)
})

// A function which returns a new Object that is composed of methods outlined above. Define the state in the function and pass it through
let murderRobotDog = function(name){
  var state = {
    name,
    color: 'red',
    weapon: 'spear'
  }
  return Object.assign({},
    bark(state),
    laser(state),
    kill(state)
  )
}

// Creates new instances of the object
var sniffles = murderRobotDog('sniffles');
console.log(sniffles);
// { bark: [Function: bark],
//   laser: [Function: laser],
//   kill: [Function: kill] }

sniffles.bark()
// Woof my name is sniffles

var rex = murderRobotDog('rex');
rex.bark();
// Woof my name is rex




// Object.assign
let fruit = {
  banana: {
    color: 'yellow'
  },
  apple: {
    color: 'red'
  }
}
let kiwi = {
  color: 'green'
}
let pineapple = {
  color: 'orange'
}

let fruitV2 = Object.assign(fruit, {kiwi, pineapple});
console.log(fruitV2);
// { banana: { color: 'yellow' },
//   apple: { color: 'red' },
//   kiwi: { color: 'green' },
//   pineapple: { color: 'orange' } }

