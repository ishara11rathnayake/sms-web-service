const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");

// const { sendMail } = require("../helpers/sendEmail");
const {
  sendNewPasswordEmail,
  sendStudentCredentials
} = require("../helpers/emailFormat");
const { loginValidation } = require("../helpers/validation");

const User = require("../models/user");
const Teacher = require("../models/teacher");
const Clerk = require("../models/clerk");
const Parent = require("../models/parent");
const Student = require("../models/student");

/**
 * user login
 */
exports.auth_login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  try {
    const user = await User.find({ username: req.body.username });

    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }

    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      if (result) {
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "60d"
          }
        );
        return res.status(200).json({
          userId: user[0]._id,
          userType: user[0].user_type,
          username: user[0].username,
          message: "Auth successful",
          token: token
        });
      }

      res.status(401).json({
        message: "Auth failed"
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
};

/**
 * teacher registration
 */
exports.auth_teacher_register = async (req, res, next) => {
  try {
    const emailExist = await User.find({ username: req.body.email });

    if (emailExist.length > 0) {
      return res.status(400).json({
        error: "Email already exists."
      });
    }

    const password = generator.generate({
      length: 10,
      numbers: true
    });

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.email,
          password: hash,
          user_type: "Teacher"
        });
        sendNewPasswordEmail(
          req.body.email,
          req.body.nameWithInitial,
          password
        ).catch(console.error);
        try {
          const savedUser = await user.save();

          if (savedUser) {
            const teacher = new Teacher({
              _id: new mongoose.Types.ObjectId(),
              full_name: req.body.fullName,
              name_with_initial: req.body.nameWithInitial,
              gender: req.body.gender,
              dob: req.body.dob,
              first_appoinment_date: req.body.firstAppoinmentDate,
              appoinment_date_to_school: req.body.appoinmentToSchool,
              position: req.body.position,
              nic: req.body.nic,
              address: req.body.address,
              contact_number: req.body.contactNumber,
              subject: req.body.subject,
              email: req.body.email,
              user: savedUser._id
            });

            const savedTeacher = await teacher.save();

            if (savedTeacher) {
              res.status(201).json({
                message: "Teacher account successfully created.",
                teacher: savedTeacher,
                user: savedUser
              });
            }
          }
        } catch (error) {
          res.status(500).json({
            error: error
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

/**
 * clerk registration
 */
exports.auth_clerk_register = async (req, res, next) => {
  try {
    const emailExist = await User.find({ username: req.body.email });

    if (emailExist.length > 0) {
      return res.status(400).json({
        error: "Email already exists."
      });
    }

    const password = generator.generate({
      length: 10,
      numbers: true
    });

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.email,
          password: hash,
          user_type: "Clerk"
        });
        sendNewPasswordEmail(
          req.body.email,
          req.body.nameWithInitial,
          password
        ).catch(console.error);
        try {
          const savedUser = await user.save();

          if (savedUser) {
            const clerk = new Clerk({
              _id: new mongoose.Types.ObjectId(),
              full_name: req.body.fullName,
              name_with_initial: req.body.nameWithInitial,
              gender: req.body.gender,
              dob: req.body.dob,
              first_appoinment_date: req.body.firstAppoinmentDate,
              appoinment_date_to_school: req.body.appoinmentToSchool,
              position: req.body.position,
              nic: req.body.nic,
              address: req.body.address,
              contact_number: req.body.contactNumber,
              email: req.body.email,
              user: savedUser._id
            });

            const savedClerk = await clerk.save();

            if (savedClerk) {
              res.status(201).json({
                message: "Clerk account successfully created.",
                clerk: savedClerk,
                user: savedUser
              });
            }
          }
        } catch (error) {
          res.status(500).json({
            error: error
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

/**
 * parent registration
 */
exports.auth_parent_register = async (req, res, next) => {
  try {
    const emailExist = await User.find({ username: req.body.email });

    if (emailExist.length > 0) {
      return res.status(400).json({
        error: "Email already exists."
      });
    }

    const password = generator.generate({
      length: 10,
      numbers: true
    });

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.email,
          password: hash,
          user_type: "Parent"
        });
        sendNewPasswordEmail(
          req.body.email,
          req.body.nameWithInitial,
          password
        ).catch(console.error);
        try {
          const savedUser = await user.save();

          if (savedUser) {
            const parent = new Parent({
              _id: new mongoose.Types.ObjectId(),
              full_name: req.body.fullName,
              name_with_initial: req.body.nameWithInitial,
              relationship_to_student: req.body.relationshipToStudent,
              nic: req.body.nic,
              address: req.body.address,
              contact_number: req.body.contactNumber,
              email: req.body.email,
              user: savedUser._id
            });

            const savedParent = await parent.save();

            if (savedParent) {
              res.status(201).json({
                message: "Parent account successfully created.",
                parent: savedParent,
                user: savedUser
              });
            }
          }
        } catch (error) {
          res.status(500).json({
            error: error
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

/**
 * student registration
 */
exports.auth_student_register = async (req, res, next) => {
  try {
    const emailExist = await User.find({ username: req.body.admissionNumber });

    if (emailExist.length > 0) {
      return res.status(400).json({
        error: "Admission number already exists."
      });
    }

    const password = generator.generate({
      length: 10,
      numbers: true
    });

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.admissionNumber,
          password: hash,
          user_type: "Student"
        });

        const parent = await Parent.findById(req.body.parentId);

        if (!parent) {
          return res.status(400).json({
            error:
              "Can not find parent ID. Please add the parent details to the system"
          });
        }

        sendStudentCredentials(
          parent.email,
          parent.name_with_initial,
          req.body.admissionNumber,
          password
        ).catch(console.error);
        try {
          const savedUser = await user.save();
          if (savedUser) {
            const student = new Student({
              _id: new mongoose.Types.ObjectId(),
              full_name: req.body.fullName,
              name_with_initial: req.body.nameWithInitial,
              gender: req.body.gender,
              dob: req.body.dob,
              address: req.body.address,
              admission_date: req.body.admissionDate,
              admission_number: req.body.admissionNumber,
              grade: req.body.grade,
              user: savedUser._id,
              parent: req.body.parentId
            });

            const savedStudent = await student.save();

            if (savedStudent) {
              res.status(201).json({
                message: "Student account successfully created.",
                student: savedStudent,
                user: savedUser
              });
            }
          }
        } catch (error) {
          res.status(500).json({
            error: error
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};
