const AssignmentMarks = require("../models/assignment_marks");
const mongoose = require("mongoose");
const { Mark, MarkModel } = require("../models/mark");

exports.assignment_marks_create_marks = async (req, res, next) => {
  try {
    const assignmentMarks = new AssignmentMarks({
      _id: new mongoose.Types.ObjectId(),
      assignmentName: req.body.assignmentName,
      grade: req.body.grade,
      class: req.body.class,
      subject: req.body.subject,
      marks: req.body.marks,
      user: req.userData.userId
    });

    const savedMarks = await assignmentMarks.save();

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

exports.assignment_marks_get_marks = async (req, res, next) => {
  try {
    const assignmentName = req.query.assignmentName;
    const subject = req.query.subject;
    const grade = req.query.grade;
    const gclass = req.query.class;

    const assignmentMarks = await AssignmentMarks.find({assignmentName: assignmentName, subject: subject, grade: grade, class:gclass})

    res.status(200).json({
      assignmentMarks: assignmentMarks[0]
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
}
