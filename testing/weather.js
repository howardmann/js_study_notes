// Module
let weather = module.exports = {};

// Depedencies
let util = require('./util.js');
let axios = require('axios');

// Module functions
/**
 * transforms weather object to return desired properties
 */
weather.transformWeather = function(obj){
  return {
    lat: obj.latitude,
    lng: obj.longitude,
    timezone: obj.timezone,
    date: util.dateTransform(obj.currently.time)
  }  
};

/**
 * Fetches current weather based on coordinates. Also pass in the jQuery promise
 */
weather.fetchWeather = function(fetch, coordinates){
  // If fetch argument is not given and jQuery exists on the page as a global variable then use ajax as fetch
  if ((!fetch) && (typeof $ !== 'undefined')) {
    fetch = $.getJSON.bind($);
  }
  let lat = coordinates.lat;
  let lng = coordinates.lng;
  // Note we add ?callback=? at end to set dataType as JSONP, this is a jQuery peculiarity
  var url = `https://api.darksky.net/forecast/438668b8945bed8564ce3ecc62112a27/${lat},${lng}?callback=?`
  return fetch(url);
};

/**
 * Same as above but using sinon to stub vs. passing in promise
 */ 
weather.fetchSinon = function(coordinates){
  let lat = coordinates.lat;
  let lng = coordinates.lng;
  // Note we add ?callback=? at end to set dataType as JSONP, this is a jQuery peculiarity
  var url = `https://api.darksky.net/forecast/438668b8945bed8564ce3ecc62112a27/${lat},${lng}?callback=?`
  return axios.get(url).then(data => {
    return data
  }).catch(err => Promise.reject(err));
}