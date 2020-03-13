const route = require("express").Router();
route.use("/create", require("./quiz/createQuiz"));
route.use("/getQuizes", require("./quiz/getQuizes"));
module.exports = route;
