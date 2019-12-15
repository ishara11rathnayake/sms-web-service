const Salary = require("../models/salary");
const Teacher = require("../models/teacher");
const mongoose = require("mongoose");

exports.salary_add_salary = async (req, res, next) => {
  try {
    const salary = new Salary({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      year: req.body.year,
      month: req.body.month,
      earnings: req.body.earnings,
      deductions: req.body.deductions,
      user: req.body.user
    });

    await salary.save();

    res.status(201).json({
      message: "Salary added successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.salary_get_salary = async (req, res, next) => {
  try {
    const salary = await Salary.find({
      year: req.query.year,
      month: req.query.month,
      user: req.userData.userId
    });

    const teacherDetails = await Teacher.find({ user: req.userData.userId });

    res.status(200).json({
      salary: salary[0],
      teacher: teacherDetails[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};
