const mongoose = require("mongoose");
const Note = require("../models/notes");
const Teacher = require("../models/teacher");

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

exports.notes_get_notes_by_teacherid = async (req, res, next) => {
  try {
    const teacherId = req.query.teacherId;

    const notes = await Note.find({ user: teacherId });

    if (notes.length > 0) {
      res.status(200).json({
        count: notes.length,
        status: 200,
        notes: notes.map(note => {
          return {
            id: note._id,
            subject: note.subject,
            grade: note.grade,
            class: note.class,
            description: note.description,
            notes: note.content,
            userId: note.userId
          };
        })
      });
    } else {
      res.status(200).json({
        message: "No data found",
        status: 404
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.notes_get_all = async (req, res, next) => {
  try {
    const notes = await Note.find();

    await asyncForEach(notes, async (note, i) => {
      const teacher = await Teacher.find({ user: note.user });

      if (!teacher.length > 0) {
        notes[i].teacher = {
          nameinitials: "unknown"
        };
      } else {
        notes[i].teacher = {
          id: teacher[0]._id,
          fullname: teacher[0].full_name,
          nameinitials: teacher[0].name_with_initial,
          gender: teacher[0].gender,
          email: teacher[0].email,
          file: teacher[0].profileImage,
          subject: teacher[0].subject
        };
      }
    });

    if (notes.length > 0) {
      res.status(200).json({
        count: notes.length,
        status: 200,
        notes: notes.map(note => {
          return {
            id: note._id,
            subject: note.subject,
            grade: note.grade,
            class: note.class,
            description: note.description,
            notes: note.content,
            userId: note.user,
            teacher: note.teacher
          };
        })
      });
    } else {
      res.status(200).json({
        message: "No data found",
        status: 404
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.notes_delete_note = async (req, res, next) => {
  try {
    const noteId = req.query.noteId;

    await Note.deleteOne({ _id: noteId });

    res.status(200).json({
      message: "Note successfully deleted."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.notes_get_notes = async (req, res, next) => {
  try {
    const notes = await Note.find({
      grade: req.query.grade,
      class: req.query.class,
      subject: req.query.subject
    });
    res.status(200).json({
      count: notes.length,
      notes: notes.map(note => {
        return {
          id: note._id,
          subject: note.subject,
          grade: note.grade,
          class: note.class,
          description: note.description,
          notes: note.content,
          userId: note.userId
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

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
