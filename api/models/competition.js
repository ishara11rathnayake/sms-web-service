const mongoose = require("mongoose");

const competitionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: String },
  competition: { type: String },
  event: { type: String },
  place: { type: String },
  year: { type: String },
  description: { type: String }
});

module.exports.Competition = competitionSchema;
module.exports.CompetitionModel = mongoose.model(
  "Competition",
  competitionSchema
);
