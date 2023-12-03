const { getFirestore } = require("firebase-admin/firestore");
require("../utils/firebase-config.js");
require("firebase/database");
const admin = require("firebase-admin");

const db = getFirestore();
const ref = db.collection("users");

exports.getCurrentUserData = async (req, res) => {
  try {
    const token = req.body.token;
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        // Query based on uid
        ref
          .where("uid", "==", uid)
          .get()
          .then((snapshot) => {
            // Handle the snapshot here
            snapshot.forEach((doc) => {
              id = doc.id;
              data = doc.data();
            });
          })
          .catch((error) => {
            console.error("Error getting documents:", error);
          });

        res.status(200).json({ data });
      })
      .catch((error) => {
        console.error("Error getting user by uid:", error);
        throw error;
      });
  } catch (error) {
    throw error;
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
