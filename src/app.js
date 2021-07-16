const port = 3000 || process.env.PORT;
const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const publicDirectory = path.join(__dirname, "../public");

const viewPath = path.join(__dirname, "../templates/views");
app.set("views", viewPath);

const partialPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialPath);

app.set("view engine", "hbs");
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather | Home",
  });
});

const forecast = require("./tools/forcast");
const geocode = require("./tools/geocode");
app.get("/weatherpage", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longtiude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location: data.location,
        forecast: forcastData,
      });
    });
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "Weather App",
  });
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}.. Server is Up`);
});
