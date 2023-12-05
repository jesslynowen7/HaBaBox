const firebase = require("firebase/app");
const { getFirestore } = require("firebase-admin/firestore");
require("../utils/firebase-config.js");
require("firebase/database");

const db = getFirestore();
const ref = db.collection("users");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user in Firebase Authentication
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    // Get the UID (user ID) of the newly created user
    const userId = userCredential.user.uid;

    // Add user data to Firestore with the same UID as the user in Firebase Authentication
    const userData = {
      name: name,
      email: email,
      point: 0,
      profilePic: "path",
    };

    // Use the UID as the document ID in Firestore
    await ref.doc(userId).set(userData);

    res
      .status(200)
      .json({ message: "User registered successfully", error: null });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in the user with Firebase Authentication
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    // Generate an access token
    const accessToken = await userCredential.user.getIdToken(true);

    // Fetch additional user data from Firestore
    const emailUser = userCredential.user.email;
    const snapshot = await ref.where("email", "==", emailUser).get();

    let id, data;

    if (snapshot.empty) {
      res.status(200).json({
        message: "Invalid password/email",
        error: null,
        data: null,
      });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      data = doc.data();
    });
    const cookieOptions = {
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("email", data.email, cookieOptions);
    res.cookie("points", data.point, cookieOptions);
    res.cookie("name", data.name, cookieOptions);
    res.cookie("profilePic", data.profilePic, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      error: null,
      accessToken: accessToken,
      dataUser: data,
    });
  } catch (error) {
    res.status(401).json({ message: "Login Error", error: error.message });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  try {
    // Sign out the user from Firebase Authentication
    await firebase.auth().signOut();

    // Clear cookies
    res.clearCookie("access_token");
    res.clearCookie("email");
    res.clearCookie("name");
    res.clearCookie("points");
    res.clearCookie("profilePic");
    res
      .status(200)
      .json({ message: "User logged out successfully", error: null });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to log out user", error: error.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    // Get the email address from the request body
    const email = req.body.email;
    console.log(email);

    // Use Firebase Authentication to send the password reset email
    await firebase.auth().sendPasswordResetEmail(email);

    // Send a success response
    res.status(200).json({
      message: "Password reset email sent successfully",
      error: null,
    });
  } catch (error) {
    // An error occurred, so send an error response
    res.status(500).json({
      message: "Failed to send password reset email",
      error: error.message,
    });
  }
};
