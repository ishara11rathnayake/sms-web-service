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
    const student = await Student.find({ user: studentId }).populate("parent");

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      students: student.map(student => {
        return {
          studentId: student._id,
          fullname: student.full_name,
          nameinitials: student.name_with_initial,
          gender: student.gender,
          dob: student.dob,
          grade: student.grade,
          class: student.class,
          admissionnumber: student.admission_number,
          admissiondate: student.admission_date,
          profileImage: student.profileImage,
          parent: {
            parentId: student.parent._id,
            fullname: student.parent.full_name,
            nameinitials: student.parent.name_with_initial,
            relationship: student.parent.relationship_to_student,
            nic: student.parent.nic,
            address: student.parent.address,
            contact: student.parent.contact_number,
            email: student.parent.email
          }
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
 * get all students details
 */
exports.students_get_all = async (req, res, next) => {
  try {
    const students = await Student.find().populate("parent");

    res.status(200).json({
      count: students.length,
      students: students.map((student, i) => {
        return {
          studentId: student._id,
          fullname: student.full_name,
          nameinitials: student.name_with_initial,
          id: i + 1,
          gender: student.gender,
          dob: student.dob,
          grade: student.grade,
          class: student.class,
          admissionnumber: student.admission_number,
          admissiondate: student.admission_date,
          profileImage: student.profileImage,
          parent: {
            parentId: student.parent._id,
            fullname: student.parent.full_name,
            nameinitials: student.parent.name_with_initial,
            relationship: student.parent.relationship_to_student,
            nic: student.parent.nic,
            address: student.parent.address,
            contact: student.parent.contact_number,
            email: student.parent.email
          }
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

exports.students_get_student_by_parentId = async (req, res, next) => {
  try {
    const parentId = req.query.parentId;

    const students = await Student.find({ parent: parentId }).populate(
      "parent"
    );

    res.status(200).json({
      count: students.length,
      students: students.map((student, i) => {
        return {
          studentId: student._id,
          fullname: student.full_name,
          nameinitials: student.name_with_initial,
          id: i + 1,
          gender: student.gender,
          dob: student.dob,
          grade: student.grade,
          class: student.class,
          admissionnumber: student.admission_number,
          admissiondate: student.admission_date,
          profileImage: student.profileImage,
          parent: {
            parentId: student.parent._id,
            fullname: student.parent.full_name,
            nameinitials: student.parent.name_with_initial,
            relationship: student.parent.relationship_to_student,
            nic: student.parent.nic,
            address: student.parent.address,
            contact: student.parent.contact_number,
            email: student.parent.email
          }
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

exports.students_get_students_byclass = async (req, res, next) => {
  try {
    const students = await Student.find({
      grade: req.query.grade,
      class: req.query.class
    });

    res.status(200).json({
      count: students.length,
      students: students.map(student => {
        return {
          studentId: student._id,
          fullname: student.full_name,
          nameinitials: student.name_with_initial,
          gender: student.gender,
          dob: student.dob,
          grade: student.grade,
          class: student.class,
          admissionnumber: student.admission_number,
          admissiondate: student.admission_date
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
 * get students details by addmission number
 */
exports.students_get_student_by_addmission_number = async (req, res, next) => {
  const addmissionNumber = req.query.addmissionNumber;

  try {
    const student = await Student.find({
      admission_number: addmissionNumber
    }).populate("parent");

    res.status(200).json({
      students: student.map(student => {
        return {
          studentId: student._id,
          fullname: student.full_name,
          nameinitials: student.name_with_initial,
          gender: student.gender,
          dob: student.dob,
          grade: student.grade,
          class: student.class,
          admissionnumber: student.admission_number,
          admissiondate: student.admission_date,
          profileImage: student.profileImage,
          parent: {
            parentId: student.parent._id,
            fullname: student.parent.full_name,
            nameinitials: student.parent.name_with_initial,
            relationship: student.parent.relationship_to_student,
            nic: student.parent.nic,
            address: student.parent.address,
            contact: student.parent.contact_number,
            email: student.parent.email
          }
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
