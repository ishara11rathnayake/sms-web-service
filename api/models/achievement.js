const mongoose = require("mongoose");

const achievementSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: String, required: true },
  competition: { type: String },
  level: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  ageGroup: { type: String, required: true },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  }
});

module.exports = mongoose.model("Achievement", achievementSchema);
