let addModule = require('./add');
let capitalize = require('lodash/capitalize');

let homeModule = {
  init: function(){
    this.$home = $('#home');        
    this.render();
    this.bindEvents();
  },
  bindEvents: function(){
    $('button.btn').on('click', () => this.sayName());
    $('button.btn-add').on('click', () => this.callAddModule(this.$home));
  },
  sayName: function(){
    let name = capitalize('jake')
    alert(`say my name: ${name}`)
  },
  callAddModule: function(element){
    addModule.init(element);
  },
  render: function(){
    let html = `
    <h2>Home MODULE</h2>
    <button class="btn">CLICK ME MAN</button>  
    <button class="btn-add">ADD NEW MODULE</button>
    `;
    this.$home.append(html)
  }
}

module.exports = homeModule;