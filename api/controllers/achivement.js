const mongoose = require("mongoose");

const Achivement = require("../models/achievement");

exports.achivements_add_achivement = async (req, res, next) => {
  try {
    const studentId = req.body.studentId;
    const achivements = await Achivement.find({ studentId: studentId });
    if (achivements.length > 0) {
      if (
        Object.entries(req.body.oLevel).length !== 0 &&
        req.body.oLevel.constructor === Object
      ) {
        await Achivement.updateOne(
          { _id: achivements[0]._id },
          {
            $push: {
              oLevel: { $each: [req.body.oLevel] }
            }
          }
        );
      } else if (
        Object.entries(req.body.aLevel).length !== 0 &&
        req.body.aLevel.constructor === Object
      ) {
        await Achivement.updateOne(
          { _id: achivements[0]._id },
          {
            $push: {
              aLevel: { $each: [req.body.aLevel] }
            }
          }
        );
      } else if (
        Object.entries(req.body.extraCuricular).length !== 0 &&
        req.body.extraCuricular.constructor === Object
      ) {
        await Achivement.updateOne(
          { _id: achivements[0]._id },
          {
            $push: {
              extraCuricular: { $each: [req.body.extraCuricular] }
            }
          }
        );
      } else if (
        Object.entries(req.body.other).length !== 0 &&
        req.body.other.constructor === Object
      ) {
        await Achivement.updateOne(
          { _id: achivements[0]._id },
          {
            $push: {
              other: { $each: [req.body.other] }
            }
          }
        );
      }
    } else {
      let achivement;
      if (
        Object.entries(req.body.oLevel).length !== 0 &&
        req.body.oLevel.constructor === Object
      ) {
        achivement = new Achivement({
          _id: new mongoose.Types.ObjectId(),
          oLevel: req.body.oLevel,
          studentId: req.body.studentId
        });
      } else if (
        Object.entries(req.body.aLevel).length !== 0 &&
        req.body.aLevel.constructor === Object
      ) {
        achivement = new Achivement({
          _id: new mongoose.Types.ObjectId(),
          aLevel: req.body.aLevel,
          studentId: req.body.studentId
        });
      } else if (
        Object.entries(req.body.extraCuricular).length !== 0 &&
        req.body.extraCuricular.constructor === Object
      ) {
        achivement = new Achivement({
          _id: new mongoose.Types.ObjectId(),
          extraCuricular: req.body.extraCuricular,
          studentId: req.body.studentId
        });
      } else if (
        Object.entries(req.body.other).length !== 0 &&
        req.body.other.constructor === Object
      ) {
        achivement = new Achivement({
          _id: new mongoose.Types.ObjectId(),
          other: req.body.other,
          studentId: req.body.studentId
        });
      }
      await achivement.save();
    }
    res.status(200).json({
      message: "Achivement added Successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};
