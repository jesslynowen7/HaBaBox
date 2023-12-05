const express = require("express");
const router = express.Router();
const { getCurrentUserData, updateUserData, updateUserPoints } = require("./userController");

//User
router.put("/updateUserData", updateUserData);
router.put("/point/:email", updateUserPoints);
// Get Current User Data
router.get("/getCurrentUserData", getCurrentUserData);

module.exports = router;
