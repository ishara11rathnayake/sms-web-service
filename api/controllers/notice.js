const mongoose = require("mongoose");

const Notice = require("../models/notice");
const Teacher = require("../models/teacher")

/**
 * create new notice
 */
exports.notices_create_notice = async (req, res, next) => {
  try {
    if (
      req.userData.userType !== "Teacher" &&
      req.userData.userType !== "Admin" &&
      req.userData.userType !== "Clerk"
    ) {
      return res.status(401).json({
        message: "You don't have permission to create notice."
      });
    }

    let username;

    console.log(req.userData.userType);


    if (req.userData.userType == "Teacher"){
      const user = await Teacher.find({user: req.userData.userId})
      username = user[0].name_with_initial;
    } else if(req.userData.userType == "Admin"){
      username = "Admin"
    } else if(req.userData.userType == "Clerk"){
      const user = await Teacher.find({user: req.userData.userId})
      username = user[0].name_with_initial;
    }
    console.log(username);
    const notice = new Notice({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      details: req.body.details,
      posted_by: username,
      date: new Date(),
      user: req.userData.userId
    });

    const savedNotice = await notice.save();

    res.status(201).json({
      message: "Notice created successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * update notice
 */
exports.notices_update_notice = async (req, res, next) => {
  try {
    const noticeId = req.params.noticeId;

    const notice = await Notice.findById(noticeId);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found"
      });
    }

    if (notice.user != req.userData.userId) {
      return res.status(401).json({
        message: "You don't have permission to update this notice."
      });
    }

    let updateOps = {};
    for (const [key, value] of Object.entries(req.body)) {
      updateOps[key] = value;
    }
    await Notice.updateOne({ _id: noticeId }, { $set: updateOps });

    res.status(200).json({
      message: "Notice successfully updated."
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

/**
 * delete notice
 */
exports.notices_delete_notice = async (req, res, next) => {
  try {
    const noticeId = req.params.noticeId;

    await Notice.deleteOne({ _id: noticeId });

    res.status(200).json({
      message: "Notice successfully deleted."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get notice by noticeId
 */
exports.notices_get_notice = async (req, res, next) => {
  try {
    const noticeId = req.params.noticeId;

    const notice = await Notice.findById(noticeId).populate("user");

    res.status(200).json({
      notice: notice
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get all notices
 */
exports.notices_get_all = async (req, res, next) => {
  try {
    const notices = await Notice.find().sort( { date: -1 } );

    res.status(200).json({
      count: notices.length,
      notices: notices.map(notice => {
        return {
          id: notice._id,
          title: notice.title,
          details: notice.details,
          postedby: notice.posted_by,
          dateofpost: notice.date
        };
      })
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};
