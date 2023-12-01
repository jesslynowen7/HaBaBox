const { getFirestore } = require("firebase-admin/firestore");
require("../utils/firebase-config.js");
require("firebase/database");

const db = getFirestore();
const ref = db.collection("users");

exports.updateProfilePicture = async (req, res) => {
  try {
    const profilePic = req.body.profilePic;
    const email = req.params["email"];
    const snapshot = await ref.where("email", "==", email).get();
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "User not found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      oldData = doc.data();
    });

    if (profilePic != "") {
      oldData.profilePic = profilePic;
    }
    const newDataUser = {
      email: oldData.email,
      name: oldData.name,
      point: oldData.point,
      profilePic: oldData.profilePic,
    };

    await ref.doc(id).update(newDataUser);
    res.status(200).json({
      message: "Profile picture updated successfully",
      error: null,
      data: newDataUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile picture",
      error: error.message,
    });
  }
};

exports.updateUserPoints = async (req, res) => {
  try {
    const point = parseInt(req.body.point);
    const email = req.params["email"];
    const snapshot = await ref.where("email", "==", email).get();
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "User not found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      oldData = doc.data();
    });

    if (point != "") {
      oldData.point = oldData.point + point;
    }
    const newDataUser = {
      email: oldData.email,
      name: oldData.name,
      point: oldData.point,
      profilePic: oldData.profilePic,
    };

    await ref.doc(id).update(newDataUser);
    res.status(200).json({
      message: "Member points updated successfully",
      error: null,
      data: newDataUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update member points",
      error: error.message,
    });
  }
};
