const router = require("express").Router();
const controller = require("./controller");
const mid = require("../../middleware/middleware");

router.get("/", mid.auth, (req, res) => {
	console.log("in the getQuizes");
	console.log("froom middle", req.username);
	controller
		.getQuizes(req.username)
		.then(val => {
			console.log("output", val);
			res.json({
				message: "Sucessfully fetched quizes",
				quizes: val.quizes,
				code: 0,
				success: 0
			});
		})
		.catch(err => {
			console.log(err);
			res.json({
				message: "Error while fetching quiz fetched quizes",
				code: 1,
				success: 1
			});
		});
});

module.exports = router;
