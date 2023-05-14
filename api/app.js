/**
 * Express App
 */
const express = require("express");
const app = express();

// middleware
app.use(express.json());
const validateChoice = require("./middleware/choixvalide");
const determineWinner = require("./middleware/determineWinner");

/////////////////////// ROUTE FONCTION DU JEU ///////////////////////
/////                                                           /////
app.post("/game", validateChoice, determineWinner, (req, res) => {
  const { move1, move2 } = req.body;
{}
  const result = determineWinner(move1, move2);
  res.json({ result });
});

/////                                                           /////
/////////////////////// ROUTE FONCTION DU JEU ///////////////////////

app.response.render = function (users) {
  this.format({
    "application/json": () => this.json(users),
    "text/plain": () => {
      this.setHeader("Content-Type", "text/plain");
      if (!Array.isArray(users)) users = [users];
      this.send(users.map((u) => JSON.stringify(u)).join("\n"));
    },
    "text/csv": () => {
      this.setHeader("Content-Type", "text/csv");
      if (!Array.isArray(users)) users = [users];
      this.write(Object.keys(users[0].dataValues).join(";") + "\n");
      this.write(
        users.map((u) => Object.values(u.dataValues).join(";")).join("\n")
      );
      this.end();
    },
    default: () => this.json(users),
  });
};

const traduction = require("./middleware/traduction");
const version = require("./middleware/format");
app.use(traduction);
app.use(version);
app.use("/hateoas", require("./middleware/hateoas"));

module.exports = app;