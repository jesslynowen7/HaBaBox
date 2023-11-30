const express = require("express");
const router = express.Router();
const {
  getRoomByRoomId,
  getRoomsByHotelName,
  searchRoom,
  insertRoom,
  updateRoom,
  deleteRoom,
  updateRoomStatusToBooked,
  updateRoomStatusToAvailable,
} = require("./roomController");

//User
router.get("/:roomId", getRoomByRoomId);
router.get("/hotel/:hotelName", getRoomsByHotelName);
router.get("/", searchRoom);

//Admin
router.post("/", insertRoom);
router.put("/:roomId", updateRoom);
router.put("/:roomId/booked", updateRoomStatusToBooked);
router.put("/:roomId/available", updateRoomStatusToAvailable);
router.delete("/:roomId", deleteRoom);

module.exports = router;
