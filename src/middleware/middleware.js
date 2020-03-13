require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = {
	auth: (req, res, next) => {
		console.log("check header", JSON.stringify(req.headers.token));
		jwt.verify(req.headers["token"], process.env.Secret, (err, token) => {
			if (err) {
				res.json({
					code: 0,
					redirectTo: "/",
					message: "Invalid token" + err
				});
			} else {
				console.log(token);
				if (token.key == "Hello") {
					req.username = token.username;
					req.accountType = token.accountType;
					// res.cookie("username", token.username);
					// res.cookie("accountType", token.accountType);
					// console.log(req.cookies);
					next();
				} else {
					res.json({
						code: 0,
						redirectTo: "/",
						message: "Invalid entry"
					});
				}
			}
		});
	}
};
