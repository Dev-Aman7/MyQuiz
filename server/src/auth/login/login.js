const express = require("express");
const router = express.Router();
const person = require("../../Schemas/person");
const _ = require("underscore");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.all("/", (req, res) => {
  console.log("login ");
  person
    .findOne({ username: req.body.username }, (err, result) => {
      if (err) {
        console.log("error");
        res.status(403).json({
          code: "1",
          message: "error while fetching user information while sign in"
        });
      } else {
        if (!_.isEmpty(result)) {
          //first one is password by user second one is from db
          // && result.administrator == true

          bcrypt.compare(req.body.password, result.password, (err, val) => {
            console.log(val);
            if (val == true) {
              var token = jwt.sign(
                {
                  username: req.body.username,
                  accountType: req.body.accountType,
                  key: "Hello"
                },
                process.env.Secret
              );
              res.json({
                code: 0,
                token: token,
                message: "Login successfull",
                redirectTo:
                  req.cookies.accountType === "faculty"
                    ? "/faculty/dashboard"
                    : "/student/dashboard"
              });
            } else {
              res.json({ code: 0, message: "Password is incorrect" });
            }
          });
        } else {
          res.json({
            code: 1,
            redirectTo: "/",
            message: "No such user"
          });
        }
      }
    })
    .catch(err => res.send("error"));
  // console.log(req.body, req.cookies);
  // console.log("in login route");
});

module.exports = router;
