var router = require("express").Router();
var bcrypt = require("bcryptjs");
var BCRYPT_SALT_ROUNDS = 10;
const person = require("../../Schemas/person");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });


router.all("/", urlencodedParser, (req, res, next) => {
  console.log('here in auth/signup');
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
       
              var token = jwt.sign("hello", process.env.Secret);
              return token;
            })
            .then(token => {
              console.log('response sent from here');
              res.json({
                code: 0,
                message: "User Saved Successfully in database",
                token: token,
                redirectTo: "/",
                success:0
              });
            })
            .catch(err => {
              console.log(err);
              if (err.code == "11000") {
                res.json({
                  code: 0,
                  message: `This ${JSON.stringify(err.keyValue)} already exist`,
                  success:1
                });
              } else res.json({
                code: 1,
                message: `This ${JSON.stringify(err.keyValue)} already exist`,
                success:1
              });
            });
          // Store hash in your password DB.
        })
        .catch(err => {
          res.sendres.json({
            code: 1,
            message: err,
            success:1
          });;
        });
    }
  });
});

module.exports = router;
