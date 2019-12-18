const User = require("../models/user");
const Parent = require("../models/parent");

const { sendUserProfileUpdateEmail } = require("../helpers/emailFormat");

/**
 * update parent details
 */
exports.parents_update_parent = async (req, res, next) => {
  let updateOps = {};
  const parentId = req.params.parentId;

  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  try {
    await Parent.updateOne({ _id: parentId }, { $set: updateOps });

    const userDetails = await Parent.findById(parentId);

    sendUserProfileUpdateEmail(
      userDetails.email,
      userDetails.name_with_initial
    ).catch(console.error);

    res.status(200).json({
      message: `${userDetails.name_with_initial}'s profile successfully updated`,
      parent: userDetails
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * delete parent profile
 */
exports.parents_delete_parent = async (req, res, next) => {
  const parentId = req.params.parentId;

  try {
    const parent = await Parent.findById(parentId);

    if (!parent) {
      return res.status(404).json({
        message: "Parent not found."
      });
    }

    await User.deleteOne({ _id: parent.user });
    await Parent.deleteOne({ _id: parentId });

    res.status(200).json({
      message: `${parent.name_with_initial}'s profile successfully deleted.`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get parent details by parentId
 */
exports.parents_get_parent = async (req, res, next) => {
  const parentId = req.params.parentId;

  try {
    const parent = await Parent.findById(parentId);

    if (!parent) {
      return res.status(404).json({
        message: "Parent not found"
      });
    }

    res.status(200).json({
      parent: parent
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get all parents details
 */
exports.parents_get_all = async (req, res, next) => {
  try {
    const parents = await Parent.find();

    res.status(200).json({
      count: parents.length,
      parents: parents.map((parent, i) => {
        return {
          parentId: parent._id,
          fullname: parent.full_name,
          nameinitials: parent.name_with_initial,
          id: i + 1,
          relationship: parent.relationship_to_student,
          nic: parent.nic,
          address: parent.address,
          contact: parent.contact_number,
          email: parent.email
        };
      })
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

/**
 * get parent by user id
 */
exports.parents_get_parent_by_user_id = async (req, res, next) => {
  const userId = req.userData.userId;
  try {
    const parents = await Parent.find({ user: userId });

    if (parents.length == 0) {
      return res.status(404).json({
        message: "Parent not found"
      });
    }

    res.status(200).json({
      count: parents.length,
      parents: parents.map(parent => {
        return {
          parentId: parent._id,
          fullname: parent.full_name,
          nameinitials: parent.name_with_initial,
          relationship: parent.relationship_to_student,
          nic: parent.nic,
          address: parent.address,
          contact: parent.contact_number,
          email: parent.email
        };
      })
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};
