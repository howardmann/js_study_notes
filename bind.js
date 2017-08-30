// Bind example 1
var dog = {
  sound: 'woof',
  talk: function(){
    console.log(this.sound);
  }
}

// Will work because `this` refers to the dog object
dog.talk(); // woof

// If we reassign the talk method and call it, it wont work because `this` now refers to the global object
let talk = dog.talk;
talk(); // undefined

// But if we bind the scope of `this` back to the dog object, it will work again
let boundTalk = talk.bind(dog);
boundTalk();  // woof

// Bind example 2
var sayName = function(){
  console.log(this.name);
}

var howie = {
  name: 'How Dogz',
  speak: sayName
}

// Calling sayName will be undefined as `this` refers to global object
sayName(); // undefined

// Calling it in the context of howie object will call reference `this` to howie
howie.speak(); // How Dogz

// Again calling sayName on its own will return undefined
var chat = sayName;
chat(); // undefined

// But if we bind sayName to howie it will call the name
var chatBound = sayName.bind(howie);
chatBound();  // How Dogz