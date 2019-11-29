const mongoose = require("mongoose");
const Leave = require("../models/leaves");

const constants = require("../helpers/constant");

exports.leaves_request_leave = async (req, res, next) => {
  try {
    const leave = new Leave({
      _id: new mongoose.Types.ObjectId(),
      commencedDate: req.body.commencedDate,
      assumedDate: req.body.assumedDate,
      appliedDate: req.body.appliedDate,
      noOfDays: req.body.noOfDays,
      leaveType: req.body.leaveType,
      reason: req.body.reason,
      assignedWorkId: req.file.path,
      userId: req.userData.userId,
      status: constants.PENDING
    });

    const savedLeave = await leave.save();

    res.status(200).json({
      message: "Leave requested successfully.",
      leave: savedLeave
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.leaves_get_pending_leaves = async (req, res, next) => {
  try {
    const pendingLeaves = await Leave.find({ status: constants.PENDING });

    res.status(200).json({
      count: pendingLeaves.length,
      pendingLeaves: pendingLeaves.map(leave => {
        return {
          id: leave._id,
          userId: leave.userId,
          commencedDate: leave.commencedDate,
          assumedDate: leave.assumedDate,
          appliedDate: leave.appliedDate,
          noOfDays: leave.noOfDays,
          leaveType: leave.leaveType,
          reason: leave.reason,
          assignedWorkId: leave.assignedWorkId,
          status: leave.status
        };
      })
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.leaves_approve_leave = async (req, res, nexr) => {
  try {
    const leaveId = req.query.leaveId;

    await Leave.updateOne(
      { _id: leaveId },
      { $set: { status: constants.APPROVED } }
    );

    res.status(200).json({
      message: "Leave approved successfully."
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.leaves_reject_leave = async (req, res, next) => {
  try {
    const leaveId = req.query.leaveId;

    await Leave.updateOne(
      { _id: leaveId },
      { $set: { status: constants.REJECTED } }
    );

    res.status(200).json({
      message: "Leave rejected successfully."
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.leaves_get_leaves_by_userid = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    const leaves = await Leave.find({ userId: userId });

    res.status(200).json({
      count: leaves.length,
      leaves: leaves.map(leave => {
        return {
          id: leave._id,
          userId: leave.userId,
          commencedDate: leave.commencedDate,
          assumedDate: leave.assumedDate,
          appliedDate: leave.appliedDate,
          noOfDays: leave.noOfDays,
          leaveType: leave.leaveType,
          reason: leave.reason,
          assignedWorkId: leave.assignedWorkId,
          status: leave.status
        };
      })
    });
  } catch (error) {
    handleError(res, error);
  }
};

const handleError = (res, error) => {
  console.log(error);
  res.status(500).json({
    error: error
  });
};
