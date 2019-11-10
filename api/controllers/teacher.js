const mongoose = require("mongoose");

const User = require("../models/user");
const Teacher = require("../models/teacher");

const { sendUserProfileUpdateEmail } = require("../helpers/emailFormat");

/**
 * update teacher details
 */
exports.teachers_update_teacher = async (req, res, next) => {
  let updateOps = {};
  if (req.file) {
    updateOps = {
      profileImage: req.file.path
    };
  }

  const teacherId = req.params.teacherId;

  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  try {
    await Teacher.updateOne({ _id: teacherId }, { $set: updateOps });

    const userDetails = await Teacher.findById(teacherId);

    sendUserProfileUpdateEmail(
      userDetails.email,
      userDetails.name_with_initial
    ).catch(console.error);

    res.status(200).json({
      message: "Teacher profile updated.",
      teacher: userDetails
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * delete teacher
 */
exports.teachers_delete_teacher = async (req, res, next) => {
  const teacherId = req.params.teacherId;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found."
      });
    }

    await User.deleteOne({ _id: teacher.user });
    await Teacher.deleteOne({ _id: teacherId });

    res.status(200).json({
      message: "Teacher successfully deleted."
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
exports.teachers_get_teacher = async (req, res, next) => {
  const teacherId = req.params.teacherId;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found"
      });
    }

    res.status(200).json({
      teacher: teacher
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
exports.teachers_get_all = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();

    res.status(200).json({
      count: teachers.length,
      teacher: teachers
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};
