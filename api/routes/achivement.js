const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const AchivementController = require("../controllers/achivement");

router.post("/", checkAuth, AchivementController.achivements_add_achivement);
router.get(
  "/byuserid",
  checkAuth,
  AchivementController.achivements_get_achivement_by_user_id
);

module.exports = router;
