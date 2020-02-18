var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentschema = new Schema(
  {
    author: { type: String, default: "NA" },
    replies: [this],
    text: String,
    time: Date
  },
  { timestamps: true }
);
module.exports = mongoose.model("comment", commentschema);
