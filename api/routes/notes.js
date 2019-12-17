const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const { upload } = require("../helpers/uploadNotes");

const NotesController = require("../controllers/notes");

router.post("/", checkAuth, upload, NotesController.notes_add_note);
router.get(
  "/byTeacherId",
  checkAuth,
  NotesController.notes_get_notes_by_teacherid
);
router.get("/", checkAuth, NotesController.notes_get_all);
router.get("/bygrade", checkAuth, NotesController.notes_get_notes);
router.delete("/", checkAuth, NotesController.notes_delete_note);

module.exports = router;
