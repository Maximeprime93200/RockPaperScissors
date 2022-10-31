const express = require("express");
const db = require("./lib/db");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
