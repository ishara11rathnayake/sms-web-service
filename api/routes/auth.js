const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const { upload } = require("../helpers/uploadFiles");

const AuthController = require("../controllers/auth");
const TeacherController = require("../controllers/teacher");
const ClerkController = require("../controllers/clerk");

/**
 * user login and user registration endpoints
 */
router.post("/login", AuthController.auth_login);
router.post("/teacher", upload, AuthController.auth_teacher_register);
router.post("/clerk", upload, AuthController.auth_clerk_register);
router.post("/parent", AuthController.auth_parent_register);
router.post("/student", upload, AuthController.auth_student_register);

/**
 * manage teacher endpoints
 */
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
router.get("/teacher", checkAuth, TeacherController.teachers_get_all);
router.get(
  "/teacher/:teacherId",
  checkAuth,
  TeacherController.teachers_get_teacher
);

/**
 * manage clerk endpoints
 */
router.patch(
  "/clerk/:clerkId",
  checkAuth,
  upload,
  ClerkController.clerks_update_clerk
);
router.delete(
  "/clerk/:clerkId",
  checkAuth,
  ClerkController.clerks_delete_clerk
);
router.get("/clerk", checkAuth, ClerkController.clerk_get_all);
router.get("/clerk/:clerkId", checkAuth, ClerkController.clerks_get_clerk);

module.exports = router;
