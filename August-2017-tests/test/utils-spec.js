var chai = require('chai');
var expect = chai.expect;
let util = require('../util.js');

describe('#util', function(){
  it('should exist', function(){
    expect(util).to.not.be.undefined;
  });

  describe('.sumArr', function(){
    let sumArr = util.sumArr;
    it('should exist', () => expect(sumArr).to.not.be.undefined);
    
    it('should sum an arr of numbers', () => {
      let input = [30,10,2];
      let actual = 42;
      expect(sumArr(input)).to.equal(actual);

      input = [30,10,3];
      actual = 43;
      expect(sumArr(input)).to.equal(actual);
    });

    it('should parse integer strings', () => {
      let input = ['30','10','2'];
      let actual = 42;
      expect(sumArr(input)).to.equal(actual);

      input = ['30',11,'2'];
      actual = 43;
      expect(sumArr(input)).to.equal(actual);      
    });

    it('should throw meaningful error if array element is a non integers', () => {
      let input = [
        [30,10,'banana',2],
        [30,10,2,undefined],
        [true,10,2,2],
        [30,false,2,'orange']
      ]

      let actual = [
        'Not a number (el, index): (banana, 2)',
        'Not a number (el, index): (undefined, 3)',
        'Not a number (el, index): (true, 0)',
        'Not a number (el, index): (false, 1)'
      ]

      input.forEach( (el, i) => {
        expect(() => sumArr(el)).to.throw(actual[i])
      })
    });

    it('should only accept Array as argument', () => {
      let input = ['banana', undefined, 42, true, 0, {name: 'joe'}];
      let actual = 'Must pass array as argument';

      input.forEach(el => {
        expect(() => sumArr(el)).to.throw(actual);
      })
    })
  });

  describe('.tallyArr', function(){
    let tallyArr = util.tallyArr;
    it('should exist', () => expect(tallyArr).to.not.be.undefined);
    it('should tally an array of strings', () => {
      let input = ['apple', 'apple', 'orange', 'pear', 'orange', 'pineapple', 'peach'];
      let actual = {
        apple: 2,
        orange: 2,
        pear: 1,
        pineapple: 1,
        peach: 1
      }
      expect(tallyArr(input)).to.eql(actual);
      
      input = ['howie', 'burger', 'howie'];
      actual = {
        howie: 2,
        burger: 1
      }
      expect(tallyArr(input)).to.eql(actual);

      input = ['howie', 'burger', 'howie', undefined, false];
      actual = {
        howie: 2,
        burger: 1,
        undefined: 1,
        false: 1
      }
      expect(tallyArr(input)).to.eql(actual);
    });
    it('should tally numbers', () => {
      let input = [42,42,7,2,7,42];
      let actual = {
        '42': 3,
        '7': 2,
        '2':1
      };
      expect(tallyArr(input)).to.eql(actual);
    });

    it('should only accept Array as argument', () => {
      let input = ['banana', undefined, 42, true, 0, {name: 'joe'}];
      let actual = 'Must pass array as argument';

      input.forEach(el => {
        expect(() => tallyArr(el)).to.throw(actual);
      })
    })
  });

  describe('.sortObj', function(){
    let sortObj = util.sortObj;
    it('should exist', () => expect(sortObj).to.not.be.undefined);

    it('should sort an object from highest to lowest number', () => {
      let input = {
        apple: 2,
        orange: 10,
        banana: 1,
        peach: 7
      };

      let actual = {
        orange: 10,
        peach: 7,
        apple: 2,
        banana: 1
      };
      expect(sortObj(input)).to.eql(actual);
    });

    it('should only accept object as argument', () => {
      let input = [42, undefined, [1,2,3]];
      let actual = 'Must pass object as argument';

      input.forEach(el => {
        expect(() => sortObj(el)).to.throw(actual);
      })
    })
    
  })

  describe('.tallyArr and .sortObj', function(){
    let tallyArr = util.tallyArr;
    let sortObj = util.sortObj;

    it('should tally an array and then sort from greatest to smallest', () => {
      let input = ['banana','banana', 'apple','pear', 'pear', 'pear', 'pear'];
      let actual = {
        pear: 4,
        banana: 2,
        apple: 1
      }
      expect(sortObj(tallyArr(input))).to.eql(actual);
    })
  })
});