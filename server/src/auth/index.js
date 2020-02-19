const authRouter = require("express").Router();
authRouter.use("/login", require("./login/login"));
authRouter.use("/signup", require("./signup/signup"));
module.exports = authRouter;
