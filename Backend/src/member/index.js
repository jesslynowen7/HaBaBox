const express = require('express');
const router = express.Router();
const { updateProfilePicture, updateMemberPoints } = require('./memberController');

//User
router.put('/profile/:memberId', updateProfilePicture);
router.put('/points/:memberId', updateMemberPoints)

module.exports = router;