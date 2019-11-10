const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  details: { type: String, required: true },
  posted_by: { type: String, required: true },
  date: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Notice", noticeSchema);
