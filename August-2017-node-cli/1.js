#!/usr/bin/env node
// If we use the shebang script above we can run this similar to a bash script
// In terminal run chmod 700 1.js
// Then we can run the file as an executable ./1.js --help

// Module to parse args with args given as --key==value
let args = require('yargs-parser')(process.argv.slice(2));

let printHelp = function(){
  console.log(`
    Help usage:
    --name      say hello to {NAME}
    --random    print random fruit
    --help      print help  
  `);  
}

let printFruit = function(){
  const fruits = ['apple', 'orange', 'banana', 'pear', 'rockmelon']
  let random = fruits[Math.floor(Math.random() * fruits.length)];
  console.log(random);
}

let valid = args.random || args.name;

if (args.help || !valid) {
  printHelp();
  // Node way of stopping execution i.e. return
  process.exit(1);
}

if (args.random) {
  printFruit();
  process.exit(1);
}

console.log(`Hello ${args.name}`);
