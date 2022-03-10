const axios = require("axios");

async function geocode(address) {
  const geo_access_token =
    "pk.eyJ1IjoiYmFkemEiLCJhIjoiY2wwaDJvcjViMDJmczNicnd6NmIxaWhuayJ9.dCI0217CDBbXSggiJykrHw";
  const geoEndpoint = "mapbox.places";
  const geoSearchText = encodeURIComponent(address); //'Los Angeles';
  const limit = 1;
  const geoUrl = `https://api.mapbox.com/geocoding/v5/${geoEndpoint}/${geoSearchText}.json?access_token=${geo_access_token}&limiit=${limit}`;

  try {
    const response = await axios.get(geoUrl);
    const longitude = response.data.features[0].center[0];
    const latitude = response.data.features[0].center[1];
    return {
      latitude,
      longitude,
      location: response.data.features[0].place_name,
    };
  } catch (error) {
    return Promise.reject("Unable to find location. Try another search.: ");
  }
}

module.exports = geocode;
