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
      message: "Clerk profile updated."
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
 * get clerk details by userId
 */
exports.clerks_get_clerk = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const clerks = await Clerk.find({ user: userId });

    if (!clerks) {
      return res.status(404).json({
        message: "Clerk not found"
      });
    }

    res.status(200).json({
      clerks: clerks.map(clerk => {
        return {
          id: clerk.clerkId,
          clerkId: clerk._id,
          fullname: clerk.full_name,
          nameinitials: clerk.name_with_initial,
          gender: clerk.gender,
          dob: clerk.dob,
          firstadmission: clerk.first_appoinment_date,
          scladmission: clerk.appoinment_date_to_school,
          position: clerk.position,
          nic: clerk.nic,
          address: clerk.address,
          contact: clerk.contact_number,
          email: clerk.email,
          user: clerk.user,
          file: clerk.profileImage
        };
      })
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get all clerks details
 */
exports.clerk_get_all = async (req, res, next) => {
  try {
    const clerks = await Clerk.find();

    res.status(200).json({
      count: clerks.length,
      clerks: clerks.map(clerk => {
        return {
          id: clerk.clerkId,
          clerkId: clerk._id,
          fullname: clerk.full_name,
          nameinitials: clerk.name_with_initial,
          gender: clerk.gender,
          dob: clerk.dob,
          firstadmission: clerk.first_appoinment_date,
          scladmission: clerk.appoinment_date_to_school,
          position: clerk.position,
          nic: clerk.nic,
          address: clerk.address,
          contact: clerk.contact_number,
          email: clerk.email,
          user: clerk.user,
          file: clerk.profileImage
        };
      })
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get clerk details by clerkId
 */
exports.clerks_get_clerk_byclerkid = async (req, res, next) => {
  const clerkId = req.query.clerkId;

  try {
    const clerks = await Clerk.find({ clerkId: clerkId });

    if (!clerks) {
      return res.status(404).json({
        message: "Clerk not found"
      });
    }

    res.status(200).json({
      clerks: clerks.map(clerk => {
        return {
          id: clerk._id,
          clerkId: clerk.clerkId,
          fullname: clerk.full_name,
          nameinitials: clerk.name_with_initial,
          gender: clerk.gender,
          dob: clerk.dob,
          firstadmission: clerk.first_appoinment_date,
          scladmission: clerk.appoinment_date_to_school,
          position: clerk.position,
          nic: clerk.nic,
          address: clerk.address,
          contact: clerk.contact_number,
          email: clerk.email,
          user: clerk.user,
          file: clerk.profileImage
        };
      })
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};
