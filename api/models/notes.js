const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  subject: { type: String, required: true },
  grade: { type: Number, required: true },
  class: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  teacher: {
    type: Object
  }
});

module.exports = mongoose.model("Note", notesSchema);
