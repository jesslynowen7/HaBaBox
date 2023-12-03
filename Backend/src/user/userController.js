const { getFirestore } = require("firebase-admin/firestore");
require("../utils/firebase-config.js");
require("firebase/database");
const admin = require("firebase-admin");

const db = getFirestore();
const ref = db.collection("users");

exports.getCurrentUserData = async (req, res) => {
  try {
    const token = req.query.token; // Extract token from query parameters

    if (!token) {
      return res
        .status(400)
        .json({ error: "Token is missing in the query parameters." });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Query based on uid
    const snapshot = await ref.doc(uid).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "User data not found." });
    }

    // Extract data from the snapshot
    const userData = snapshot.data();

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error in getCurrentUserData:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
