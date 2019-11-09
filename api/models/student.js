const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  full_name: { type: String, required: true },
  name_with_initial: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  admission_date: { type: Date, required: true },
  admission_number: { type: String, required: true },
  address: { type: String, required: true },
  grade: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: true
  },
  profileImage: { type: String }
});

module.exports = mongoose.model("Student", studentSchema);
