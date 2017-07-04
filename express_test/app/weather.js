let weather = module.exports = {};

var axios = require('axios');

/**
* Fetches weather API data based on corodinates
* @param  {Object} coordinates {latitude: String, longitude: String}
* @return {Promise} {axios promise}
*/
weather.fetch = function(coordinates){
  let lat = coordinates.lat;
  let lng = coordinates.lng;
  let url = `https://api.darksky.net/forecast/438668b8945bed8564ce3ecc62112a27/${lat},${lng}`
  return axios.get(url)
}

/**
* Deserializes weather API data into key weather metadata object
* @param  {Object} data {data fetched from weather.fetch}
* @return {Object} {deserialized data}
*/
weather.deserialize = function(data){
  return {
    coordinates: {
      latitude: data.latitude,
      longitude: data.longitude
    },
    timezone: data.timezone
  }
}