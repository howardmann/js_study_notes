let tallyArr = require('./util').tallyArr;
let sortObj = require('./util').sortObj;
let $ = require('jquery');

let tally = {
  fruits: ['apple', 'orange'],
  init: function(){
    this.cacheDom($);
    this.render($);
    this.bindEvents($);
  },
  cacheDom: function($){
    this.$tallyForm = $('#tally-form');
    this.$tallyInput = $('#tally-input');
    this.$tallyOutput = $('#tally-output');
  },
  bindEvents: function($){
    this.$tallyForm.on('submit', e => {
      e.preventDefault();
      let fruit = this.$tallyInput.val();
      this.addFruit(fruit);
    })
  },
  addFruit: function($, fruit){
    this.fruits.push(fruit);
    this.$tallyInput.val('');
    this.render($);
  },
  template: function(fruitsArr){
    let fruitsObj = sortObj(tallyArr(fruitsArr));
    let fruitsTallyArr = [];
    for (var prop in fruitsObj) {
      fruitsTallyArr.push([prop, fruitsObj[prop]]);
    }
    var fruitList = fruitsTallyArr.map(fruit => `<li>${fruit[0]}: ${fruit[1]}</li>`).join('');
    return `<ul>${fruitList}</ul>`;
  },
  render: function($){
    let output = this.template(this.fruits);
    this.$tallyOutput.html(output);
  }
}

module.exports = tally;
