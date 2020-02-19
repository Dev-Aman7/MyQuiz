require("dotenv").config();
module.exports = {
  auth: (req, res, next) => {
    var token = jwt.verify(req.cookies.token, process.env.Secret);
    if (token.key == "hello") {
      next();
    } else {
      res.json({
        code: 0,
        redirectTo: "/",
        message: "Invalid entry"
      });
    }
  }
};
