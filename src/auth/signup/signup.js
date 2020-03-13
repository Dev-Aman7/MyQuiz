var router = require("express").Router();
var bcrypt = require("bcryptjs");
var BCRYPT_SALT_ROUNDS = 10;
const person = require("../../Schemas/person");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post("/", urlencodedParser, (req, res, next) => {
	console.log(req.body);
	console.log("in auth/signup");
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
						.then(token => {
							res.json({
								code: 0,
								message: "User Saved Successfully in database",
								redirectTo: "/",
								success: 0
							});
						})
						.catch(err => {
							console.log(err);
							if (err.code == "11000") {
								res.json({
									code: 0,
									message: `This ${JSON.stringify(err.keyValue)} already exist`,
									success: 0
								});
							} else
								res.json({
									message: err,
									success: 1,
									code: 0
								});
						});
					// Store hash in your password DB.
				})
				.catch(err => {
					res.json({
						message: err,
						success: 1,
						code: 1
					});
				});
		}
	});
});

module.exports = router;
