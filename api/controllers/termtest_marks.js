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
