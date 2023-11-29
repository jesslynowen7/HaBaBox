const express = require('express');
const router = express.Router();
const { updateProfilePicture, updateMemberPoints } = require('./memberController');

//User
router.put('/profile/:email', updateProfilePicture);
router.put('/points/:email', updateMemberPoints)

module.exports = router;