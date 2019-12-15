const mongoose = require("mongoose");

const { Exam } = require("../models/exam");
const { Competition } = require("../models/competition");

const achievementSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  oLevel: { type: [Exam] },
  aLevel: { type: [Exam] },
  extraCuricular: { type: [Competition] },
  other: { type: [Competition] },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  }
});

module.exports = mongoose.model("Achievement", achievementSchema);
