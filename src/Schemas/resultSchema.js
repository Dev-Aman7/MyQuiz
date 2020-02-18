var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var resultSchema = new Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "quiz" },
    person: { type: mongoose.Schema.Types.ObjectId, ref: "person" },
    score: { type: Number },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
module.exports = mongoose.model("result", resultSchema);
