const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  subject: { type: String },
  grade: { type: String },
  mark: { type: Number }
});

module.exports.Result = resultSchema;
module.exports.ResultModel = mongoose.model("Result", resultSchema);
