const User = require("../models/user");
const Student = require("../models/student");
const Parent = require("../models/parent");

const { sendUserProfileUpdateEmail } = require("../helpers/emailFormat");

/**
 * update student details
 */
exports.students_update_student = async (req, res, next) => {
  let updateOps = {};
  if (req.file) {
    updateOps = {
      profileImage: req.file.path
    };
  }

  const studentId = req.params.studentId;

  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  try {
    await Student.updateOne({ _id: studentId }, { $set: updateOps });

    const userDetails = await Student.findById(studentId);
    const parentDetails = await Parent.findById(userDetails.parent);

    sendUserProfileUpdateEmail(
      parentDetails.email,
      parentDetails.name_with_initial
    ).catch(console.error);

    res.status(200).json({
      message: `${userDetails.name_with_initial}'s profile updated.`,
      student: userDetails
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * delete student
 */
exports.students_delete_student = async (req, res, next) => {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found."
      });
    }

    await User.deleteOne({ _id: student.user });
    await Student.deleteOne({ _id: studentId });

    res.status(200).json({
      message: "Student profile successfully deleted."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get students details by studentId
 */
exports.students_get_student = async (req, res, next) => {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findById(studentId).populate("parent");

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      student: student
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get all students details
 */
exports.students_get_all = async (req, res, next) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      count: students.length,
      students: students
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};
