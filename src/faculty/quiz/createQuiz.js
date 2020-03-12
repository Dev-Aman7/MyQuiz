var express = require("express");
const controller = require("./controller");
var router = express.Router();
var mid = require("../../middleware/middleware");
dataall = {};

router.all("/", async (req, res) => {
	controller
		.addQuestions(req.body.questions)
		.then(result => {
			console.log("result received", result);
			data = {
				quizName: req.body.quizName,
				questionId: result.questionId,
				time: req.body.time
			};
			return controller.addQuiz(data);
		})
		.then(resul => {
			console.log("adding quiz to person", resul);
			controller.addQuizToPerson(resul.quizId, req.cookies["username"]);
		})
		.then(() =>
			res.json({
				message: "quiz saved successfully",
				code: 0,
				success: 0
			})
		)
		.catch(err => {
			console.log(err);
			res.send(err);
		});
});

module.exports = router;
