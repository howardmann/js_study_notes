var chai = require('chai');
var expect = chai.expect;
let starting = require('../app/starting.js');

// === MOCHA TIPS
// Note write your tests in pending state before solving each one e.g. it('should do something');
// Explain your beforeEach hooks by passing a description in first param. This will make debugging easier if it throws an error
// Use describe.only(...) and it.only(...) to run specific mocha tests
// Use describe.skip(...) and it.skip(...) to skip specific mocha tests (Use skip instead of commenting out tests)
// When using this.timeout(ms) or this.skip(), do not use arrow functions as it will change the lexical scope of `this`
// To run mocha tests recursively down to sub-folders run command 'mocha ".test/**"' or 'mocha ".test/**/*.spec.js"' to run all sub-folders with extension *.spec.js

describe('Starting', function(){
  beforeEach('set secret question and answer', function(){
    let secret = {
      question: 'What is your favorite city in the world?',
      answer: 'Sydney'
    }
    starting.setup(secret)
  });

  it('should exist', function(){
    expect(starting).to.not.be.undefined;
  });

  describe('.getSecretQuestion', function(){
    it('should return the secret question', function(){
      let input = starting.getSecretQuestion();
      let actual = 'What is your favorite city in the world?';
      expect(input).to.equal(actual);
    });    
  });

  describe('.answerSecret', function(){
    it('should return true if answered correctly', function(){
      let input = starting.answerSecret('Sydney');
      expect(input).to.be.true;
    });
    it('should return false if answered incorrectly', function(){
      let input = starting.answerSecret('Melbourne');
      expect(input).to.be.false;      
    });
  })
})

