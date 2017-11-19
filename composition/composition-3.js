// More composition vs. inheritence fun with Elves
// Examples cover
// 1. Using object inheritence with OLOOs
// 2. Using constructor functions, .call and .prototype
// 3. Using function composition

// First 2 examples are similar and rely on inheritence

// 1. Using object inheritence
let immortal = {
  undying: true 
}

let elf = {
  ears: "pointy",
  weapon: "Bow",
  attack(){
    return `${this.weapon} attack`
  }
}

let darkElf = {
  affiliation: "Dark",
  magic(){
    return `${this.affiliation} magic`
  }
}

Object.setPrototypeOf(elf, immortal)
Object.setPrototypeOf(darkElf, elf)
let legolas = Object.create(elf)
console.log(legolas.ears); // pointy
console.log(legolas.undying); // true
console.log(legolas.attack()); // Bow attack

// It is linked to the ancestory object
immortal.undying = false
console.log(legolas.undying); // false
immortal.undying = true

let illidan = Object.create(darkElf)
console.log(illidan.ears); // pointy
console.log(illidan.undying); // true
console.log(illidan.affiliation); // Dark
console.log(illidan.attack()); // Bow attack
console.log(illidan.magic()); // Dark magic

// 2. Using constructor functions
// We use .call(this) to inherit from other factory functions
var Immortal = function(){
  this.undying = true
}

var Elf = function(){
  Immortal.call(this)
  this.ears = "pointy"
  this.weapon = "Bow"
  this.attack = function(){
    return `${this.weapon} attack`
  }
}

var DarkElf = function(){  
  Elf.call(this)
  this.affiliation = "Dark"
}

// We can set prototype of constructor functions after the fact
DarkElf.prototype.magic = function(){
  return `${this.affiliation} magic`
} 

let illidan2 = new DarkElf()
console.log(illidan2.ears); // pointy
console.log(illidan2.undying); // true
console.log(illidan2.affiliation); // Dark
console.log(illidan2.attack()); // Bow attack
console.log(illidan2.magic()); // Dark magic

// We cannot replace the orirignal constructor function's properties using prototype (likely due to function scope?)
DarkElf.affiliation = 'poison'
console.log(illidan2.affiliation); // Dark
// But we cannot replace other .prototype settings
DarkElf.prototype.magic = () => 'beans'
console.log(illidan2.magic());

// 3. Using composition
let makeAttack = function(weapon){
  return {
    attack(){
      return `${weapon} attack`
    }
  }
}

// ES6 sugar
let makeMagic = (affiliation) => ({
  magic: () => `${affiliation} magic`
})

let DarkElf3 = function(){
  let state = {
    undying: true,
    ears: 'pointy',
    weapon: 'Bow',
    affiliation: 'Dark'
  }
  return Object.assign(state,
    makeAttack(state.weapon),
    makeMagic(state.affiliation)
  )
}

let illidan3 = DarkElf3()
console.log(illidan3.ears); // pointy
console.log(illidan3.undying); // true
console.log(illidan3.affiliation); // Dark
console.log(illidan3.attack()); // Bow attack
console.log(illidan3.magic()); // Dark magic

// Now we can build anything we want
let HandsomeElf = function(){
  let state = {
    looks: 'amazing',
    weapon: 'Charm',
    affiliation: 'Sexy Time'
  }
  let makeChangeState = () => {
    return {
      changeState: (weapon) => state.weapon = weapon
    }
  }
  return Object.assign(state,
    makeAttack(state.weapon),
    makeMagic(state.affiliation),
    makeChangeState()
  )
}

let howieElf = HandsomeElf()
console.log(howieElf.looks); // amazing
console.log(howieElf.weapon); // Charm
console.log(howieElf.attack()); // Charm attack
console.log(howieElf.magic()); // Sexy Time magic

// Object.assign creates a new instance of the handsome elf. We do not need to use new
let fakeElf = HandsomeElf()
console.log(fakeElf.looks); // amazing
fakeElf.changeState('banana')
console.log(fakeElf.weapon); // banana

// Proof that it's a new instance
let newElf = HandsomeElf()
console.log(newElf.weapon); // Charm