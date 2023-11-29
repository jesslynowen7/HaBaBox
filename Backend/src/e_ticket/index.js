const express = require('express');
const router = express.Router();
const { insertETicket } = require('./eTicketController');

//Admin
router.post('/', insertETicket);

module.exports = router;