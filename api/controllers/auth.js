const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");

const nodemailer = require("nodemailer");

const send_email = require("../helpers/send_email");

const { loginValidation } = require("../helpers/validation");

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
          email: req.body.email,
          password: hash,
          user_type: req.body.user_type
        });
        sendMail(req.body.email, password, req.body.nameWithInitial).catch(
          console.error
        );
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
 * sending emails
 * @param {*} sendingTO senders mail address
 * @param {*} password password of user
 */
async function sendMail(sendingTO, password, name) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dream11crusher@gmail.com",
      pass: "930713058Ish"
    }
  });

  const output = `
    <h2>Hi ${name},</h2>
    <h3></h3>
    <p>Thanks for joining with us. You can find your user name and password below.</>
    <ul> 
      <li>username: ${sendingTO}</li>
      <li>password: ${password}</li>
    </ul>
    <p>Thank you,<br> SMS</p>
  `;

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: "dream11crusher@gmail.com",
  //     pass: "930713058Ish"
  //   }
  // });

  let info = await transporter.sendMail({
    from: '"Ishara Rathnayake" <noreply.dream11crusher@gmail.com>',
    replyTo: "noreply.dream11crusher@gmail.com",
    to: sendingTO,
    subject: "New account credentials",
    html: output
  });

  console.log("Message sent: %s", info.messageId);
}
