const mongoose = require("mongoose");

const markSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studentName: { type: String, required: true },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  mark: { type: mongoose.Schema.Types.Mixed, required: true },
  admissionNumber: { type: String, required: true }
});

module.exports.Mark = markSchema;
module.exports.MarkModel = mongoose.model("Mark", markSchema);
