const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmVzaWRlbnRhbGllbiIsImEiOiJja3pueHA5MjQwNmY1MnJwZTN0ODgxYmZhIn0.CLGMwnA3QSr2kp9GvcHNRg&limit=1";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const place = body.features[0];
      const [lng, lat] = place.center;
      const { place_name } = place;
      callback(undefined, {
        lat,
        lng,
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
