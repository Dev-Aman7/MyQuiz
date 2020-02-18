var router = require("express").Router();
var bcrypt = require("bcryptjs");
var BCRYPT_SALT_ROUNDS = 10;
const person = require("../../Schemas/person");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.all("/", urlencodedParser, (req, res, next) => {
  console.log(req.body);
  var password = req.body.password;
  data = req.body;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log(err);
    } else {
      bcrypt
        .hash(password, salt)
        .then(hashedPassword => {
          data.password = hashedPassword;
          let addUser = new person(data);
          addUser
            .save()
            .then(() => {
              res.cookie("username", person.username);
              res.cookie("userId", person._id);
              res.cookie("accountType", person.accountType);
              var token = jwt.sign("hello", process.env.Secret);
              res.cookie("token", token);
              return token;
            })
            .then(token => {
              res.json({
                code: 0,
                message: "User Saved Successfully",
                token: token,
                redirectTo: "/"
              });
            })
            .catch(err => {
              console.log(err);
              if (err.code == "11000") {
                res.json({
                  code: 0,
                  message: `This ${JSON.stringify(err.keyValue)} already exist`
                });
              } else res.send(err);
            });
          // Store hash in your password DB.
        })
        .catch(err => {
          res.send(err);
        });
    }
  });
});

module.exports = router;
