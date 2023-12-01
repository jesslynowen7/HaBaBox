const express = require("express");
const router = express.Router();
const { insertETicket, getETicket } = require("./eTicketController");

//Admin
router.post("/", insertETicket);

//Member
router.get("/:eTicketId", getETicket);

module.exports = router;
