const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const { upload } = require("../helpers/uploadNotes");

const LeavesController = require("../controllers/leaves");

router.post("/", checkAuth, upload, LeavesController.leaves_request_leave);
router.post("/clerk", checkAuth, upload, LeavesController.leaves_request_leave_clerk);

router.get("/pending", checkAuth, LeavesController.leaves_get_pending_leaves);
router.get(
  "/byuserid",
  checkAuth,
  LeavesController.leaves_get_leaves_by_userid
);
router.patch("/approve", checkAuth, upload, LeavesController.leaves_approve_leave);
router.patch("/reject", checkAuth, upload, LeavesController.leaves_reject_leave);
router.get("/count", checkAuth, LeavesController.leaves_get_leave_count);
router.delete("/", checkAuth, LeavesController.leaves_delete_leaves);

module.exports = router;
