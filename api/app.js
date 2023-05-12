/**
 * Express App
 */
const express = require("express");
const app = express();

// middleware
app.use(express.json());

/////////////////////// ROUTE FONCTION DU JEU ///////////////////////
/////                                                           /////
const moves = ['pierre', 'papier', 'ciseaux'];

app.post("/game", (req, res) => {
  const { move1, move2 } = req.body;

  if (!moves.includes(move1) || !moves.includes(move2)) {
    res.status(400).json({ error: "Coup invalide. Veuillez choisir entre pierre, papier ou ciseaux." });
    return;
  }

  const result = determineWinner(move1, move2);
  res.json({ result });
});

function determineWinner(move1, move2) {
  if (move1 === move2) {
    return 'Égalité !' + ' : ' + `${move1}` + ' et ' + `${move1}` + ' font match nul';
  } else if (
    (move1 === 'pierre' && move2 === 'ciseaux') ||
    (move1 === 'papier' && move2 === 'pierre') ||
    (move1 === 'ciseaux' && move2 === 'papier')
  ) {
    return 'Joueur 1 remporte la partie !';
  } else {
    return 'Joueur 2 remporte la partie !';
  }
}
/////                                                           /////
/////////////////////// ROUTE FONCTION DU JEU ///////////////////////

app.use(function (req, res, next) {
  if (req.headers["accept-version"]) {
    req.api_version = req.headers["accept-version"];
  } else if (req.query["_apiVersion"]) {
    req.api_version = req.query["_apiVersion"];
  } else {
    req.api_version = "v1";
  }
  next();
});

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
