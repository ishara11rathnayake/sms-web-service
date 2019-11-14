const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const { upload } = require("../helpers/uploadNotes");

const NotesController = require("../controllers/notes");

router.post("/", checkAuth, upload, NotesController.notes_add_note);

module.exports = router;
