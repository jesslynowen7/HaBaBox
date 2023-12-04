const express = require("express");
const router = express.Router();
const {
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByEmail,
  getTransactionByTransactionId,
  getTransactionsByEmailAndStatus,
} = require("./transactionController.js");

//Admin
router.put("/:transactionId", updateTransaction);

//User
router.post("/", insertTransaction);
router.delete("/:transactionId", deleteTransaction);
router.get("/:transactionId", getTransactionByTransactionId);
router.get("/user/:email", getTransactionsByEmail);
router.get("/:email/:status", getTransactionsByEmailAndStatus);

module.exports = router;
