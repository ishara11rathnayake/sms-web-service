const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const NoticeController = require("../controllers/notice");

router.post("/", checkAuth, NoticeController.notices_create_notice);
router.patch("/:noticeId", checkAuth, NoticeController.notices_update_notice);
router.delete("/:noticeId", checkAuth, NoticeController.notices_delete_notice);
router.get("/:noticeId", checkAuth, NoticeController.notices_get_notice);
router.get("/", checkAuth, NoticeController.notices_get_all);

module.exports = router;
