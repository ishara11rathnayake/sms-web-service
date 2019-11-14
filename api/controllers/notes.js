const mongoose = require("mongoose");
const Note = require("../models/notes");

exports.notes_add_note = async (req, res, next) => {
  try {
    const note = new Note({
      _id: new mongoose.Types.ObjectId(),
      subject: req.body.subject,
      grade: req.body.grade,
      class: req.body.class,
      description: req.body.description,
      content: req.file.path,
      user: req.userData.userId
    });

    const savedNote = await note.save();

    res.status(200).json({
      message: "Note added successfully.",
      note: savedNote
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};
