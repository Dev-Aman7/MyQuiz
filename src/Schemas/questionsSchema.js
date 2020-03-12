var mongoose = require("mongoose");
var schema = mongoose.Schema;

var questionSchema = new schema(
	{
		title: { type: String },
		option1: { type: String, required: true },
		option2: { type: String, required: true },
		option3: { type: String, required: true },
		option4: { type: String, required: true },
		answer: { type: String }
	},
	{ timestamps: true }
);
module.exports = mongoose.model("question", questionSchema);
