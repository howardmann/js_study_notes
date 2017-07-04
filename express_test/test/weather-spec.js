let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let axios = require('axios');

let weather = require('../app/weather.js');

describe('#weather', function(){
  it('should exist', () => expect(weather).to.be.ok);

  describe('.fetch', function(){
    it('should exist', () => expect(weather.fetch).to.be.ok);
    it('should return data', (done) => {
      let coordinates = {
        lat: '20',
        lng: '30'
      }
      let fakeData = {        
        latitude: 20,
        longitude: 30,
        timezone: "Africa/Khartoum"
      }
      let stub = sinon.stub(axios, 'get').returns(Promise.resolve(fakeData));

      weather.fetch(coordinates).then(data =>{
        expect(data).to.eql(fakeData);
      }).then(done,done)
    })
  });

  describe('.deserialize', function(){
    it('should exist', () => expect(weather.deserialize).to.be.ok);
    it('should deserialize weather metadata', () => {
      let input = {
        latitude: 20,
        longitude: 30,
        timezone: "Africa/Khartoum"
      }
      let actual = {
        coordinates: {
          latitude: 20,
          longitude: 30          
        },
        timezone: "Africa/Khartoum"
      }
      expect(weather.deserialize(input)).to.eql(actual);
    });
  })
});