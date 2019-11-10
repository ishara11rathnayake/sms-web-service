const mongoose = require("mongoose");

const User = require("../models/user");
const Clerk = require("../models/clerk");

const { sendUserProfileUpdateEmail } = require("../helpers/emailFormat");

/**
 * update clerk details
 */
exports.clerks_update_clerk = async (req, res, next) => {
  let updateOps = {};
  if (req.file) {
    updateOps = {
      profileImage: req.file.path
    };
  }

  const clerkId = req.params.clerkId;

  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  try {
    await Clerk.updateOne({ _id: clerkId }, { $set: updateOps });

    const userDetails = await Clerk.findById(clerkId);

    sendUserProfileUpdateEmail(
      userDetails.email,
      userDetails.name_with_initial
    ).catch(console.error);

    res.status(200).json({
      message: "Clerk profile updated.",
      clerk: userDetails
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * delete clerk
 */
exports.clerks_delete_clerk = async (req, res, next) => {
  const clerkId = req.params.clerkId;

  try {
    const clerk = await Clerk.findById(clerkId);

    if (!clerk) {
      return res.status(404).json({
        message: "Clerk not found."
      });
    }

    await User.deleteOne({ _id: clerk.user });
    await Clerk.deleteOne({ _id: clerkId });

    res.status(200).json({
      message: "Clerk successfully deleted."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get teacher details by teacherId
 */
exports.clerks_get_clerk = async (req, res, next) => {
  const clerkId = req.params.clerkId;

  try {
    const clerk = await Clerk.findById(clerkId);

    if (!clerk) {
      return res.status(404).json({
        message: "Clerk not found"
      });
    }

    res.status(200).json({
      clerk: clerk
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get all teachers details
 */
exports.clerk_get_all = async (req, res, next) => {
  try {
    const clerks = await Clerk.find();

    res.status(200).json({
      count: clerks.length,
      clerks: clerks
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};