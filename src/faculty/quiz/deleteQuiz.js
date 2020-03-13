const router = require("express").Router();
const controller = require("./controller");

router.get("/", (req, res) => {
	res.send("delete");
});

module.exports = router;
