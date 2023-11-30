const express = require("express");
const router = express.Router();
const {
  insertRoom,
  updateRoom,
  deleteRoom,
  updateRoomStatusToBooked,
  updateRoomStatusToAvailable,
} = require("./roomController");
  //Admin
  router.post("/", insertRoom);
router.put("/:roomId", updateRoom);
router.put("/:roomId/booked", updateRoomStatusToBooked);
router.put("/:roomId/available", updateRoomStatusToAvailable);
router.delete("/:roomId", deleteRoom);
