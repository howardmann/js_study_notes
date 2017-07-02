var chai = require('chai');
var expect = chai.expect;

describe('#weather', function(){
  let weather = require('../weather.js');
  
  it('should exist', function(){
    expect(weather).to.be.ok;
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
        lat: 20,
        lng: 30,
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

});