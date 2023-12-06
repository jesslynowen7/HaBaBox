const express = require("express");
const router = express.Router();
const {
  insertHotel,
  updateHotel,
  deleteHotel,
  getHotelsByRoomType,
  getCityNames,
} = require("./hotelController");

//Admin
router.post("/", insertHotel);
router.put("/:hotelName", updateHotel);
router.delete("/:hotelName", deleteHotel);

//User
// router.post('/room-types/:roomTypeId', getHotelsByRoomType);
router.get("/city", getCityNames);

module.exports = router;
