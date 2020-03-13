const db = require("./db/setup");
db.connect();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var authRouter = require("./src/auth");
const faculty = require("./src/faculty");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/faculty", faculty);
const Port = process.env.PORT || 5001;
app.listen(Port, () => {
	console.log("app on", Port);
});
