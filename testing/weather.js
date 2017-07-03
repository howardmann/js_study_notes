// Module
let weather = module.exports = {};

// Depedencies
let util = require('./util.js');
let axios = require('axios');

// Module functions
/**
* Transforms raw object into custom weather object and relevant properties
* @param  {Object} obj {data format from returned from API}
* @return {Object} {weather object with relevant properties}
*/
weather.transformWeather = function(obj){
  return {
    coordinates: {
      lat: obj.latitude,
      lng: obj.longitude
    },
    timezone: obj.timezone,
    date: util.dateTransform(obj.currently.time)
  }  
};

/**
* Fetches weather data from api using ajax library or jQuery as default
* @param  {Promise} fetch       {ajax function for fetching ajax data}
* @param  {Object} coordinates {lat: number, lng: number}
* @return {Promise} {promise returning data}
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
* Fetches weather data from api using axios
* @param  {Object} coordinates {lat: number, lng: number}
* @return {Promise} {axios promise returning data}
*/
weather.fetchSinon = function(coordinates){
  let lat = coordinates.lat;
  let lng = coordinates.lng;
  // Note we add ?callback=? at end to set dataType as JSONP, this is a jQuery peculiarity
  var url = `https://api.darksky.net/forecast/438668b8945bed8564ce3ecc62112a27/${lat},${lng}?callback=?`
  return axios.get(url)
}

/**
* Transforms weather object into HTML string
* @param  {Object} obj {Weather data including coordinates, timezone and date}
* @return {String} {HTML string output}
*/
weather.renderHTML = function(obj){
  // Handle missing parameters to avoid throwing errors
  let coordinates = obj.coordinates || {};
  let lat = coordinates.lat || '';
  let lng = coordinates.lng || '';
  let coordinatesHTML = (!!lat || !!lng) ? `${lat}, ${lng}` : '';

  return `
    <p>Coordinates: ${coordinatesHTML}<p>
    <p>Timezone: ${obj.timezone}</p>
    <p>Date: ${obj.date}</p>
  `
}

/**
* Appends string to id specified in DOM
* @param  {Object} $ {jQuery selector, for testing purposes}
* @param  {String} selector {CSS selector in DOM that string will be rendered to}
* @param  {String} html {HTML weather string}

*/
weather.appendDOM = function($, selector, html){
  return $(selector).append(html);  
}