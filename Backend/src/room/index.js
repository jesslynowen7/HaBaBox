const express = require('express');
const router = express.Router();
const { insertRoom, deleteRoom, getRoomsByHotelName } = require('./roomController');

//Admin
router.post('/', insertRoom);
router.delete('/:roomId', deleteRoom)

//User
router.get('/:hotelName', getRoomsByHotelName)

module.exports = router;