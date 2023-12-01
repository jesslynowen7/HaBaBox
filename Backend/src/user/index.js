const express = require("express");
const router = express.Router();
const { updateProfilePicture, updateUserPoints } = require("./userController");

//User
router.put("/profile/:email", updateProfilePicture);
router.put("/point/:email", updateUserPoints);

module.exports = router;
