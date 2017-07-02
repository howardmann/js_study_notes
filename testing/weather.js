// Module
let weather = module.exports = {};

// Depedencies
let util = require('./util.js');

// Module functions
weather.transformWeather = function(obj){
  return {
    lat: obj.latitude,
    lng: obj.longitude,
    timezone: obj.timezone,
    date: util.dateTransform(obj.currently.time)
  }  
};