const mongoose = require("mongoose");

const { Result } = require("../models/result");

const termTestMarksSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  admissionNumber: { type: String, required: true },
  grade: { type: Number, required: true },
  class: { type: String, required: true },
  year: { type: Number, required: true },
  term: { type: Number, required: true },
  marks: { type: [Result], require: true }
});

module.exports = mongoose.model("TermTestMarks", termTestMarksSchema);
