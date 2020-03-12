const route = require("express").Router();
route.use("/create", require("./quiz/createQuiz"));

module.exports = route;
