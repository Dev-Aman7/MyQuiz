require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = {
	auth: (req, res, next) => {
		var token = jwt.verify(req.cookies.token, process.env.Secret);
		if (token.key == "hello") {
			res.cookies("username", token.username);
			res.cookies("accountType", token.accountType);
			console.log(req.cookies);
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
