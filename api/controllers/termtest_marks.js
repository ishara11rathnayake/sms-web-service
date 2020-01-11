const mongoose = require("mongoose");
const TermTestMarks = require("../models/termtest");

exports.termtest_marks_create_marks = async (req, res, next) => {
  try {
    const termTestMarks = new TermTestMarks({
      _id: new mongoose.Types.ObjectId(),
      admissionNumber: req.body.admissionNumber,
      grade: req.body.grade,
      class: req.body.class,
      year: req.body.year,
      term: req.body.term,
      marks: req.body.marks
    });

    const savedMarks = await termTestMarks.save();

    res.status(200).json({
      message: "Successfully added assignment marks.",
      marks: savedMarks
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.termtest_marks_get_termtest_marks = async (req, res, next) => {
  try {
    const year = req.query.year;
    const term = req.query.term;
    const grade = req.query.grade;
    const admissionNumber = req.query.admissionNumber;

    const termTestMarks = await TermTestMarks.find({
      admissionNumber: admissionNumber,
      grade: grade,
      term: term,
      year: year
    });

    res.status(200).json({
      termTestMarks: termTestMarks
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};
