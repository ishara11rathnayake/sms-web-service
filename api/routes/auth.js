const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const AuthController = require("../controllers/auth");

router.post("/login", AuthController.auth_login);
router.post("/teacher/register", AuthController.auth_teacher_register);
router.post("/clerk/register", AuthController.auth_clerk_register);
router.post("/parent/register", AuthController.auth_parent_register);
router.post("/student/register", AuthController.auth_student_register);

module.exports = router;
