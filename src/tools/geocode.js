const request = require("request");

const geocode = (place, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    place +
    ".json?access_token=pk.eyJ1IjoiZXNsYW1ub3VyIiwiYSI6ImNrcXVsZWFieDA1cTgycHA5N21pM2hqbTIifQ.Ynfo0nGkK2j96byKJJ3iew";
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(error, undefined);
    } else if (response.body.features.length == 0) {
      callback("Invalid Place", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longtiude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
