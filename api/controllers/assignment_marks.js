const AssignmentMarks = require("../models/assignment_marks");
const mongoose = require("mongoose");
const { Mark, MarkModel } = require("../models/mark");

exports.assignment_marks_create_marks = async (req, res, next) => {
  try {
    let marks = [];

    req.body.marks.forEach(item => {
      const mark = new MarkModel({
        _id: new mongoose.Types.ObjectId(),
        studentName: item.studentName,
        user: item.user,
        mark: item.mark
      });
      marks.push(mark);
    });

    const assignmentMarks = new AssignmentMarks({
      _id: new mongoose.Types.ObjectId(),
      assignmentName: req.body.assignmentName,
      grade: req.body.grade,
      class: req.body.class,
      marks: marks,
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
