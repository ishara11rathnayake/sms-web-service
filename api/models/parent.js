const mongoose = require("mongoose");

const parentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  full_name: { type: String, required: true },
  name_with_initial: { type: String, required: true },
  relationship_to_student: { type: String, required: true },
  nic: { type: String, required: true },
  address: { type: String, required: true },
  contact_number: { type: Number, required: true },
  email: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Parent", parentSchema);
