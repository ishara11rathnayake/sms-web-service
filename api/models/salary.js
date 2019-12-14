const mongoose = require("mongoose");

const salarySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: String, required: true },
  earnings: { type: Map, of: Number, required: true },
  deductions: { type: Map, of: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Salary", salarySchema);
