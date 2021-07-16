const request = require("request");
const forcast = (latitude, longtuide, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=25aa4a0666c0b4ddb3a15b6b70dfca52&query=" +
    latitude +
    "," +
    longtuide;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather stack", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, response.body.current.temperature + " Degrees");
    }
  });
};

module.exports = forcast;
