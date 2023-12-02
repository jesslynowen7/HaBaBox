const firebase = require("firebase/app");
const { getFirestore } = require("firebase-admin/firestore");
require("../utils/firebase-config.js");
require("firebase/database");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

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
      profilePic: null,
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

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in the user with Firebase Authentication
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    // Generate an access token
    const accessToken = await userCredential.user.getIdToken();

    // Set the access token as an HttpOnly cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict", // Adjust based on your needs (strict, lax, none)
      maxAge: 3600000, // Token expiration time in milliseconds (adjust as needed)
      path: "/", // The path to set the cookie on (adjust based on your application structure)
    });

    // Fetch additional user data from Firestore
    const emailUser = userCredential.user.email;
    const snapshot = await ref.where("email", "==", emailUser).get();

    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "Invalid password/email", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      data = doc.data();
    });

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

    res
      .status(200)
      .json({ message: "User logged out successfully", error: null });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to log out user", error: error.message });
  }
};
