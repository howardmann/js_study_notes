// Object.setPrototypeOf(howie, man)
var man = {
  gender: 'male'
}

var howie = {
  name: 'How Dogz',
  talk: function(){
    console.log(`My gender is ${this.gender} and my name is ${this.name}`);
  }
}

// If we call howie.talk() it will yield undefined for gender
howie.talk(); //  My gender is undefined and my name is How Dogz

// But if we set howie to the prototype of man then we get access to gender as well as name
Object.setPrototypeOf(howie, man);
howie.talk(); // My gender is male and my name is How Dogz

// We cannot use bind because it can only set the scope of `this` to one object, either howie or man
let talkMan = howie.talk.bind(man)
talkMan(); // My gender is male and my name is undefined

// Continuing example of prototype
var felix = {
  blabber: function(){
    console.log(`Gender: ${this.gender}, Dad's name: ${this.name}`);
  }
}

// Undefined as `this` has no reference
felix.blabber();  //  Gender: undefined, Dad's name: undefined

// Set prototype to howie which inherits from man
Object.setPrototypeOf(felix, howie);
felix.blabber();  //  Gender: male, Dad's name: How Dogz