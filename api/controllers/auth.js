const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");

const {
  loginValidation,
  registerValidation
} = require("../helpers/validation");

const User = require("../models/user");
const Teacher = require("../models/teacher");

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
    res.status(200).json({
      message: "success"
    });
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
};

/**
 * teacher register
 */
exports.auth_teacher_register = async (req, res, next) => {
  try {
    const emailExist = await User.find({ email: req.body.email });

    if (!emailExist) {
      return res.status(400).json({
        error: "Email already exists."
      });
    }

    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true
    });

    bcrypt.hash(password, 10, async (err, hash) => {
      if (error) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
          user_type: req.body.user_type
        });

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
            contact_nuber: req.body.contactNumber,
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
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};
