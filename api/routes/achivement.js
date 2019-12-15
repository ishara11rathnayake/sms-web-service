const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const AchivementController = require("../controllers/achivement");

router.post("/", checkAuth, AchivementController.achivements_add_achivement);

module.exports = router;
