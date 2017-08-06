let addModule = {
  init: function(div){
    this.$main = div;
    this.render();
  },
  render: function(){
    let html = `OMG A NEW MODULE`;
    this.$main.append(html);
  }
};

module.exports = addModule;