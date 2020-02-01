const mongoose = require("mongoose");
const Leave = require("../models/leaves");
const User = require("../models/user");
const Teacher = require("../models/teacher");
const Clerk = require("../models/clerk");

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

exports.leaves_request_leave_clerk = async (req, res, next) => {
  try {
    const leave = new Leave({
      _id: new mongoose.Types.ObjectId(),
      commencedDate: req.body.commencedDate,
      assumedDate: req.body.assumedDate,
      appliedDate: req.body.appliedDate,
      noOfDays: req.body.noOfDays,
      leaveType: req.body.leaveType,
      reason: req.body.reason,
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
    const pendingLeaves = await Leave.find({ status: constants.PENDING }).populate("userId");

    // const user = await User.findById(leave.userId);
    // if(user.user_type == "Teacher"){
    //   const teacher = await Teacher.find({ user: userId });
    //   name = teacher[0].name_with_initial;
    // } else {
    //   const clerk = await Clerk.find({ user: userId });
    //   name = clerk[0].name_with_initial;
    // }
    // console.log(name);

    res.status(200).json({
      count: pendingLeaves.length,
      leaves: pendingLeaves.map(leave => {
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
    const leaveId = req.body.leaveId;

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
    const leaveId = req.body.leaveId;

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
    const userId = req.userData.userId;

    console.log(userId);

    const leaves = await Leave.find({ userId: userId });

    console.log(leaves);

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

exports.leaves_delete_leaves = async (req, res, next) => {
  try {
    const leaveId = req.query.leaveId;

    const leave = await Leave.findById({ _id: leaveId });

    if (leave.status == constants.PENDING) {
      await Leave.deleteOne({ _id: leaveId });

      return res.status(200).json({
        status: 200,
        message: "Leave deleted successfully."
      });
    } else {
      return res.status(200).json({
        status: 401,
        message: "You can not delete approved or rejected leave requests."
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

exports.leaves_get_leave_count = async (req, res, next) => {
  try {
    const userId = req.userData.userId;

    const sickLeave = await Leave.find({
      userId: userId,
      leaveType: constants.SICK_LEAVE,
      status: constants.APPROVED
    });

    const noOfSickLeaves = getLeaveCount(sickLeave);

    const casualLeave = await Leave.find({
      userId: userId,
      leaveType: constants.CASUAL_LEVE,
      status: constants.APPROVED
    });

    const noOfCasualLeaves = getLeaveCount(casualLeave);

    const dutyLeave = await Leave.find({
      userId: userId,
      leaveType: constants.DUTY_LEAVE,
      status: constants.APPROVED
    });

    const noOfDutyLeaves = getLeaveCount(dutyLeave);

    res.status(200).json({
      sickLeave: noOfSickLeaves,
      casualLeave: noOfCasualLeaves,
      dutyLeave: noOfDutyLeaves
    });
  } catch (error) {
    handleError(res, error);
  }
};

const getLeaveCount = leaves => {
  const today = new Date();

  const filterLeaves = leaves.filter(leave => {
    return leave.commencedDate.getFullYear() == today.getFullYear();
  });

  let noOfLeaves = 0;
  filterLeaves.forEach(leave => {
    noOfLeaves += leave.noOfDays;
  });
  return noOfLeaves;
};

const handleError = (res, error) => {
  console.log(error);
  res.status(500).json({
    error: error
  });
};
