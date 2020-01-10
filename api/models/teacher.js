const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  full_name: { type: String, required: true },
  teacherid: {type: String, required: true},
  name_with_initial: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  first_appoinment_date: { type: Date, required: true },
  appoinment_date_to_school: { type: Date, required: true },
  position: { type: String, required: true },
  nic: { type: String, required: true },
  address: { type: String, required: true },
  contact_number: { type: Number, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  profileImage: { type: String }
});

module.exports = mongoose.model("Teacher", teacherSchema);
