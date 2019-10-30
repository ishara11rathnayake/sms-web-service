const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const AuthController = require("../controllers/auth");

router.post("/login", AuthController.auth_login);
router.post("./teacher/register", AuthController.auth_teacher_register);

module.exports = router;
