// prototype examples for function constructors

var Dog = function(){
  this.sound = 'woof';
}

// You cannot set a property back on a constructor function directly
Dog.breed = 'canine';
var fluffy = new Dog();
console.log(fluffy.breed); // undefined

// You can use the `prototype` property to set the property. This is the equivalent of writig it as this.breed = 'canine' when setting up at beginning
Dog.prototype.breed = 'canine'
console.log(fluffy.breed); // canine

// You can also set functions. The scope of `this` will refer to the Dog object
Dog.prototype.bark = function(){
  console.log(this.sound);
}

fluffy.bark();  // woof