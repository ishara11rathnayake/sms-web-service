const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const { upload } = require("../helpers/uploadNotes");

const SalaryController = require("../controllers/salary");

router.post("/", checkAuth, upload, SalaryController.salary_add_salary);

module.exports = router;
