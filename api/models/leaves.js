const mongoose = require("mongoose");

const leavesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  commencedDate: { type: Date, required: true },
  assumedDate: { type: Date, required: true },
  appliedDate: { type: Date, required: true },
  noOfDays: { type: Number, required: true },
  leaveType: { type: String, required: true },
  reason: { type: String, required: true },
  assignedWorkId: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: { type: String, required: true }
});

module.exports = mongoose.model("Leave", leavesSchema);
