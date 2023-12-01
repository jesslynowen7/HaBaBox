const express = require("express");
const router = express.Router();
const {
  insertRoom,
  updateRoom,
  deleteRoom,
  getRoomByRoomId,
  getRoomsByHotelName,
  updateRoomStatusToBooked,
  updateRoomStatusToAvailable,
  searchRoom,
} = require("./roomController");

//Admin
router.post("/", insertRoom);
router.put("/:roomId", updateRoom);
router.put("/:roomId/booked", updateRoomStatusToBooked);
router.put("/:roomId/available", updateRoomStatusToAvailable);
router.delete("/:roomId", deleteRoom);

//User
router.get("/:roomId", getRoomByRoomId);
router.get("/hotel/:hotelName", getRoomsByHotelName);
router.get("/", searchRoom);

module.exports = router;
