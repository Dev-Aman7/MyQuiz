module.exports = app => {
  const login = require("../auth/login/login");
  app.use("/auth", require("../auth"));
};
