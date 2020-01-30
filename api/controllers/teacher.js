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
  const userId = req.params.userId;

  try {
    const teacher = await Teacher.find({ user: userId });

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found"
      });
    }

    res.status(200).json({
      teachers: teacher.map((teacher, i) => {
        return {
          teacherid: teacher.teacherid,
          id: teacher._id,
          fullname: teacher.full_name,
          nameinitials: teacher.name_with_initial,
          gender: teacher.gender,
          dob: teacher.dob,
          firstadmission: teacher.first_appoinment_date,
          scladmission: teacher.appoinment_date_to_school,
          position: teacher.position,
          nic: teacher.nic,
          address: teacher.address,
          contact: teacher.contact_number,
          email: teacher.email,
          user: teacher.user,
          file: teacher.profileImage,
          subject: teacher.subject
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
 * get all teachers details
 */
exports.teachers_get_all = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();

    res.status(200).json({
      count: teachers.length,
      teachers: teachers.map((teacher, i) => {
        return {
          teacherid: i + 1,
          id: teacher._id,
          fullname: teacher.full_name,
          nameinitials: teacher.name_with_initial,
          gender: teacher.gender,
          dob: teacher.dob,
          firstadmission: teacher.first_appoinment_date,
          scladmission: teacher.appoinment_date_to_school,
          position: teacher.position,
          nic: teacher.nic,
          address: teacher.address,
          contact: teacher.contact_number,
          email: teacher.email,
          user: teacher.user,
          file: teacher.profileImage,
          subject: teacher.subject
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
