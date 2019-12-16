const mongoose = require("mongoose");

const { Mark } = require("../models/mark");

const assignmentMarksSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  assignmentName: { type: String, required: true },
  grade: { type: Number, required: true },
  class: { type: String, required: true },
  subject: { type: String, required: true },
  marks: { type: [Mark], require: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("AssignmentMarks", assignmentMarksSchema);
