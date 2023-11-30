const firebase = require('firebase/app');
const { getFirestore } = require('firebase-admin/firestore');

require('../utils/firebase-config.js');
require('firebase/database');

const db = getFirestore();
const ref = db.collection('users');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user in Firebase Authentication
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    const userData = {
      name: name,
      email: email,
      point: 0,
      profilePic: null
    }

    await ref.add(userData);

    res.status(201).json({ message: 'User registered successfully', error: null });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in the user with Firebase Authentication
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

    // Generate an access token
    const accessToken = await userCredential.user.getIdToken();
    const emailUser = userCredential.user.email;
    const snapshot = await ref.where('email', '==', emailUser).get();
    if (snapshot.empty) {
        res.status(200).json({ message: 'Invalid password/email', error: null, data: null});
        return;
    }
    snapshot.forEach(doc => {
        id = doc.id
        data = doc.data()
    });
    res.status(200).json({ message: 'Login successful', error: null, accessToken: accessToken, dataUser: data });

  } catch (error) {
    res.status(401).json({ message: 'Login Error', error: error.message });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  try {
    // Sign out the user from Firebase Authentication
    await firebase.auth().signOut();

    res.status(200).json({ message: 'User logged out successfully', error: null });
  } catch (error) {
    res.status(500).json({ message: 'Failed to log out user', error: error.message });
  }
};