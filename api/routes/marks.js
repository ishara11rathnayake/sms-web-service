const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const AssignmentsMarksController = require("../controllers/assignment_marks");
const TermTestMarksController = require("../controllers/termtest_marks");

router.post(
  "/assignment",
  checkAuth,
  AssignmentsMarksController.assignment_marks_create_marks
);

router.post(
  "/termtest",
  checkAuth,
  TermTestMarksController.termtest_marks_create_marks
);
router.get(
  "/termtest",
  checkAuth,
  TermTestMarksController.termtest_marks_get_termtest_marks
);

module.exports = router;
