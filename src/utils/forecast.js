const axios = require("axios");

async function forecast(latitude, longitude) {
  const forecastEndpoint = "current";
  const forecast_access_token = "ddde70bc45f5c5563341e54d42a796b3";
  const forecastUrl = `http://api.weatherstack.com/${forecastEndpoint}?access_key=${forecast_access_token}&query=${latitude},${longitude}`;

  try {
    const response = await axios.get(forecastUrl);
    const weatherDesc = response.data.current.weather_descriptions[0];
    const temperature = response.data.current.temperature;
    const rain = response.data.current.precip;
    return {
      weatherDesc,
      temperature,
      rain,
    };
  } catch (error) {
    return Promise.reject("Unable to connect to weather services!");
  }
}
module.exports = forecast;
