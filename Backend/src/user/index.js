const express = require("express");
const router = express.Router();
const { getCurrentUserData, updateProfilePicture, updateUserPoints } = require("./userController");

//User
router.put("/profile/:email", updateProfilePicture);
router.put("/point/:email", updateUserPoints);
// Get Current User Data
router.get("/getCurrentUserData", getCurrentUserData);

module.exports = router;
