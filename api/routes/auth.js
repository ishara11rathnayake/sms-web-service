const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const { upload } = require("../helpers/uploadFiles");

const AuthController = require("../controllers/auth");
const TeacherController = require("../controllers/teacher");

router.post("/login", AuthController.auth_login);
router.post("/teacher", upload, AuthController.auth_teacher_register);
router.post("/clerk", upload, AuthController.auth_clerk_register);
router.post("/parent", AuthController.auth_parent_register);
router.post("/student", upload, AuthController.auth_student_register);
router.patch(
  "/teacher/:teacherId",
  checkAuth,
  upload,
  TeacherController.teachers_update_teacher
);
router.delete(
  "/teacher/:teacherId",
  checkAuth,
  TeacherController.teachers_delete_teacher
);

module.exports = router;
