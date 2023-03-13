const request = require("postman-request");

const forecast = (lat, lng, callback) => {
  const weatherOptions = {
    url: `http://api.weatherstack.com/current?access_key=68baaeeedab5bde0212237dda236220f&query=${lat},${lng}`,
    json: true,
  };

  request(weatherOptions, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      const description = weather_descriptions[0];
      const data = `${description}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
