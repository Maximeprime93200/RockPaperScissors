/**
 * Express App
 */
const express = require("express");
const app = express();

// middleware
app.use(express.json());
const validateChoice = require("./middleware/choixvalide");
const determineWinner = require("./middleware/determineWinner");
const formatMiddleware = require("./middleware/format");
app.use(formatMiddleware);

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

// Routes
//app.use(
//  "/users",
//  apiVersions({
//    v1: require("./routes/v1/users"),
//    v2: require("./routes/v2/users"),
//  })
//);
app.use("/v1/users", require("./routes/v1/users"));
app.use("/v2/users", require("./routes/v2/users"));

app.get("/", async (req, res) => {
  const i18next = await require("./lib/i18n");
  console.log(i18next);
  i18next.changeLanguage(req.headers["accept-language"]);
  //res.send(i18next.t("Hello"));
  //req.t("Hello {{name}}", { name: "John" });
  //res.t("Hello {{name}}!", { name: "John" });
});

module.exports = app;