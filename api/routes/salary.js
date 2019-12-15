const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const { upload } = require("../helpers/uploadNotes");

const SalaryController = require("../controllers/salary");

router.post("/", checkAuth, upload, SalaryController.salary_add_salary);
router.get("/byuser", checkAuth, upload, SalaryController.salary_get_salary);

module.exports = router;
