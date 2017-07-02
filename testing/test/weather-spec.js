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
  })

});