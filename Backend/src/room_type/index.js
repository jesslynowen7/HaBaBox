const express = require("express");
const router = express.Router();
const {
  insertRoomType,
  updateRoomType,
  deleteRoomType,
} = require("./roomTypeController");

//Admin
router.post("/", insertRoomType);
router.put("/:roomTypeId", updateRoomType);
router.delete("/:roomTypeId", deleteRoomType);

module.exports = router;
