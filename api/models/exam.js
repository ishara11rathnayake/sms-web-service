const mongoose = require("mongoose");

const { Result } = require("../models/result");

const examSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  stream: { type: String },
  medium: { type: String },
  year: { type: String },
  results: { type: [Result] }
});

module.exports.Exam = examSchema;
module.exports.ExamModel = mongoose.model("Exam", examSchema);
