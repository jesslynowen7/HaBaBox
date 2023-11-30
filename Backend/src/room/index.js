const express = require("express");
const router = express.Router();
const {
  getRoomByRoomId,
  getRoomsByHotelName,
  searchRoom,
} = require("./roomController");

//User
router.get("/:roomId", getRoomByRoomId);
router.get("/hotel/:hotelName", getRoomsByHotelName);
router.get("/", searchRoom);

module.exports = router;
