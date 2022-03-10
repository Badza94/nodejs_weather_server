const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

app.get("", (req, res) => {
  res.send({
    name: "Dusan",
    age: 27,
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide a location",
    });
  }

  const city = req.query.location;

  geocode(city)
    .then((data) => {
      forecast(data.latitude, data.longitude)
        .then((data) =>
          res.send({
            weatherDesc: data.weatherDesc,
            temperature: data.temperature,
            rain: data.rain,
          })
        )
        .catch((error) => res.send({ error: error }));
    })
    .catch((error) =>
      res.send({
        error: error,
      })
    );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
