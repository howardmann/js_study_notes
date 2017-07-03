var chai = require('chai');
var chaiHTML = require('chai-html');
chai.use(chaiHTML);
var expect = chai.expect;
var sinon = require('sinon');

describe('#weather', function(){
  let weather = require('../weather.js');
  
  it('should exist', function(){
    expect(weather).to.be.ok;
  });

  it('should fetchWeather and transformWeather', function(done){
    let coordinates = {
      lat: '20',
      lng: '30'
    }

    let fakeData = {
      latitude: 20,
      longitude: 30,
      timezone: "Africa/Khartoum",
      currently: {
        time: 1499027144,
        summary: "Clear",
        icon: "clear-night"        
      }
    }

    let actual = {
      coordinates: {
        lat: 20,
        lng: 30
      },
      timezone: "Africa/Khartoum",
      date: "2/7/2017"
    }

    let fakeFetch = {
      getJSON: function(url){
        return Promise.resolve(fakeData);
      }
    }

    weather.fetchWeather(fakeFetch.getJSON, coordinates)
    .then(data =>{
      expect(data).to.eq(fakeData);
      return weather.transformWeather(data)      
    })
    .then(output =>{
      expect(output).to.eql(actual)
    })
    .then(done,done)
  });

  describe('.transformWeather', function(){
    it('should exist', function(){
      expect(weather.transformWeather).to.be.ok;
    });
    it('should return object with relevant properties', function(){
      let input = {
        latitude: 20,
        longitude: 30,
        timezone: "Africa/Khartoum",
        currently: {
          time: 1499027144,
          summary: "Clear",
          icon: "clear-night"
        }
      };
      let actual = {
        coordinates: {
          lat: 20,
          lng: 30
        },
        timezone: "Africa/Khartoum",
        date: "2/7/2017"
      };
      expect(weather.transformWeather(input)).to.eql(actual);
    });
  });

  describe('.fetchWeather', function(){
    it('should exist', function(){
      expect(weather.fetchWeather).to.be.ok;
    });

    it('should call the API and return the data', function(done){
      let coordinates = {
        lat: '20',
        lng: '30'
      }

      let fakeData = {
        latitude: 20,
        longitude: 30,
        timezone: "Africa/Khartoum",
        currently: {
          time: 1499027144,
          summary: "Clear",
          icon: "clear-night"        
        }
      }
      
      // This is our stub, that we are passing as a parameter. It will get called when we call .fetchWeather
      // After it is called it will have context of the coordinates argument it receives
      let fakeFetch = {
        getJSON: function(url){
          let expectedURL = `https://api.darksky.net/forecast/438668b8945bed8564ce3ecc62112a27/${coordinates.lat},${coordinates.lng}?callback=?`
          expect(url).to.equal(expectedURL);
          return Promise.resolve(fakeData);
        }
      }

      weather.fetchWeather(fakeFetch.getJSON, coordinates).then(actual =>{
        expect(actual).to.eql(fakeData);
        done();
      })
      
    })
  });

  describe('.fetchSinon', function(){
    let axios = require('axios');

    it('should exist', function(){
      expect(weather.fetchSinon).to.be.ok;
    })

    it('should fetch data based on coordinates', function(done){
      let coordinates = {
        lat: '20',
        lng: '30'
      }

      let fakeData = {
        latitude: 20,
        longitude: 30,
        timezone: "Africa/Khartoum",
        currently: {
          time: 1499027144,
          summary: "Clear",
          icon: "clear-night"        
        }
      }

      let data = Promise.resolve(fakeData);
      // We stub the axios object being called by our function. i.e. we are replacing the 'get' axios method with a mock function that simple returns the data we want it to
      // We return a Promise that resolves with our fakeData, this simulates an axios promise
      let stub = sinon.stub(axios, 'get').returns(data);

      weather.fetchSinon(coordinates).then(actual =>{
        expect(actual).to.eql(fakeData);
        // Make sure to restore it
        stub.restore();
      }).then(done, done)

      // Mocha syntax: you chain a .then(done,done) after the promise. The first ‘done’ will signal the completion of a successful test to mocha. The second done is called in case of a promise rejection. This is the safest style to use with the ‘done’ callback:
      // See medium post https://wietse.loves.engineering/testing-promises-with-mocha-90df8b7d2e35
      
    });

    it('should handle errors', function(done){
      let coordinates = {
        lat: '20',
        lng: '30'
      }

      // Create new errr and force stub to return an error wrapped in a Promise.reject
      let error = new Error('fail');      
      let data = Promise.reject(error);
      let stub = sinon.stub(axios, 'get').returns(data);      
      
      // Test the error by catching it in the promise
      weather.fetchSinon(coordinates)
        .then(actual => {})
        .catch(err => {
          expect(err).to.equal(error);
          stub.restore();
        })
        .then(done, done)
    });
  });

  describe('.renderHTML', function(){
    it('should exist', ()=>{
      expect(weather.renderHTML).to.be.ok;
    })

    it('should return output in HTML format', ()=>{
      let input = {
        coordinates: {
          lat: 20,
          lng: 30
        },
        timezone: "Africa/Khartoum",
        date: "2/7/2017"
      }

      let actual = `
        <p>Coordinates: 20, 30<p>
        <p>Timezone: Africa/Khartoum</p>
        <p>Date: 2/7/2017</p>
      `

      expect(weather.renderHTML(input)).html.to.equal(actual);

      input = {
        coordinates: {
          lat: 50,
          lng: 18
        },
        timezone: "Europe/Warsaw",
        date: "2/7/2017"        
      }

      actual = `
        <p>Coordinates: 50, 18<p>
        <p>Timezone: Europe/Warsaw</p>
        <p>Date: 2/7/2017</p>
      `

      expect(weather.renderHTML(input)).html.to.equal(actual);
    });

    it('should handle objects with missing properties', ()=>{
      let input = {
        timezone: "Africa/Khartoum",
        date: "2/7/2017"
      }
      
      let actual = `
        <p>Coordinates:<p>
        <p>Timezone: Africa/Khartoum</p>
        <p>Date: 2/7/2017</p>
      `
      expect(weather.renderHTML(input)).html.to.equal(actual);

      input = {
        coordinates: {
          lng: 18
        },
        timezone: "Africa/Khartoum",
        date: "2/7/2017"                
      }

      actual = `
        <p>Coordinates: , 18<p>
        <p>Timezone: Africa/Khartoum</p>
        <p>Date: 2/7/2017</p>      
      `

      expect(weather.renderHTML(input)).html.to.equal(actual);
    })
  })

  describe('appendDOM', function(){
    it('should exist', function(){
      expect(weather.appendDOM).to.be.ok;
    });

    it('should append html to DOM', function(){
      let cheerio = require('cheerio');
      let dom = `
        <html>
          <body>
            <h1>Hello world</h1>
            <div id=app></div>          
          </body>
        </html>
      `

      let html = `
        <p>Coordinates:<p>
        <p>Timezone: Africa/Khartoum</p>
        <p>Date: 2/7/2017</p>      
      `

      // Use cheerio to simulate jQuery object loading html on page
      let $ = cheerio.load(dom);
      let selector = '#app';

      // Call function and save to variable $div
      weather.appendDOM($, selector, html);
      expect($('#app').html()).html.to.equal(html);

    });
  });
});

