const db = require("./db/setup");
db.connect();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./src/routes/routes")(app);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log("app on", Port);
});
