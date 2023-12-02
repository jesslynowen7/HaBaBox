const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUserData } = require('./authController');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Logout user
router.post('/logout', logoutUser);

// Get Current User Data
router.get('/getCurrentUserData', getCurrentUserData);

module.exports = router;