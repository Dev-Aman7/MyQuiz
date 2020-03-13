var qus = require("../../Schemas/questionsSchema");
var quizSchema = require("../../Schemas/quizschema");
var person = require("../../Schemas/person");

module.exports.addQuestions = async questionArray => {
	console.log(questionArray);
	let questionId = [];

	for (var i = 0; i < questionArray.length; i++) {
		let val = questionArray[i];
		// console.log(questionId, val);
		question = new qus(val);
		let d = await question.save();
		questionId.push(d._id);
		// console.log(d);
	}
	// console.log("end of add question");
	return {
		success: 0,
		message: "question saved successfully",
		questionId: questionId
	};
};

module.exports.addQuiz = async quiz => {
	// console.log(quiz);
	let quizData = new quizSchema(quiz);
	let d = await quizData
		.save()
		.then(() => {
			return {
				message: "quiz saved successfuly",
				success: 0,
				quizId: quizData._id
			};
		})
		.catch(err => {
			return {
				success: 1,
				message: err
			};
		});
	// console.log("message at addQuiz", d);
	return d;
};

module.exports.addQuizToPerson = async (quizId, username) => {
	// console.log("here in adding quiz to person");
	// console.log(quizId, "aman");
	let d = await person
		.findOneAndUpdate({ username: username }, { $push: { quizes: quizId } })
		.then(() => {
			return {
				message: "quiz added to person successfuly",
				success: 0
			};
		})
		.catch(err => {
			return {
				message: err,
				success: 1
			};
		});
	return d;
};

module.exports.getQuizes = async username => {
	return person.findOne({ username: username }).populate("quizes");
};

module.exports.deleteQuiz= (username,quizId)=>{
	let res1=quizSchema.deleteOne({_id:quizId});
	let res2=person.findOneAndUpdate({username:username})
}