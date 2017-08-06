var chai = require('chai');
var expect = chai.expect;
let tally = require('../app/tally.js');
const chaiHtml  = require('chai-html');
let cheerio = require('cheerio');
 
// Register the plugin 
chai.use(chaiHtml);


describe('#tally', function(){
  // Load cheerio to simulate DOM and replace jQuery selector for testing  
  let $ = cheerio.load(`
    <h1>Tally</h1>
    <form id="tally-form">
      <input id="tally-input" type="text" placeholder="Enter favourite color">
      <input type="submit">
    </form>
    <div id="tally-output"></div>
  `);
  tally.cacheDom($);
  
  it('should exist', function(){
    expect(tally).to.not.be.undefined;
  });

  describe('.template', function(){
    it('should return correct html', () => {
      let input = ['apple', 'orange', 'apple'];
      let actual = `
        <ul>
          <li>apple: 2</li>
          <li>orange: 1</li>
        </ul>
      `
      expect(tally.template(input)).html.to.equal(actual);
    })
  });

  describe('.render', function(){
    it('should render starting elements', () => {
      // Call render
      tally.render($);      
      // Check renders
      let tallyOutput = $('#tally-output').html();
      let actual = `
        <ul>
          <li>apple: 1</li>
          <li>orange: 1</li>
        </ul>      
      `
      expect(tallyOutput).html.to.equal(actual);
      
    })
  });

  describe('.addFruit', function(){
    it('should add fruit to the relevant tally', () => {
      let input = 'orange';
      tally.addFruit($, input);
      let tallyOutput = $('#tally-output').html();
      let actual = `
        <ul>
          <li>orange: 2</li>
          <li>apple: 1</li>
        </ul>      
      `
      expect(tallyOutput).html.to.equal(actual);

    })

  })
});

